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
  $(".question-and-score").html(html);
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