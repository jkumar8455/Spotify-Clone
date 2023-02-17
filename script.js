var lastmove=Date.now();
let songList=["songs/Kudiyee Ni Teri Selfiee 320 Kbps.mp3","songs/Main Khiladi Selfiee 320 Kbps.mp3","songs/Naiyo Lagda Kisi Ka Bhai Kisi Ki Jaan 320 Kbps.mp3","songs/Pyaar Hota Kayi Baar Hai Tu Jhoothi Main Makkaar 320 Kbps.mp3","songs/Saara Zamaana Khussh 320 Kbps.mp3","songs/tu-mera-koi-na-59338.mp3"];
let masterPlay=document.getElementById("masterPlay");
let prevSong=document.getElementById("prevSong");
let nextSong=document.getElementById("nextSong");
let gif=document.getElementById("gif");
let isplaying=false;
let cur_index=0;
let songElement=[];
let progressBar=document.getElementById("progressBar");
songList.forEach((e)=>{
    let audio=new Audio(e);
    songElement.push(audio);
})
let currentSong=songElement[cur_index];
let songName=document.getElementById("songName");

function load(){
    songName.innerText=songList[cur_index];
}
load();
prevSong.addEventListener("click",(e)=>{
    cur_index--;
    if(cur_index<0) cur_index=songElement.length-1;
    load();
    isplaying=false;
    pauseSong();
    playSong();
})

nextSong.addEventListener("click",(e)=>{
    cur_index++;
    if(cur_index===songElement.length) cur_index=0;
    load();
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
        if(Date.now()-lastmove>=1000){
            let progress=parseInt(currentSong.currentTime/currentSong.duration*100);
            console.log(progress);
            progressBar.value=progress;
            lastmove=Date.now();
        }
    })
})

progressBar.addEventListener("change",(e)=>{
    let progress=e.target.value;
    currentSong.currentTime=(progress*currentSong.duration/100);
    progressBar.value=progress;
})