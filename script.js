let categoryList = document.getElementById("categoryList");
let difficulty = document.getElementById("difficulty");
let userData = document.getElementById("userData");
let data = JSON.parse(sessionStorage.getItem("CurrentUser"));
userData.innerHTML = `Welcome ${data.name} `;
async function quizAPP() {
  const respons = await fetch("https://opentdb.com/api_category.php");
  const categoris = await respons.json();
  let cartona = "";
  for (let i = 0; i < categoris.trivia_categories.length; i++) {
    cartona += `<li onclick='categ(this)'id=${categoris.trivia_categories[i].id}>${categoris.trivia_categories[i].name}</li>`;
  }
  categoryList.innerHTML = cartona;
}
quizAPP();
async function categ(t) {
  let urlPath = `https://opentdb.com/api.php?amount=10&category=${t.id}&difficulty=${difficulty.value}`;
  let category = await fetch(urlPath);
  let respons = await category.json();
  sessionStorage.setItem("urlPath", JSON.stringify(respons));
  console.log(urlPath);
  replacePage()
}
function replacePage() {
  setTimeout(location.replace("question.html"), 4000);
}
function leavePage(){
  sessionStorage.removeItem("CurrentUser");
  location.replace('index.html')
}