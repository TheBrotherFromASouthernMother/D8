function initAnswerStyles() {
  let answers = document.querySelectorAll(".answer");
  for (let i = 0; i < answers.length; i ++) {
    answers[i].checked = false;
    answers[i].addEventListener("click", function(e) {


      if (answers[i].checked === false) {
        answers[i].checked = true

      } else {
        answers[i].checked = false;
      }


      if(answers[i].checked) {
        answers[i].style.color = "blue";
      } else if (answers[i].checked === false) {
        answers[i].style.color = "black"
      }

    })

    answers[i].addEventListener("mouseover", function(e) {
      answers[i].style.cursor = "pointer"
    })

    answers[i].addEventListener("mouseleave", function(e) {
      answers[i].style.cursor = "initial"
    })
    console.log(answers[i].checked)
  }



}

initAnswerStyles()
