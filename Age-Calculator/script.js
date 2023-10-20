const btn = document.querySelector("#submit-btn");
const inputDate = document.querySelector("#calender");
const yearsDisplay = document.querySelector("#years");
const monthsDisplay = document.querySelector("#months");
const daysDisplay = document.querySelector("#days");

// resticting to select a date greater than todays date
inputDate.max = new Date().toISOString().split("T")[0];

btn.addEventListener("click", calculateAge);
inputDate.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateAge();
  }
});

function calculateAge() {
  let birthDate = new Date(inputDate.value);

  if (birthDate == " ") {
    alert("Enter a valid DOB");
  }
  let birth_date = birthDate.getDate();
  let birth_month = birthDate.getMonth() + 1;
  let birth_year = birthDate.getFullYear();

  console.log(`${birth_date}-${birth_month}-${birth_year}`);
  let today = new Date();

  let current_date = today.getDate();
  let current_month = today.getMonth() + 1;
  let current_year = today.getFullYear();

  let date, months, years;

  years = current_year - birth_year;

  // code to check if we are ahead of birth month
  if (current_month >= birth_month) {
    months = current_month - birth_month;
  } else {
    years--;
    months = 12 + current_month - birth_month;
  }

  //  // code to check if we are ahead of birth date
  if (current_date >= birth_date) {
    date = current_date - birth_date;
  } else {
    months--;
    date = 30 + current_date - birth_date;
  }

  yearsDisplay.innerHTML = years;
  monthsDisplay.innerHTML = months;
  daysDisplay.innerHTML = date;
}
