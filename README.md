# Langflow-stripped-version

## Complete Guide to Remove Authentication from Langflow

### Step 1: Remove Login and Signup Pages
First, we'll remove the pages that handle login and signup functionality.

Delete these files:
1. `src/frontend/src/pages/LoginPage/index.tsx` (Main login page)
2. `src/frontend/src/pages/SignUpPage/index.tsx` (Signup page)
3. `src/frontend/src/pages/AdminPage/LoginPage/index.tsx` (Admin login page)

### Step 2: Remove Authentication Guard Components
Delete these directories and their contents:
1. `src/frontend/src/components/authorization/authGuard/`
2. `src/frontend/src/components/authorization/authLoginGuard/`
3. `src/frontend/src/components/authorization/authAdminGuard/`

### Step 3: Modify the Authentication Store
Edit the file `src/frontend/src/stores/authStore.ts`:

```typescript:src/frontend/src/stores/authStore.ts
import { AuthStoreType } from "@/types/zustand/auth";
import { create } from "zustand";

// Simplified auth store that always authenticates users
const useAuthStore = create<AuthStoreType>((set, get) => ({
  // Set default states to authenticated
  isAdmin: true,
  isAuthenticated: true,
  accessToken: null,
  userData: null,
  autoLogin: true,
  apiKey: null,
  authenticationErrorCount: 0,

  // Keep these methods but make them no-ops
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setUserData: (userData) => set({ userData }),
  setAutoLogin: (autoLogin) => set({ autoLogin }),
  setApiKey: (apiKey) => set({ apiKey }),
  setAuthenticationErrorCount: (authenticationErrorCount) =>
    set({ authenticationErrorCount }),

  // Simplified logout that does nothing
  logout: async () => {
    // No-op as we don't need logout functionality
  },
}));

export default useAuthStore;
```

### Step 4: Update Routes Configuration
Edit `src/frontend/src/routes.tsx`:

1. First, remove these imports at the top of the file:
```typescript
// Remove these imports
import { ProtectedAdminRoute } from "./components/authorization/authAdminGuard";
import { ProtectedRoute } from "./components/authorization/authGuard";
import { ProtectedLoginRoute } from "./components/authorization/authLoginGuard";
```

2. Remove the lazy imports for login/signup pages:
```typescript
// Remove these lines
const AdminPage = lazy(() => import("./pages/AdminPage"));
const LoginAdminPage = lazy(() => import("./pages/AdminPage/LoginPage"));
const SignUp = lazy(() => import("./pages/SignUpPage"));
```

3. Update the routes configuration:
```typescript:src/frontend/src/routes.tsx
const router = createBrowserRouter(
  createRoutesFromElements([
    // ... other routes ...
    <Route path="" element={<AppInitPage />}>
      <Route path="" element={<AppWrapperPage />}>
        {/* Keep only these essential routes */}
        <Route path="flows" element={<HomePage />} />
        <Route path="files" element={<FilesPage />} />
        <Route path="collections" element={<CollectionPage />} />
        <Route path="settings" element={<SettingsPage />} />
        {/* Remove login/signup routes */}
      </Route>
    </Route>
  ]),
  { basename: BASENAME || undefined }
);
```

### Step 5: Update Settings Page (Optional)
If you have any password change or user management features in the settings page, you'll want to remove those.

Edit `src/frontend/src/pages/SettingsPage/pages/GeneralPage/index.tsx`:
```typescript
// Remove the password form component if it exists
return (
  <div className="flex h-full w-full flex-col gap-6 overflow-x-hidden">
    <GeneralPageHeaderComponent />
    <div className="flex w-full flex-col gap-6">
      {ENABLE_PROFILE_ICONS && (
        <ProfilePictureFormComponent
          // ... existing props ...
        />
      )}
      {/* Remove the password form component */}
    </div>
  </div>
);
```

### Step 6: Clean Up Constants (Optional)
You can remove authentication-related constants if you want to clean up the codebase further.

