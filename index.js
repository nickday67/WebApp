function startQuiz() {
  $('#start').on('click', function(event){
    renderTheQuestion();
  }
  );
}

function updateQuestionsAndScore() {
  const html = $(`<ul>
      <li id="js-answered">Questions Number: ${STORE.currentQuestion + 1}/${STORE.questions.length}</li>
      <li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
    </ul>`);
  $(".questions-and-score").html(html);
}

function updateOptions() {
  let question = STORE.questions[STORE.currentQuestion];
  for(let i=0; i<question.options.length; i++) {
    $('.js-options').append(`
        <input type = "radio" name="options" id="option${i+1}" value= "${question.options[i]}" tabindex ="${i+1}"> 
        <label for="option${i+1}"> ${question.options[i]}</label> <br/>
        <span id="js-r${i+1}"></span>
    `);
  }
}

function renderTheQuestion() {
  let question = STORE.questions[STORE.currentQuestion];
  updateQuestionsAndScore();
  const questionHtml = $(`
  <div>
    <form id="js-questions" class="question-form">
      
      <fieldset>
        <div class="container question">
          <div class="con-2">
            <legend> ${question.question}</legend>
          </div>
        </div>

        <div class="container options">
          <div class="con-2">
            <div class="js-options"> </div>
          </div>
        </div>
    
        <div class="container">
          <div class="con-2">
            <button type = "submit" id="answer" tabindex="5">Submit</button>
            <button type = "button" id="next-question" tabindex="6"> Next >></button>
          </div>         
        </div>
      </fieldset>
    </form>
  </div>`);
$("main").html(questionHtml);
updateOptions();
$("#next-question").hide();
}

function displayResults() {
  let resultHtml = $(
    `<div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="container">
            <div class="con-2">
              <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
            </div>
          </div>
        
          <div class="container">
            <div class="con-2">
              <button type="button" id="restart"> Restart Quiz </button>
            </div>
          </div>
        </fieldset>
    </form>
    </div>`);
    STORE.currentQuestion = 0;
    STORE.score = 0;
  $("main").html(resultHtml);
}

function handleQuestions() {
  $('body').on('click','#next-question', (event) => {
    STORE.currentQuestion === STORE.questions.length?displayResults() : renderTheQuestion();
  });
}

function handleSelectOption() {
  $('body').on("submit",'#js-questions', function(event) {
    event.preventDefault();
    let currentQues = STORE.questions[STORE.currentQuestion];
    let selectedOption = $("input[name=options]:checked").val();
    if (!selectedOption) {
      alert("Choose an option");
      return;
    }
    let id_num = currentQues.options.findIndex(i => i === selectedOption);
    let id = "#js-r" + ++id_num;    
    $('span').removeClass("right-answer wrong-answer");
    if(selectedOption === currentQues.answer) {
      STORE.score++;
      $(`${id}`).append(`OMG, you're so smart!!! <br/>`);
      $(`${id}`).addClass("right-answer");
    }
    else {
      $(`${id}`).append(`Tsk tsk, better try again! <br/> The answer is: ${currentQues.answer}<br/>`);
      $(`${id}`).addClass("wrong-answer");
    }  

    STORE.currentQuestion++;
    $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
    $('#answer').hide();
    $("input[type=radio]").attr('disabled', true);
    $('#next-question').show();
  });
}

function restartQuiz() {
  $('body').on('click','#restart', (event) => {
    renderTheQuestion();
  });
}

function handleQuizApp() {
  startQuiz();
  handleQuestions();
  handleSelectOption();
  restartQuiz();
}

$(handleQuizApp);