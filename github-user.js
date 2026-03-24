const BASE_URL = "https://api.github.com";

const headers = {
  "Accept": "application/vnd.github+json",
};

/**
 * Fetches public profile data for a given GitHub user.
 * @param {string} username - The GitHub username to look up
 * @returns {Promise<Object>} The user's public profile data
 */
async function getUser(username) {
  const res = await fetch(`${BASE_URL}/users/${username}`, { headers });

  if (!res.ok) {
    throw new Error(`getUser failed [${res.status}]: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetches public repositories for a given GitHub user.
 * @param {string} username - The GitHub username to look up
 * @param {string} sort - Sort by: created | updated | pushed | full_name (default: updated)
 * @returns {Promise<Array>} List of public repositories
 */
async function getUserRepos(username, sort = "updated") {
  const res = await fetch(`${BASE_URL}/users/${username}/repos?sort=${sort}`, { headers });

  if (!res.ok) {
    throw new Error(`getUserRepos failed [${res.status}]: ${res.statusText}`);
  }

  return res.json();
}

// --- test ---
getUser("octocat")
  .then(user => {
    console.log("name:", user.name);
    console.log("bio:", user.bio);
    console.log("public repos:", user.public_repos);
    console.log("followers:", user.followers);
  })
  .catch(err => console.error("error:", err.message));
