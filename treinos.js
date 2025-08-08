const form = document.getElementById('treinoForm');
const lista = document.getElementById('listaTreinos');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const categoria = document.getElementById('categoria').value;
  const repeticoes = document.getElementById('repeticoes').value;
  const series = document.getElementById('series').value;

  const item = document.createElement('li');
  item.innerHTML = `<strong>${nome}</strong> - ${categoria} (${series}x${repeticoes})`;

  lista.appendChild(item);

  form.reset();
});