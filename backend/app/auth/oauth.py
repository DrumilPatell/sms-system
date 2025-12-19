import httpx
from typing import Dict, Optional
from app.core.config import settings


class OAuthProvider:
    """Base OAuth provider class"""
    
    async def verify_token(self, token: str) -> Optional[Dict]:
        """Verify OAuth token and return user info"""
        raise NotImplementedError


class GoogleOAuth(OAuthProvider):
    """Google OAuth provider"""
    
    TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo"
    USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo"
    
    async def verify_token(self, access_token: str) -> Optional[Dict]:
        """Verify Google OAuth token"""
        async with httpx.AsyncClient() as client:
            try:
                # Get user info from Google
                response = await client.get(
                    self.USERINFO_URL,
                    headers={"Authorization": f"Bearer {access_token}"}
                )
                
                if response.status_code != 200:
                    return None
                
                user_info = response.json()
                
                return {
                    "oauth_id": user_info.get("id"),
                    "email": user_info.get("email"),
                    "full_name": user_info.get("name"),
                    "profile_picture": user_info.get("picture"),
                    "provider": "google"
                }
            except Exception:
                return None


class MicrosoftOAuth(OAuthProvider):
    """Microsoft OAuth provider"""
    
    USERINFO_URL = "https://graph.microsoft.com/v1.0/me"
    PHOTO_URL = "https://graph.microsoft.com/v1.0/me/photo/$value"
    
    async def verify_token(self, access_token: str) -> Optional[Dict]:
        """Verify Microsoft OAuth token"""
        async with httpx.AsyncClient() as client:
            try:
                # Get user info from Microsoft Graph
                response = await client.get(
                    self.USERINFO_URL,
                    headers={"Authorization": f"Bearer {access_token}"}
                )
                
                if response.status_code != 200:
                    return None
                
                user_info = response.json()
                
                # Try to get profile photo
                profile_picture = None
                try:
                    photo_response = await client.get(
                        self.PHOTO_URL,
                        headers={"Authorization": f"Bearer {access_token}"}
                    )
                    if photo_response.status_code == 200:
                        # In production, you'd upload this to cloud storage
                        # For now, we'll skip the photo
                        pass
                except Exception:
                    pass
                
                return {
                    "oauth_id": user_info.get("id"),
                    "email": user_info.get("userPrincipalName") or user_info.get("mail"),
                    "full_name": user_info.get("displayName"),
                    "profile_picture": profile_picture,
                    "provider": "microsoft"
                }
            except Exception:
                return None


class GitHubOAuth(OAuthProvider):
    """GitHub OAuth provider"""
    
    USERINFO_URL = "https://api.github.com/user"
    EMAILS_URL = "https://api.github.com/user/emails"
    
    async def verify_token(self, access_token: str) -> Optional[Dict]:
        """Verify GitHub OAuth token"""
        async with httpx.AsyncClient() as client:
            try:
                # Get user info from GitHub
                response = await client.get(
                    self.USERINFO_URL,
                    headers={
                        "Authorization": f"token {access_token}",
                        "Accept": "application/vnd.github.v3+json"
                    }
                )
                
                if response.status_code != 200:
                    return None
                
                user_info = response.json()
                
                # Get primary email if not public
                email = user_info.get("email")
                if not email:
                    emails_response = await client.get(
                        self.EMAILS_URL,
                        headers={
                            "Authorization": f"token {access_token}",
                            "Accept": "application/vnd.github.v3+json"
                        }
                    )
                    if emails_response.status_code == 200:
                        emails = emails_response.json()
                        primary_email = next(
                            (e for e in emails if e.get("primary")),
                            emails[0] if emails else None
                        )
                        if primary_email:
                            email = primary_email.get("email")
                
                return {
                    "oauth_id": str(user_info.get("id")),
                    "email": email,
                    "full_name": user_info.get("name") or user_info.get("login"),
                    "profile_picture": user_info.get("avatar_url"),
                    "provider": "github"
                }
            except Exception:
                return None


# OAuth provider instances
google_oauth = GoogleOAuth()
microsoft_oauth = MicrosoftOAuth()
github_oauth = GitHubOAuth()


def get_oauth_provider(provider: str) -> Optional[OAuthProvider]:
    """Get OAuth provider instance"""
    providers = {
        "google": google_oauth,
        "microsoft": microsoft_oauth,
        "github": github_oauth,
    }
    return providers.get(provider)
