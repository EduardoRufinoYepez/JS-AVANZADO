const boton = document.getElementById('btn-carga');
const contenedorResultado = document.getElementById('resultado');

boton.addEventListener('click', () => obtenerDatos);

function obtenerDatos() {
    contenedorResultado.innerHTML = '<p>Cargando...</p>';
    const url = 'https://jsonplaceholder.typicode.com/posts';

    fetch(url)
    .then(Response => {    
        if (!Response.ok) {
        throw new Error(`Error en la petición:  ${Response.status} - ${response.statusText}`);
        }
        return Response.json();
    })

    .then(data => {
        mostrarDatos(data);
    })
    .catch(error => {})
}