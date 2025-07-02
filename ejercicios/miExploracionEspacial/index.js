const planetas = require('./planetas');
planetas.forEach(planeta => {
  console.log(`Nombre: ${planeta.nombre}`);
  console.log(`Descripción: ${planeta.descripcion}`);
  console.log("---");
});