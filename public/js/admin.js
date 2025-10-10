// Archivo: public/js/admin.js

document.addEventListener('DOMContentLoaded', () => {

  // Seleccionamos el formulario de búsqueda
  const searchForm = document.getElementById('search-form');

  // Añadimos un "escuchador" para cuando se envíe el formulario (al hacer clic en el botón)
  searchForm.addEventListener('submit', (event) => {
    // Prevenimos que la página se recargue, que es el comportamiento por defecto de un formulario
    event.preventDefault();

    // Obtenemos el texto de búsqueda y lo convertimos a minúsculas para una comparación sin distinción de mayúsculas/minúsculas
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();

    // Seleccionamos la tabla y todas las filas del cuerpo (tbody)
    const table = document.getElementById('juegos-table');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    // Recorremos cada fila de la tabla
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      // Seleccionamos la celda del "Nombre" (es la segunda celda, índice 1)
      const nameCell = row.getElementsByTagName('td')[1];

      if (nameCell) {
        const nameText = nameCell.textContent || nameCell.innerText;

        // Comparamos si el nombre en la celda incluye el término de búsqueda
        if (nameText.toLowerCase().includes(searchTerm)) {
          // Si coincide, nos aseguramos de que la fila sea visible
          row.style.display = '';
        } else {
          // Si no coincide, ocultamos la fila
          row.style.display = 'none';
        }
      }
    }
  });
});