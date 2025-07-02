import './style.css';

const numeroSecreto = Math.floor(Math.random() * 100) + 1;
const inputNumero = document.getElementById('numero');
const botonAdivinar = document.getElementById('adivinar');
const mensaje = document.getElementById('mensaje');

botonAdivinar.addEventListener('click', () => {
    const numeroJugador = parseInt(inputNumero.value);

    if (isNaN(numeroJugador) || numeroJugador < 1 || numeroJugador > 100) {
        mensaje.textContent = '⚠️ Por favor, ingresa un número entre 1 y 100.';
        mensaje.style.color = 'red';
    } else if (numeroJugador === numeroSecreto) {
        mensaje.textContent = '🎉 ¡Felicidades! ¡Adivinaste el número!';
        mensaje.style.color = 'green';
        botonAdivinar.disabled = true;
    } else if (numeroJugador < numeroSecreto) {
        mensaje.textContent = '⬆️ El número es más alto.';
        mensaje.style.color = 'orange';
    } else {
        mensaje.textContent = '⬇️ El número es más bajo.';
        mensaje.style.color = 'orange';
    }
});