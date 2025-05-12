document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validación básica
        if (!email || !password) {
            alert('Por favor ingresa tu correo y contraseña.');
            return;
        }

        try {
            console.log('Enviando solicitud de login a la API...');

            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Inicio de sesión exitoso.');
                localStorage.setItem('token', data.token);
                window.location.href = 'listarMascotasNS.html';
            } else {
                console.warn('Respuesta del servidor con error:', data);
                alert('Error: ' + data.msg);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('No se pudo conectar con el servidor. Verifica que esté encendido y accesible.');
        }
    });
});
