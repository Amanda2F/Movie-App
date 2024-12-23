// Função para alternar a visibilidade da senha
const togglePassword = document.getElementById("toggle-password");
const passwordField = document.getElementById("password");

togglePassword.addEventListener("click", () => {
    // Verifica o tipo do input de senha e alterna entre 'password' e 'text'
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;
});

// Função de logout que redireciona o usuário
function logout() {
    localStorage.removeItem("authToken"); // Remove o token do localStorage
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/FORM-LOGIN/index.html"; // Redireciona para a página de login
}

// Carregar os dados do usuário logado ao carregar a página
window.addEventListener('DOMContentLoaded', (event) => {
    const token = localStorage.getItem("authToken");

    if (token) {
        // Fazendo uma requisição GET para buscar os dados do perfil
        fetch("http://localhost:8080/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Envia o token no cabeçalho
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                // Preencher o nome do usuário no perfil
                document.getElementById("username").textContent = data.user.name;
                // Preencher os campos com os dados do usuário
                document.getElementById("name").value = data.user.name;
                document.getElementById("email").value = data.user.email;
                document.getElementById("password").value = ''; // Senha não deve ser carregada por questões de segurança
            } else {
                alert("Não foi possível carregar os dados do perfil.");
            }
        })
        .catch(error => {
            alert("Erro ao carregar dados do perfil.");
            console.error("Erro:", error);
        });
    } else {
        alert("Você não está autenticado.");
        window.location.href = "/FORM-LOGIN/index.html"; // Redireciona para a página de login se não houver token
    }
});

// Manipulando o envio do formulário de edição de perfil
document.getElementById("profile-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Enviar os dados alterados para o servidor (exemplo usando fetch)
    fetch("http://localhost:8080/user", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}` // Envia o token no cabeçalho
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data) {
            alert("Perfil atualizado com sucesso!");
        } else {
            alert("Erro ao atualizar perfil.");
        }
    })
    .catch(error => {
        alert("Erro ao atualizar perfil.");
        console.error("Erro:", error);
    });

});

// Cabeçalho
document.querySelector('.btn-outline-secondary').addEventListener('click', function () {
    const query = document.querySelector('.form-control').value;
    if (query.trim() !== "") {
        alert(`Você buscou por: ${query}`);
    } else {
        alert("Por favor, insira algo na barra de pesquisa.");
    }
  });

const homeRedirectButton = document.querySelector(".home-btn");

homeRedirectButton.addEventListener("click", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        // Redireciona para a página inicial
        window.location.href = "/pagina_inicial/index.html"; // Altere para a rota real da página inicial
    } else {
        // Caso o usuário não esteja logado, redireciona para a página de login
        window.location.href = "/FORM-LOGIN/index.html"; // Altere para a rota da página de login
    }
});
