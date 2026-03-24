# GitHub User API

A lightweight JavaScript utility for fetching public user data from the GitHub REST API. Written as part of an API documentation exercise.

---

## Table of Contents

- [Overview](#overview)
- [Endpoints](#endpoints)
- [Functions](#functions)
  - [getUser()](#getuser)
  - [getUserRepos()](#getuserrepos)
- [Error Handling](#error-handling)
- [Usage Example](#usage-example)

---

## Overview

This utility wraps two GitHub REST API endpoints, allowing you to retrieve public profile information and repository data for any GitHub user. No authentication is required for basic usage, though adding a token significantly increases your rate limit.

---

## Endpoints

| Method | Endpoint                                   | Description                        |
|--------|--------------------------------------------|------------------------------------|
| GET    | `/users/{username}`                        | Fetch a user's public profile      |
| GET    | `/users/{username}/repos?sort={sort}`      | Fetch a user's public repositories |

---

## Functions

### `getUser(username)`

Fetches public profile data for a given GitHub user.

**Parameters**

| Name       | Type   | Required | Description                    |
|------------|--------|----------|--------------------------------|
| `username` | string | Yes      | The target user's GitHub handle |

**Returns**

A `Promise` that resolves to a user object containing:

| Field          | Type            | Description                              |
|----------------|-----------------|------------------------------------------|
| `login`        | string          | The user's GitHub username               |
| `name`         | string / null   | The user's display name                  |
| `bio`          | string / null   | Short profile bio                        |
| `public_repos` | integer         | Number of public repositories            |
| `followers`    | integer         | Number of followers                      |
| `following`    | integer         | Number of accounts the user follows      |
| `avatar_url`   | string          | URL pointing to the user's profile image |
| `created_at`   | string          | Account creation date (ISO 8601 format)  |

---

### `getUserRepos(username, sort)`

Fetches the list of public repositories for a given GitHub user.

**Parameters**

| Name       | Type   | Required | Default     | Description                                                      |
|------------|--------|----------|-------------|------------------------------------------------------------------|
| `username` | string | Yes      | —           | The target user's GitHub handle                                  |
| `sort`     | string | No       | `"updated"` | Sort order: `created`, `updated`, `pushed`, or `full_name`       |

**Returns**

A `Promise` that resolves to an array of repository objects, each containing fields such as `name`, `description`, `stargazers_count`, `language`, and `html_url`.

---

## Error Handling

Both functions throw an `Error` if the request fails. The error message includes the HTTP status code and status text for easier debugging.

| Status Code | Meaning             | Common Cause                                          |
|-------------|---------------------|-------------------------------------------------------|
| `200`       | OK                  | Request was successful                                |
| `404`       | Not Found           | The username does not exist                           |
| `403`       | Forbidden           | Rate limit exceeded (60 req/hr unauthenticated)       |
| `500`       | Internal Server Error | GitHub-side issue, retry after a short delay         |

> **Note:** Unauthenticated requests are limited to **60 requests per hour**. To raise this to **5,000 requests per hour**, add an `Authorization: Bearer YOUR_TOKEN` header to each request.

---

## Usage Example

```js
// Fetch a user's profile
getUser("octocat")
  .then(user => {
    console.log("Name:", user.name);
    console.log("Bio:", user.bio);
    console.log("Public Repos:", user.public_repos);
    console.log("Followers:", user.followers);
  })
  .catch(err => console.error("Error:", err.message));

// Fetch a user's repositories, sorted by creation date
getUserRepos("octocat", "created")
  .then(repos => {
    repos.forEach(repo => console.log(repo.name));
  })
  .catch(err => console.error("Error:", err.message));
```

---

## References

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [GET /users/{username}](https://docs.github.com/en/rest/users/users#get-a-user)
- [GET /users/{username}/repos](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user)
