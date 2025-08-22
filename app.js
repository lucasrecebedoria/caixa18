// Funções básicas

// Toggle registro
function toggleRegister(){
  document.getElementById("registerContainer").style.display = "block";
}

// Login
document.getElementById("btnLogin")?.addEventListener("click", async () => {
  const matricula = document.getElementById("loginMatricula").value;
  const senha = document.getElementById("loginSenha").value;
  try {
    const cred = await auth.signInWithEmailAndPassword(matricula + "@mail.com", senha);
    localStorage.setItem("matricula", matricula);
    window.location.href = "dashboard.html";
  } catch (e) {
    alert("Erro no login: " + e.message);
  }
});

// Registro
document.getElementById("btnRegister")?.addEventListener("click", async () => {
  const matricula = document.getElementById("regMatricula").value;
  const nome = document.getElementById("regNome").value;
  const senha = document.getElementById("regSenha").value;
  try {
    const cred = await auth.createUserWithEmailAndPassword(matricula + "@mail.com", senha);
    await db.collection("usuarios").doc(matricula).set({ matricula, nome, admin: ['4144','70029','6266'].includes(matricula) });
    alert("Registrado com sucesso!");
    window.location.href = "index.html";
  } catch (e) {
    alert("Erro no registro: " + e.message);
  }
});

// Caixa
function abrirCaixa(){
  localStorage.setItem("caixaAberto", "true");
  document.getElementById("abastecimentoForm").style.display = "block";
}
function fecharCaixa(){
  localStorage.removeItem("caixaAberto");
  document.getElementById("abastecimentoForm").style.display = "none";
}

// Abastecimento
async function salvarAbastecimento(){
  const matricula = localStorage.getItem("matricula");
  const validador = document.getElementById("validador").value;
  const qtd = parseInt(document.getElementById("qtdBordos").value);
  const valor = qtd * 5;
  const prefixo = "55" + document.getElementById("prefixo").value;
  const motorista = document.getElementById("matMotorista").value;
  const data = new Date().toLocaleString("pt-BR");
  await db.collection("relatorios").add({
    matricula, validador, qtd, valor, prefixo, motorista, data
  });
  alert("Abastecimento registrado!");
}

// Relatórios
async function carregarRelatorios(){
  const dataFiltro = document.getElementById("filterDate").value;
  const snapshot = await db.collection("relatorios").get();
  const container = document.getElementById("relatoriosContainer");
  container.innerHTML = "";
  snapshot.forEach(doc => {
    const d = doc.data();
    if(!dataFiltro || d.data.startsWith(dataFiltro.split("-").reverse().join("/"))){
      container.innerHTML += `<p>${d.data} - ${d.matricula} - R$${d.valor}</p>`;
    }
  });
}

// Logout
function logout(){
  auth.signOut();
  localStorage.clear();
  window.location.href = "index.html";
}