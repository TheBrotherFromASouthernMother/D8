masterProfileObject = { categoryOne: 0, categoryTwo: 0 , categoryThree: 0 , categoryFour: 0 };

function answerSelection(formName) {

    var input = formName['category'].value;
    switch(input) {
        case ((input) === 1):
            addPoints(categoryOne);
            break;

        case ((input) === 2):
            addPoints(categoryTwo);
            break;

        case ((input) === 3):
            addPoints(categoryThree);
            break;

        case ((input) === 4):
            addPoints(categoryFour);
            break;
    }
};

function addPoints(categoryName) {
    masterProfileObject[categoryName] + 1;
};

function getAnswers() {
  questionAnswers = document.getElementsByClassName('answers')
  for (let i = 0; i < questionAnswers.length; i++) {

    var submitForm = new Event('formSubmit', {
           'view'       : window,
           'bubbles'    : true,
           'cancelable' : true
       });

    questionAnswers[i].addEventListener('formSubmit', function(e) {
      answerSelection(e.target);
    })

    questionAnswers[i].dispatchEvent(submitForm)

  }
}

var submitAllAnswers = document.querySelector("#submitAllAnswers")
submitAllAnswers.addEventListener("click", function(){
  getAnswers()
})
