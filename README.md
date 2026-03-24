# GitHub User API

A simple JavaScript utility that pulls public profile data from the GitHub API. Built around two endpoints — one for user info, one for their repos.

---

## What it does

You give it a GitHub username, it gives you back everything that's publicly available on their profile — name, bio, follower count, number of repos, when they joined, etc. No API key needed for basic use.

---

## Endpoints used

| Method | Endpoint | What it returns |
|--------|----------|-----------------|
| GET | `/users/{username}` | A user's public profile |
| GET | `/users/{username}/repos` | A list of their public repos |

---

## Functions

### `getUser(username)`

Fetches profile data for a GitHub user.

**Parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `username` | string | Yes | Their GitHub handle, e.g. `"octocat"` |

**What you get back**

| Field | Type | Description |
|-------|------|-------------|
| `login` | string | Their username |
| `name` | string / null | Their display name if they set one |
| `bio` | string / null | Profile bio |
| `public_repos` | integer | How many public repos they have |
| `followers` | integer | Follower count |
| `following` | integer | How many people they follow |
| `avatar_url` | string | Link to their profile picture |
| `created_at` | string | When they joined GitHub |

---

### `getUserRepos(username, sort)`

Grabs the public repos for a given user. You can optionally control how they're sorted.

**Parameters**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `username` | string | Yes | — | Their GitHub handle |
| `sort` | string | No | `"updated"` | One of: `created`, `updated`, `pushed`, `full_name` |

Returns an array of repo objects — each one has things like `name`, `description`, `language`, `stargazers_count`, and `html_url`.

---

## Error handling

If something goes wrong, both functions throw an error with the HTTP status code so you know what actually happened.

| Status | Meaning | Why it happens |
|--------|---------|----------------|
| `200` | OK | All good |
| `404` | Not found | That username doesn't exist |
| `403` | Forbidden | You've hit the rate limit (60 requests/hr without a token) |
| `500` | Server error | GitHub's side, not yours — just retry |

If you're hitting the rate limit a lot, add an `Authorization: Bearer YOUR_TOKEN` header and you'll get 5,000 requests per hour instead.

---

## Example

```js
getUser("ilovethevowelstheyorbit")
  .then(user => {
    console.log(user.name);
    console.log(user.bio);
    console.log(user.public_repos);
  })
  .catch(err => console.error(err.message));

getUserRepos("ilovethevowelstheyorbit", "created")
  .then(repos => repos.forEach(r => console.log(r.name)))
  .catch(err => console.error(err.message));
```

---

## References

- [GitHub REST API docs](https://docs.github.com/en/rest)
- [GET /users/{username}](https://docs.github.com/en/rest/users/users#get-a-user)
- [GET /users/{username}/repos](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user)
