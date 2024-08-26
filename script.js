// Importar funções do SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyANYYHTOibuIzzJ6mF2i74etK60kFr-2ZM",
  authDomain: "cadastro-6f709.firebaseapp.com",
  projectId: "cadastro-6f709",
  storageBucket: "cadastro-6f709.appspot.com",
  messagingSenderId: "876404108526",
  appId: "1:876404108526:web:d223abf4e68210a72117ff",
  measurementId: "G-4422XQJ0VY"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const usersRef = ref(database, 'users');

// Função para salvar dados
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;

    // Adiciona um novo usuário ao banco de dados
    const newUserRef = push(usersRef);
    set(newUserRef, {
        name: name
    }).then(() => {
        console.log("Dados salvos com sucesso.");
    }).catch((error) => {
        console.error("Erro ao salvar dados:", error);
    });

    // Limpa o campo de entrada
    document.getElementById('name').value = '';
});

// Função para listar usuários salvos
onValue(usersRef, function(snapshot) {
    const usersList = document.getElementById('users');
    usersList.innerHTML = '';
    snapshot.forEach(function(childSnapshot) {
        const childData = childSnapshot.val();
        const li = document.createElement('li');
        li.textContent = childData.name;
        usersList.appendChild(li);
    });
}, (error) => {
    console.error("Erro ao ler dados:", error);
});

