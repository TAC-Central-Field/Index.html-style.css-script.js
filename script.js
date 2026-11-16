
const flyerForm = document.getElementById("flyerForm");

flyerForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const photoInput = document.getElementById("photo");

  if (!name || !photoInput.files.length) {
    alert("Please enter your name and upload your photograph.");
    return;
  }

  const photo = photoInput.files[0];

  if (!photo.type.startsWith("image/")) {
    alert("Please upload a valid image.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    document.getElementById("previewName").textContent = name;
    document.getElementById("previewPhoto").src = e.target.result;
    document.getElementById("result").hidden = false;
  };

  reader.readAsDataURL(photo);
});

document.getElementById("downloadBtn").addEventListener("click", function() {
  alert("Your flyer preview is ready. Download functionality will be added with the final flyer artwork.");
});
