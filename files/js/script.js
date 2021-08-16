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
const notip = document.getElementById("notip");

// takes the tip value removes % and converts it into a number
const tip5value = Number(tip5.value.replace("%", ""));
const tip10value = Number(tip10.value.replace("%", ""));
const tip15value = Number(tip15.value.replace("%", ""));
const tip25value = Number(tip25.value.replace("%", ""));
const tip50value = Number(tip50.value.replace("%", ""));

const people = document.getElementById("people");
const peopleError = document.getElementById("people-error");

const tipAmount = document.querySelector("#tipAmount h2 span");
const totalAmount = document.querySelector("#totalAmount h2 span");

const reset = document.getElementById("reset");

// sums initialization
let totalTip = 0; // total tip
let tipPerPerson = 0; // total tip/people
let total = 0; // total (bill/people)
let totalPerPerson = 0; // total amount/people

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

// calculates tip & total per person based on tips 'active' class
const tipTotalCalc = function (tipName, tipVal) {
  if (tipName.classList.contains("active")) {
    totalTip = (bill.value / 100) * tipVal;
    tipPerPerson = totalTip / people.value;
    tipAmount.textContent = tipPerPerson.toFixed(2);

    totalPerPerson = bill.value / people.value + tipPerPerson;
    totalAmount.textContent = totalPerPerson.toFixed(2);
  }
};

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

// if number of people has value only then it calculates
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

    // if there's no tip selected
    tipTotalCalc(notip, notip.value);
    // if one of the tips are selected
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
    tipcustom.value = "";

    people.value = "";
    people.className = "";

    notip.className = "active";

    totalTip = 0;
    tipPerPerson = 0;
    total = 0;
    totalPerPerson = 0;

    tipAmount.textContent = "0.00";
    totalAmount.textContent = "0.00";
  }
});
