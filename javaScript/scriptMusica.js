// scriptMusica.js

function iniciarMusica() {
    const audio = document.getElementById("miAudio");
    const modal = document.getElementById("modalAviso");

    audio.play(); // Inicia la música
    modal.classList.add("hidden"); // Oculta el modal
}

// Selecciona el elemento de audio
const audio = document.getElementById("miAudio");

// Función para pausar el audio
function pausarAudio() {
    if (audio) {
        audio.pause();
    }
}

// Función para detener el audio (pausa y reinicia al inicio)
function detenerAudio() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0; // Reinicia el audio al inicio
    }
}

// Función para reiniciar el audio desde el principio
function reiniciarAudio() {
    if (audio) {
        audio.currentTime = 0; // Establece el tiempo al inicio
        audio.play(); // Reproduce el audio
    }
}
