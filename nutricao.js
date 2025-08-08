const form = document.getElementById('dietaForm');
const lista = document.getElementById('listaRefeicoes');
const totalCaloriasTexto = document.getElementById('totalCalorias');
let totalCalorias = 0;

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('refeicao').value;
  const horario = document.getElementById('horario').value;
  const calorias = parseInt(document.getElementById('calorias').value);
  const alimentos = document.getElementById('alimentos').value;

  adicionarRefeicao(nome, horario, calorias, alimentos);
  form.reset();
});

function adicionarRefeicao(nome, horario, calorias, alimentos) {
  const item = document.createElement('li');
  item.innerHTML = `<strong>${nome}</strong> (${horario}) - ${calorias} kcal<br/><em>${alimentos}</em>`;
  lista.appendChild(item);
  totalCalorias += calorias;
  totalCaloriasTexto.textContent = `Total de calorias: ${totalCalorias}`;
}

function carregarModelo() {
  lista.innerHTML = '';
  totalCalorias = 0;

  const modelo = [
    {
      nome: 'Café da Manhã',
      horario: '07:00',
      calorias: 800,
      alimentos: 'Ovos mexidos, pão integral, leite com aveia e banana'
    },
    {
      nome: 'Lanche da Manhã',
      horario: '10:00',
      calorias: 400,
      alimentos: 'Iogurte natural com granola e mel'
    },
    {
      nome: 'Almoço',
      horario: '12:30',
      calorias: 1000,
      alimentos: 'Arroz, feijão, frango grelhado, salada, batata-doce'
    },
    {
      nome: 'Lanche da Tarde',
      horario: '16:00',
      calorias: 500,
      alimentos: 'Pão com pasta de amendoim e vitamina de frutas'
    },
    {
      nome: 'Jantar',
      horario: '19:30',
      calorias: 600,
      alimentos: 'Macarrão com carne moída, legumes e suco natural'
    },
    {
      nome: 'Ceia',
      horario: '22:00',
      calorias: 200,
      alimentos: 'Leite morno com bolachas integrais'
    }
  ];

  modelo.forEach(ref => {
    adicionarRefeicao(ref.nome, ref.horario, ref.calorias, ref.alimentos);
  });
} 