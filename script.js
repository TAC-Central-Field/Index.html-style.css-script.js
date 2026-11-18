
const canvas = document.getElementById("flyerCanvas");
const ctx = canvas.getContext("2d");

const nameInput = document.getElementById("name");
const photoInput = document.getElementById("photo");
const downloadBtn = document.getElementById("downloadBtn");

const flyer = new Image();
flyer.crossOrigin = "anonymous";

let uploadedPhoto = null;

let photoZoom = 1;
let photoShiftX = 0;
let photoShiftY = 0;

const MIN_ZOOM = 1;
const MAX_ZOOM = 1.5;

let flyerLoaded = false;

canvas.width = 1050;
canvas.height = 1050;

// Load original flyer
flyer.onload = function () {
  flyerLoaded = true;
  drawFlyer();
};

flyer.onerror = function () {
  alert("Unable to load the flyer. Please check the image filename.");
};

flyer.src = "ATTENDING.png";

// Draw personalized flyer
function drawFlyer() {
  if (!flyerLoaded) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw original flyer - keep its size unchanged
  ctx.drawImage(flyer, 0, 0, 1050, 1050);

  // Insert uploaded photograph
  if (uploadedPhoto) {

    ctx.save();

    const diameter = 375;
    const centerX = 730;
    const centerY = 460;

    // Circular photo boundary
    ctx.beginPath();
    ctx.arc(centerX, centerY, diameter / 2, 0, Math.PI * 2);
    ctx.clip();

    // Crop photograph without stretching
    const cropSize = Math.min(
      uploadedPhoto.width,
      uploadedPhoto.height
    );

    const sourceX = (uploadedPhoto.width - cropSize) / 2;
    const sourceY = (uploadedPhoto.height - cropSize) / 2;

    // Apply zoom
    const safeZoom = Math.min(
      MAX_ZOOM,
      Math.max(MIN_ZOOM, photoZoom)
    );

    const drawSize = diameter * safeZoom;

    const photoX = centerX - drawSize / 2 + photoShiftX;
    const photoY = centerY - drawSize / 2 + photoShiftY;

    ctx.drawImage(
      uploadedPhoto,
      sourceX,
      sourceY,
      cropSize,
      cropSize,
      photoX,
      photoY,
      drawSize,
      drawSize
    );

    ctx.restore();
  }

  // Insert participant's name
  const name = nameInput.value.trim();

  if (name) {

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let fontSize = 48;

    ctx.font = `bold ${fontSize}px Arial`;

    while (
      ctx.measureText(name).width > 325 &&
      fontSize > 18
    ) {
      fontSize--;
      ctx.font = `bold ${fontSize}px Arial`;
    }

    ctx.fillText(name, 345, 469, 325);
  }
}

// Update name automatically
nameInput.addEventListener("input", drawFlyer);

// Upload or change photograph
photoInput.addEventListener("change", function () {

  const file = photoInput.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select a valid photograph.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {

    const newPhoto = new Image();

    newPhoto.onload = function () {
      uploadedPhoto = newPhoto;

      // Reset adjustments for each new photo
      photoZoom = 1;
      photoShiftX = 0;
      photoShiftY = 0;

      drawFlyer();
    };

    newPhoto.onerror = function () {
      alert("Unable to load this photograph. Please try another.");
    };

    newPhoto.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

// Download personalized flyer
downloadBtn.addEventListener("click", function () {

  if (!nameInput.value.trim()) {
    alert("Please enter your name.");
    return;
  }

  if (!uploadedPhoto) {
    alert("Please upload your photograph.");
    return;
  }

  if (!flyerLoaded) {
    alert("Please wait for the flyer to finish loading.");
    return;
  }

  drawFlyer();

  try {
    const imageURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "My-Convention-Flyer.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    alert("Download failed: " + error.message);
  }

});
  
