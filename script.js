// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyANYYHTOibuIzzJ6mF2i74etK60kFr-2ZM",
  authDomain: "cadastro-6f709.firebaseapp.com",
  databaseURL: "https://cadastro-6f709-default-rtdb.firebaseio.com/",
  projectId: "cadastro-6f709",
  storageBucket: "cadastro-6f709.appspot.com",
  messagingSenderId: "876404108526",
  appId: "1:876404108526:web:d223abf4e68210a72117ff",
  measurementId: "G-4422XQJ0VY"
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const usersRef = database.ref('users');

// Função para salvar dados
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;

    // Adiciona um novo usuário ao banco de dados
    const newUserRef = usersRef.push();
    newUserRef.set({
        name: name
    }).then(() => {
        console.log("Usuário salvo com sucesso.");
    }).catch((error) => {
        console.error("Erro ao salvar usuário:", error);
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
        li.textContent = `${childData.name} `;

        // Adicionar botão de excluir
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = function() {
            deleteUser(childSnapshot.key);
        };
        li.appendChild(deleteButton);

        // Adicionar botão de editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = function() {
            editUser(childSnapshot.key, childData.name);
        };
        li.appendChild(editButton);

        usersList.appendChild(li);
    });
}, (error) => {
    console.error("Erro ao ler dados:", error);
});

// Função para atualizar dados
function editUser(userId, oldName) {
    const newName = prompt("Edite o nome do usuário:", oldName);
    if (newName) {
        const userRef = usersRef.child(userId);
        userRef.set({
            name: newName
        }).then(() => {
            console.log("Usuário atualizado com sucesso.");
        }).catch((error) => {
            console.error("Erro ao atualizar usuário:", error);
        });
    }
}

// Função para excluir dados
function deleteUser(userId) {
    const userRef = usersRef.child(userId);
    userRef.remove().then(() => {
        console.log("Usuário excluído com sucesso.");
    }).catch((error) => {
        console.error("Erro ao excluir usuário:", error);
    });
}
