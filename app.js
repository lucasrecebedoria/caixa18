import { db, auth } from './firebase.js';
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Simples: Login / Registro
document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.getElementById("btnLogin");
  const btnRegistrar = document.getElementById("btnRegistrar");
  const showRegister = document.getElementById("showRegister");

  if(showRegister){
    showRegister.addEventListener("click", ()=>{
      document.getElementById("registerForm").style.display = "block";
    });
  }

  if(btnRegistrar){
    btnRegistrar.addEventListener("click", async ()=>{
      alert("Cadastro simulado! Salvaria em Firestore + Auth.");
    });
  }

  if(btnLogin){
    btnLogin.addEventListener("click", ()=>{
      window.location.href = "dashboard.html";
    });
  }

  const btnLogout = document.getElementById("btnLogout");
  if(btnLogout){
    btnLogout.addEventListener("click", ()=>{
      window.location.href = "index.html";
    });
  }
});
