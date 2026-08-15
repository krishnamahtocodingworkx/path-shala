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

Health check: [http://localhost:4000/](http://localhost:4000/) should return JSON `{ "success": true, ... }`.

API base: `http://localhost:4000/api/v1`

Authenticated routes expect header `Authorisation: Bearer <jwt>` (that spelling).

## Useful paths

| Path | What |
| --- | --- |
| `index.js` | Express app, CORS, route mounts |
| `routes/` | `/auth`, `/profile`, `/course`, `/payment`, `/reach` |
| `controllers/` | Business logic |
| `models/` | Mongoose schemas |
| `middlewares/auth.js` | JWT + Student / Instructor / Admin guards |
| `mail/templates/` | HTML emails |

Production: [https://path-shala-backend.onrender.com](https://path-shala-backend.onrender.com)
