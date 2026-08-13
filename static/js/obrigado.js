const returnButton = document.querySelector(".btn-main");

returnButton.addEventListener("click", function(event){

    event.preventDefault();

    const glitch = document.getElementById("glitch-transition");

    glitch.classList.add("active");

    setTimeout(() => {

        // Tenta fechar a aba
        window.close();

        // Caso o navegador bloqueie o fechamento,
        // mostra uma tela final.
        document.body.innerHTML = `
            <div class="exit-screen">
                <div>
                    <span>SESSION CLOSED</span>

                    <h1>END OF TRANSMISSION</h1>

                    <p>You may now close this window.</p>
                </div>
            </div>
        `;

    }, 600);

});