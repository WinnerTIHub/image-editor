const blurr = document.getElementById("blur");
const  contrast = document.getElementById("contrast");
const hueRotate = document.getElementById("hue-rotate");
const sepia = document.getElementById("sepia");

const flipXBtn = document.getElementById("flip-x");
const flipYBtn = document.getElementById("flip-y");
const noFlipBtn = document.getElementById("no-flip");

const image = document.getElementById("chosen-image");
const uploadBtn = document.getElementById("upload-button");
const downloadBtn = document.getElementById("download-button");

const sliders = document.querySelectorAll(".filter input[type='range']");
sliders.forEach( slider => {
   slider.addEventListener("input", addFilter);
   slider.addEventListener("input", showRangeValues);
})

function resetFilter() {
   blurr.value = "0";
   contrast.value = "0";
   hueRotate.value = "0";
   sepia.value = "0"
   noFlipBtn.checked = true;

   rangeInput.forEach(range => range.textContent = "0");

   addFilter();
   // flipImage();
}

const flipBtns = document.querySelectorAll(".flip-option input[type='radio']");
flipBtns.forEach(flipbtn => {
   flipbtn.addEventListener("click", flipImage);
})
function flipImage () {
   if (flipXBtn.checked) {
      image.style.transform = "scaleX(-1)";
   } else if (flipYBtn.checked) {
      image.style.transform = "scaleY(-1)";
   } else {
      image.style.transform = "scale(1, 1)";
   }
}


const rangeInput = document.querySelectorAll(".filter .range-value");
function showRangeValues () {
  sliders.forEach((slider, index) => {
   rangeInput[index].textContent = `${slider.value}`;
  });
}

function addFilter () {
   image.style.filter = `blur(${blurr.value}px) contrast(${contrast.value}%) hue-rotate(${hueRotate.value}deg) sepia(${sepia.value}%)`;
}

uploadBtn.onchange = () => {
   resetFilter();
   document.querySelector(".result .image-container").style.display = "block";
   const reader = new FileReader();
   reader.readAsDataURL(uploadBtn.files[0]);
   reader.onload = () => {
      image.setAttribute("src", reader.result);
   }
}

downloadBtn.onclick = () => {
   const canvas = document.createElement("canvas");
   const ctx = canvas.getContext("2d");
   const img = new Image();
   img.src = image.src;
   img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = image.style.filter;
      ctx.translate(canvas.width/2, canvas.height/2);
      if (flipXBtn.checked) {
         ctx.scale(-1, 1);
      } else if (flipYBtn.checked) {
         ctx.scale(1, -1);
      }
      ctx.drawImage(img, -canvas.width/2, -canvas.height/2, img.width, img.height);
      const link = document.createElement("a");
      link.download = "edited-image.png";
      link.href = canvas.toDataURL();
      link.click();
   }
}

resetFilter();

const footer = document.createElement("div");
footer.textContent = "© 2025 WinnerTI Hub, Made by WinnerTIHub";
footer.classList.add("footer");
document.body.appendChild(footer);

document.onload = () => {
   alert("after uploading an image increase the contrast to make it more visible");
};
