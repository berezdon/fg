let watchLeft = document.querySelector(".watch__left");
let watchColon = document.querySelector(".watch__colon");
let watchRight = document.querySelector(".watch__right");
let defrosting = document.querySelector(".panel__button_defrosting");
let defrostingStatus = false;
let defrostingDef = "";
let defrostingStatusImg = document.querySelector(".status__element_defrosting-status");
let numberDefLeft = 0;
let numberDefRight = 0;
let numberDef = 0;
let buttonMinus = document.querySelector(".panel__button_minus");
let buttonPlus = document.querySelector(".panel__button_plus");

defrosting.addEventListener("mousedown", function () {
  if (numberDef < 4) {
    numberDef += 1;
  }
  else {
    numberDef = 1;
  }
  defrostingStatusImg.style.display = "block";
  defrostingStatus = true;
  watchLeft.textContent = "dE";
  watchColon.style.display = "none";
  watchRight.textContent = "F" + numberDef;
  defrostingDef = "dEF" + numberDef;
});

buttonPlus.addEventListener("mousedown", function () {
  if (defrostingStatus) {
    if (defrostingDef !== "dEF4") {
      if (numberDefLeft < 4) {
        if (numberDefRight < 9) {
          numberDefRight += 1;
        } else {
          numberDefRight = 0;
          numberDefLeft += 1;
        }
      } else {
        numberDefRight = 1;
        numberDefLeft = 0;
      }
      watchLeft.textContent = numberDefLeft;
      watchColon.style.display = "block";
      watchColon.textContent = ".";
      watchRight.textContent = numberDefRight;
    }
  }
});

buttonMinus.addEventListener("mousedown", function () {
  if (defrostingStatus) {
    if (defrostingDef !== "dEF4") {
      if (numberDefRight > 0) {
        numberDefRight -= 1;
      } else {
        numberDefRight = 9;
        if (numberDefLeft !== 0) numberDefLeft -= 1;
        else {
          numberDefLeft = 4;
          numberDefRight = 0;
        }
      }
      if (numberDefRight == 0 && numberDefLeft == 0) {
        numberDefLeft = 4;
        numberDefRight = 0;
      }
      watchLeft.textContent = numberDefLeft;
      watchColon.style.display = "block";
      watchColon.textContent = ".";
      watchRight.textContent = numberDefRight;
    }
  }
});
