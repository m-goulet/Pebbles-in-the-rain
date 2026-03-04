const GITHUB_USER = "m-goulet";
const GITHUB_REPO = "Pebbles-in-the-rain";

(async function () {
  // Derive the subdirectory path from the current URL.
  // e.g. https://user.github.io/repo/docs/  →  "docs"
  const repoBase = `/${GITHUB_REPO}/`;
  const pathname = window.location.pathname;
  let subPath = "";

  if (pathname.startsWith(repoBase)) {
    subPath = pathname.slice(repoBase.length).replace(/\/[^/]*$/, ""); // strip filename
  }
  console.log(subPath);

  const apiPath = subPath ? `contents/${subPath}` : "contents";
  const apiUrl = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/${apiPath}`;

  console.log(apiUrl);
  
  let files;
  try {
    const res = await fetch(apiUrl, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    files = await res.json();
  } catch (err) {
    console.error("listor.js:", err);
    return;
  }

  // Filter to .html files, excluding the current page
  const currentFile = pathname.split("/").pop() || "index.html";
  console.log(files);
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
