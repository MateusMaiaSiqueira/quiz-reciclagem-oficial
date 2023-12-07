document.addEventListener("DOMContentLoaded", () => {
  loadRanking();
});

function loadRanking() {
  const rankingTable = document.getElementById("ranking-table");
  const rankingBody = rankingTable.querySelector("tbody");

  // Obtém os dados do localStorage
  const storedData = JSON.parse(localStorage.getItem('quizData')) || {};

  // Converte os dados do localStorage em um array de objetos
  const rankingData = Object.keys(storedData).map(username => ({
    username,
    score: storedData[username]
  }));

  // Ordena o array em ordem decrescente de pontuação
  rankingData.sort((a, b) => b.score - a.score);

  // Preenche a tabela com os dados do ranking
  rankingBody.innerHTML = "";
  rankingData.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${entry.username}</td><td>${entry.score}</td>`;
    rankingBody.appendChild(row);
  });
}

