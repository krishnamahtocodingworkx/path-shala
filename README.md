# PathShala

PathShala is a full-stack online learning platform (EdTech). Students browse and buy courses, instructors create and publish video courses, and admins manage categories.

It was built as an ITS college project. Live deployments:

| App | URL |
| --- | --- |
| Frontend | [https://path-shala-omega.vercel.app](https://path-shala-omega.vercel.app) |
| Backend | [https://path-shala-backend.onrender.com](https://path-shala-backend.onrender.com) |
| Repo | [github.com/krishnamahtocodingworkx/path-shala](https://github.com/krishnamahtocodingworkx/path-shala) |

---

## Table of contents

1. [What this product does](#what-this-product-does)
2. [Tech stack](#tech-stack)
3. [Repository layout](#repository-layout)
4. [How the system fits together](#how-the-system-fits-together)
5. [User roles](#user-roles)
6. [Local setup](#local-setup)
7. [Environment variables](#environment-variables)
8. [Backend deep dive](#backend-deep-dive)
9. [Frontend deep dive](#frontend-deep-dive)
10. [Core user flows](#core-user-flows)
11. [API reference](#api-reference)
12. [Database models](#database-models)
13. [Third-party services](#third-party-services)
14. [Deployment](#deployment)
15. [Working on this project](#working-on-this-project)
16. [Known issues and gotchas](#known-issues-and-gotchas)

---

## What this product does

PathShala is a course marketplace with three sides:

**Students**

- Sign up / log in with email OTP verification
- Browse courses by category (Catalog)
- View course details, ratings, and instructor info
- Add courses to a cart and pay with Razorpay
- Watch enrolled lectures, track progress, and leave ratings
- Update profile, avatar, and password

**Instructors**

- Create courses in a 3-step wizard (info → curriculum → publish)
- Upload a thumbnail and lecture videos (Cloudinary)
- Organize content as Course → Section → SubSection (lecture)
- Edit / delete courses, sections, and lectures
- See an instructor dashboard with charts (students, income)

**Admins**

- Create course categories (`POST /api/v1/course/createCategory`)
- Categories power the navbar Catalog dropdown and catalog pages

Also included: contact form emails, password reset via email, a homepage help chatbot (rule-based), and a review slider on public pages.

---

## Tech stack

### Frontend (`frontend/`)

| Piece | Choice |
| --- | --- |
| UI | React 18 (Create React App / `react-scripts`) |
| Styling | Tailwind CSS 3, custom `richblack` / `yellow` palette |
| Routing | React Router DOM 6 |
| State | Redux Toolkit (`auth`, `profile`, `cart`, `course`, `viewCourse`) |
| HTTP | Axios (`src/services/apiconnector.js`) |
| Forms | react-hook-form (contact / some forms) |
| Payments | Razorpay Checkout JS |
| Charts | Chart.js + react-chartjs-2 |
| Video | video-react |
| Toasts | react-hot-toast |
| Chat | react-chatbot-kit (rule-based on Home) |
| Sliders | Swiper |

### Backend (`backend/`)

| Piece | Choice |
| --- | --- |
| Runtime | Node.js + Express 4 |
| Database | MongoDB + Mongoose 8 |
| Auth | JWT (`jsonwebtoken`) + bcrypt, httpOnly cookie |
| Uploads | `express-fileupload` → Cloudinary |
| Payments | Razorpay Node SDK |
| Email | Nodemailer (Gmail SMTP, port 465) |
| OTP | `otp-generator`, stored in MongoDB (TTL 5 min) |

---

## Repository layout

The repo is a two-folder monorepo. **`frontend/` and `backend/` are the apps you run.** There is no root `package.json`.

```
PathShala/
├── README.md                 ← this file
├── frontend/                 ← React client (port 3000)
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env                  ← REACT_APP_BASE_URL, RAZORPAY_KEY
└── backend/                  ← Express API (port 4000)
    ├── index.js              ← app entry
    ├── config/               ← MongoDB, Cloudinary, Razorpay
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middlewares/auth.js
    ├── mail/templates/
    ├── utils/
    ├── package.json
    └── .env                  ← secrets (never commit)
```

### Frontend `src/` map

```
frontend/src/
├── App.jsx                   ← all routes
├── index.js                  ← Redux store + BrowserRouter + Toaster
├── index.css / App.css
├── pages/                    ← route-level screens
├── components/
│   ├── common/               ← Navbar, Footer, Logo, RatingStars, …
│   ├── chatbot/              ← unused OpenAI-style chatbot (no backend route)
│   ├── ContactPage/
│   └── core/
│       ├── Auth/             ← Login, Signup, PrivateRoute
│       ├── Homepage/
│       ├── AboutPage/
│       ├── Catalog/
│       ├── Course/
│       ├── ContactUsPage/
│       ├── Dashboard/        ← student + instructor dashboards
│       └── ViewCourse/       ← lecture player
├── slices/                   ← Redux slices
├── reducer/index.js          ← combineReducers
├── services/
│   ├── apis.js               ← all endpoint URLs
│   ├── apiconnector.js       ← axios wrapper
│   └── operations/           ← thunks / API call functions
├── data/                     ← navbar, footer, dashboard links, homepage copy
├── hooks/
├── utils/                    ← ACCOUNT_TYPE, chatbot config
└── assets/
```

### Backend map

```
backend/
├── index.js
├── config/
│   ├── database.js           ← mongoose.connect(MONGODB_URL)
│   ├── cloudinary.js
│   └── razorpay.js
├── routes/
│   ├── User.js               → /api/v1/auth
│   ├── Profile.js            → /api/v1/profile
│   ├── Course.js             → /api/v1/course
│   ├── Payments.js           → /api/v1/payment
│   └── Contact.js            → /api/v1/reach
├── controllers/              ← business logic
├── models/                   ← Mongoose schemas
├── middlewares/auth.js       ← JWT + role guards
├── mail/templates/           ← HTML emails
└── utils/
    ├── mailSender.js
    ├── imageUploader.js      ← Cloudinary upload (images + videos)
    ├── constants.js          ← USER_ROLE
    └── secToDuration.js
```

---

## How the system fits together

```
Browser (React, :3000)
    │  REACT_APP_BASE_URL = http://localhost:4000/api/v1
    │  Authorization header is spelled **Authorisation** (see gotchas)
    ▼
Express (Node, :4000)
    ├── /api/v1/auth      User signup, login, OTP, password
    ├── /api/v1/profile   Profile, avatar, enrolled courses, instructor stats
    ├── /api/v1/course    Courses, sections, lectures, categories, ratings
    ├── /api/v1/payment   Razorpay capture + verify
    └── /api/v1/reach     Contact form
            │
            ├── MongoDB Atlas     users, courses, OTP, progress, …
            ├── Cloudinary        thumbnails + lecture videos
            ├── Gmail SMTP        OTP, reset link, enrollment, contact
            └── Razorpay          course checkout
```

---

## User roles

Defined in both apps:

- Frontend: `frontend/src/utils/constants.js` → `ACCOUNT_TYPE`
- Backend: `backend/utils/constants.js` → `USER_ROLE`

| Role | Value | Can do |
| --- | --- | --- |
| Student | `"Student"` | Buy courses, cart, watch lectures, rate courses |
| Instructor | `"Instructor"` | Create/edit/publish courses, instructor dashboard |
| Admin | `"Admin"` | Create categories |

Signup UI only offers **Student** or **Instructor**. To create an Admin, either:

1. Call `POST /api/v1/auth/signup` with `"accountType": "Admin"` after OTP, or
2. In MongoDB, set a user’s `accountType` to `"Admin"`.

Course status:

- `"Draft"` — only the instructor sees it
- `"Published"` — listed on catalog / public course pages

---

## Local setup

### Prerequisites

- Node.js 18+ and npm
- A MongoDB Atlas cluster (or local MongoDB)
- Cloudinary account
- Razorpay test keys
- Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) (2FA must be on)

### 1. Clone

```bash
git clone https://github.com/krishnamahtocodingworkx/path-shala.git
cd path-shala
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env   # or create backend/.env yourself (see below)
npm run dev            # nodemon on PORT (default 4000)
```

Health check: open `http://localhost:4000/` — you should see `{ "success": true, "message": "Your default route is running" }`.

### 3. Frontend

```bash
cd frontend
npm install
# create frontend/.env (see below)
npm start              # http://localhost:3000
```

Run **backend first**, then frontend. The client talks to `REACT_APP_BASE_URL`.

> `frontend/package.json` still has `"server": "cd server && npm run dev"`. That path is outdated (the API folder is now `backend/`). Start the API from `backend/` directly.

---

## Environment variables

**Do not commit real secrets.** Both `.env` files are gitignored. Use placeholders locally and in CI.

### `backend/.env`

```env
PORT=4000
MONGODB_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>

JWT_SECRET=replace-with-a-long-random-string

# Cloudinary
CLOUD_NAME=
API_KEY=
API_SECRET=
FOLDER_NAME=fileupload

# Razorpay
RAZORPAY_KEY=
RAZORPAY_SECRET=

# Gmail SMTP (App Password, not your login password)
SMTP_USER=you@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
```

### `frontend/.env`

```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1

# Used by Razorpay Checkout (see known issues: CRA only exposes REACT_APP_* vars)
RAZORPAY_KEY=
```

For production frontend, point `REACT_APP_BASE_URL` at the deployed API, for example:

```env
REACT_APP_BASE_URL=https://path-shala-backend.onrender.com/api/v1
```

---

## Backend deep dive

### Entry (`backend/index.js`)

On boot the server:

1. Loads dotenv
2. Connects MongoDB (`config/database.js`)
3. Applies JSON body parser, cookie-parser, CORS (`origin: "*"`), file upload (`/tmp`)
4. Connects Cloudinary
5. Mounts route modules under `/api/v1/...`
6. Listens on `PORT` (default `4000`)

### Auth middleware (`backend/middlewares/auth.js`)

Token is read from, in order:

1. `req.cookies.token`
2. `req.body.token`
3. `req.header("Authorisation")` after stripping `Bearer `

**The header name is `Authorisation` (British spelling), not `Authorization`.** The frontend matches this in most API helpers. If you add a new authenticated call, use the same spelling or the request will 401.

Role guards (run after `auth`):

- `isStudent` — `accountType === "Student"`
- `isInstructor` — `accountType === "Instructor"`
- `isAdmin` — `accountType === "Admin"`

JWT payload: `{ email, id, accountType }`, signed with `JWT_SECRET`, expires in **24 hours**. Login also sets an httpOnly cookie for **3 days**.

### Email (`backend/utils/mailSender.js`)

Nodemailer over `smtp.gmail.com:465`. Templates live in `backend/mail/templates/`:

| Template | When |
| --- | --- |
| `emailVerificationTemplate.js` | Signup OTP |
| `passwordUpdate.js` | Password changed |
| `courseEnrollmentEmail.js` | After successful payment |
| `paymentSuccessEmail.js` | Payment confirmation |
| `contactFormRes.js` | Contact form acknowledgement |

OTP documents expire after **5 minutes** (Mongo TTL on `OTP.createdAt`). Password-reset tokens also expire in **5 minutes**. The reset email currently links to the **production** frontend:

`https://path-shala-omega.vercel.app/update-password/<token>`

For local reset testing, change that URL in `backend/controllers/ResetPassword.js`.

### File uploads

`utils/imageUploader.js` uploads any file to Cloudinary with `resource_type: "auto"` (works for images and videos). Used for:

- Course thumbnails (`createCourse` / `editCourse`)
- Lecture videos (`createSubSection` / `updateSubSection`)
- Profile display picture

---

## Frontend deep dive

### Boot (`frontend/src/index.js`)

Redux store from `reducer/index.js`, `BrowserRouter`, `Toaster` for notifications.

### Routes (`frontend/src/App.jsx`)

| Path | Page | Auth |
| --- | --- | --- |
| `/` | Home | Public |
| `/catalog/:catalogName` | Catalog (courses in a category) | Public |
| `/courses/:courseId` | Course details + buy | Public |
| `/login` `/signup` | Auth | Public |
| `/verify-email` | OTP after signup | Public |
| `/forgot-password` | Request reset email | Public |
| `/update-password/:id` | Set new password | Public |
| `/About` `/contact` | About, Contact | Public |
| `/dashboard/my-profile` | Profile | Private |
| `/dashboard/setting` | Settings | Private |
| `/dashboard/enrolled-courses` | Student courses | Private |
| `/dashboard/cart` | Cart + Razorpay | Private |
| `/dashboard/add-course` | Instructor create wizard | Private |
| `/dashboard/my-courses` | Instructor course list | Private |
| `/dashboard/edit-course/:courseId` | Edit course | Private |
| `/dashboard/instructor` | Instructor analytics | Private |
| `/view-course/:courseId/section/:sectionId/sub-section/:subSectionId` | Lecture player | Private |
| `*` | Error | Public |

`PrivateRoute` redirects to `/login` when Redux `auth.token` is null.

Navbar links: Home, Catalog (categories from API), About Us (`/about`), Contact Us. Note About is registered as `/About` (capital A) in `App.jsx` — React Router is case-insensitive on most setups, but keep it in mind.

### Redux slices

| Slice | File | Persisted in `localStorage` | Purpose |
| --- | --- | --- | --- |
| `auth` | `slices/authSlice.js` | `token` | JWT, signup form payload, loading |
| `profile` | `slices/profileSlice.js` | `user` | Logged-in user object |
| `cart` | `slices/cartSlice.js` | `cart`, `total`, `totalItems` | Student cart |
| `course` | `slices/courseSlice.js` | — | Add/edit course wizard (`step` 1–3) |
| `viewCourse` | `slices/viewCourseSlice.js` | — | Lecture player: sections, completed lectures |

### API layer

All URLs are built in `frontend/src/services/apis.js` from `process.env.REACT_APP_BASE_URL`.

Call sites:

| File | Covers |
| --- | --- |
| `operations/authAPI.js` | OTP, signup, login, logout, reset password |
| `operations/profileAPI.js` | User details, enrolled courses, instructor dashboard |
| `operations/SettingsAPI.js` | Avatar, profile fields, change password, delete account |
| `operations/courseDetailsAPI.js` | CRUD courses / sections / lectures, ratings, progress |
| `operations/studentFeaturesAPI.js` | Razorpay buy + verify |
| `operations/pageAndComponentData.js` | Catalog page payload |

### Add-course wizard (instructors)

Redux `course.step`:

1. **Course Information** — name, description, price, category, thumbnail, what you’ll learn, instructions (`CourseInformationForm`)
2. **Course builder** — sections and lectures / video upload (`CourseBuilderForm`, `NestedView`, `SubSectionModal`)
3. **Publish** — set status Draft or Published (`PublishCourse`)

### Homepage chatbot

Home (`pages/Home.jsx`) toggles `react-chatbot-kit`. Replies are **hard-coded regex rules** in `utils/ActionProvider.js` (greetings, courses, payment, login, etc.). There is **no LLM** on this path.

`components/chatbot/index.jsx` is a separate widget that POSTs to `/api/v1/chat/chat`. That route **does not exist** on the backend. Treat it as leftover.

---

## Core user flows

### Signup

1. User fills Signup (Student or Instructor) → data stored in `auth.signupData`
2. `POST /auth/sendotp` → OTP emailed, also currently returned in the JSON (dev convenience)
3. `/verify-email` → `POST /auth/signup` with OTP
4. Backend creates empty `Profile`, hashes password (bcrypt, 10 rounds), default avatar from [DiceBear initials](https://api.dicebear.com)
5. Redirect to `/login`

### Login

1. `POST /auth/login` with email + password
2. JWT returned in body **and** `token` cookie
3. Frontend stores `token` and `user` in Redux + `localStorage`

### Buy a course

1. Student opens course → Add to cart or Buy Now
2. `BuyCourse()` loads Razorpay Checkout script
3. `POST /payment/capturePayment` creates a Razorpay order (amount in paise, INR)
4. After payment, `POST /payment/verifyPayment` checks HMAC signature, enrolls the student, creates `CourseProgress`, sends enrollment email
5. Cart is reset; user is sent to enrolled courses

### Watch a lecture

1. `GET`-style `POST /course/getFullCourseDetails` (auth) loads content + completed videos
2. Player at `view-course/:courseId/section/:sectionId/sub-section/:subSectionId`
3. Completing a lecture → `POST /course/updateCourseProgress` (`isStudent`)
4. Optional `POST /course/createRating` (one review per student per course)

### Forgot password

1. `POST /auth/reset-password-token` with email
2. User gets a link with a random hex token (5 min TTL)
3. `POST /auth/reset-password` with `{ password, confirmPassword, token }`

---

## API reference

Base URL: `http://localhost:4000/api/v1`

Protected routes need header:

```http
Authorisation: Bearer <jwt>
```

### Auth — `/auth`

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/sendotp` | No | Body: `{ email }`. Emails a 6-digit OTP. |
| POST | `/signup` | No | `{ firstName, lastName, email, password, confirmPassword, accountType, otp }` |
| POST | `/login` | No | `{ email, password }` → `{ token, user }` |
| POST | `/changepassword` | Yes | `{ oldPassword, newPassword }` |
| POST | `/reset-password-token` | No | `{ email }` |
| POST | `/reset-password` | No | `{ password, confirmPassword, token }` |

### Profile — `/profile`

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| GET | `/getUserDetails` | Yes | Populated user + profile |
| PUT | `/updateProfile` | Yes | `{ dateOfBirth, about, contactNumber, gender }` |
| PUT | `/updateDisplayPicture` | Yes | Multipart `displayPicture` |
| DELETE | `/deleteProfile` | Yes | Deletes account |
| GET | `/getEnrolledCourses` | Yes | Student’s courses + progress % |
| GET | `/instructorDashboard` | Instructor | Per-course students and income |

### Course — `/course`

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/createCourse` | Instructor | Multipart course + `thumbnailImage` |
| POST | `/editCourse` | Instructor | Update course fields / thumbnail |
| GET | `/getAllCourses` | No | Public list |
| POST | `/getCourseDetails` | No | `{ courseId }` public details |
| POST | `/getFullCourseDetails` | Yes | Full curriculum + progress |
| GET | `/getInstructorCourses` | Instructor | That instructor’s courses |
| DELETE | `/deleteCourse` | — | `{ courseId }` |
| POST | `/addSection` | Instructor | `{ courseId, sectionName }` |
| POST | `/updateSection` | Instructor | `{ sectionId, sectionName, courseId }` |
| POST | `/deleteSection` | Instructor | `{ sectionId, courseId }` |
| POST | `/addSubSection` | Instructor | Multipart lecture + `video` |
| POST | `/updateSubSection` | Instructor | Update lecture / video |
| POST | `/deleteSubSection` | Instructor | `{ subSectionId, sectionId }` |
| POST | `/updateCourseProgress` | Student | `{ courseId, subsectionId }` |
| POST | `/createCategory` | Admin | `{ name, description }` |
| GET | `/showAllCategories` | No | Navbar + forms |
| POST | `/getCategoryPageDetails` | No | `{ categoryId }` catalog payload |
| POST | `/createRating` | Student | `{ courseId, rating, review }` |
| GET | `/getAverageRating` | No | Average for a course |
| GET | `/getReviews` | No | All reviews (homepage slider) |

### Payment — `/payment`

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/capturePayment` | Student | `{ courses: [courseId, ...] }` → Razorpay order |
| POST | `/verifyPayment` | Student | Razorpay ids + signature + `courses` |
| POST | `/sendPaymentSuccessEmail` | Student | Confirmation email |

### Contact — `/reach`

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/contact` | No | `{ email, firstname, lastname, message, phoneNo, countrycode }` |

---

## Database models

```
User
  ├── additionalDetails → Profile     (gender, DOB, about, contactNumber)
  ├── courses[]         → Course      (enrolled)
  ├── courseProgress[]  → CourseProgress
  ├── accountType       Student | Instructor | Admin
  ├── token / resetPasswordExpires    (forgot password)
  └── image             avatar URL

Course
  ├── instructor        → User
  ├── category          → Category
  ├── courseContent[]   → Section
  │                         └── subSection[] → SubSection
  │                                              (title, description, videoUrl, timeDuration)
  ├── ratingAndReviews[]→ RatingAndReview
  ├── studentsEnrolled[]→ User
  ├── tag[], instructions[], thumbnail, price, status
  └── createdAt

Category
  └── courses[] → Course

OTP
  email, otp, createdAt (expires 5 min)

CourseProgress
  courseID, userId, completedVideos[] → SubSection

RatingAndReview
  user, course, rating, review
```

---

## Third-party services

| Service | Used for | Where configured |
| --- | --- | --- |
| MongoDB Atlas | Persistence | `MONGODB_URL` |
| Cloudinary | Thumbnails, avatars, lecture videos | `CLOUD_NAME`, `API_KEY`, `API_SECRET`, `FOLDER_NAME` |
| Razorpay | Checkout | `RAZORPAY_KEY` / `RAZORPAY_SECRET` |
| Gmail SMTP | Transactional email | `SMTP_USER`, `SMTP_PASS` |
| DiceBear | Default avatar on signup | Hard-coded URL in Auth controller |
| Vercel | Frontend host | Production frontend |
| Render | Backend host | Production API |

---

## Deployment

### Frontend (Vercel)

- Root directory: `frontend`
- Build: `npm run build` (CRA → `build/`)
- Env: `REACT_APP_BASE_URL` must be the **production** API including `/api/v1`
- Rebuild after changing any `REACT_APP_*` variable (they are inlined at build time)

### Backend (Render)

- Root directory: `backend`
- Start: `npm start` (`node index.js`)
- Set all `backend/.env` keys in the Render dashboard
- CORS is currently `origin: "*"` so any frontend origin can call the API

After deploy, confirm `GET https://<api-host>/` returns the default JSON.

---

## Working on this project

### Suggested workflow

1. Create a branch from `development` (or `main`).
2. Run backend on `:4000` and frontend on `:3000`.
3. Keep API URLs in `frontend/src/services/apis.js` only — do not hard-code hosts in components.
4. New authenticated frontend calls must send `Authorisation: Bearer ${token}` (that spelling).
5. New instructor/student/admin-only endpoints must chain `auth` + `isInstructor` / `isStudent` / `isAdmin`.
6. After adding a category, it appears in the navbar Catalog automatically (`GET /course/showAllCategories`).

### Adding a course category (Admin)

```bash
# 1. Log in as Admin, copy JWT
# 2.
curl -X POST http://localhost:4000/api/v1/course/createCategory \
  -H "Content-Type: application/json" \
  -H "Authorisation: Bearer YOUR_JWT" \
  -d '{"name":"Web Development","description":"HTML, CSS, JS, React"}'
```

Without at least one category, instructors cannot create courses (category is required).

### Scripts

**Backend**

```bash
npm run dev    # nodemon
npm start      # node index.js
```

**Frontend**

```bash
npm start      # CRA dev server
npm run build  # production bundle
```

### Seed / first-run checklist

1. Backend connects to MongoDB (log: `connection to database successfully`)
2. SMTP verifies (log: `SMTP Server is ready`) in non-production
3. Create an Admin user and at least one Category
4. Sign up as Instructor, create a Draft course, add a section + lecture, Publish
5. Sign up as Student, buy (Razorpay test card), open the lecture player

---

## Known issues and gotchas

These are useful while debugging; fix them when you touch the related code.

1. **Auth header spelling** — Backend reads `Authorisation`. Most frontend files use that. A few calls in `SettingsAPI.js` and one in `courseDetailsAPI.js` use `Authorization` and can 401.

2. **`App.jsx` role routes** — Student/instructor dashboard routes are wrapped in a way that does not actually gate on `user.accountType`. There is also a typo: `accoutType` vs `accountType`. Routes still work because they are always registered; sidebar links are filtered correctly in `data/dashboard-links.js`.

3. **About path** — Navbar goes to `/about`; route is declared as `/About`.

4. **Razorpay key on the client** — Checkout uses `process.env.RAZORPAY_KEY`. Create React App only exposes variables prefixed with `REACT_APP_`. Prefer `REACT_APP_RAZORPAY_KEY` and read that in `studentFeaturesAPI.js`.

5. **OTP in API response** — `sendotp` returns the OTP in JSON. Fine for local debug; remove before treating this as production-hardening.

6. **Password reset URL** — Hard-coded to the Vercel frontend. Local reset emails will not point at `localhost:3000`.

7. **`frontend` `npm run server` / `npm run dev`** — Still `cd server`. The API folder is `backend/`.

8. **Chat backend** — `components/chatbot/index.jsx` calls `/api/v1/chat/chat`, which is not implemented. The live Home chatbot is rule-based only.

9. **Course `tag` field** — Schema marks `tag` as required, but `createCourse` does not always set it. If course creation fails validation, check this.

10. **CORS** — `origin: "*"` with `credentials: true` is a combination browsers may reject for credentialed cookies. Login currently also stores JWT in `localStorage`, which is what the SPA uses.

11. **`.env` files** — Never commit them. Rotate any keys that were ever committed or shared.

---

## License / credits

College project (ITS). Frontend started from a React + Tailwind starter pack; product name, APIs, and features are PathShala-specific.
