# Login Error Fix Spec

## Root Cause
`/mnt/c/Users/VIPUL SHAH/Downloads/1.cortexAI/1.cortexAI/backend/services/auth/controllers/auth.controller.js` uses `crypto.randomUUID()` but never imports the Node.js `crypto` module. At runtime this throws `ReferenceError: crypto is not defined` when the `login` controller is invoked.

## Change
Add the missing `crypto` import at the top of the file.

### File
`backend/services/auth/controllers/auth.controller.js`

### Expected behaviour after fix
- `crypto.randomUUID()` calls resolve correctly.
- Login endpoint creates a session ID and Redis session without crashing.

## Acceptance criteria
1. The file imports `crypto` from the Node.js built-in module.
2. The auth service starts without import/runtime errors.
3. Login flow creates a session cookie successfully.

