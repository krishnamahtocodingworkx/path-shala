# PathShala

PathShala is a full-stack online learning platform. Students browse and buy courses, instructors create and publish video courses (and categories), and admins can also manage categories.

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

PathShala is a course marketplace with three sides.

**Students**

- Sign up / log in with email OTP verification
- Browse courses by category (Catalog) with Most Popular / New tabs
- View course details, ratings, instructor info, and a sticky buy card
- Add courses to a cart and pay with Razorpay
- Watch enrolled lectures, track progress, mark lectures complete
- Leave a star rating and written review
- Update profile, avatar, and password

**Instructors**

- Create courses in a 3-step wizard (info → curriculum → publish)
- Create a **new category** from the course-info step if it is missing
- Upload a thumbnail and lecture videos (Cloudinary)
- Organize content as Course → Section → SubSection (lecture)
- Edit / delete courses, sections, and lectures
- See an instructor dashboard with charts (students, income)

**Admins**

- Can also create categories (`POST /api/v1/course/createCategory`)
- There is **no Admin UI**; signup only offers Student or Instructor
- Categories power the navbar Catalog dropdown and catalog pages

Also included: contact form emails, password reset via email, a homepage help chatbot (rule-based), and a review slider on Home, About, Contact, and course details.

---

## Tech stack

### Frontend (`frontend/`)

| Piece | Choice |
| --- | --- |
| UI | React 18 (Create React App / `react-scripts`) |
| Styling | Tailwind CSS 3, custom `richblack` / `yellow` palette, shimmer skeletons |
| Routing | React Router DOM 6 |
| State | Redux Toolkit (`auth`, `profile`, `cart`, `course`, `viewCourse`) |
| HTTP | Axios (`src/services/apiconnector.js`) |
| Forms | react-hook-form (contact / some dashboard forms) |
| Payments | Razorpay Checkout JS (`REACT_APP_RAZORPAY_KEY`) |
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
| Messages | Shared strings in `backend/utils/constants.js` |

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
│   └── .env                  ← REACT_APP_BASE_URL, REACT_APP_RAZORPAY_KEY
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
├── pages/                    ← Home, Catalog, CourseDetails, ViewCourse, Auth, About, Contact, Dashboard
├── components/
│   ├── common/               ← Navbar, Footer, Logo, ReviewSlider, IconBtn
│   ├── chatbot/              ← leftover widget (no backend chat route)
│   ├── ContactPage/          ← older light contact form (unused on About/Contact)
│   └── core/
│       ├── Auth/             ← Login, Signup, PrivateRoute
│       ├── Homepage/
│       ├── AboutPage/
│       ├── Catalog/          ← Course_Card, CourseSlider
│       ├── Course/           ← CourseDetailsCard
│       ├── ContactUsPage/    ← dark contact form used on About + Contact
│       ├── Dashboard/        ← student + instructor dashboards
│       └── ViewCourse/       ← player, sidebar, review modal
├── slices/                   ← Redux slices
├── reducer/index.js
├── services/
│   ├── apis.js               ← all endpoint URLs
│   ├── apiconnector.js
│   └── operations/           ← API call functions
├── data/                     ← navbar, footer, dashboard links, homepage copy
├── hooks/
├── utils/                    ← ACCOUNT_TYPE, catalogSlug, chatbot config
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
├── controllers/
├── models/
├── middlewares/auth.js       ← JWT + Student / Instructor / Admin / InstructorOrAdmin
├── mail/templates/
└── utils/
    ├── mailSender.js
    ├── imageUploader.js
    ├── constants.js          ← USER_ROLE, ExceptionMessage, SuccessMessage
    └── secToDuration.js
```

---

## How the system fits together

```
Browser (React, :3000)
    │  REACT_APP_BASE_URL = http://localhost:4000/api/v1
    │  Auth header: Authorisation or Authorization (Bearer JWT)
    ▼
Express (Node, :4000)
    ├── /api/v1/auth      Signup, login, OTP, password
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
| Instructor | `"Instructor"` | Create/edit/publish courses, create categories, instructor dashboard |
| Admin | `"Admin"` | Create categories (API only; no dashboard) |

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
# create backend/.env (see below)
npm run dev            # nodemon on PORT (default 4000)
```

Health check: open `http://localhost:4000/` — you should see `{ "success": true, "message": "PathShala Server is running" }`.

### 3. Frontend

```bash
cd frontend
npm install
# create frontend/.env (see below)
npm start              # http://localhost:3000
```

