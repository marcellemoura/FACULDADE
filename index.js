const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Perfeito."
      break
    case (performance >= 70):
      message = "Ótimo."
      break
    case (performance >= 50):
      message = "Bom."
      break
    default:
      message = "Preicasa melhorar bastante."
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Respondidas corretamente: ${totalCorrect} de ${totalQuestions}.
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Tente outra vez
    </button>
  `
}


const questions = [
  {
    question: "Como são chamadas as três camadas do coração?",
    answers: [
      { text: "Miocárdio, endocárdio e mesocárdio", correct: false },
      { text: "Mesocárdio, endocárdio e pericárdio", correct: false },
      { text: "Miocárdio, pericárdio e endocárdio", correct: true },
      { text: "Miocárdio, mesocárdio e pericárdio", correct: false }
    ]
  },
  {
    question: "Em relação à circulação humana, é incorreto afirmar que:",
    answers: [
      { text: "Todo sangue que chega ao coração é sangue venoso.", correct: true },
      { text: "O sangue rico em oxigênio é o arterial.", correct: false },
      { text: "Todo vaso que chega ao coração é veia.", correct: false },
      { text: "Todo vaso que sai do coração é artéria.", correct: false }
    ]
  },
  {
    question: "É uma célula microscópica, constituída por três partes principais: cabeça, peça intermediária e cauda:",
    answers: [
      { text: "Mórula", correct: false },
      { text: "Embriologia", correct: false },
      { text: "Zigoto", correct: false },
      { text: "Espermatozóide", correct: true }
    ]
  },
  {
    question: "A área da biologia dedicada ao estudo e pesquisa do desenvolvimento embrionário dos seres vivos, desde a fecundação até o nascimento:",
    answers: [
        {text: "Gastroenterite", correct: false},
        {text: "Embriologia", correct: true}
        

    ]
  },
  {
    question: "Qual o significado da palavra Capsídeo?",
    answers: [
      { text: "Membrana lipoprotéica que envolve o nucleocapsídeo", correct: false },
      { text: "Mecanismo pelo qual um vírus adere uma célula", correct: false },
      { text: "Núcleo presente no interior da célula dos vírus", correct: false },
      { text: "Capa de proteínas que envolve e protege o material genético", correct: true }
    ]
  },
  {
    question: "Caso Clínico: R.C chega ao atendimento queixando-se de palpitações, dispneia e vertigem, relata também que seu cabelo está caindo mais que o comum. Apresenta PA 13/9, bom 128, palidez conjuntival, unhas esbranquiçadas e sopro ejetivo. Dadas as informações, pode-se supor que a mesma apresenta qual tipo de anemia?",


    answers: [
      { text: "Anemia ferropriva", correct: true },
      { text: "Anemia aplástica", correct: false },
      { text: "Anemia falciforme", correct: false },
      { text: "Talassemia", correct: false }
    ]
  }
  
]





    