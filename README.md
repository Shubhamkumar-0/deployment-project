# deployment-project
# CORS (Cross-Origin Resource Sharing)

## Introduction

During the deployment of this project, one of the biggest issues encountered was the **CORS (Cross-Origin Resource Sharing)** error.
The application worked perfectly on localhost, but after deploying the frontend on **Vercel** and the backend on **Render**, every API request started failing.
The browser console displayed the following error:

```text
Access to XMLHttpRequest at
'https://deployment-project-yxly.onrender.com/api/auth/register'
from origin
'https://deployment-project-seven.vercel.app'
has been blocked by CORS policy:

No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

At first glance, this error looks like a backend or Axios issue, but it is actually a browser security feature.

---

# What is CORS?

CORS stands for **Cross-Origin Resource Sharing**.

It is a security mechanism implemented by modern browsers to prevent malicious websites from making requests to servers that do not trust them.

A browser considers two URLs different origins if **any one** of these changes:

- Protocol (http / https)
- Domain
- Port

Example

Local Development

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

Even though both are running on your own computer, the browser still considers them different origins because the ports are different.

After deployment:

Frontend

```
https://deployment-project-seven.vercel.app
```

Backend

```
https://deployment-project-yxly.onrender.com
```

Now the domains themselves are completely different.

Therefore, the browser blocks every request unless the backend explicitly says:

> "I trust this frontend."

---

# Why did this error happen in our project?

Initially, the backend contained:

```js
app.use(cors());
```

or sometimes CORS was configured incorrectly.

This allows development in many cases, but once the application was deployed, the backend did not explicitly trust our Vercel frontend.

Therefore, whenever React tried to call:

```js
axios.post(
"https://deployment-project-yxly.onrender.com/api/auth/register",
formData
)
```

the request never even reached our controller.

The browser stopped it before Express received it.

This is important.

The error was **not** inside:

- Register Controller
- Login Controller
- MongoDB
- Axios

The request was blocked by the browser before Express executed our route.

---

# Request Flow Without CORS

```
React (Vercel)
        │
        │ axios.post(...)
        ▼
Browser
        │
        │ Checks Origin
        ▼
Origin Not Allowed ❌
        │
        ▼
Request Blocked

Express Server never receives the request.
```

---

# How did we fix it?

Inside:

```
backend/server.js
```

we replaced the generic configuration with:

```js
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://deployment-project-seven.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
```

---

# Explanation of every line

### origin

```js
origin: [
    "http://localhost:5173",
    "https://deployment-project-seven.vercel.app"
]
```

This tells Express:

> Only these frontend applications are allowed to call my backend.

The first URL is used while developing locally.

The second URL is used after deployment.

If another website tries to call our backend, the browser will block the request.

---

### methods

```js
methods: [
"GET",
"POST",
"PUT",
"DELETE"
]
```

These are the HTTP methods our frontend is allowed to use.

Our current project mainly uses:

- GET
- POST

The others were added for future CRUD operations.

---

### credentials

```js
credentials: true
```

Currently our project does not use cookies.

However, when JWT Authentication with cookies is implemented, this option becomes necessary.

Adding it now makes future integration easier.

---

# Why did localhost work?

During development:

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

Both applications were running on our own machine.

Once we explicitly added localhost inside CORS, the browser allowed communication.

---

# Why did deployment fail?

Because after deployment the frontend URL changed.

Earlier

```
http://localhost:5173
```

After deployment

```
https://deployment-project-seven.vercel.app
```

The backend still trusted localhost.

It did **not** trust Vercel.

Therefore the browser blocked every request.

---

# Final Working Architecture

```
User
   │
   ▼
Frontend (Vercel)
https://deployment-project-seven.vercel.app
   │
   │ axios POST
   ▼
Backend (Render)
https://deployment-project-yxly.onrender.com
   │
   │ CORS verifies Origin
   ▼
Express Route
   │
   ▼
Controller
   │
   ▼
MongoDB Atlas
```

---

# Important Learning

CORS is **not** a React problem.

CORS is **not** an Axios problem.

CORS is **not** a MongoDB problem.

CORS is a browser security feature.

The backend must explicitly allow trusted frontend domains.

Without this configuration, the browser blocks the request before it even reaches Express.

---

# Files involved

```
backend/server.js
```

Responsible for configuring CORS.

```
frontend/src/pages/Register.jsx
```

Sends Register API request.

```
frontend/src/pages/Login.jsx
```

Sends Login API request.

These files depend on the backend accepting requests from the frontend.

---

# Conclusion

The CORS issue taught us one of the most important concepts in web development:

Frontend and backend can communicate only if the backend explicitly trusts the frontend origin.

This trust is established using the `cors` middleware inside the Express server.