Run **backend first**, then frontend. The client talks to `REACT_APP_BASE_URL`.

> `frontend/package.json` still has `"server": "cd server && npm run dev"`. That path is outdated (the API folder is `backend/`). Start the API from `backend/` directly. Do not use `npm run dev` in `frontend/` unless you first fix that script.

---

## Environment variables

**Do not commit real secrets.** Both `.env` files are gitignored. Use placeholders locally and in CI.

### `backend/.env`

```env
PORT=4000
MONGODB_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>

JWT_SECRET=replace-with-a-long-random-string

# Used in password-reset emails
FRONTEND_URL=http://localhost:3000

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
REACT_APP_RAZORPAY_KEY=rzp_test_xxxxxxxxxxxx
```

CRA only inlines variables prefixed with `REACT_APP_`. Checkout reads `process.env.REACT_APP_RAZORPAY_KEY`.

For production frontend, point the API at the deployed backend:

```env
REACT_APP_BASE_URL=https://path-shala-backend.onrender.com/api/v1
```

On production backend, set `FRONTEND_URL` to the Vercel origin so reset emails hit the live app:

```env
FRONTEND_URL=https://path-shala-omega.vercel.app
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
3. `Authorization` **or** `Authorisation` header, after stripping `Bearer `

The frontend still sends `Authorisation` on most calls. Both spellings work on the API.

Role guards (run after `auth`):

- `isStudent` — `accountType === "Student"`
- `isInstructor` — `accountType === "Instructor"`
- `isAdmin` — `accountType === "Admin"`
- `isInstructorOrAdmin` — instructor **or** admin (used by `POST /course/createCategory`)

JWT payload: `{ email, id, accountType }`, signed with `JWT_SECRET`, expires in **24 hours**. Login also sets an httpOnly cookie for **3 days**.

API success/error copy lives in `backend/utils/constants.js` (`ExceptionMessage`, `SuccessMessage`).

### Categories

`POST /course/createCategory` (instructor or admin):

- Trims name; description is optional (falls back to the name)
- Rejects duplicates (case-insensitive)
- Returns the created category so the Add Course form can select it immediately

`GET /course/showAllCategories` populates **published** course IDs so the navbar can show counts.

`POST /course/getCategoryPageDetails`:

- Does **not** 404 when a category has no published courses
- Returns `selectedCategory`, `differentCategory` (another category with courses if possible), and `mostSellingCourses` (top 10 by `studentsEnrolled.length`)
- Populates instructor and `ratingAndReviews` on courses

The review model is registered as `"RatingAndReview"` so those populates succeed.

### Email (`backend/utils/mailSender.js`)

Nodemailer over `smtp.gmail.com:465`. Templates live in `backend/mail/templates/`:

| Template | When |
| --- | --- |
| `emailVerificationTemplate.js` | Signup OTP |
| `passwordUpdate.js` | Password changed |
| `courseEnrollmentEmail.js` | After successful payment |
| `paymentSuccessEmail.js` | Payment confirmation |
| `contactFormRes.js` | Contact form acknowledgement |

OTP documents expire after **5 minutes** (Mongo TTL on `OTP.createdAt`). Password-reset tokens also expire in **5 minutes**. Reset emails use:

```
${FRONTEND_URL}/update-password/<token>
```

`FRONTEND_URL` defaults to `http://localhost:3000` if unset.

`POST /auth/sendotp` emails the OTP and **does not** return the code in the JSON body.

### File uploads

`utils/imageUploader.js` uploads any file to Cloudinary with `resource_type: "auto"` (images and videos). Used for:

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
| `/about` `/contact` | About, Contact | Public |
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

Navbar: Home, Catalog (hover dropdown on desktop, tap on mobile, course counts), About Us (`/about`), Contact Us. Sticky bar with blur.

