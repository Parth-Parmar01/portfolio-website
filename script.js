// Background video ko zoom-in / zoom-out effect
const video = document.querySelector("video");

let scale = 1;
let growing = true;

setInterval(() => {
  if (growing) {
    scale += 0.001; 
    if (scale >= 1.05) growing = false;
  } else {
    scale -= 0.001;
    if (scale <= 1) growing = true;
  }
  video.style.transform = `scale(${scale})`;
}, 30);

