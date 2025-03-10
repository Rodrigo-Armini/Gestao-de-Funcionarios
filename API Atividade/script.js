const apiUrl = 'http://localhost:3000/atividades';

// Função para obter todas as atividades
function obterAtividades() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const lista = document.getElementById('listaAtividades');
      lista.innerHTML = '';
      data.forEach(atividade => {
        const li = document.createElement('li');
        li.textContent = `${atividade.id} - ${atividade.nome} - ${atividade.acao}`;
        lista.appendChild(li);
      });
    })
    .catch(error => console.error('Erro ao obter atividades:', error));
}

// Função para criar uma nova atividade
function criarAtividade() {
  const nome = document.getElementById('nome').value;
  const acao = document.getElementById('acao').value;

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, acao })
  })
    .then(response => response.json())
    .then(data => {
      alert('Atividade criada!');
    })
    .catch(error => console.error('Erro ao criar atividade:', error));
}

// Função para obter uma atividade por ID
function obterAtividadePorId() {
  const id = document.getElementById('idAtividade').value;

  fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(data => {
      const detalhes = document.getElementById('atividadeDetalhes');
      detalhes.innerHTML = `ID: ${data.id} <br> Nome: ${data.nome} <br> Acao: ${data.acao}`;
    })
    .catch(error => console.error('Erro ao obter atividade:', error));
}

// Função para atualizar uma atividade
function atualizarAtividade() {
  const id = document.getElementById('idAtualizar').value;
  const nome = document.getElementById('nomeAtualizar').value;
  const acao = document.getElementById('acaoAtualizar').value;

  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, acao })
  })
    .then(response => response.json())
    .then(data => {
      alert('Atividade atualizada!');
    })
    .catch(error => console.error('Erro ao atualizar atividade:', error));
}

// Função para excluir uma atividade
function excluirAtividade() {
  const id = document.getElementById('idExcluir').value;

  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
    .then(() => {
      alert('Atividade excluída!');
    })
    .catch(error => console.error('Erro ao excluir atividade:', error));
}

document.addEventListener("DOMContentLoaded", function() {
    // Função para salvar uma nova atividade
    const formCriarAtividade = document.getElementById('formCriarAtividade');
  
    formCriarAtividade.addEventListener('submit', function(event) {
      event.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
  
      // Obtém os valores do formulário
      const nome = document.getElementById('nome').value;
      const id = document.getElementById('id').value;
      const acao = document.getElementById('acao').value;
      const observacao = document.getElementById('observacao').value;
  
      // Cria um objeto com os dados do novo funcionário
      const novaAtividade = {
        nome: nome,
        id: id,
        acao: acao,
        observacao: observacao
      };
  
      // Realiza a requisição POST para criar uma nova atividade
      fetch('https://public.franciscosensaulas.com/api/atividade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaAtividade)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Atividade criada:', data);
        alert('Atividade criada com sucesso!');
        // Opcional: Redirecionar para a página principal ou outra página
        window.location.href = "index.html";
      })
      .catch(error => {
        console.error('Erro ao criar atividade:', error);
        alert('Erro ao criar atividade!');
      });
    });
  });
  