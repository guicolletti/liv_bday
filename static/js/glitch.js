function transition(url){

    const glitch = document.getElementById("glitch-transition");

    glitch.classList.add("active");

    setTimeout(()=>{

        window.location.href = url;

    },500);

    const audio = document.getElementById('glitch');
    audio.play()
    

    audio.volume = 0.5;
}