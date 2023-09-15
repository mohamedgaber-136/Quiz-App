let spans = document.getElementsByTagName("span");
let question = document.getElementById("question");
let lifes = document.getElementById("lifes");
let choices = document.getElementById("choices");
let body_ = document.getElementById("body_");
let results;
let x = 0;
let category_path;
let CurrentUser;
if (JSON.parse(sessionStorage.getItem("urlPath")) != null) {
  category_path = JSON.parse(sessionStorage.getItem("urlPath"));
} else {
  category_path = {};
}
if (JSON.parse(sessionStorage.getItem("CurrentUser")) != null) {
  CurrentUser = JSON.parse(sessionStorage.getItem("CurrentUser"));
} else {
  CurrentUser = {};
}
let newCurrentUser = { ...CurrentUser };
console.log(newCurrentUser,'CurrentUser')
let s = CurrentUser.questionNum;

score.innerHTML = CurrentUser.score;
console.log(CurrentUser);
let quesionsSession = category_path.results;

;
for (let i = 0; i < CurrentUser.lives; i++) {
  lifes.innerHTML += `<img src="red-heart-icon.svg" width="20px" alt=""> `;
}
console.log(CurrentUser.lives, "Current");
let imgs = [...document.getElementsByTagName("img")];
let copyimgs = [...imgs];
function getCategory() {
  question.innerHTML = `<div class="loader"></div>`;
  display();
}
for (let item of spans) {
  item.addEventListener("click", function () {
    console.log(this.innerHTML);
    if (this.innerHTML == quesionsSession[s].correct_answer) {
      s++;
      CurrentUser.questionNum = s;
      CurrentUser.score += 10;
      score.innerHTML = CurrentUser.score;
      audioCorrect.play()
      console.log(CurrentUser.score, "score");
      sessionStorage.setItem("CurrentUser", JSON.stringify(CurrentUser));
      display();
    } else {
      if (copyimgs.length > 0) {
        this.classList.add("shakes");
        this.setAttribute('disabled','')
        audioFalied.play()
        lifes.removeChild(imgs[x]);
        CurrentUser.lives--;
        sessionStorage.setItem("CurrentUser", JSON.stringify(CurrentUser));
        copyimgs.pop();
        x++;
      } else {
        location.replace('end.html');
      }
    }
  });
}
console.log(s)
console.log(quesionsSession[0].question)
function display() {
  question.innerHTML = quesionsSession[s].question;
  let x = quesionsSession[s].incorrect_answers;
  let cohicesAnswers = [quesionsSession[s].correct_answer, ...x];
  spans[0].style.opacity = "1";
  var a = [];
  if (cohicesAnswers.length > 2) {
    a = [0, 1, 2, 3];
  } else {
    a = [0, 1];
  }
  for (i = a.length; i--; ) {
    var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    spans[i].innerHTML = cohicesAnswers[random];
    spans[i].style.opacity = "1";
    spans[i].classList.remove("shakes");
  }
}

getCategory();

