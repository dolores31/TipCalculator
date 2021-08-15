"use strict";

/*-------------------- initialized variables --------------------*/
const bill = document.getElementById("bill");
const tips = document.querySelectorAll(".tip-selection input");
const tip5 = document.getElementById("tip5");
const tip10 = document.getElementById("tip10");
const tip15 = document.getElementById("tip15");
const tip25 = document.getElementById("tip25");
const tip50 = document.getElementById("tip50");
const tipcustom = document.getElementById("tipcustom");
// takes the tip value removes % and turns it into a number
const tip5value = Number(tip5.value.replace("%", ""));
const tip10value = Number(tip10.value.replace("%", ""));
const tip15value = Number(tip15.value.replace("%", ""));
const tip25value = Number(tip25.value.replace("%", ""));
const tip50value = Number(tip50.value.replace("%", ""));

const people = document.getElementById("people");
const peopleError = document.getElementById("people-error");

const tipAmount = document.querySelector("#tipAmount h2 span");
let totalTip; // total tip
let tipPerPerson; // total tip/people
const totalAmount = document.querySelector("#totalAmount h2 span");
let total; // total (bill/people)
let totalPerPerson; // total amount/people

const reset = document.getElementById("reset");

/*-------------------- functions --------------------*/

// adds 'active' class to bill & tipcustom
const inputClass = function (id) {
  id.addEventListener("input", function () {
    if (id.value != "") {
      id.className = "active";
    }
  });
};
inputClass(bill);
inputClass(tipcustom);

// loops through tip-selection and adds 'active' class only when clicked and removes it to siblings
for (let t = 0; t < tips.length; t++) {
  tips[t].addEventListener("click", function () {
    let noClass = 0;
    while (noClass < tips.length) {
      tips[noClass++].className = "";
    }
    tips[t].className = "active";
  });
}

// calculates tip & total per person based on tips 'active' class
const tipTotalCalc = function (tipName, tipVal) {
  if (tipName.classList.contains("active")) {
    totalTip = (bill.value / 100) * tipVal;
    tipPerPerson = totalTip / people.value;
    tipAmount.textContent = tipPerPerson.toFixed(2);

    totalPerPerson = bill.value / people.value;
    totalAmount.textContent = (totalPerPerson + tipPerPerson).toFixed(2);
  }
  // tipcustom (if not clicked - no 'active' class)
  if (tipVal == "") {
    total = bill.value / people.value;
    totalAmount.textContent = total.toFixed(2);
  }
};

// if number of people has value
people.addEventListener("input", function () {
  if (people.value == "0") {
    people.className = "error";
    peopleError.textContent = "Can't be zero";
  } else if (people.value == "") {
    people.className = "error";
    peopleError.textContent = "Can't be blank";
  } else {
    people.className = "active";
    peopleError.textContent = "";
    reset.removeAttribute("disabled");
    reset.className = "active";

    // calculate tips
    tipTotalCalc(tip5, tip5value);
    tipTotalCalc(tip10, tip10value);
    tipTotalCalc(tip15, tip15value);
    tipTotalCalc(tip25, tip25value);
    tipTotalCalc(tip50, tip50value);
    tipTotalCalc(tipcustom, tipcustom.value);
  }
});

// when reset button is clicked - goes back to default
reset.addEventListener("click", function () {
  if (reset.classList.contains("active")) {
    bill.value = "";
    bill.className = "";
    for (let t = 0; t < tips.length; t++) {
      tips[t].className = "";
    }
    people.value = "";
    tipAmount.textContent = "0.00";
    totalAmount.textContent = "0.00";
  }
});
