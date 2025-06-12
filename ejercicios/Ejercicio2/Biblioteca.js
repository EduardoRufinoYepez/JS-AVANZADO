// Simulación de base de datos de libros
let biblioteca = {
    libros: [
        {
            titulo: "Cien años de soledad",
            autor: "Gabriel García Márquez",
            genero: "Realismo mágico",
            disponible: true
        },
        {
            titulo: "1984",
            autor: "George Orwell",
            genero: "Ciencia ficción",
            disponible: false
        },
        {
            titulo: "El Principito",
            autor: "Antoine de Saint-Exupéry",
            genero: "Literatura infantil",
            disponible: true
        }
    ]
};

// Función para simular lectura asíncrona de JSON
function leerDatos(callback) {
    setTimeout(() => {
        callback(biblioteca);
    }, 1000); // Simula 1 segundo de retraso
}

// Función para simular escritura asíncrona en JSON
function escribirDatos(nuevosDatos, callback) {
    setTimeout(() => {
        biblioteca = nuevosDatos;
        callback(true);
    }, 1500); // Simula 1.5 segundos de retraso
}

// Función para mostrar todos los libros
function consultarLibros() {
    leerDatos((datos) => {
        console.log("=== CATÁLOGO DE LIBROS ===");
        datos.libros.forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.titulo}`);
            console.log(`   Autor: ${libro.autor}`);
            console.log(`   Género: ${libro.genero}`);
            console.log(`   Disponible: ${libro.disponible ? 'Sí' : 'No'}`);
            console.log("-----------------------");
        });
    });
}

// Función para agregar un nuevo libro
function agregarLibro(titulo, autor, genero) {
    const nuevoLibro = {
        titulo,
        autor,
        genero,
        disponible: true
    };

    leerDatos((datos) => {
        const nuevosDatos = {
            libros: [...datos.libros, nuevoLibro]
        };
        
        escribirDatos(nuevosDatos, (exito) => {
            if (exito) {
                console.log(`Libro "${titulo}" agregado exitosamente!`);
            }
        });
    });
}

// Función para actualizar disponibilidad
function actualizarDisponibilidad(indice, nuevaDisponibilidad) {
    leerDatos((datos) => {
        if (indice >= 0 && indice < datos.libros.length) {
            const nuevosDatos = JSON.parse(JSON.stringify(datos)); // Deep copy
            nuevosDatos.libros[indice].disponible = nuevaDisponibilidad;
            
            escribirDatos(nuevosDatos, (exito) => {
                if (exito) {
                    const estado = nuevaDisponibilidad ? "disponible" : "prestado";
                    console.log(`Estado del libro "${datos.libros[indice].titulo}" actualizado a: ${estado}`);
                }
            });
        } else {
            console.log("Índice de libro no válido");
        }
    });
}

// Ejemplos de uso (puedes modificar estos para probar):
console.log("=== PRUEBA DE FUNCIONALIDADES ===");

// Consultar libros existentes
consultarLibros();

// Agregar un nuevo libro (descomentar para probar)
setTimeout(() => {
    agregarLibro(
        "El nombre del viento",
        "Patrick Rothfuss",
        "Fantasía"
    );
}, 2000);

// Cambiar disponibilidad (descomentar para probar)
setTimeout(() => {
    actualizarDisponibilidad(1, true); // Cambia el libro en posición 1 (1984) a disponible
}, 3000);