// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg197a6q4vDsfONJkSYOxKZwuTOFBjXkE",
  authDomain: "rakan-cloud.firebaseapp.com",
  projectId: "rakan-cloud",
  storageBucket: "rakan-cloud.firebasestorage.app",
  messagingSenderId: "356272446906",
  appId: "1:356272446906:web:57cde6cfce7c53ea2cd183"
};

// Initialize Firebase (COMPAT)
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();


// ✅ Register new user
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Registered successfully"))
    .catch(error => alert(error.message));
}


// ✅ Login user
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("auth-section").style.display = "none";
      document.getElementById("todo-section").style.display = "block";
      loadTasks();
    })
    .catch(error => alert(error.message));
}


// ✅ Logout
function logout() {
  auth.signOut().then(() => location.reload());
}


// ✅ Add task
function addTask() {
  const task = document.getElementById("taskInput").value;
  const user = auth.currentUser;

  if (!task) return;

  db.collection("tasks").add({
    text: task,
    uid: user.uid
  });

  document.getElementById("taskInput").value = "";
}


// ✅ Load tasks
function loadTasks() {
  const user = auth.currentUser;

  db.collection("tasks")
    .where("uid", "==", user.uid)
    .onSnapshot(snapshot => {
      const list = document.getElementById("taskList");
      list.innerHTML = "";

      snapshot.forEach(doc => {
        const li = document.createElement("li");
        li.textContent = doc.data().text;

        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.onclick = () => db.collection("tasks").doc(doc.id).delete();

        li.appendChild(btn);
        list.appendChild(li);
      });
    });
}
