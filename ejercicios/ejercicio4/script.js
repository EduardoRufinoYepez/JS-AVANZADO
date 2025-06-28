// Simulando una base de datos de mesas
const mesasDisponibles = 5;  // Número de mesas disponibles para reservar

// Función que simula la verificación de disponibilidad de mesas
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mesasSolicitadas <= mesasDisponibles) {
        resolve(`¡${mesasSolicitadas} mesa(s) reservada(s) con éxito!`);
      } else {
        reject(`Lo sentimos, solo tenemos ${mesasDisponibles} mesa(s) disponible(s).`);
      }
    }, 2000);  // Simula un retraso en la verificación (2 segundos)
  });
}

// Función que simula el envío de un correo de confirmación
function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.3; // 70% de probabilidad de éxito
      if (exito) {
        resolve(`Correo de confirmación enviado a ${nombreCliente}`);
      } else {
        reject("Error al enviar el correo de confirmación");
      }
    }, 1500);  // Simula el envío de un correo (1.5 segundos)
  });
}

// Función principal para manejar una reserva
async function hacerReserva(nombreCliente, mesasSolicitadas) {
  try {
    console.log("Verificando disponibilidad de mesas...");
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);
    console.log(disponibilidad);
    
    console.log("Enviando confirmación por correo...");
    const confirmacion = await enviarConfirmacionReserva(nombreCliente);
    console.log(confirmacion);
    
    console.log("¡Reserva completada con éxito!");
  } catch (error) {
    console.log("Error en el proceso de reserva:", error);
  } finally {
    console.log("--- Proceso de reserva finalizado ---\n");
  }
}

// Pruebas del sistema
console.log("=== TEST 1: Reserva exitosa ===");
hacerReserva("Juan Pérez", 3);  // Reserva exitosa (menos mesas que disponibles)

setTimeout(() => {
  console.log("\n=== TEST 2: Sin mesas disponibles ===");
  hacerReserva("María García", 7);  // Más mesas que disponibles
}, 4000);

setTimeout(() => {
  console.log("\n=== TEST 3: Error en envío de correo ===");
  hacerReserva("Carlos López", 2);  // Probabilidad de fallo en correo
}, 8000);