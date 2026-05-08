function mostrar(pagina) {
  document.getElementById("home").style.display = "none";
  document.getElementById("temp").style.display = "none";
  document.getElementById("tarefas").style.display = "none";

  document.getElementById(pagina).style.display = "flex";
  document.getElementById(pagina).style.flexDirection = "column";

  if (pagina === "home") {
    carregarTarefas();
  }
}


async function buscar() {

  const cidade = document.getElementById("cidade").value;

  if (!cidade) {
    alert("Digite uma cidade!");
    return;
  }

  const apiKey = "bdf24c2686be000dc3a0ef134c0c15d6";

  try {

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
    );

    const dados = await res.json();

    if (dados.cod != 200) {
      document.getElementById("resultado").innerText =
        "Cidade não encontrada.";
      return;
    }

    document.getElementById("resultado").innerHTML = `
      ${dados.name} - ${dados.main.temp}°C <br>
      ${dados.weather[0].description}
    `;

  } catch {

    document.getElementById("resultado").innerText =
      "Erro ao buscar clima";
  }
}


const url = 'http://localhost:3000/tarefas';
const tarefas = [];

carregarTarefas();

function carregarTarefas(){
    fetch(url + '/listar')
    .then(response => response.json())
    .then(data =>{
        tarefas.length = 0;
        tarefas.push(...data);
        listarCards();
    })
}

function listarCards(){
    const container = document.getElementById('lista');
    container.innerHTML = "";

    tarefas.forEach(tarefa =>{
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${tarefa.imagem}">
              <h2>${tarefa.nome}</h3>
              <p>${tarefa.descricao}</p>
              <p>Início: ${tarefa.inicio}</p>
              <p>Fim: ${tarefa.fim}</p>
              <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
          </div>
        `;
        container.appendChild(card);
    });
}

document.querySelector('.form-tarefa').addEventListener('submit', function(e){
    e.preventDefault();
    const novaTarefa = {
        nome: nome.value,
        descricao: descricao.value,
        inicio: inicio.value,
        fim: fim.value,
        imagem: imagem.value
      };
    
    fetch(url + '/cadastrar', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(novaTarefa)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro na API');
        }
    })
    .then(() => {
        alert("Tarefa adicionada com sucesso.");
        carregarTarefas();
    })
    .catch(() => {
        alert("Erro ao cadastrar tarefa.");
    })
})

function excluirTarefa(id){
    if(!confirm("Deseja excluir essa tarefa?"))return;
    fetch(`${url}/excluir/${id}`,{
        method: 'DELETE',
    })
    .then(()=>{
        alert("Tarefa excluída com sucesso.");
        carregarTarefas();
    })
    .catch(()=>alert("Erro ao excluir tarefa."));
}