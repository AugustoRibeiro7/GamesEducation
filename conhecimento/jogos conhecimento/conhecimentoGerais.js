const quizData = [
    {
        question: 'Qual é a capital do Brasil?',
        options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
        correctAnswer: 'Brasília'
    },

    {
        question: 'De onde é a invenção do chuveiro elétrico?',
        options: ['França', 'Estados Unidos', 'Brasil', 'Canada'],
        correctAnswer: 'Brasil'
    },

    {
        question: 'Quantas casas decimais tem o número pi?',
        options: ['Duas', 'Infinitas', 'Centenas', 'Vinte'],
        correctAnswer: 'Infinitas'
    },

    {
        question: ' Atualmente, quantos elementos químicos a tabela periódica possui?',
        options: ['108', '119', '75', '118'],
        correctAnswer: '118'
    },

    {
        question: 'Quanto tempo a luz do Sol demora para chegar à Terra?',
        options: ['8 minutos', '1 dia', '12 minutos', '12 segundos'],
        correctAnswer: '8 minutos'
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const questionElement = document.getElementById('question');
  const optionsContainer = document.getElementById('options-container');
  const nextButton = document.getElementById('next-button');

  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;

    optionsContainer.innerHTML = '';

    currentQuizData.options.forEach((option) => {
      const button = document.createElement('button');
      button.innerText = option;
      button.classList.add('btn', 'btn-op');
      button.addEventListener('click', () => checkAnswer(option, button));
      optionsContainer.appendChild(button);
    });

    nextButton.disabled = true;
  }

  function checkAnswer(answer, selectedOption) {
    const currentQuizData = quizData[currentQuestion];
    if (answer === currentQuizData.correctAnswer) {
      score++;
      selectedOption.classList.add('btn-success'); // Adiciona uma classe para destacar a opção correta
    } else {
      selectedOption.classList.add('btn-danger'); // Adiciona uma classe para destacar a opção errada
    }

    const buttons = optionsContainer.querySelectorAll('.btn');
    buttons.forEach((button) => {
      button.disabled = true;
    });

    nextButton.disabled = false;
  }

  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    questionElement.innerText = `Você acertou ${score} de ${quizData.length} perguntas!`;
    optionsContainer.innerHTML = '';
    nextButton.style.display = 'none';
  }

  loadQuestion();