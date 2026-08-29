# PathShala — Backend

Express + MongoDB API for PathShala.

The full project guide (architecture, API reference, models, env vars, and how backend + frontend work together) is in the **[root README](../README.md)**.

## Quick start

```bash
cd backend
npm install
```

Create `backend/.env` (see root README for every variable):

```env
PORT=4000
MONGODB_URL=
JWT_SECRET=
FRONTEND_URL=http://localhost:3000
CLOUD_NAME=
API_KEY=
API_SECRET=
FOLDER_NAME=fileupload
RAZORPAY_KEY=
RAZORPAY_SECRET=
SMTP_USER=
SMTP_PASS=
```

```bash
npm run dev    # nodemon, default port 4000
```

Health check: [http://localhost:4000/](http://localhost:4000/) should return `{ "success": true, "message": "PathShala Server is running" }`.

API base: `http://localhost:4000/api/v1`

Authenticated routes accept `Authorisation` **or** `Authorization`: `Bearer <jwt>`.

## Useful paths

| Path | What |
| --- | --- |
| `index.js` | Express app, CORS, route mounts |
| `routes/` | `/auth`, `/profile`, `/course`, `/payment`, `/reach` |
| `controllers/` | Business logic |
| `models/` | Mongoose schemas (`RatingAndReview` model name) |
| `middlewares/auth.js` | JWT + Student / Instructor / Admin / InstructorOrAdmin |
| `utils/constants.js` | Roles and API messages |
| `mail/templates/` | HTML emails |

Categories: `POST /course/createCategory` is allowed for **instructors and admins**. Catalog payload is `POST /course/getCategoryPageDetails`. Password-reset links use `FRONTEND_URL`.

Production: [https://path-shala-backend.onrender.com](https://path-shala-backend.onrender.com)
