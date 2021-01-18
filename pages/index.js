let watchLeft = document.querySelector(".watch__left");
let watchColon = document.querySelector(".watch__colon");
let watchRight = document.querySelector(".watch__right");
let defrosting = document.querySelector(".panel__button_defrosting");
let defrostingStatusImg = document.querySelector(".status__element_defrosting-status");
let kgStatusImg = document.querySelector(".status__element_kg-status");
let buttonMinus = document.querySelector(".panel__button_minus");
let buttonPlus = document.querySelector(".panel__button_plus");
let buttonStart = document.querySelector(".panel__button_start");
let buttonStop = document.querySelector(".panel__button_stop");
let numberDefLeft = 0;
let numberDefRight = 0;
let numberDef = 0;
let defrostingStatus = false;
let defrostingDef = "";
let timeDefrosting = 0;

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
  kgStatusImg.style.display = "none";
  watchRight.textContent = "F" + numberDef;
  defrostingDef = "dEF" + numberDef;
  numberDefLeft = 0;
  numberDefRight = 0;
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
    }
    else if (defrostingDef === "dEF4") {
      if (numberDefRight < 5) {
        numberDefRight += 1;
      } else {
        numberDefRight = 1;
      }
    }
    kgStatusImg.style.display = "block";
    watchLeft.textContent = numberDefLeft;
    watchColon.style.display = "block";
    watchColon.textContent = ".";
    watchRight.textContent = numberDefRight;
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
      if (numberDefRight === 0 && numberDefLeft === 0) {
        numberDefLeft = 4;
        numberDefRight = 0;
      }
    }
    else if (defrostingDef === "dEF4") {
      if (numberDefRight > 1) {
        numberDefRight -= 1;
      } else {
        numberDefRight = 5;
      }
    }
    kgStatusImg.style.display = "block";
    watchLeft.textContent = numberDefLeft;
    watchColon.style.display = "block";
    watchColon.textContent = ".";
    watchRight.textContent = numberDefRight;
  }
});

buttonStart.addEventListener("mousedown", function () {
  if (defrostingStatus) {
    if (watchLeft.textContent !== "dE") {
      let mass = Number(watchLeft.textContent) + Number(watchRight.textContent) * 0.1;
      switch (defrostingDef) {
        case "dEF1":
          timeDefrosting = Math.floor((2.76 * mass * 20 + 1.47 * mass * 18 + 333.5 * mass * 0.05) / 0.280);
          break
        case "dEF2":
          timeDefrosting = Math.floor((3.68 * mass * 20 + 1.72 * mass * 18 + 333.5 * mass * 0.05) / 0.280);
          break
        case "dEF3":
          timeDefrosting = Math.floor((3.35 * mass * 20 + 1.67 * mass * 18 + 333.5 * mass * 0.05) / 0.280);
          break
        case "dEF4":
          timeDefrosting = Math.floor((0.65 * mass * 20 + 0.32 * mass * 18 + 333.5 * mass * 0.05) / 0.280);
          break
      }
      console.log(timeDefrosting);
    }
    kgStatusImg.style.display = "none";
    watchLeft.textContent = String(Math.floor(timeDefrosting / 60));
    watchColon.textContent = ":";
    if (timeDefrosting % 60 < 10) watchRight.textContent = "0" + String(timeDefrosting % 60);
    else watchRight.textContent = String(timeDefrosting % 60);
  }
});

buttonStop.addEventListener("mousedown", function () {
  numberDefLeft = 0;
  numberDefRight = 0;
  numberDef = 0;
  defrostingStatus = false;
  defrostingDef = "";
  timeDefrosting = 0;
  watchLeft.textContent = "--";
  watchColon.style.display = "block";
  watchColon.textContent = ":";
  watchRight.textContent = "--";
  defrostingStatusImg.style.display = "none";
  kgStatusImg.style.display = "none";
});
