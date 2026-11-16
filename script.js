
function generateFlyer() {
  const name = document.getElementById("name").value.trim();
  const photoInput = document.getElementById("photo");
  const result = document.getElementById("result");

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  if (!photoInput.files.length) {
    alert("Please upload your photograph.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {
    result.innerHTML = `
      <div style="border: 3px solid #493078; padding: 20px; border-radius: 12px;">
        <h2>Church Celebration</h2>
        <img src="${event.target.result}"
          alt="Uploaded photograph"
          style="width:180px;height:180px;object-fit:cover;border-radius:50%;">
        <h2>${escapeHTML(name)}</h2>
        <p>We are glad to have you!</p>
        <button onclick="downloadFlyer()">Download Flyer</button>
      </div>
    `;
  };

  reader.readAsDataURL(photoInput.files[0]);
}

function escapeHTML(text) {
  return text.replace(/[&<>"']/g, function(char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char];
  });
}

function downloadFlyer() {
  const flyer = document.getElementById("result");
  const content = flyer.innerHTML;
  const page = `
    <html>
    <head><meta charset="UTF-8"><title>My Flyer</title></head>
    <body style="font-family:Arial;text-align:center;padding:30px;">
    ${content}
    </body>
    </html>
  `;

  const blob = new Blob([page], {type:"text/html"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "my-church-flyer.html";
  link.click();
  URL.revokeObjectURL(url);
}
