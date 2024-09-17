# Contact API Spec

## Create Contact

Enpoint: POST /api/contacts

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
  "first_name": "Fajrin",
  "last_name": "Mengtohok",
  "email": "tohok123@gmail.com",
  "phone": "08813456789"
}
```

Response Body(success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Fajrin",
    "last_name": "Mengtohok",
    "email": "tohok123@gmail.com",
    "phone": "08813456789"
  }
}
```

Response Body(Failed):

```json
{
  "errors": "Opsss"
}
```

## Get Contact

-Endpoint: GET /api/contacts/:id

Request Header:

- X-API-TOKEN: token

Response(Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Fajrin",
    "last_name": "Mengtohok",
    "email": "tohok123@gmail.com",
    "phone": "08813456789"
  }
}
```

Response(Failed):

```json
{
  "errors": "Contact is not found"
}
```

## Update Contact

Enpoint: PUT /api/contacts/:id

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
  "first_name": "Fajrin",
  "last_name": "Mengtohok",
  "email": "tohok123@gmail.com",
  "phone": "08813456789"
}
```

Response Body(success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Fajrin",
    "last_name": "Mengtohok",
    "email": "tohok123@gmail.com",
    "phone": "08813456789"
  }
}
```

Response Body(Failed):

```json
{
  "errors": "Contact is not found"
}
```

## Remove Contact

Enpoint: DELETE /api/contacts/:id

- X-API-TOKEN: token

Response(Success)

```json
{
  "data": "OK"
}
```

Response(Failed)

```json
{
  "message": "Contact is not found"
}
```

## Search Contact

Endpoint: GET /api/contacts/:id

Request Header:

- X-API-TOKEN: token

Query Paramater:

- name: string, contact first name or contact last name, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default=1
- size: number, default=10

Response(Success):

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Fajrin",
      "last_name": "Mengtohok",
      "email": "tohok123@gmail.com",
      "phone": "08813456789"
    },
    {
      "id": 2,
      "first_name": "Fajrin",
      "last_name": "Mengtohok",
      "email": "tohok123@gmail.com",
      "phone": "08813456789"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response(Failed):

```json
{
  "errors": "unauthorized"
}
```
