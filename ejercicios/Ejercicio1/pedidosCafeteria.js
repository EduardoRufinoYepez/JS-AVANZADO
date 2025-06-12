// app.js - Simulador de Pedidos para Cafetería
document.addEventListener('DOMContentLoaded', () => {
    const addOrderBtn = document.getElementById('addOrderBtn');
    const orderList = document.getElementById('orderList');
    let orders = [];

    // Lista de bebidas disponibles
    const menuBebidas = [
        'Café Americano',
        'Latte',
        'Capuchino',
        'Espresso',
        'Mocha',
        'Té Chai',
        'Té Verde',
        'Chocolate Caliente'
    ];

    // Función para generar ID único
    function generateOrderId() {
        return 'ORD-' + Date.now().toString(36).slice(-6);
    }

    // Función para simular preparación asíncrona
    function prepareOrder(order) {
        return new Promise((resolve) => {
            // Tiempo aleatorio entre 2 y 8 segundos
            const prepTime = Math.floor(Math.random() * 6000) + 2000;
            
            setTimeout(() => {
                order.status = 'Completado';
                resolve(order);
            }, prepTime);
        });
    }

    // Función para renderizar los pedidos
    function renderOrders() {
        orderList.innerHTML = '';
        
        orders.forEach(order => {
            const li = document.createElement('li');
            li.className = `order ${order.status.toLowerCase()}`;
            li.innerHTML = `
                <strong>${order.id}</strong> - 
                ${order.drink} - 
                <span class="status">${order.status}</span>
                <progress value="${order.status === 'En Proceso' ? '50' : '100'}" max="100"></progress>
            `;
            orderList.appendChild(li);
        });
    }

    // Función principal para agregar pedidos
    async function addOrder() {
        // Seleccionar bebida aleatoria
        const randomDrink = menuBebidas[Math.floor(Math.random() * menuBebidas.length)];
        
        const newOrder = {
            id: generateOrderId(),
            drink: randomDrink,
            status: 'En Proceso',
            createdAt: new Date()
        };

        orders.push(newOrder);
        renderOrders();

        // Procesar pedido
        await prepareOrder(newOrder);
        renderOrders();
        
        // Opcional: reproducir sonido cuando se completa
        playCompletionSound();
    }

    // Función opcional para sonido de completado
    function playCompletionSound() {
        const audio = new Audio();
        //audio.src = 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3';
        audio.play().catch(e => console.log('No se pudo reproducir sonido:', e));
    }

    // Event listener para el botón
    addOrderBtn.addEventListener('click', addOrder);

    // Opcional: Agregar pedido automáticamente cada 10 segundos para demo
    // setInterval(addOrder, 10000);
});