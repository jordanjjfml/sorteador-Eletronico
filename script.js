function sortear() {
    const min = parseInt(document.getElementById('min').value, 10);
    const max = parseInt(document.getElementById('max').value, 10);
    if (isNaN(min) || isNaN(max) || min > max) {
        alert('Por favor, insira valores válidos para mínimo e máximo.');
        return;
    }
    const resultado = Math.floor(Math.random() * (max - min + 1)) + min;
    alert('Número sorteado: ' + resultado);
}