const watchLeft = document.querySelector(".watch__left");
const watchColon = document.querySelector(".watch__colon");
statusActive(watchColon);
const watchRight = document.querySelector(".watch__right");
const defrosting = document.querySelector(".panel__button_defrosting");
const microwaves = document.querySelector(".panel__button_microwaves");
const defrostingStatusImg = document.querySelector(".status__element_defrosting-status");
const microwavesStatusImg = document.querySelector(".status__element_microwaves-status");
const kgStatusImg = document.querySelector(".status__element_kg-status");
const powerStatusImg = document.querySelector(".status__element_power-status");
const plusMinusStatusImg = document.querySelector(".status__element_minus-plus-status");
const buttonMinus = document.querySelector(".panel__button_minus");
const buttonPlus = document.querySelector(".panel__button_plus");
const buttonStart = document.querySelector(".panel__button_start");
const buttonStop = document.querySelector(".panel__button_stop");
let numberDefLeft = 0;
let numberDefRight = 0;
let numberDef = 0;
let microwavesPow = 0;
let defrostingStatus = false;
let microwavesStatusPower = false;
let microwavesStatusTime = false;
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
  if (numberDef === 0) funButtonStop();
  statusRemove(kgStatusImg);
  statusRemove(plusMinusStatusImg);
  defrostingStatus = true;
  statusActive(defrostingStatusImg);
  watchLeft.textContent = "dE";
  statusRemove(watchColon);
  if (numberDef < 4) {
    numberDef += 1;
  }
  else {
    numberDef = 1;
  }
  watchRight.textContent = "F" + numberDef;
  defrostingDef = "dEF" + numberDef;
  numberDefLeft = 0;
  numberDefRight = 0;
  clickNumber = 0;
}

function plus(numLeft, numRight, step) {
  if (numberDefLeft < numLeft) {
    if (numberDefRight < numRight) numberDefRight += step;
    else {
      numberDefRight = 0;
      numberDefLeft += 1;
    }
  } else {
    numberDefRight = step;
    numberDefLeft = 0;
  }
}

function minus(numLeft, numRight, step) {
  if (numberDefRight > 0) numberDefRight -= step;
  else {
    numberDefRight = numRight;
    if (numberDefLeft !== 0) numberDefLeft -= 1;
    else {
      numberDefLeft = numLeft;
      numberDefRight = 0;
    }
  }
  if (numberDefRight === 0 && numberDefLeft === 0) {
    numberDefLeft = numLeft;
    numberDefRight = 0;
  }
}

function funDefrostingPlus() {
  if (defrostingDef !== "dEF4") plus(4, 9, 1);
  else if (defrostingDef === "dEF4") {
    if (numberDefRight < 5) numberDefRight += 1;
    else numberDefRight = 1;
  }
  statusActive(kgStatusImg);
  statusActive(plusMinusStatusImg);
  watchLeft.textContent = numberDefLeft;
  statusActive(watchColon);
  watchColon.textContent = ".";
  watchRight.textContent = numberDefRight;
  clickNumber = 0;
}

function funDefrostingMinus() {
  if (defrostingDef !== "dEF4") minus(4, 9, 1);
  else if (defrostingDef === "dEF4") {
    if (numberDefRight > 1) numberDefRight -= 1;
    else numberDefRight = 5;
  }
  statusActive(kgStatusImg);
  statusActive(plusMinusStatusImg);
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
    statusRemove(plusMinusStatusImg);
    watchLeft.textContent = String(Math.floor(timeDefrosting / 60));
    watchColon.textContent = ":";
    if (timeDefrosting % 60 < 10) watchRight.textContent = "0" + String(timeDefrosting % 60);
    else watchRight.textContent = String(timeDefrosting % 60);
  }
}

function funMicrowaves() {
  if (microwavesStatusPower) {
    watchLeft.textContent = "--";
    statusActive(watchColon);
    watchRight.textContent = "--";
    statusRemove(powerStatusImg);
    microwavesStatusTime = true;
    microwavesStatusPower = false;
  }
  else {
    funButtonStop();
    microwavesStatusPower = true;
    statusActive(microwavesStatusImg);
    statusActive(powerStatusImg);
    statusActive(plusMinusStatusImg);
    watchLeft.textContent = "2";
    statusRemove(watchColon);
    watchRight.textContent = "00";
    microwavesPow = 2;
  }
}

function funMicrowavesPowerPlus() {
  if (microwavesPow < 10) microwavesPow += 2;
  watchLeft.textContent = String(microwavesPow);
}

function funMicrowavesPowerMinus() {
  if (microwavesPow > 2) microwavesPow -= 2;
  watchLeft.textContent = String(microwavesPow);
}

function funMicrowavesTimePlus() {
  plus(10, 50, 10);
  watchLeft.textContent = String(numberDefLeft);
  if (numberDefRight === 0) watchRight.textContent = '00';
  else watchRight.textContent = String(numberDefRight);
}

function funMicrowavesTimeMinus() {
  minus(10, 50, 10);
  watchLeft.textContent = String(numberDefLeft);
  if (numberDefRight === 0) watchRight.textContent = '00';
  else watchRight.textContent = String(numberDefRight);
}

function funMicrowavesStart() {
  watchLeft.textContent = 'W';
  statusRemove(watchColon);
  watchRight.textContent = 'ait';
  statusRemove(plusMinusStatusImg);
}

function funButtonPlus() {
  if (defrostingStatus) funDefrostingPlus();
  if (microwavesStatusPower) funMicrowavesPowerPlus();
  if (microwavesStatusTime) funMicrowavesTimePlus();
}

function funButtonMinus() {
  if (defrostingStatus) funDefrostingMinus();
  if (microwavesStatusPower) funMicrowavesPowerMinus();
  if (microwavesStatusTime) funMicrowavesTimeMinus();
}

function funButtonStart() {
  clickNumber += 1;
  if (defrostingStatus) {
    if (clickNumber === 1) funDefrostingStart();
  }
  if (microwavesStatusTime && watchLeft.textContent !== '--') {
    funMicrowavesStart();
  }
}

function funButtonStop() {
  numberDefLeft = 0;
  numberDefRight = 0;
  numberDef = 0;
  defrostingStatus = false;
  microwavesStatusPower = false;
  microwavesStatusTime = false;
  defrostingDef = "";
  timeDefrosting = 0;
  watchLeft.textContent = "--";
  statusActive(watchColon);
  watchColon.textContent = ":";
  watchRight.textContent = "--";
  statusRemove(defrostingStatusImg);
  statusRemove(microwavesStatusImg);
  statusRemove(kgStatusImg);
  statusRemove(powerStatusImg);
  statusRemove(plusMinusStatusImg);
  clickNumber = 0;
}

defrosting.addEventListener("mousedown", funDefrosting);
microwaves.addEventListener("mousedown", funMicrowaves);
buttonPlus.addEventListener("mousedown", funButtonPlus);
buttonMinus.addEventListener("mousedown", funButtonMinus);
buttonStart.addEventListener("mousedown", funButtonStart);
buttonStop.addEventListener("mousedown", funButtonStop);
