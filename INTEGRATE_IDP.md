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
