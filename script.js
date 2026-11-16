
const flyerForm = document.getElementById("flyerForm");

flyerForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
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
    document.getElementById("preview").hidden = false;
  };

  reader.readAsDataURL(photo);
});

document.getElementById("downloadBtn").addEventListener("click", function() {
  alert("Your flyer preview is ready. The final downloadable flyer design will be added when the graphics designer sends the original artwork.");
});
                           
