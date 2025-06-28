document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registroEvento');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    resetErrors();
    
    if (validateForm()) {
      // Simulación de envío de datos
      alert('¡Registro exitoso! Hemos enviado un correo de confirmación.');
      form.reset();
    }
  });

  function resetErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
      error.textContent = '';
      error.style.display = 'none';
    });
  }

  function validateForm() {
    let isValid = true;

    // Validación 1: Nombre completo (mínimo 5 caracteres, máximo 50)
    const nombre = document.getElementById('nombre').value.trim();
    if (nombre.length < 5 || nombre.length > 50) {
      showError('nombre-error', 'El nombre debe tener entre 5 y 50 caracteres');
      isValid = false;
    }

    // Validación 2: Correo electrónico (formato válido)
    const correo = document.getElementById('correo').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      showError('correo-error', 'Por favor ingresa un correo electrónico válido');
      isValid = false;
    }

    // Validación 3: Teléfono (solo números, mínimo 10 caracteres)
    const telefono = document.getElementById('telefono').value.trim();
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(telefono)) {
      showError('telefono-error', 'El teléfono debe contener solo números (10-15 dígitos)');
      isValid = false;
    }

    // Validación 4: Al menos un interés seleccionado
    const intereses = document.querySelectorAll('input[name="intereses"]:checked');
    if (intereses.length === 0) {
      showError('intereses-error', 'Selecciona al menos un interés');
      isValid = false;
    }

    // Validación 5: Horario seleccionado
    const horario = document.querySelector('input[name="horario"]:checked');
    if (!horario) {
      showError('horario-error', 'Selecciona un horario preferido');
      isValid = false;
    }

    // Validación 6: Fecha válida (no en el pasado)
    const fechaInput = document.getElementById('fecha');
    const fecha = new Date(fechaInput.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fecha < hoy) {
      showError('fecha-error', 'La fecha no puede ser anterior al día de hoy');
      isValid = false;
    }

    // Validación 7: Hora válida según horario seleccionado
    const horaInput = document.getElementById('hora');
    const hora = horaInput.value;
    const horarioSeleccionado = horario ? horario.value : '';
    
    if (horarioSeleccionado) {
      const [horaStr] = hora.split(':');
      const horaNum = parseInt(horaStr, 10);
      
      if (horarioSeleccionado === 'mañana' && (horaNum < 9 || horaNum >= 12)) {
        showError('hora-error', 'Para horario matutino selecciona entre 9:00 y 12:00');
        isValid = false;
      } else if (horarioSeleccionado === 'tarde' && (horaNum < 14 || horaNum >= 17)) {
        showError('hora-error', 'Para horario vespertino selecciona entre 14:00 y 17:00');
        isValid = false;
      } else if (horarioSeleccionado === 'noche' && (horaNum < 19 || horaNum >= 22)) {
        showError('hora-error', 'Para horario nocturno selecciona entre 19:00 y 22:00');
        isValid = false;
      }
    }

    // Validación 8: Archivo (si se sube, verificar tamaño y tipo)
    const archivoInput = document.getElementById('archivo');
    if (archivoInput.files.length > 0) {
      const archivo = archivoInput.files[0];
      const tiposPermitidos = ['application/pdf', 'image/jpeg', 'image/png'];
      const tamanoMaximoMB = 2;
      
      if (!tiposPermitidos.includes(archivo.type)) {
        showError('archivo-error', 'Solo se permiten archivos PDF, JPG o PNG');
        isValid = false;
      } else if (archivo.size > tamanoMaximoMB * 1024 * 1024) {
        showError('archivo-error', `El archivo no debe exceder ${tamanoMaximoMB}MB`);
        isValid = false;
      }
    }

    return isValid;
  }

  function showError(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
});