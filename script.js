
const canvas = document.getElementById("flyerCanvas");
const ctx = canvas.getContext("2d");

const nameInput = document.getElementById("name");
const photoInput = document.getElementById("photo");
const downloadBtn = document.getElementById("downloadBtn");

const flyer = new Image();
let uploadedPhoto = null;
let flyerLoaded = false;

canvas.width = 1050;
canvas.height = 1050;

flyer.onload = function () {
  flyerLoaded = true;
  drawFlyer();
};

flyer.src = "ATTENDING.png";

function drawFlyer() {
  if (!flyerLoaded) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(flyer, 0, 0, 1050, 1050);

  if (uploadedPhoto) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(714, 465, 168, 0, Math.PI * 2);
    ctx.clip();

    const size = Math.min(
      uploadedPhoto.width,
      uploadedPhoto.height
    );

    ctx.drawImage(
      uploadedPhoto,
      (uploadedPhoto.width - size) / 2,
      (uploadedPhoto.height - size) / 2,
      size,
      size,
      546,
      297,
      336,
      336
    );

    ctx.restore();
  }

  const name = nameInput.value.trim();

  if (name) {
    ctx.fillStyle = "white";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let fontSize = 48;

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

nameInput.addEventListener("input", drawFlyer);

photoInput.addEventListener("change", function () {
  const file = photoInput.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    uploadedPhoto = new Image();

    uploadedPhoto.onload = drawFlyer;
    uploadedPhoto.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

downloadBtn.addEventListener("click", function () {
  if (!nameInput.value.trim()) {
    alert("Please enter your name.");
    return;
  }

  if (!uploadedPhoto) {
    alert("Please upload your photograph.");
    return;
  }

  drawFlyer();

  const link = document.createElement("a");
  link.download = "My-Convention-Flyer.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
  
