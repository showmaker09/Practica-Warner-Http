// Archivo: public/js/admin.js

// Usamos UN SOLO "escuchador" para asegurarnos de que todo el código se ejecute
// una vez que el documento HTML esté completamente cargado y listo.
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DE BÚSQUEDA ---
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchInput = document.getElementById('search-input');
            const searchTerm = searchInput.value.toLowerCase();
            const table = document.getElementById('juegos-table');
            const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const nameCell = row.getElementsByTagName('td')[1];
                if (nameCell) {
                    const nameText = nameCell.textContent || nameCell.innerText;
                    if (nameText.toLowerCase().includes(searchTerm)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                }
            }
        });
    }

    // --- LÓGICA PARA LA TABLA DE USUARIOS (BAJA Y MODIFICACIÓN) ---
    const tablaUsuarios = document.querySelector('#admin-usuarios-table');

    // Verificamos si la tabla de usuarios existe en la página actual
    if (tablaUsuarios) {

        // --- LÓGICA PARA EL MODAL DE EDICIÓN ---
        const modal = document.getElementById('edit-modal');
        const closeModalButton = document.querySelector('.close-button');
        const editForm = document.getElementById('edit-form');

        // Función para abrir el modal y llenarlo con datos del usuario
        const openEditModal = (id, nombre, correo, edad) => {
            if (modal) {
                modal.style.display = 'block';
                document.getElementById('edit-id').value = id;
                document.getElementById('edit-nombre').value = nombre;
                document.getElementById('edit-correo').value = correo;
                document.getElementById('edit-edad').value = edad;
            }
        };

        // Evento para cerrar el modal al hacer clic en la 'X'
        if (closeModalButton) {
            closeModalButton.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // Evento para enviar el formulario de edición
        if (editForm) {
            editForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                
                const id = document.getElementById('edit-id').value;
                const nombre = document.getElementById('edit-nombre').value;
                const correo = document.getElementById('edit-correo').value;
                const edad = document.getElementById('edit-edad').value;

                try {
                    const response = await fetch(`/api/usuarios/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nombre, correo, edad }),
                    });

                    if (response.ok) {
                        // Actualizamos la fila en la tabla con los nuevos datos
                        const filaOriginal = tablaUsuarios.querySelector(`button[data-id='${id}']`).closest('tr');
                        if (filaOriginal) {
                            filaOriginal.children[1].textContent = nombre;
                            filaOriginal.children[2].textContent = correo;
                            filaOriginal.children[3].textContent = edad;
                        }
                        
                        modal.style.display = 'none'; // Cerramos el modal
                        alert('Usuario actualizado con éxito.');
                    } else {
                        const errorData = await response.json();
                        alert(`Error: ${errorData.message}`);
                    }
                } catch (error) {
                    console.error('Error al actualizar:', error);
                    alert('Error de conexión al intentar actualizar el usuario.');
                }
            });
        }

        // --- DELEGACIÓN DE EVENTOS EN LA TABLA PARA LOS BOTONES ---
        // Usamos un solo listener en la tabla para manejar tanto los clics de "Baja" como de "Modificar"
        tablaUsuarios.addEventListener('click', async (event) => {
            const target = event.target;

            // Si se hizo clic en un botón de "Modificar"
            if (target.classList.contains('btn-edit')) {
                const fila = target.closest('tr');
                const id = target.dataset.id;
                const nombre = fila.children[1].textContent;
                const correo = fila.children[2].textContent;
                const edad = fila.children[3].textContent;
                
                openEditModal(id, nombre, correo, edad);
            }

            // Si se hizo clic en un botón de "Baja"
            if (target.classList.contains('btn-delete')) {
                const id = target.dataset.id;
                
                if (confirm(`¿Estás seguro de que quieres dar de baja al usuario con ID ${id}?`)) {
                    try {
                        const response = await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
                        if (response.ok) {
                            target.closest('tr').remove();
                            alert('Usuario eliminado con éxito.');
                        } else {
                            const errorData = await response.json();
                            alert(`Error: ${errorData.message}`);
                        }
                    } catch (error) {
                        console.error('Error al eliminar:', error);
                        alert('Error de conexión al intentar eliminar el usuario.');
                    }
                }
            }
        });
    }

}); // <-- Aquí termina el ÚNICO DOMContentLoaded