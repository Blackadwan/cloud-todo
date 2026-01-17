// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg197a6q4vDsfONJkSYOxKZwuTOFBjXkE",
  authDomain: "rakan-cloud.firebaseapp.com",
  projectId: "rakan-cloud",
  storageBucket: "rakan-cloud.firebasestorage.app",
  messagingSenderId: "356272446906",
  appId: "1:356272446906:web:57cde6cfce7c53ea2cd183",
  measurementId: "G-FTT08DWRY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Register new user
function registerUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log("User registered:", userCredential.user.uid);
    })
    .catch(error => {
      console.error("Error registering:", error.message);
    });
}
// Login user
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById("auth-section").style.display = "none";
            document.getElementById("todo-section").style.display = "block";
            loadTasks();
        })
        .catch(err => alert(err.message));
}

// Logout
function logout() {
    auth.signOut();
    location.reload();
}

// Add task
function addTask() {
    const task = document.getElementById("taskInput").value;
    const user = auth.currentUser;

    db.collection("tasks").add({
        text: task,
        uid: user.uid
    });

    document.getElementById("taskInput").value = "";
}

// Load tasks
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