In `src/frontend/src/constants/constants.ts`, remove:
```typescript
// Remove these constants
export const SIGN_UP_SUCCESS = "Account created! Await admin activation. ";
// ... any other auth-related constants
```

In `src/frontend/src/constants/alerts_constants.tsx`, remove:
```typescript
// Remove these constants
export const SIGNUP_ERROR_ALERT = "Error signing up";
// ... any other auth-related alert constants
```

### Important Notes:
1. **Security Consideration**: Remember that removing authentication means your application will be publicly accessible. Make sure this is what you want.

2. **Alternative Security**: Consider implementing one of these alternatives:
   - API key-based authentication
   - IP whitelisting
   - Reverse proxy authentication
   - Environment-based restrictions

3. **Testing**: After making these changes, test thoroughly:
   - Check if the application starts without errors
   - Verify all main features work without authentication
   - Ensure no login/signup redirects occur
   - Test navigation between different pages
   - Verify settings and other protected features are accessible

### Troubleshooting Common Issues:

1. **If you see "unauthorized" errors**:
   - Check if any API calls still include authentication headers
   - Verify the `authStore` is properly modified
   - Ensure all routes are properly updated

2. **If you see login redirects**:
   - Make sure all authentication guards are removed
   - Verify routes.tsx is properly updated
   - Check for any remaining auth checks in components

3. **If settings or admin features don't work**:
   - Verify the `isAdmin` flag is set to `true` in `authStore`
   - Check for any remaining role-based access controls

Would you like me to explain any of these steps in more detail or help you with implementing a specific step?


## Complete Guide to Integrate Cloud IdP with Langflow

### 1. Backend Changes

#### 1.1. Create a New Auth Service
Create a new file `src/backend/base/langflow/services/auth/cloud_auth_service.py`:

```python
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2AuthorizationCodeBearer
from jose import JWTError, jwt
from langflow.services.auth.service import AuthService

class CloudAuthService(AuthService):
    def __init__(self, settings_service):
        super().__init__(settings_service)
        self.oauth2_scheme = OAuth2AuthorizationCodeBearer(
            authorizationUrl=settings_service.auth_settings.IDP_AUTHORIZATION_URL,
            tokenUrl=settings_service.auth_settings.IDP_TOKEN_URL,
        )
        self.idp_config = {
            "issuer": settings_service.auth_settings.IDP_ISSUER,
            "audience": settings_service.auth_settings.IDP_AUDIENCE,
            "algorithms": ["RS256"]
        }
    
    async def verify_token(self, token: str) -> dict:
        try:
            payload = jwt.decode(
                token,
                self.idp_config["issuer"],
                algorithms=self.idp_config["algorithms"],
                audience=self.idp_config["audience"]
            )
            return payload
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
            )
```

#### 1.2. Update Auth Settings
Modify `src/backend/base/langflow/services/settings/auth.py`:

```python
class AuthSettings(BaseSettings):
    # ... existing settings ...

    # Cloud IdP Settings
    IDP_ENABLED: bool = False
    IDP_PROVIDER: str = "auth0"  # or "okta", "azure", etc.
    IDP_DOMAIN: str = ""
    IDP_CLIENT_ID: str = ""
    IDP_CLIENT_SECRET: str = ""
    IDP_AUTHORIZATION_URL: str = ""
    IDP_TOKEN_URL: str = ""
    IDP_ISSUER: str = ""
    IDP_AUDIENCE: str = ""
    IDP_LOGOUT_URL: str = ""
```

#### 1.3. Update Login Endpoint
Modify `src/backend/base/langflow/api/v1/login.py`:

```python
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from langflow.services.auth.cloud_auth_service import CloudAuthService

router = APIRouter(tags=["Login"])

@router.post("/login")
async def login_with_idp(
    request: Request,
    response: Response,
    auth_service: CloudAuthService = Depends(),
):
    auth_settings = get_settings_service().auth_settings
    
    if not auth_settings.IDP_ENABLED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cloud IdP authentication is not enabled"
        )
    
    # Implement IdP-specific login logic here
    # This will vary based on the chosen IdP (Auth0, Okta, etc.)
    pass
```