Sidebar links in `data/dashboard-links.js` are filtered by `accountType`. Role gating inside `App.jsx` is still broken (see [gotchas](#known-issues-and-gotchas)); routes are registered anyway.

### Public pages (UI)

| Page | What you get |
| --- | --- |
| Home | Hero, code blocks, catalog CTA, timeline, instructor CTA, **testimonials slider**, rule-based Chat Help FAB |
| Catalog | Breadcrumb, category pills, Most Popular / New tabs, empty/loading/error, other-category slider, frequently bought |
| Course details | Shimmer load, accordion curriculum, author block, sticky buy/share card, ratings |
| About | Quote, stats, learning grid, contact form, reviews |
| Contact | Contact details + dark form, reviews |
| Reviews | Shared `ReviewSlider`: autoplay cards, stars, arrows, loading/empty states |

Catalog slugs come from `utils/catalogSlug.js` (lowercase, hyphenated). Navbar and Catalog must use the same helper.

### Lecture player (`ViewCourse`)

- Layout: sidebar (desktop) / stacked list (mobile) + player
- Shimmer while `getFullCourseDetails` loads (no loading toast)
- Sidebar: back to enrolled courses, **Add review**, progress bar, accordion by section `_id`, completed checkmarks, active lecture in yellow
- Player: rounded 16:9 video-react player; end overlay with mark complete / rewatch / prev / next
- Review modal: portal to `document.body`, custom star buttons, controlled textarea (Space is not stolen by the video player)

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

| File | Covers |
| --- | --- |
| `operations/authAPI.js` | OTP, signup, login, logout, reset password |
| `operations/profileAPI.js` | User details, enrolled courses, instructor dashboard |
| `operations/SettingsAPI.js` | Avatar, profile fields, change password, delete account |
| `operations/courseDetailsAPI.js` | CRUD courses / sections / lectures, **create category**, ratings, progress |
| `operations/studentFeaturesAPI.js` | Razorpay buy + verify |
| `operations/pageAndComponentData.js` | Catalog page payload |

Most authenticated calls send `Authorisation: Bearer ${token}`.

### Add-course wizard (instructors)

Redux `course.step`:

1. **Course Information** — name, description, price, category, thumbnail, what you’ll learn, instructions. Dropdown includes **“Can't find a category? Add new”** → `POST /course/createCategory`.
2. **Course builder** — sections and lectures / video upload (`CourseBuilderForm`, `NestedView`, `SubSectionModal`)
3. **Publish** — set status Draft or Published (`PublishCourse`)

### Homepage chatbot

Home toggles `react-chatbot-kit`. Replies are **hard-coded regex rules** in `utils/ActionProvider.js` (greetings, courses, payment, login, etc.). There is **no LLM** on this path.

`components/chatbot/index.jsx` POSTs to `/api/v1/chat/chat`. That route **does not exist**. Treat it as leftover.

---

## Core user flows

### Signup

1. User fills Signup (Student or Instructor) → data stored in `auth.signupData`
2. `POST /auth/sendotp` → OTP emailed (not returned in the API body)
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
4. Checkout uses `REACT_APP_RAZORPAY_KEY`
5. After payment, `POST /payment/verifyPayment` checks HMAC signature, enrolls the student, creates `CourseProgress`, sends enrollment email
6. Cart is reset; user is sent to enrolled courses

### Watch a lecture

1. Authenticated `POST /course/getFullCourseDetails` loads curriculum + completed videos
2. Player at `view-course/:courseId/section/:sectionId/sub-section/:subSectionId`
3. Completing a lecture → `POST /course/updateCourseProgress` (`isStudent`)
4. Optional `POST /course/createRating` (one review per student per course)

### Forgot password

1. `POST /auth/reset-password-token` with email
2. User gets a link `{FRONTEND_URL}/update-password/<token>` (5 min TTL)
3. `POST /auth/reset-password` with `{ password, confirmPassword, token }`

---

## API reference

Base URL: `http://localhost:4000/api/v1`

Protected routes need a Bearer token. Either header works:

```http
Authorisation: Bearer <jwt>
Authorization: Bearer <jwt>
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
| POST | `/getCourseDetails` | No | `{ courseId }` public details (includes ratings) |
| POST | `/getFullCourseDetails` | Yes | Full curriculum + progress |
| GET | `/getInstructorCourses` | Instructor | That instructor’s courses |
| DELETE | `/deleteCourse` | — | `{ courseId }` (no role guard today) |
| POST | `/addSection` | Instructor | `{ courseId, sectionName }` |
| POST | `/updateSection` | Instructor | `{ sectionId, sectionName, courseId }` |
| POST | `/deleteSection` | Instructor | `{ sectionId, courseId }` |
| POST | `/addSubSection` | Instructor | Multipart lecture + `video` |
| POST | `/updateSubSection` | Instructor | Update lecture / video |
| POST | `/deleteSubSection` | Instructor | `{ subSectionId, sectionId }` |
| POST | `/updateCourseProgress` | Student | `{ courseId, subsectionId }` |
| POST | `/createCategory` | Instructor or Admin | `{ name, description? }` |
| GET | `/showAllCategories` | No | Navbar + forms (published course counts) |
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
  (Mongoose model name: "RatingAndReview")
```

---

## Third-party services

| Service | Used for | Where configured |
| --- | --- | --- |
| MongoDB Atlas | Persistence | `MONGODB_URL` |
| Cloudinary | Thumbnails, avatars, lecture videos | `CLOUD_NAME`, `API_KEY`, `API_SECRET`, `FOLDER_NAME` |
| Razorpay | Checkout | `RAZORPAY_KEY` / `RAZORPAY_SECRET` (server), `REACT_APP_RAZORPAY_KEY` (client) |
| Gmail SMTP | Transactional email | `SMTP_USER`, `SMTP_PASS` |
| DiceBear | Default avatar on signup | Hard-coded URL in Auth controller |
| Vercel | Frontend host | Production frontend |
| Render | Backend host | Production API |

---

## Deployment

### Frontend (Vercel)

- Root directory: `frontend`
- Build: `npm run build` (CRA → `build/`)
- Env: `REACT_APP_BASE_URL` (production API **including** `/api/v1`) and `REACT_APP_RAZORPAY_KEY`
- Rebuild after changing any `REACT_APP_*` variable (they are inlined at build time)

### Backend (Render)

- Root directory: `backend`
- Start: `npm start` (`node index.js`)
- Set all `backend/.env` keys in the Render dashboard, including `FRONTEND_URL`
- CORS is currently `origin: "*"` so any frontend origin can call the API

After deploy, confirm `GET https://<api-host>/` returns `{ "success": true, "message": "PathShala Server is running" }`.

---

## Working on this project

### Suggested workflow

1. Create a branch from `development` (or `main`).
2. Run backend on `:4000` and frontend on `:3000`.
3. Keep API URLs in `frontend/src/services/apis.js` only — do not hard-code hosts in components.
4. New authenticated frontend calls should send `Authorisation: Bearer ${token}` (backend also accepts `Authorization`).
5. New instructor/student/admin-only endpoints must chain `auth` + `isInstructor` / `isStudent` / `isAdmin` / `isInstructorOrAdmin`.
6. After adding a category (from Add Course or the API), it appears in the navbar Catalog (`GET /course/showAllCategories`).
7. Catalog links must use `toCatalogSlug(name)` so navbar and `/catalog/:catalogName` stay in sync.

### Adding a course category

Instructors can add one from **Add Course → Course Information**. Or via API (instructor or admin JWT):

```bash
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
3. Sign up as Instructor (or create an Admin) and add at least one Category
4. Create a Draft course, add a section + lecture, Publish
5. Sign up as Student, buy (Razorpay test card), open the lecture player, leave a review

---

## Known issues and gotchas

Useful while debugging; fix them when you touch the related code.

1. **`App.jsx` role routes** — Student/instructor dashboard routes are wrapped so the `user?.accountType` check is rendered as text, not JS. There is also a typo: `accoutType` vs `accountType`. Routes still work because they are always registered; sidebar links are filtered correctly in `data/dashboard-links.js`.

2. **Auth header on delete lecture** — `deleteSubSection` in `courseDetailsAPI.js` still sends `Authorization`. The backend accepts both spellings now, so this should work; prefer `Authorisation` for consistency.

3. **`frontend` `npm run server` / `npm run dev`** — Still `cd server`. The API folder is `backend/`.

4. **Chat backend** — `components/chatbot/index.jsx` calls `/api/v1/chat/chat`, which is not implemented. The live Home chatbot is rule-based only.

5. **Course `tag` field** — Schema marks `tag` as required, but `createCourse` does not always set it. If course creation fails validation, check this.

6. **`DELETE /course/deleteCourse`** — No `auth` / `isInstructor` middleware on the route.

7. **CORS** — `origin: "*"` with `credentials: true` is a combination browsers may reject for credentialed cookies. Login currently also stores JWT in `localStorage`, which is what the SPA uses.

8. **Email template links** — Several HTML templates still hard-code `https://path-shala-omega.vercel.app/...` (including a few broken `/verify-email` dashboard links). Reset **email body** uses `FRONTEND_URL`; other templates do not.

9. **No Admin UI** — Admins can only create categories via API (or an instructor can create them from Add Course).

10. **`.env` files** — Never commit them. Rotate any keys that were ever committed or shared.

---

## License / credits

College project (ITS). Frontend started from a React + Tailwind starter pack; product name, APIs, and features are PathShala-specific.
