//project abandonned for now. Too much of a hassle for a very minor problem

async function uploadFile() {

  /*
    await fetch("https://your-worker.workers.dev/upload", {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  */

/*
  const fileInput = document.getElementById("file-input");
  const status = document.getElementById("upload-status");
  const linkDisplay = document.getElementById("upload-link");

  if (!fileInput.files[0]) {
    status.textContent = "Please select a file first.";
    return;
  }

  status.textContent = "Uploading...";

  const form = new FormData();
  form.append("file", fileInput.files[0]);

  try {
    const res = await fetch("https://file.io/?expires=1h", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (data.success) {
      status.textContent = "Upload successful! Your link:";
      linkDisplay.textContent = data.link;
    } else {
      status.textContent = "Upload failed: " + data.message;
    }
  } catch (err) {
    status.textContent = "Error: " + err.message;
  }
*/
}

async function downloadFile() {

  /*
  const res = await fetch("https://your-worker.workers.dev/download");
  const blob = await res.blob();
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "transferred-file";
  a.click();
  */
/*
  const link = document.getElementById("link-input").value.trim();
  const status = document.getElementById("download-status");

  if (!link) {
    status.textContent = "Please paste a link first.";
    return;
  }

  status.textContent = "Fetching...";

  try {
    const res = await fetch(link);

    if (!res.ok) {
      status.textContent = "Could not retrieve file. It may have expired or already been downloaded.";
      return;
    }

    // Extract filename from Content-Disposition header if available
    const disposition = res.headers.get("Content-Disposition");
    let filename = "download";
    if (disposition) {
      const match = disposition.match(/filename="(.+)"/);
      if (match) filename = match[1];
    }

    // Trigger browser download
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    status.textContent = "Download started!";
  } catch (err) {
    status.textContent = "Error: " + err.message;
  }
*/
}
