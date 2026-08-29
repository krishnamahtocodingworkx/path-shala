# PathShala — Frontend

React client for PathShala (Create React App + Tailwind + Redux Toolkit).

The full project guide (architecture, APIs, env vars, roles, and how backend + frontend work together) is in the **[root README](../README.md)**.

## Quick start

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1
REACT_APP_RAZORPAY_KEY=your_razorpay_key_id
```

Start the **backend** on port 4000 first (`cd ../backend && npm run dev`), then:

```bash
npm start
```

App runs at [http://localhost:3000](http://localhost:3000).

Do not use `npm run server` / `npm run dev` here — those scripts still point at a `server/` folder that does not exist. Run the API from `backend/`.

## Useful paths

| Path | What |
| --- | --- |
| `src/App.jsx` | Routes (`/about`, catalog, view-course, dashboard) |
| `src/services/apis.js` | All API URLs |
| `src/services/operations/` | API call functions (including `createCourseCategory`) |
| `src/slices/` | Redux state |
| `src/pages/` | Home, Catalog, CourseDetails, ViewCourse, About, Contact |
| `src/components/core/Dashboard/` | Student + instructor dashboards |
| `src/components/core/ViewCourse/` | Lecture player, sidebar, review modal |
| `src/components/common/ReviewSlider.jsx` | Testimonials carousel |
| `src/utils/catalogSlug.js` | Catalog URL slugs |

Authenticated calls send `Authorisation: Bearer <jwt>`. Checkout uses `REACT_APP_RAZORPAY_KEY`.

Production: [https://path-shala-omega.vercel.app](https://path-shala-omega.vercel.app)
