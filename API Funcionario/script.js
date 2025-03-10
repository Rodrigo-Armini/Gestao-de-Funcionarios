const apiUrl = 'http://localhost:3000/funcionarios';

// Função para obter todos os funcionários
function obterFuncionarios() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const lista = document.getElementById('listaFuncionarios');
      lista.innerHTML = '';
      data.forEach(funcionario => {
        const li = document.createElement('li');
        li.textContent = `${funcionario.id} - ${funcionario.nome} - ${funcionario.cargo}`;
        lista.appendChild(li);
      });
    })
    .catch(error => console.error('Erro ao obter funcionários:', error));
}

// Função para criar um novo funcionário
function criarFuncionario() {
  const nome = document.getElementById('nome').value;
  const cargo = document.getElementById('cargo').value;

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, cargo })
  })
    .then(response => response.json())
    .then(data => {
      alert('Funcionário criado!');
    })
    .catch(error => console.error('Erro ao criar funcionário:', error));
}

// Função para obter um funcionário por ID
function obterFuncionarioPorId() {
  const id = document.getElementById('idFuncionario').value;

  fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(data => {
      const detalhes = document.getElementById('funcionarioDetalhes');
      detalhes.innerHTML = `ID: ${data.id} <br> Nome: ${data.nome} <br> Cargo: ${data.cargo}`;
    })
    .catch(error => console.error('Erro ao obter funcionário:', error));
}

// Função para atualizar um funcionário
function atualizarFuncionario() {
  const id = document.getElementById('idAtualizar').value;
  const nome = document.getElementById('nomeAtualizar').value;
  const cargo = document.getElementById('cargoAtualizar').value;

  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, cargo })
  })
    .then(response => response.json())
    .then(data => {
      alert('Funcionário atualizado!');
    })
    .catch(error => console.error('Erro ao atualizar funcionário:', error));
}

// Função para excluir um funcionário
function excluirFuncionario() {
  const id = document.getElementById('idExcluir').value;

  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
    .then(() => {
      alert('Funcionário excluído!');
    })
    .catch(error => console.error('Erro ao excluir funcionário:', error));
}

document.addEventListener("DOMContentLoaded", function() {
    // Função para salvar um novo funcionário
    const formCriarFuncionario = document.getElementById('formCriarFuncionario');
  
    formCriarFuncionario.addEventListener('submit', function(event) {
      event.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
  
      // Obtém os valores do formulário
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const idade = document.getElementById('idade').value;
      const cargo = document.getElementById('cargo').value;
      const endereco = document.getElementById('endereco').value;
  
      // Cria um objeto com os dados do novo funcionário
      const novoFuncionario = {
        nome: nome,
        email: email,
        idade: parseInt(idade), // Convertendo a idade para número
        cargo: cargo,
        endereco: endereco
      };
  
      // Realiza a requisição POST para criar um novo funcionário
      fetch('https://public.franciscosensaulas.com/api/funcionarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoFuncionario)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Funcionário criado:', data);
        alert('Funcionário criado com sucesso!');
        // Opcional: Redirecionar para a página principal ou outra página
        window.location.href = "index.html";
      })
      .catch(error => {
        console.error('Erro ao criar funcionário:', error);
        alert('Erro ao criar funcionário!');
      });
    });
  });
  