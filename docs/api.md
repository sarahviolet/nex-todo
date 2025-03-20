# NexToDo API Documentation

## Overview
This document provides detailed information about the NexToDo API, which allows you to manage todo items with various attributes including dates, times, priorities, and categories.

## Base URL
- **Local:** `http://localhost:3001`
- **Production:** (To be determined)

## Response Format
All API responses are in JSON format.

## Authentication
Currently, the API does not require authentication. This may change in future versions.

---

## API Endpoints

### 1. Create a Todo
Creates a new todo item.

- **URL**: `/api/todos`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "title": "Morning jog",
    "description": "30 minutes jogging in the park",
    "date": "2023-03-18",
    "time": "07:00",
    "period": "morning",
    "priority": "high",
    "type": "routine"
  }
  ```
- **Required Fields**: `title`, `date`, `period`, `priority`, `type`
- **Optional Fields**: `description`, `time`
- **Response**: The created todo object
  ```json
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "Morning jog",
    "description": "30 minutes jogging in the park",
    "date": "2023-03-18T00:00:00.000Z",
    "time": "07:00",
    "period": "morning",
    "priority": "high",
    "type": "routine",
    "isCompleted": false,
    "position": 1,
    "createdAt": "2023-03-17T12:00:00.000Z",
    "updatedAt": "2023-03-17T12:00:00.000Z"
  }
  ```
- **Status Codes**:
  - `201`: Successfully created
  - `400`: Bad request (missing required fields)
  - `500`: Server error

### 2. Get All Todos
Retrieves all todo items or filters them based on query parameters.

- **URL**: `/api/todos`
- **Method**: `GET`
- **Query Parameters**:
  - `date`: Filter todos by specific date (format: YYYY-MM-DD)
  - `period`: Filter todos by period of day (`morning`, `afternoon`, `evening`)
  - `type`: Filter todos by type (`routine`, `task`, `event`)
  - `priority`: Filter todos by priority (`high`, `medium`, `low`)
  - `isCompleted`: Filter todos by completion status (`true`, `false`)
- **Response**: Array of todo objects
  ```json
  [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "Morning jog",
      "description": "30 minutes jogging in the park",
      "date": "2023-03-18T00:00:00.000Z",
      "time": "07:00",
      "period": "morning",
      "priority": "high",
      "type": "routine",
      "isCompleted": false,
      "position": 1,
      "createdAt": "2023-03-17T12:00:00.000Z",
      "updatedAt": "2023-03-17T12:00:00.000Z"
    },
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "title": "Team meeting",
      "description": "Weekly team sync meeting",
      "date": "2023-03-18T00:00:00.000Z",
      "time": "14:00",
      "period": "afternoon",
      "priority": "medium",
      "type": "event",
      "isCompleted": false,
      "position": 2,
      "createdAt": "2023-03-17T13:30:00.000Z",
      "updatedAt": "2023-03-17T13:30:00.000Z"
    }
  ]
  ```
- **Status Codes**:
  - `200`: Successful request
  - `500`: Server error

### 3. Get Todo Detail
Retrieves detailed information about a specific todo item.

- **URL**: `/api/todos/:id`
- **Method**: `GET`
- **URL Parameters**:
  - `id`: The unique ID of the todo item
- **Response**: Todo object
  ```json
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "Morning jog",
    "description": "30 minutes jogging in the park",
    "date": "2023-03-18T00:00:00.000Z",
    "time": "07:00",
    "period": "morning",
    "priority": "high",
    "type": "routine",
    "isCompleted": false,
    "position": 1,
    "createdAt": "2023-03-17T12:00:00.000Z",
    "updatedAt": "2023-03-17T12:00:00.000Z"
  }
  ```
- **Status Codes**:
  - `200`: Successful request
  - `404`: Todo not found
  - `500`: Server error

### 4. Update Todo (Full Update)
Completely updates the todo item. All fields must be included.

- **URL**: `/api/todos/:id`
- **Method**: `PUT`
- **URL Parameters**:
  - `id`: The unique ID of the todo item
- **Request Body**: Fields to update (all fields are optional)
  ```json
  {
    "title": "Morning stretching",
    "description": "30 minutes stretching in the park",
    "date": "2023-03-18",
    "time": "07:30",
    "period": "morning",
    "priority": "medium",
    "type": "routine"
  }
  ```
- **Response**: Updated todo object
  ```json
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "Morning stretching",
    "description": "30 minutes stretching in the park",
    "date": "2023-03-18T00:00:00.000Z",
    "time": "07:30",
    "period": "morning",
    "priority": "medium",
    "type": "routine",
    "isCompleted": false,
    "position": 1,
    "createdAt": "2023-03-17T12:00:00.000Z",
    "updatedAt": "2023-03-17T14:15:00.000Z"
  }
  ```
- **Status Codes**:
  - `200`: Successfully updated
  - `404`: Todo not found
  - `500`: Server error

### 5. Delete Todo
Deletes a specific todo item.

- **URL**: `/api/todos/:id`
- **Method**: `DELETE`
- **URL Parameters**:
  - `id`: The unique ID of the todo item
- **Response**:
  ```json
  {
    "message": "Todo successfully deleted"
  }
  ```
- **Status Codes**:
  - `200`: Successfully deleted
  - `404`: Todo not found
  - `500`: Server error

### 6. Toggle Todo Completion Status
Only updates the `isCompleted` field of a todo.

- **URL**: `/api/todos/:id/complete`
- **Method**: `PATCH`
- **URL Parameters**:
  - `id`: The unique ID of the todo item
- **Response**: Updated todo object
  ```json
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "Morning stretching",
    "description": "30 minutes stretching in the park",
    "date": "2023-03-18T00:00:00.000Z",
    "time": "07:30",
    "period": "morning",
    "priority": "medium",
    "type": "routine",
    "isCompleted": true,
    "position": 1,
    "createdAt": "2023-03-17T12:00:00.000Z",
    "updatedAt": "2023-03-18T08:00:00.000Z"
  }
  ```
- **Status Codes**:
  - `200`: Successfully toggled
  - `404`: Todo not found
  - `500`: Server error

### 7. Reorder Todos
Updates the position of multiple todo items (for drag and drop reordering). Only specified items will be updated.

- **URL**: `/api/todos/reorder`
- **Method**: `PATCH`
- **Request Body**:
  ```json
  {
    "items": [
      {"id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "position": 2},
      {"id": "b2c3d4e5-f6a7-8901-bcde-f12345678901", "position": 1},
      {"id": "c3d4e5f6-a7b8-9012-cdef-123456789012", "position": 3}
    ]
  }
  ```
- **Response**:
  ```json
  {
    "message": "Todo order successfully updated"
  }
  ```
- **Status Codes**:
  - `200`: Successfully reordered
  - `400`: Invalid request format
  - `500`: Server error

### 8. Search Todos
Searches for todos based on various criteria.

- **URL**: `/api/todos/search`
- **Method**: `GET`
- **Query Parameters**:
  - `keyword`: Search term for title or description
  - `startDate`: Start date for range search (format: YYYY-MM-DD)
  - `endDate`: End date for range search (format: YYYY-MM-DD)
  - `type`: Filter by type (`routine`, `task`, `event`)
  - `priority`: Filter by priority (`high`, `medium`, `low`)
- **Response**: Array of matching todo objects
  ```json
  [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "Morning jog",
      "description": "30 minutes jogging in the park",
      "date": "2023-03-18T00:00:00.000Z",
      "time": "07:00",
      "period": "morning",
      "priority": "high",
      "type": "routine",
      "isCompleted": false,
      "position": 1,
      "createdAt": "2023-03-17T12:00:00.000Z",
      "updatedAt": "2023-03-17T12:00:00.000Z"
    }
  ]
  ```
- **Status Codes**:
  - `200`: Successful request
  - `500`: Server error

---

## Data Models

### Todo
Represents a todo item in the system.

| Field        | Type      | Description                                 | Required | Default          |
|--------------|-----------|---------------------------------------------|----------|------------------|
| id           | String    | Unique identifier (UUID)                    | No       | Auto-generated   |
| title        | String    | Title of the todo                           | Yes      | -                |
| description  | String    | Detailed description of the todo            | No       | null             |
| date         | DateTime  | Date when the todo is scheduled             | Yes      | -                |
| time         | String    | Time in "HH:MM" format                      | No       | null             |
| period       | String    | Period of day (morning, afternoon, evening) | Yes      | -                |
| priority     | String    | Priority level (high, medium, low)          | Yes      | -                |
| type         | String    | Type of todo (routine, task, event)         | Yes      | -                |
| isCompleted  | Boolean   | Whether the todo is completed               | No       | false            |
| position     | Integer   | Position for UI sorting                     | No       | Auto-incremented |
| createdAt    | DateTime  | When the todo was created                   | No       | Current time     |
| updatedAt    | DateTime  | When the todo was last updated              | No       | Current time     |

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Todo with ID 'abcd-1234' not found",
  "status": 404
}
```

## Rate Limiting

Currently, there are no rate limits implemented for the API. This may change in future versions.

## Versioning

This documentation applies to API version 1.0. Future changes to the API will be documented with appropriate version numbers.

---

## Examples

### Creating a new todo
```bash
curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Study JavaScript",
    "description": "Learn about Promises and async/await",
    "date": "2023-03-20",
    "time": "19:00",
    "period": "evening",
    "priority": "high",
    "type": "task"
  }'
```

### Getting todos for a specific date
```bash
curl -X GET "http://localhost:3001/api/todos?date=2023-03-20&period=evening"
```

### Marking a todo as complete
```bash
curl -X PATCH http://localhost:3001/api/todos/a1b2c3d4-e5f6-7890-abcd-ef1234567890/complete
```

### Searching for todos
```bash
curl -X GET "http://localhost:3001/api/todos/search?keyword=study&startDate=2023-03-01&endDate=2023-03-31"
```