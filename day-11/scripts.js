//get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// Build our Functions 
function togglePlay () {
    if(video.paused){
        video.play();
    } else{
        video.pause()
    }
}
function updateButton(){
    if (this.paused){
        toggle.textContent= "▶";
    }else{
        toggle.textContent = "⏸️";
    }
}
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
   video[this.name] = this.value;
}
function Videoprogress(){
    const percent = (video.currentTime / video.duration)* 100;
    progressBar.style.flexBasis = `${percent}%`;
}
function srcub (e){
    const srcubTime = (e.offsetX / progress.offsetWidth)* video.duration;
    video.currentTime = srcubTime;
}


// Hook up our event Listeners
video.addEventListener("click",togglePlay);
video.addEventListener("play",updateButton);
video.addEventListener("pause",updateButton);
video.addEventListener("timeupdate",Videoprogress);

toggle.addEventListener("click",togglePlay);
skipButtons.forEach(button => button.addEventListener("click", skip));

ranges.forEach(range => range.addEventListener("change",handleRangeUpdate));

let mousedown = false;
progress.addEventListener("click",srcub);
progress.addEventListener("movemove", (e) => mousedown && srcub(e));
progress.addEventListener("movedown", () => mousedown = true);
progress.addEventListener("mouseup",() => mousedown = false);