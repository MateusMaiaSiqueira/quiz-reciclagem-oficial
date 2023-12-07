import questions from './questions.js';

document.addEventListener("DOMContentLoaded", () => {
  const question = document.querySelector(".question");
  const answers = document.querySelector(".answers");
  const spnQtd = document.querySelector(".spnQtd");
  const textFinish = document.querySelector(".finish span");
  const content = document.querySelector(".content");
  const contentFinish = document.querySelector(".finish");
  const btnRestart = document.querySelector(".finish button");
  const scoreElement = document.querySelector(".current-score");

  const startDiv = document.querySelector(".start");
  const contentDiv = document.querySelector(".content");
  const finishDiv = document.querySelector(".finish");
  const usernameInput = document.getElementById("username");
  const verRankingLink = document.getElementById("verRankingLink");

  let currentIndex = 0;
  let totalPoints = 0;
  let currentPoints = 0;
  let currentStreak = 0;

  let shuffledQuestions;

  function startGame() {
    const username = usernameInput.value.trim();
    if (username !== "") {
      startDiv.style.display = "none";
      contentDiv.style.display = "flex";
      shuffledQuestions = shuffle([...questions]).slice(0, 10);
      loadQuestion();

      // Mova a linha abaixo para cá
      btnRestart.onclick = restartGame;
    } else {
      alert("Por favor, digite seu nome para começar o jogo.");
    }
  }

  function restartGame() {
    startDiv.style.display = "flex";
    contentDiv.style.display = "none";
    finishDiv.style.display = "none";

    currentIndex = 0;
    totalPoints = 0;
    currentPoints = 0;
    currentStreak = 0;
    scoreElement.textContent = currentPoints;

    usernameInput.value = "";
    // Oculta o link "Ver Ranking" ao reiniciar o jogo
    verRankingLink.style.display = "none";
  }

  function nextQuestion(e) {
    if (e.target.getAttribute("data-correct") === "true") {
      currentStreak++;
      totalPoints += 10 + currentStreak;
      currentPoints += 10 + currentStreak;
    } else {
      currentStreak = 0;
    }

    scoreElement.textContent = currentPoints;

    if (currentIndex < shuffledQuestions.length - 1) {
      currentIndex++;
      loadQuestion();
    } else {
      finish();
    }
  }

  function finish() {
    textFinish.innerHTML = `Pontuação Final: ${totalPoints}`;
    content.style.display = "none";
    contentFinish.style.display = "flex";
    
    // Salva o nome do participante e a pontuação no localStorage
    const username = usernameInput.value.trim();
    saveScoreToLocalStorage(username, totalPoints);

    // Mostra o link "Ver Ranking" ao final do jogo
    verRankingLink.style.display = "inline";
  }

  function loadQuestion() {
    spnQtd.innerHTML = `${currentIndex + 1}/${shuffledQuestions.length}`;
    const item = shuffledQuestions[currentIndex];
    answers.innerHTML = "";
    question.innerHTML = item.question;

    item.answers.forEach((answer) => {
      const div = document.createElement("div");

      div.innerHTML = `
      <button class="answer" data-correct="${answer.correct}">
        ${answer.option}
      </button>
      `;

      answers.appendChild(div);
    });

    document.querySelectorAll(".answer").forEach((item) => {
      item.addEventListener("click", nextQuestion);
    });
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function saveScoreToLocalStorage(username, score) {
    // Obtém os dados armazenados (se existirem)
    const storedData = JSON.parse(localStorage.getItem('quizData')) || {};

    // Adiciona os dados do usuário atual
    storedData[username] = score;

    // Salva os dados no localStorage
    localStorage.setItem('quizData', JSON.stringify(storedData));
  }

  // Mantenha o jogo no estado inicial antes de solicitar o nome do usuário
  startDiv.style.display = "flex";
  contentDiv.style.display = "none";
  finishDiv.style.display = "none";

  document.querySelector(".start button").addEventListener("click", startGame);
  document.querySelector(".finish button").addEventListener("click", restartGame);
});



