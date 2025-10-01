# mood2move_backend/urls.py

from django.contrib import admin
from django.urls import path

# Import for the standard token refresh view
from rest_framework_simplejwt.views import TokenRefreshView

# Import all the necessary views from your app
from m2m.views import (
    RecommendationView,
    HelloWorldView,
    RegisterView,
    MyTokenObtainPairView,
    UserProfileView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
)

urlpatterns = [
    # 1. Admin Site URL
    path('admin/', admin.site.urls),

    # 2. Authentication Endpoints
    # -----------------------------------------------------------------
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # 3. User-Specific Endpoints
    # -----------------------------------------------------------------
    path('api/profile/', UserProfileView.as_view(), name='user_profile'),
    path('api/password-reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('api/password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    # 4. Application-Specific Endpoints
    # -----------------------------------------------------------------
    path('api/recommend/', RecommendationView.as_view(), name='recommend'),
    path('api/hello/', HelloWorldView.as_view(), name='hello_world'),
    
    # 5. Root URL
    # -----------------------------------------------------------------
    path('', HelloWorldView.as_view(), name='homepage'),
]
