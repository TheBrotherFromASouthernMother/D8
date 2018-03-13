masterProfileObject = { categoryOne: 0, categoryTwo: 0 , categoryThree: 0 , categoryFour: 0 };

function answerSelection(formName) {
    
    var input = formName['category'].value;
    switch(x) {
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

questionAnswers = document.getElementsByClassName('answers')
for (let i = 0; i < questionAnswers.length; i++) {
  answerSelection(questionAnswers[i]);
}


