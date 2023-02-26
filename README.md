# cloudinary-proxy

Node/Express Cloudinary Proxy. An easy way of accessing your favorite Cloudinary functions.

# Tech

## Cloudinary

[Cloudinary](https://cloudinary.com/) offers free plans with a generous amount of simple image manipulations. Create your account and load the necessary details into your `.env`.

## Redis

This app uses Redis for short-term or long-term caching of Cloudinary results. Create a Redis hash in your database and set the name as `REDIS_CACHE_NAME` in your `.env`.

# Endpoints

## `POST /remove-bg`

Use the `make_transparent` effect to remove the background of an image.

```
{
    url: 'http://example.com/image-path.png',   # URL of image
    secret: 'application-secret',               # API secret
    tolerance: 5,                               # (optional) tolerance of background detection. Higher values generally give less desirable results
}
```

# Development

## Installation

```
yarn instal
```

## Env

Create a .env file with these values:

```
# Cloudinary
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Redis
# Either use a full URL
REDIS_URL=""

# Or use individual fields
REDIS_HOST=""
REDIS_PORT=""
REDIS_USERNAME=""
REDIS_PASSWORD=""
REDIS_CACHE_NAME=""
REDIS_TLS=""

# Simple secret for securing your service
SECRET=""
```

## Running

```
yarn dev
   ...or...
yarn start
```
