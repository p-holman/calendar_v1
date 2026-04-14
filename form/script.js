// Prevenir el submit por defecto
document.getElementById('activityForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Hola. Conectar a la base de datos.');
    this.reset();
});