# INPT-CAMPUS Deployment Guide

## Authentication Fix for Production Deployment

This guide addresses the authentication issues when deploying the INPT-CAMPUS application to production.

## Issues Identified

1. **Cookie Security Settings**: Cookies were configured for development (secure=false, sameSite=Lax)
2. **CORS Configuration**: Frontend URL was hardcoded to localhost
3. **Environment-specific Configuration**: No distinction between dev and production settings

## Fixes Applied

### 1. Dynamic Cookie Configuration

The `AuthController` now dynamically sets cookie security based on the environment:

- **Development**: `secure=false`, `sameSite=Lax`
- **Production**: `secure=true`, `sameSite=None` (required for cross-origin requests)

### 2. Enhanced CORS Configuration

Updated `SecurityConfig` to:

- Support multiple frontend origins (comma-separated)
- Expose necessary headers for cookie handling
- Handle production cross-origin scenarios

### 3. Environment-specific Files

Created separate configuration files:

- `.env` - Development environment
- `.env.prod` - Production environment
- `docker-compose.yml` - Development deployment
- `docker-compose.prod.yml` - Production deployment

## Deployment Instructions

### For Production Deployment:

1. **Update Environment Variables**:

   Edit `inpt-campus-backend/.env.prod`:

   ```properties
   FRONTEND_URL=https://your-actual-frontend-domain.com
   ```

2. **Update Docker Compose**:

   Edit `docker-compose.prod.yml`:

   ```yaml
   args:
     VITE_API_BASE_URL: https://your-actual-backend-domain.com/api
   ```

3. **Deploy using Production Configuration**:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### For Multiple Frontend Domains:

If you have multiple frontend domains (e.g., staging and production), update the `FRONTEND_URL` in `.env.prod`:

```properties
FRONTEND_URL=https://staging.yourdomain.com,https://production.yourdomain.com
```

## Key Changes Made

### AuthController.java

- Added environment detection for cookie security settings
- Dynamic `secure` and `sameSite` attributes based on production vs development

### SecurityConfig.java

- Enhanced CORS configuration to support multiple origins
- Added `Set-Cookie` header exposure for production

### Environment Files

- Created `.env.prod` for production-specific settings
- Created `docker-compose.prod.yml` for production deployment

## Testing the Fix

1. **Local Development**: Should work as before with `docker-compose.yml`
2. **Production**: Use `docker-compose.prod.yml` with updated URLs

### Verify Authentication:

1. Login through the frontend
2. Check browser developer tools:
   - Cookie should be set with appropriate security flags
   - `/auth/me` endpoint should return user data
3. Navigate through protected routes to ensure authentication persists

## Troubleshooting

### If authentication still fails:

1. **Check CORS**: Ensure `FRONTEND_URL` matches your actual frontend domain
2. **Verify Cookie Settings**: Check browser dev tools for cookie attributes
3. **Check Network Tab**: Look for CORS errors in browser console
4. **Backend Logs**: Check for authentication filter logs in backend

### Common Issues:

- **Mixed Content**: Ensure both frontend and backend use HTTPS in production
- **Domain Mismatch**: Frontend and backend must be on same domain or properly configured for cross-origin
- **Cookie Security**: Browsers require `secure=true` for HTTPS sites

## Environment Variables Reference

### Development (.env)

```properties
SPRING_PROFILES_ACTIVE=dev
FRONTEND_URL=http://localhost:5173
```

### Production (.env.prod)

```properties
SPRING_PROFILES_ACTIVE=prod
FRONTEND_URL=https://your-frontend-domain.com
```
