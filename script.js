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
firebase.initializeApp(firebaseConfig);

// Referência ao serviço de banco de dados
const database = firebase.database();
const usersRef = database.ref('users');

// Função para salvar dados
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;

    // Adiciona um novo usuário ao banco de dados
    usersRef.push().set({
        name: name
    });

    // Limpa o campo de entrada
    document.getElementById('name').value = '';
});

// Função para listar usuários salvos
usersRef.on('value', function(snapshot) {
    const usersList = document.getElementById('users');
    usersList.innerHTML = '';
    snapshot.forEach(function(childSnapshot) {
        const childData = childSnapshot.val();
        const li = document.createElement('li');
        li.textContent = childData.name;
        usersList.appendChild(li);
    });
});
