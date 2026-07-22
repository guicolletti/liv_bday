const bootMessages = [

"BOOTING SYSTEM...",
"CHECKING MEMORY...",
"MEMORY OK",
"",
"CONNECTING...",
"ESTABLISHING ENCRYPTED LINK...",
"",
"SYSTEM ONLINE"

];

const bootText = document.getElementById("boot-text");

let bootIndex = 0;

function typeBoot(text, callback) {

    let index = 0;

    bootText.innerHTML = "";

    function write() {

        if (index < text.length) {

            bootText.innerHTML += text.charAt(index);

            index++;

            setTimeout(write, 35);

        } else {

            bootText.innerHTML += '<span class="cursor">█</span>';

            callback();

        }

    }

    write();

}

function bootSequence() {

    if (bootIndex >= bootMessages.length) {

        setTimeout(() => {

            document.getElementById("boot-screen").style.display = "none";
            document.getElementById("terminal-screen").style.display = "flex";

            type();

        }, 800);

        return;
    }

    typeBoot(bootMessages[bootIndex], () => {

        bootIndex++;

        setTimeout(bootSequence, 400);

    });

}

bootSequence();

const text = [
"> Connecting...",
"> Searching Guest Database...",
"> Authentication successful!",
"> Invitation Found!",
"> Decrypting..."
];

let i = 0;

let j = 0;

let current = "";

const terminal = document.getElementById("terminal-text");

function type(){

if(i >= text.length){

    loading(() => {

        current += "\n\n> ACCESS GRANTED";

        terminal.innerHTML = current;

        setTimeout(() => {

            document.getElementById("continue-box").style.display="block";

        },700);

    });

    return;

}

if(j < text[i].length){

current += text[i][j];

terminal.innerHTML=current + '<span class="cursor">█</span>';

j++;

setTimeout(type,40);

}else{

current+="\n";

i++;

j=0;

setTimeout(type,400);

}

}

function loading(callback){

    let percent = 0;

    const interval = setInterval(() => {

        percent++;

        const blocks = Math.floor(percent / 4);

        const bar =
            "█".repeat(blocks) +
            "░".repeat(25 - blocks);

        terminal.innerHTML =
            current +
            "\n\n" +
            bar +
            " " +
            percent +
            "%" +
            '<span class="cursor">█</span>';

        if(percent >= 100){

            clearInterval(interval);

            current +=
                "\n" +
                bar +
                " 100%";

            callback();

        }

    },35);

}