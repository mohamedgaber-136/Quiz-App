const RegesterBtn = document.getElementById("RegesterBtn");
const fullName = document.getElementById("fullName");

RegesterBtn.addEventListener("click", () => {
  addusers();
});
function addusers() {
  if (nameValidation() == true ) {
    let user = {
      name: fullName.value,
      score:0,
      lives:3,
      questionNum:0
    };
    sessionStorage.setItem("CurrentUser", JSON.stringify(user));
    location.replace("category.html");
    clearData();
  } else {
    validname.style.display = "inline-block";
    validemail.style.display = "inline-block";
  }
}
function clearData() {
  fullName.value = "";
}
function nameValidation() {
  const regex = /[a-zA-Z]{3,}$/;
  if (regex.test(fullName.value)) {
    return true;
  }
}

