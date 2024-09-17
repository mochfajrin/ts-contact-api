# Address API Spec

## Create Address

Endpoint: POST /api/contacts/:contact_id/addresses

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
  "street": "Gensokyo 99",
  "city": "Kota Fumo",
  "country": "Gensokyo",
  "postal_code": "999999"
}
```

Response(Success):

```json
{
  "data": {
    "id": 1,
    "street": "Gensokyo 99",
    "city": "Kota Fumo",
    "country": "Gensokyo",
    "postal_code": "999999"
  }
}
```

Response(Failed):

```json
{
  "errors": "postal code is required"
}
```

# Get Address

Endpoint: GET /api/contacts/:contact_id/addresses/:address_id

Request Header:

- X-API-TOKEN: token

Response(Success):

```json
{
  "data": {
    "id",
    "street": "Gensokyo 99",
    "city": "Kota Fumo",
    "country": "Gensokyo",
    "postal_code": "999999"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "address not found"
}
```

## Update Address

Endpoint: PUT /api/contacts/:contact_id/addresses/address_id

Request Header:

- X-API-TOKEN: token

Request Body:

Response(Success):

```json
{
  "street": "Lunar 123",
  "city": "Kota Yukkuri",
  "country": "Lunar Capital",
  "postal_code": "666666"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Lunar 123",
    "city": "Kota Yukkuri",
    "country": "Lunar Capital",
    "postal_code": "666666"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "postal_code is required"
}
```

## Delete Address

Endpoint: DELETE /api/contacts/:contact_id/address/address_id

Request Header:

- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Failed):

```json
{
  "errors": "address not found"
}
```

## List Address

Endpoint: GET /api/contacts/contact_id/addresses/address_id

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "street": "Lunar 123",
      "city": "Kota Yukkuri",
      "country": "Lunar Capital",
      "postal_code": "666666"
    },
    {
      "id": 2,
      "street": "Lunar 123",
      "city": "Kota Yukkuri",
      "country": "Lunar Capital",
      "postal_code": "666666"
    }
  ]
}
```

Response Body (Failed):

```json
{
  "errors": "address not found"
}
```
