// Archivo: public/js/admin.js

// RECOMENDACIÓN: Unificamos todo el código dentro de un único 'DOMContentLoaded'.
// Esto asegura que todo el script se ejecute en el orden correcto una vez que la
// página HTML esté completamente cargada, evitando conflictos y errores.
document.addEventListener('DOMContentLoaded', () => 
    {

    // ===================================================================
    // FUNCIONALIDAD 1: BÚSQUEDA EN LA TABLA DE JUEGOS
    // ===================================================================
    const searchForm = document.getElementById('search-form');

    // RECOMENDACIÓN: Se añade una comprobación para asegurar que el script no falle
    // si se carga en una página que no tiene el formulario de búsqueda.
    if (searchForm) 
    {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita que la página se recargue

            const searchInput = document.getElementById('search-input');
            const searchTerm = searchInput.value.toLowerCase();
            const table = document.getElementById('juegos-table');
            const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

            // Itera sobre cada fila para mostrarla u ocultarla
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                // RECOMENDACIÓN: El código asume que el nombre está en la segunda celda (índice 1).
                // Asegúrate de que esto coincida con tu HTML.
                const nameCell = row.getElementsByTagName('td')[1];
                if (nameCell) {
                    const nameText = nameCell.textContent || nameCell.innerText;
                    if (nameText.toLowerCase().includes(searchTerm)) {
                        row.style.display = ''; // Muestra la fila si coincide
                    } else {
                        row.style.display = 'none'; // Oculta la fila si no coincide
                    }
                }
            }
        });
    }


    // ===================================================================
    // FUNCIONALIDAD 2 Y 3: GESTIÓN DE LA TABLA DE USUARIOS (BAJA Y MODIFICAR)
    // ===================================================================
    const tablaUsuarios = document.querySelector('#admin-usuarios-table');

    // Solo ejecutamos el código de usuarios si la tabla existe en la página actual.
    if (tablaUsuarios) {
        
        // --- Elementos del Modal de Edición ---
        const modal = document.getElementById('edit-modal');
        const closeModalButton = document.querySelector('.close-button');
        const editForm = document.getElementById('edit-form');

        // Función para abrir y llenar el modal de edición
        const openEditModal = (id, nombre, correo, edad) => {
            modal.style.display = 'block';
            document.getElementById('edit-id').value = id;
            document.getElementById('edit-nombre').value = nombre;
            document.getElementById('edit-correo').value = correo;
            document.getElementById('edit-edad').value = edad;
        };

        // --- Event Listeners para el Modal ---
        closeModalButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        editForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const id = document.getElementById('edit-id').value;
            const data = {
                nombre: document.getElementById('edit-nombre').value,
                correo: document.getElementById('edit-correo').value,
                edad: document.getElementById('edit-edad').value,
            };

            try {
                const response = await fetch(`/admin/usuarios/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    // Actualiza la fila en la tabla con los nuevos datos
                    const filaOriginal = tablaUsuarios.querySelector(`button[data-id='${id}']`).closest('tr');
                    
                    // RECOMENDACIÓN (Avanzado): Para hacer esto más robusto, podrías usar
                    // clases o data-attributes en tus <td>. Ej: <td data-field="nombre">.
                    // Esto evita depender del orden de las columnas.
                    // filaOriginal.querySelector('[data-field="nombre"]').textContent = data.nombre;
                    filaOriginal.children[1].textContent = data.nombre;
                    filaOriginal.children[2].textContent = data.correo;
                    filaOriginal.children[3].textContent = data.edad;
                    
                    modal.style.display = 'none';
                    alert('Usuario actualizado con éxito.');
                } else {
                    const errorData = await response.json();
                    alert(`Error al actualizar: ${errorData.message}`);
                }
            } catch (error) {
                alert('Error de conexión al intentar actualizar el usuario.');
            }
        });


        // --- Event Listener Principal para la Tabla (Delegación de Eventos) ---
        // RECOMENDACIÓN: Usar un solo listener en la tabla es más eficiente que
        // poner un listener en cada botón individualmente.
        tablaUsuarios.addEventListener('click', async (event) => 
        {
            const target = event.target; // El elemento exacto donde se hizo clic

            // --- Lógica para el botón MODIFICAR ---
            if (target.classList.contains('btn-edit')) {
                const fila = target.closest('tr');
                const id = target.dataset.id;
                
                // CORRECCIÓN: Se mantiene esta lógica, pero ahora está dentro de un
                // código estructurado y funcional.
                const nombre = fila.children[1].textContent;
                const correo = fila.children[2].textContent;
                const edad = fila.children[3].textContent;
                
                openEditModal(id, nombre, correo, edad);
            }

            // --- Lógica para el botón BAJA (Eliminar) ---
            if (target.classList.contains('btn-delete')) {
                const id = target.dataset.id;
                
                if (confirm(`¿Estás seguro de que quieres dar de baja al usuario con ID ${id}?`)) {
                    try {
                        const response = await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
                        if (response.ok) {
                            target.closest('tr').remove(); // Elimina la fila de la vista
                            alert('Usuario eliminado con éxito.');
                        } else {
                            const errorData = await response.json();
                            alert(`Error al eliminar: ${errorData.message}`);
                        }
                    } catch (error) {
                        alert('Error de conexión al intentar eliminar el usuario.');
                    }
                }
            }
        });
    }

}); // CORRECCIÓN: Se elimina la llave '}' extra que estaba después de esta línea.