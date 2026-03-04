/**
 * list-pages.js
 * Automatically lists all HTML files in the current GitHub Pages directory
 * and injects links into the element with id="page-list".
 *
 * HOW TO SET UP:
 *   1. Set GITHUB_USER and GITHUB_REPO below.
 *   2. Add <ul id="page-list"></ul> (or any element) to your HTML where you want the links.
 *   3. Include this script: <script src="list-pages.js"></script>
 *
 * NOTES:
 *   - Works for public repositories only (no auth token needed).
 *   - The current page itself is excluded from the list.
 *   - For private repos, generate a fine-grained token with read-only Contents
 *     access and set it as GITHUB_TOKEN below.
 */

const GITHUB_USER = "your-username";   // ← Replace with your GitHub username
const GITHUB_REPO = "your-repo-name"; // ← Replace with your repository name
const GITHUB_TOKEN = "";              // ← Optional: personal access token for private repos

// ---------------------------------------------------------------------------

(async function () {
  // Derive the subdirectory path from the current URL.
  // e.g. https://user.github.io/repo/docs/  →  "docs"
  const repoBase = `/${GITHUB_REPO}/`;
  const pathname = window.location.pathname;
  let subPath = "";

  if (pathname.startsWith(repoBase)) {
    subPath = pathname.slice(repoBase.length).replace(/\/[^/]*$/, ""); // strip filename
  }

  const apiPath = subPath ? `contents/${subPath}` : "contents";
  const apiUrl = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/${apiPath}`;

  const headers = { Accept: "application/vnd.github+json" };
  if (GITHUB_TOKEN) headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;

  let files;
  try {
    const res = await fetch(apiUrl, { headers });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    files = await res.json();
  } catch (err) {
    console.error("list-pages.js:", err);
    return;
  }

  // Filter to .html files, excluding the current page
  const currentFile = pathname.split("/").pop() || "index.html";
  const htmlFiles = files.filter(
    (f) => f.type === "file" && f.name.endsWith(".html") && f.name !== currentFile
  );

  const container = document.getElementById("page-list");
  if (!container) {
    console.warn('list-pages.js: No element with id="page-list" found.');
    return;
  }

  if (htmlFiles.length === 0) {
    container.innerHTML = "<li>No other HTML pages found.</li>";
    return;
  }

  container.innerHTML = htmlFiles
    .map((f) => {
      // Build a friendly display name: strip .html, replace hyphens/underscores with spaces
      const label = f.name
        .replace(/\.html$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()); // Title Case

      return `<li><a href="${f.name}">${label}</a></li>`;
    })
    .join("\n");
})();