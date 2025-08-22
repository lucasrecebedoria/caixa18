import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { doc, setDoc, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Registro e Login
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

if(showRegister){
  showRegister.addEventListener('click', () => {
    document.querySelector('.login-container').classList.add('hidden');
    document.querySelector('.register-container').classList.remove('hidden');
  });
}
if(showLogin){
  showLogin.addEventListener('click', () => {
    document.querySelector('.register-container').classList.add('hidden');
    document.querySelector('.login-container').classList.remove('hidden');
  });
}

if(registerForm){
  registerForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const matricula = document.getElementById('matriculaRegister').value;
    const nome = document.getElementById('nomeRegister').value;
    const senha = document.getElementById('senhaRegister').value;
    try {
      const email = matricula + "@mail.com";
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      await setDoc(doc(db, "usuarios", userCredential.user.uid), { matricula, nome });
      alert("Registro concluído! Faça login.");
      window.location.href="index.html";
    } catch (err) { alert("Erro no registro: "+err.message); }
  });
}

if(loginForm){
  loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const matricula = document.getElementById('matriculaLogin').value;
    const senha = document.getElementById('senhaLogin').value;
    try {
      const email = matricula + "@mail.com";
      await signInWithEmailAndPassword(auth, email, senha);
      window.location.href="dashboard.html";
    } catch (err) { alert("Erro no login: "+err.message); }
  });
}

// Dashboard e abastecimento
onAuthStateChanged(auth, async (user)=>{
  if(user){
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn){
      logoutBtn.classList.remove('hidden');
      logoutBtn.addEventListener('click', ()=>signOut(auth));
    }
  }
});