# Frontend & Login Errors Fix Spec

## Errors observed in browser console
1. `Each child in a list should have a unique "key" prop` — React warning in `MessageList`.
2. `Cross-Origin-Opener-Policy policy would block the window.closed call` — from Firebase Google popup.
3. `AxiosError: Request failed with status code 500` on `POST /api/auth/login` from `Home.jsx:19`.
4. `AxiosError: Request failed with status code 400` on `GET /api/me` and `GET /api/chat/get-conversations` — expected pre-login noise.
5. Firebase ID token is being `console.log`'d on `Home.jsx:27` — sensitive credential leak.

## Fixes

### 1. React `key` prop warning — `frontend/src/components/MessageList.jsx`
Add a stable `key` to the `messages.map(...)` wrapper div: `key={msg?._id || msg?.id || i}`.

### 2. Sensitive token logging — `frontend/src/pages/Home.jsx`
- Remove `console.log(token)` on line 27.
- Remove `console.log(data)` on line 29 (logs `UserCredentialImpl`).
- Replace `console.log(error)` in `handleLogin` with `console.error("[login] error:", error?.response?.data?.message || error?.message)`.

### 3. Pre-login 400 noise — `frontend/src/features/getCurrentUser.js`, `frontend/src/features/getConversations.js`
Suppress `console.log(error)` for expected 4xx. Return `null` / `[]` quietly.

### 4. COOP warning for Firebase popup — `backend/gateway/index.js`
Set `Cross-Origin-Opener-Policy: same-origin-allow-popups` on `/api/auth` responses so Firebase's popup can call `window.closed`. Apply via a small middleware:
```js
app.use("/api/auth", (req, res, next) => { res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups"); next(); }, proxy(process.env.AUTH_SERVICE))
```

### 5. Login 500 root-cause visibility — `backend/services/auth/controllers/auth.controller.js`
The login handler returns `500 { message: \`login error ${error}\` }` which masks the underlying cause. Add `console.error("[login] error:", error)` before the response so server logs show the real cause. The frontend fix in #2 above will surface that to the browser console too.

## Files to modify
- `frontend/src/components/MessageList.jsx`
- `frontend/src/pages/Home.jsx`
- `frontend/src/features/getCurrentUser.js`
- `frontend/src/features/getConversations.js`
- `backend/gateway/index.js`
- `backend/services/auth/controllers/auth.controller.js`

## Acceptance criteria
1. Browser console no longer shows the React `key` warning from `MessageList`.
2. Browser console no longer shows the raw Firebase ID token.
3. `Cross-Origin-Opener-Policy` warning disappears on Google login.
4. `getCurrentUser` and `getConversations` no longer log expected 401/400 errors before login.
5. If a 500 still occurs on login, the actual server-side error is logged in both backend stdout and the browser console.
