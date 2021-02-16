const watchLeft = document.querySelector(".watch__left");
const watchColon = document.querySelector(".watch__colon");
const watchRight = document.querySelector(".watch__right");
const defrosting = document.querySelector(".panel__button_defrosting");
const defrostingStatusImg = document.querySelector(".status__element_defrosting-status");
const kgStatusImg = document.querySelector(".status__element_kg-status");
const buttonMinus = document.querySelector(".panel__button_minus");
const buttonPlus = document.querySelector(".panel__button_plus");
const buttonStart = document.querySelector(".panel__button_start");
const buttonStop = document.querySelector(".panel__button_stop");
let numberDefLeft = 0;
let numberDefRight = 0;
let numberDef = 0;
let defrostingStatus = false;
let defrostingDef = "";
let timeDefrosting = 0;
let clickNumber = 0;

function statusActive(img) {
  img.classList.add('status__element_active');
}

function statusRemove(img) {
  img.classList.remove('status__element_active');
}

function funDefrosting() {
  if (numberDef < 4) {
    numberDef += 1;
  }
  else {
    numberDef = 1;
  }
  statusActive(defrostingStatusImg);
  statusRemove(kgStatusImg);
  defrostingStatus = true;
  watchLeft.textContent = "dE";
  statusRemove(watchColon);
  watchRight.textContent = "F" + numberDef;
  defrostingDef = "dEF" + numberDef;
  numberDefLeft = 0;
  numberDefRight = 0;
  clickNumber = 0;
}

function funDefrostingPlus() {
  if (defrostingDef !== "dEF4") {
    if (numberDefLeft < 4) {
      if (numberDefRight < 9) numberDefRight += 1;
      else {
        numberDefRight = 0;
        numberDefLeft += 1;
      }
    } else {
      numberDefRight = 1;
      numberDefLeft = 0;
    }
  }
  else if (defrostingDef === "dEF4") {
    if (numberDefRight < 5) numberDefRight += 1;
    else numberDefRight = 1;
  }
  statusActive(kgStatusImg);
  watchLeft.textContent = numberDefLeft;
  statusActive(watchColon);
  watchColon.textContent = ".";
  watchRight.textContent = numberDefRight;
  clickNumber = 0;
}

function funDefrostingMinus() {
  if (defrostingDef !== "dEF4") {
    if (numberDefRight > 0) numberDefRight -= 1;
    else {
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
    if (numberDefRight > 1) numberDefRight -= 1;
    else numberDefRight = 5;
  }
  statusActive(kgStatusImg);
  watchLeft.textContent = numberDefLeft;
  statusActive(watchColon);
  watchColon.textContent = ".";
  watchRight.textContent = numberDefRight;
  clickNumber = 0;
}

function funDefrostingStart() {
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
    statusRemove(kgStatusImg);
    watchLeft.textContent = String(Math.floor(timeDefrosting / 60));
    watchColon.textContent = ":";
    if (timeDefrosting % 60 < 10) watchRight.textContent = "0" + String(timeDefrosting % 60);
    else watchRight.textContent = String(timeDefrosting % 60);
  }
}

function funButtonPlus() {
  if (defrostingStatus) {
    funDefrostingPlus();
  }
}

function funButtonMinus() {
  if (defrostingStatus) {
    funDefrostingMinus();
  }
}

function funButtonStart() {
  clickNumber += 1;
  if (clickNumber === 1) {
    if (defrostingStatus) {
      funDefrostingStart();
    }
  }
}

function funButtonStop() {
  numberDefLeft = 0;
  numberDefRight = 0;
  numberDef = 0;
  defrostingStatus = false;
  defrostingDef = "";
  timeDefrosting = 0;
  watchLeft.textContent = "--";
  statusActive(watchColon);
  watchColon.textContent = ":";
  watchRight.textContent = "--";
  statusRemove(defrostingStatusImg);
  statusRemove(kgStatusImg);
  clickNumber = 0;
}

defrosting.addEventListener("mousedown", funDefrosting);
buttonPlus.addEventListener("mousedown", funButtonPlus);
buttonMinus.addEventListener("mousedown", funButtonMinus);
buttonStart.addEventListener("mousedown", funButtonStart);
buttonStop.addEventListener("mousedown", funButtonStop);
