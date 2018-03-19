//Creates object that stores values from quiz.

const masterProfileObject = {
  categoryOne: 0,
  categoryTwo: 0,
  categoryThree: 0,
  categoryFour: 0
};

// Allows data from masterProfileObject to be transferred in a variable named 'userAnswers' to NewRestaurants.js file.

localStorage.setItem("userAnswers", JSON.stringify(masterProfileObject))

/* Retrieves 'answer' classes and saves it to 'questionAnswers' variable. Runs for loop over the length of the
HTML collection and runs the answerSelection function on each index. */

function getAnswers() {
  let questionAnswers = document.querySelectorAll('.answer');
  for (let i = 0; i < questionAnswers.length; i++) {
      answerSelection(questionAnswers[i]);
  }
  localStorage.setItem("userAnswers", JSON.stringify(masterProfileObject))
}

/* Assign click function to submit button and runs getAnswers function. */

let submitAllAnswers = document.querySelector("#submitAllAnswers")
  console.log(submitAllAnswers)
  submitAllAnswers.addEventListener("click", function(){
    getAnswers()
    console.log(window.location.assign("/Users/christianlowe/.atom/D8/results.html"))
})

/* Creates 'inputValue' variable. Checks for selected answer and retrieves value from the current index
in the HTML collection element and assigns then runs addPoints function on proper category within 'masterProfileObject'. */

function answerSelection(answer) {
    let inputValue = null
    //finds the radio button within each form that has been pressed and
    // stores it a local inputValues variable
    if (answer.checked === true) {
          inputValue = answer.getAttribute("value");
          console.log(inputValue)
    } else {
        return false;
    }

    switch(inputValue !== null) {
        case (inputValue === "1"):
            addPoints("categoryOne");
            break;

        case (inputValue === "2"):
            addPoints("categoryTwo");
            break;

        case (inputValue === "3"):
            addPoints("categoryThree");
            break;

        case (inputValue === "4"):
            addPoints("categoryFour");
            break;
    }
    console.log(masterProfileObject)

};

function addPoints(categoryName) {
    masterProfileObject[categoryName] += 1;
};
