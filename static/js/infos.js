const terminal = document.getElementById("loader-terminal");

const convite = document.getElementById("convite");

const loader = document.getElementById("loader");

const form = document.querySelector("form");

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const glitch = document.getElementById("glitch-transition");

    glitch.classList.add("active");

    setTimeout(()=>{

        form.submit();

    },500);

});

const lines = [

"> Opening file...",

"",

"> Validating permissions...",

"",

"> Permission Granted!",

"",

"> Decrypting image..."

];

let current = "";

let line = 0;

let letter = 0;

function type(){

    if(line >= lines.length){

        progress();

        return;

    }

    if(letter < lines[line].length){

        current += lines[line][letter];

        terminal.innerHTML = current + "█";

        letter++;

        setTimeout(type,35);

    }

    else{

        current += "\n";

        line++;

        letter = 0;

        setTimeout(type,250);

    }

}

type();

function progress(){

    let value = 0;

    const timer = setInterval(()=>{

        value++;

        const filled = Math.floor(value/4);

        const bar =

            "█".repeat(filled)+

            "░".repeat(25-filled);

        terminal.innerHTML =

        current +

        "\n\n"+

        bar+

        " "+

        value+

        "%";

        if(value>=100){

            clearInterval(timer);

            finish();

        }

    },28);

}

function finish(){

    terminal.innerHTML +=

    "\n\n> Rendering Preview..."

    +

    "\n"

    +

    "> Complete.";

    setTimeout(()=>{

        loader.classList.add("hide");

        convite.classList.add("show");

    },900);

}

// ========================================
// IMAGE VIEWER
// ========================================

const imageModal = document.getElementById("image-modal");

const closeModal = document.getElementById("close-modal");


// ABRIR

convite.addEventListener("click", function(){

    imageModal.classList.add("active");

});


// FECHAR PELO X

closeModal.addEventListener("click", function(){

    imageModal.classList.remove("active");

});


// FECHAR CLICANDO FORA DA IMAGEM

imageModal.addEventListener("click", function(event){

    if(event.target === imageModal){

        imageModal.classList.remove("active");

    }

});


// FECHAR COM ESC

document.addEventListener("keydown", function(event){

    if(event.key === "Escape"){

        imageModal.classList.remove("active");

    }

});