var lastmove=Date.now();
let songList=["Ik Naya Khuwab Atif Aslam 128 Kbps.mp3","sare-jaha-flute-784.mp3","Main Khiladi Selfiee 320 Kbps.mp3","Kudiyee Ni Teri Selfiee 320 Kbps.mp3","Naiyo Lagda Kisi Ka Bhai Kisi Ki Jaan 320 Kbps.mp3","Pyaar Hota Kayi Baar Hai Tu Jhoothi Main Makkaar 320 Kbps.mp3","Saara Zamaana Khussh 320 Kbps.mp3","tu-mera-koi-na-59338.mp3"];
let masterPlay=document.getElementById("masterPlay");
let prevSong=document.getElementById("prevSong");
let nextSong=document.getElementById("nextSong");
let gif=document.getElementById("gif");
let currentTimer=document.getElementById("currentTimer");
let songDuration=document.getElementById("songDuration");
let isplaying=false;
let cur_index=0;
let songElement=[];
let progressBar=document.getElementById("progressBar");
songList.forEach((e)=>{
    let audio=new Audio(`songs/${e}`);
    songElement.push(audio);
})
let currentSong=songElement[cur_index];
let songName=document.getElementById("songName");
function changeSongName(){
    songName.innerText=songList[cur_index];
    let val=parseInt(currentSong.duration ? currentSong.duration:209);
    let minute=parseInt(val/60);
    let second=val%60;
    let s="";
    if(minute<10) s+="0";
    s+=minute+":";
    if(second<10) s+="0";
    s+=second;
    songDuration.innerText=s;
}
function changeCurrentTime(){
    let val=parseInt(currentSong.currentTime);
    let minute=parseInt(val/60);
    let second=val%60;
    let s="";
    if(minute<10) s+="0";
    s+=minute+":";
    if(second<10) s+="0";
    s+=second;
    currentTimer.innerText=s;
}
changeSongName();
changeCurrentTime();
prevSong.addEventListener("click",(e)=>{
    cur_index--;
    if(cur_index<0) cur_index=songElement.length-1;
    changeSongName();
    isplaying=false;
    pauseSong();
    playSong();
})

nextSong.addEventListener("click",(e)=>{
    cur_index++;
    if(cur_index===songElement.length) cur_index=0;
    changeSongName();
    isplaying=false;
    pauseSong();
    playSong();
})
masterPlay.addEventListener("click",(e)=>{
    if(isplaying){
        pauseSong();
    }
    else{
        playSong();
    }
})

function playSong(){
    currentSong=songElement[cur_index];
    currentSong.play();
    gif.style.opacity="1";
    isplaying=true;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
}

function pauseSong(){
    currentSong.pause();
    gif.style.opacity="0";
    isplaying=false;
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
}

songElement.forEach((e)=>{
    e.addEventListener("timeupdate",()=>{
        if(currentSong.currentTime===currentSong.duration){
            progressBar.value=100;
            pauseSong();
            cur_index++;
            if(cur_index===songElement.length) cur_index=0;
            changeSongName();
            playSong();
        }
        else if(Date.now()-lastmove>=1000){
            let progress=parseInt(currentSong.currentTime/currentSong.duration*100);
            progressBar.value=progress;
            lastmove=Date.now();
            changeCurrentTime();
            changeSongName();
        }
    })
})

progressBar.addEventListener("change",(e)=>{
    let progress=e.target.value;
    currentSong.currentTime=((progress*currentSong.duration)/100);
    progressBar.value=progress;
})
