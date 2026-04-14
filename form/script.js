// Prevenir el submit por defecto
document.getElementById('activityForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('¡Actividad subida con éxito! (Debería conectarse a la base de datos)');
    this.reset();
});