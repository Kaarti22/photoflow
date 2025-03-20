# PhotoFlow API Documentation

## Authentication Endpoints

### Signup

`POST /api/v1/users/signup`

Register a new user in the system.

#### Request Body

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "passwordConfirm": "string"
}
```

#### Response

**Success Response (201 Created)**

```json
{
  "status": "success",
  "token": "jwt_token_here",
  "data": {
    "user": {
      "username": "string",
      "email": "string",
      "id": "string"
    }
  }
}
```

**Error Response (400 Bad Request)**

```json
{
  "status": "fail",
  "message": "Error message here"
}
```

#### Required Fields

| Field           | Type   | Description                     |
| --------------- | ------ | ------------------------------- |
| username        | string | User's full name                |
| email           | string | Valid email address             |
| password        | string | Password (minimum 8 characters) |
| passwordConfirm | string | Must match password field       |

#### Diagrams

**Request Flow**

```mermaid
sequenceDiagram
    User->>Server: POST /api/v1/users/signup
    Server-->>User: 201 Created (Success Response)
    Server-->>User: 400 Bad Request (Error Response)
```

**Response Flow**

```mermaid
sequenceDiagram
    Server->>User: 201 Created
    User->>Server: Access Token
```

**Detailed Request-Response Flow**

```mermaid
sequenceDiagram
    participant User
    participant Server
    User->>Server: POST /api/v1/users/signup
    activate Server
    Server-->>User: 201 Created (Success Response)
    deactivate Server
    alt Error Response
        Server-->>User: 400 Bad Request
    end
```

### Login

`POST /api/v1/users/login`

Authenticate a user and return a JWT token.

#### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response

**Success Response (200 OK)**

```json
{
  "status": "success",
  "token": "jwt_token_here",
  "data": {
    "user": {
      "username": "string",
      "email": "string",
      "id": "string"
    }
  }
}
```

**Error Response (401 Unauthorized)**

```json
{
  "status": "fail",
  "message": "Incorrect email or password"
}
```

#### Required Fields

| Field    | Type   | Description         |
| -------- | ------ | ------------------- |
| email    | string | Valid email address |
| password | string | User's password     |

#### Diagrams

**Request Flow**

```mermaid
sequenceDiagram
    User->>Server: POST /api/v1/users/login
    Server-->>User: 200 OK (Success Response)
    Server-->>User: 401 Unauthorized (Error Response)
```

**Response Flow**

```mermaid
sequenceDiagram
    Server->>User: 200 OK
    User->>Server: Access Token
```

**Detailed Request-Response Flow**

```mermaid
sequenceDiagram
    participant User
    participant Server
    User->>Server: POST /api/v1/users/login
    activate Server
    Server-->>User: 200 OK (Success Response)
    deactivate Server
    alt Error Response
        Server-->>User: 401 Unauthorized
    end
```

### Logout

`POST /api/v1/users/logout`

Log out the authenticated user.

#### Response

**Success Response (200 OK)**

```json
{
  "status": "success",
  "message": "Logged out successfully."
}
```

#### Diagrams

**Request Flow**

```mermaid
sequenceDiagram
    User->>Server: POST /api/v1/users/logout
    Server-->>User: 200 OK (Success Response)
```

**Response Flow**

```mermaid
sequenceDiagram
    Server->>User: 200 OK
```

**Detailed Request-Response Flow**

```mermaid
sequenceDiagram
    participant User
    participant Server
    User->>Server: POST /api/v1/users/logout
    activate Server
    Server-->>User: 200 OK (Success Response)
    deactivate Server
```
