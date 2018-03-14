const masterProfileObject = { categoryOne: 0, categoryTwo: 0 , categoryThree: 0 , categoryFour: 0 };

function answerSelection(formName) {


    let inputs = formName.childNodes;
    let inputValues = null

    //finds the radio button within each form that has been pressed and
    // stores it a local inputValues variable
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].checked)
        inputValues = inputs[i].getAttribute("category");
    }

    console.log(inputValues)

    switch(true) {
        case (inputValues === "one"):
            addPoints("categoryOne");
            break;

        case (inputValues === "two"):
            addPoints("categoryTwo");
            break;

        case (inputValues === "three"):
            addPoints("categoryThree");
            break;

        case (inputValues === "four"):
            addPoints("categoryFour");
            break;
    }
    console.log(masterProfileObject)

};

function addPoints(categoryName) {
    masterProfileObject[categoryName] += 1;
};

function getAnswers() {
  var submitForm = new Event('formSubmit', {
         'view'       : window,
         'bubbles'    : true,
         'cancelable' : true
     });
  questionAnswers = document.getElementsByClassName('answers')
  for (let i = 0; i < questionAnswers.length; i++) {



    questionAnswers[i].addEventListener('formSubmit', function(e) {
      answerSelection(this);
    })

    questionAnswers[i].dispatchEvent(submitForm)

  }
}

var submitAllAnswers = document.querySelector("#submitAllAnswers")
  submitAllAnswers.addEventListener("click", function(){
    getAnswers()
})
