# User API Spec

## Register User

Endpoint: POST/api/users

Request Body:

```json
{
  "username": "youmutohok",
  "password": "secret",
  "name": "Youmu Konpaku"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "youmu",
    "name": "Youmu Konpaku"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username must not blank.."
}
```

## Login User

Endpoint: POST/api/users/login

Request Body:

```json
{
  "username": "youmutohok",
  "password": "secret"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "youmu",
    "name": "Youmu Konpaku",
    "token": "JWT Token"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username or password wrong.."
}
```

## Get User

Endpoint: GET/api/users/current

Request Header :

- X-API-TOKEN: JWT Token

Request Body:

```json
{
  "username": "youmutohok",
  "password": "secret"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "username": "youmu",
    "name": "Youmu Konpaku",
    "token": "JWT Token"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint: PATCH/api/users/current

Request Header :

- X-API-TOKEN: JWT Token

Request Body:

```json
{
  "username": "new username",
  "password": "new password"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "username": "youmu",
    "name": "Youmu Konpaku",
    "token": "JWT Token"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized"
}
```

## Logout User

Endpoint: DELETE/api/users/current

- X-API-TOKEN: JWT Token

Request Body:

```json
{
  "username": "youmutohok",
  "password": "secret"
}
```

Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized.."
}
```