### 2. Frontend Changes

#### 2.1. Update Auth Context
Modify `src/frontend/src/contexts/authContext.tsx`:

```typescript
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType>(initialValue);

export function AuthProvider({ children }): React.ReactElement {
  // ... existing code ...

  async function loginWithIdP() {
    // Implement IdP-specific login logic
    // This will vary based on the chosen IdP
  }

  async function logoutFromIdP() {
    // Implement IdP-specific logout logic
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        login: loginWithIdP,
        logout: logoutFromIdP,
        // ... other existing values
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
```

#### 2.2. Create IdP Login Component
Create `src/frontend/src/components/IdPLogin/index.tsx`:

```typescript
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export default function IdPLoginComponent() {
  const { loginWithIdP } = useContext(AuthContext);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-muted">
      <div className="flex w-72 flex-col items-center justify-center gap-2">
        <button
          onClick={loginWithIdP}
          className="w-full rounded bg-primary px-4 py-2 text-white"
        >
          Sign in with {process.env.IDP_PROVIDER}
        </button>
      </div>
    </div>
  );
}
```

#### 2.3. Update Login Page
Modify `src/frontend/src/pages/LoginPage/index.tsx`:

```typescript
import IdPLoginComponent from "../../components/IdPLogin";

export default function LoginPage(): JSX.Element {
  return <IdPLoginComponent />;
}
```

### 3. Configuration Changes

#### 3.1. Environment Variables
Add these variables to your `.env` file:

```bash
# IdP Configuration
LANGFLOW_IDP_ENABLED=true
LANGFLOW_IDP_PROVIDER=auth0  # or okta, azure
LANGFLOW_IDP_DOMAIN=your-domain
LANGFLOW_IDP_CLIENT_ID=your-client-id
LANGFLOW_IDP_CLIENT_SECRET=your-client-secret
LANGFLOW_IDP_AUTHORIZATION_URL=https://your-domain/authorize
LANGFLOW_IDP_TOKEN_URL=https://your-domain/oauth/token
LANGFLOW_IDP_ISSUER=https://your-domain/
LANGFLOW_IDP_AUDIENCE=your-api-identifier
LANGFLOW_IDP_LOGOUT_URL=https://your-domain/logout
```

### 4. Specific IdP Integration Examples

#### 4.1. Auth0 Integration

```typescript
// src/frontend/src/services/auth0.ts
import { Auth0Client } from '@auth0/auth0-spa-js';

export const auth0Client = new Auth0Client({
  domain: process.env.LANGFLOW_IDP_DOMAIN!,
  client_id: process.env.LANGFLOW_IDP_CLIENT_ID!,
  redirect_uri: window.location.origin
});

export const loginWithAuth0 = async () => {
  try {
    await auth0Client.loginWithRedirect();
  } catch (error) {
    console.error('Auth0 login error:', error);
  }
};
```

#### 4.2. Okta Integration

```typescript
// src/frontend/src/services/okta.ts
import { OktaAuth } from '@okta/okta-auth-js';

export const oktaAuth = new OktaAuth({
  issuer: process.env.LANGFLOW_IDP_ISSUER!,
  clientId: process.env.LANGFLOW_IDP_CLIENT_ID!,
  redirectUri: window.location.origin
});

export const loginWithOkta = async () => {
  try {
    await oktaAuth.signInWithRedirect();
  } catch (error) {
    console.error('Okta login error:', error);
  }
};
```

### 5. Implementation Steps

1. Choose your IdP (Auth0, Okta, Azure AD, etc.)
2. Register your application with the chosen IdP
3. Get the necessary credentials (client ID, client secret, etc.)
4. Update the environment variables
5. Implement the specific IdP integration code
6. Test the authentication flow

### 6. Security Considerations

1. Always use HTTPS in production
2. Implement proper CORS settings
3. Use secure session management
4. Implement proper token validation
5. Handle token refresh properly
6. Implement proper error handling
7. Add rate limiting for auth endpoints
