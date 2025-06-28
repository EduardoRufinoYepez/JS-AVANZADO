// Implementa las Solicitudes con Fetch
const fetchBtn = document.getElementById('fetch-btn');
const axiosBtn = document.getElementById('axios-btn');
const dataContainer = document.getElementById('data-container');

// Función para renderizar personajes (reutilizable)
function renderCharacters(characters) {
  dataContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos datos
  characters.forEach(character => {
    const characterElement = document.createElement('div');
    characterElement.className = 'character-card'; // Clase para estilos (opcional)
    characterElement.innerHTML = `
      <h3>${character.name}</h3>
      <img src="${character.image}" alt="${character.name}" width="150">
      <p>Status: ${character.status}</p>
      <p>Species: ${character.species}</p>
    `;
    dataContainer.appendChild(characterElement);
  });
}

// Fetch: Obtener personajes
fetchBtn.addEventListener('click', () => {
  fetch('https://rickandmortyapi.com/api/character')
    .then(response => {
      if (!response.ok) throw new Error('Error en la solicitud');
      return response.json();
    })
    .then(data => {
      renderCharacters(data.results); // Mostrar personajes
    })
    .catch(error => {
      console.error('Error:', error);
      dataContainer.textContent = 'Hubo un error al obtener los datos con Fetch.';
    });
});

// Axios: Obtener personajes
axiosBtn.addEventListener('click', () => {
  axios.get('https://rickandmortyapi.com/api/character')
    .then(response => {
      renderCharacters(response.data.results); // Mostrar personajes
    })
    .catch(error => {
      console.error('Error:', error);
      dataContainer.textContent = 'Hubo un error al obtener los datos con Axios.';
    });
});