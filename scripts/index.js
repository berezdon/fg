const watchLeft = document.querySelector(".watch__left");
const watchColon = document.querySelector(".watch__colon");
statusActive(watchColon);
const watchRight = document.querySelector(".watch__right");
const defrosting = document.querySelector(".panel__button_defrosting");
const microwaves = document.querySelector(".panel__button_microwaves");
const yogurt = document.querySelector(".panel__button_yogurt");
const autoPreparation = document.querySelector(".panel__button_auto-preparation");
const defrostingStatusImg = document.querySelector(".status__element_defrosting-status");
const microwavesStatusImg = document.querySelector(".status__element_microwaves-status");
const autoPreparationStatusImg = document.querySelector(".status__element_auto-preparation-status");
const yogurtStatusImg = document.querySelector(".status__element_yogurt-status");
const kgStatusImg = document.querySelector(".status__element_kg-status");
const powerStatusImg = document.querySelector(".status__element_power-status");
const plusMinusStatusImg = document.querySelector(".status__element_minus-plus-status");
const degreeStatusImg = document.querySelector(".status__element_degree-status");
const buttonMinus = document.querySelector(".panel__button_minus");
const buttonPlus = document.querySelector(".panel__button_plus");
const buttonStart = document.querySelector(".panel__button_start");
const buttonStop = document.querySelector(".panel__button_stop");
let numberDefLeft = 0;
let numberDefRight = 1;
let numberDef = 0;
let microwavesPow = 2;
let defrostingStatus = false;
let autoPreparationStatus = false;
let microwavesStatusPower = false;
let microwavesStatusTime = false;
let statusChanges = false;
let yogurtStatus = false;
let startYogurt = false;
let defrostingDef = "";
let timeDefrosting = 0;
let clickNumber = 0;

const autoPreparationTime = {
  dEF1: {
    '0.1': 1.5,
    '0.2': 2.5,
    '0.3': 3,
    '0.4': 5.5,
    '0.5': 6.5,
    '0.6': 7,
    '0.7': 7.5,
    '0.8': 8,
    '0.9': 9,
    '1.0': 10
  },
  dEF2: {'0.3': 8},
  dEF3: {
    '0.2': 8,
    '0.3': 9,
    '0.4': 11,
    '0.5': 12,
    '0.6': 13,
    '0.7': 15,
    '0.8': 17,
    '0.9': 19,
    '1.0': 20
  },
  dEF4: {'0.3': 10},
}

function statusActive(img) {
  img.classList.add('status__element_active');
}

function statusRemove(img) {
  img.classList.remove('status__element_active');
}

function funForModes() {
  statusRemove(kgStatusImg);
  statusRemove(plusMinusStatusImg);
  if (defrostingStatus) watchLeft.textContent = "dE";
  if (autoPreparationStatus) watchLeft.textContent = '';
  statusRemove(watchColon);
  if (!statusChanges) {
    if (numberDef < 4) {
      numberDef += 1;
    }
    else {
      numberDef = 1;
    }
  }

  if (defrostingStatus) watchRight.textContent = "F" + numberDef;
  if (autoPreparationStatus) watchRight.textContent = numberDef;
  defrostingDef = "dEF" + numberDef;
  if (!statusChanges) {
    numberDefLeft = 0;
    if (numberDef === 3 && autoPreparationStatus) numberDefRight = 2;
    else numberDefRight = 1;
  }
  statusChanges = false;
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
    if (numberDef === 3 && autoPreparationStatus) numberDefRight = 2;
    else numberDefRight = step;
    numberDefLeft = 0;
  }
}

function minus(numLeft, numRight, step) {
  if (numberDef === 3 && autoPreparationStatus) {
    if (numberDefRight > 2) numberDefRight -= step;
    else {
      numberDefRight = numRight;
      if (numberDefLeft !== 0) numberDefLeft -= 1;
      else {
        numberDefLeft = numLeft;
        numberDefRight = 0;
      }
    }
  }
  else {
    if (numberDefRight > 0) numberDefRight -= step;
    else {
      numberDefRight = numRight;
      if (numberDefLeft !== 0) numberDefLeft -= 1;
      else {
        numberDefLeft = numLeft;
        numberDefRight = 0;
      }
    }
  }
  if (numberDefRight === 0 && numberDefLeft === 0) {
    numberDefLeft = numLeft;
    numberDefRight = 0;
  }
}

function funDefrosting() {
  if (!defrostingStatus) funButtonStop();
  defrostingStatus = true;
  funForModes();
  statusActive(defrostingStatusImg);
}

function funDefrostingPlus() {
  if (defrostingDef !== "dEF4" && statusChanges) plus(4, 9, 1);
  else if (defrostingDef === "dEF4" && statusChanges) {
    if (numberDefRight < 5) numberDefRight += 1;
    else numberDefRight = 1;
  }
  statusChanges = true;
  statusActive(kgStatusImg);
  statusActive(plusMinusStatusImg);
  watchLeft.textContent = numberDefLeft;
  statusActive(watchColon);
  watchColon.textContent = ".";
  watchRight.textContent = numberDefRight;
  clickNumber = 0;
}

function funDefrostingMinus() {
  if (defrostingDef !== "dEF4" && statusChanges) minus(4, 9, 1);
  else if (defrostingDef === "dEF4" && statusChanges) {
    if (numberDefRight > 1) numberDefRight -= 1;
    else numberDefRight = 5;
  }
  statusChanges = true;
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
    if (!statusChanges) {
      watchLeft.textContent = "--";
      watchRight.textContent = "--";
      numberDefLeft = 0;
      numberDefRight = 0;
    }
    else {
      watchLeft.textContent = numberDefLeft;
      if (numberDefRight === 0) watchRight.textContent = '00'
      else watchRight.textContent = numberDefRight;
    }
    statusChanges = true;
    statusActive(watchColon);
    statusRemove(powerStatusImg);

    microwavesStatusTime = true;
    microwavesStatusPower = false;
  }
  else {
    if (!microwavesStatusTime) funButtonStop();
    microwavesStatusPower = true;
    microwavesStatusTime = false;
    statusActive(microwavesStatusImg);
    statusActive(powerStatusImg);
    statusActive(plusMinusStatusImg);
    watchLeft.textContent = microwavesPow;
    statusRemove(watchColon);
    watchRight.textContent = "00";
  }
}

function funMicrowavesPowerPlus() {
  statusChanges = false;
  if (microwavesPow < 10) microwavesPow += 2;
  watchLeft.textContent = String(microwavesPow);
}

function funMicrowavesPowerMinus() {
  statusChanges = false;
  if (microwavesPow > 2) microwavesPow -= 2;
  watchLeft.textContent = String(microwavesPow);
}

function funMicrowavesTimePlus() {
  plus(10, 50, 10);
  watchLeft.textContent = numberDefLeft;
  if (numberDefRight === 0) watchRight.textContent = '00';
  else watchRight.textContent = numberDefRight;
}

function funMicrowavesTimeMinus() {
  minus(10, 50, 10);
  watchLeft.textContent = numberDefLeft;
  if (numberDefRight === 0) watchRight.textContent = '00';
  else watchRight.textContent = numberDefRight;
}

function funMicrowavesStart() {
  watchLeft.textContent = 'W';
  statusRemove(watchColon);
  watchRight.textContent = 'ait';
  statusRemove(plusMinusStatusImg);
}

function funAutoPreparation() {
  if (!autoPreparationStatus) funButtonStop();
  autoPreparationStatus = true;
  funForModes();
  statusActive(autoPreparationStatusImg);
}

function funAutoPreparationPlus() {
  if (defrostingDef === "dEF1" && statusChanges) plus(1, 9, 1);
  if (defrostingDef === "dEF2") numberDefRight = 3;
  if (defrostingDef === "dEF3" && statusChanges) plus(1, 9, 1);
  if (defrostingDef === "dEF4") numberDefRight = 3;
  statusChanges = true;
  statusActive(kgStatusImg);
  statusActive(plusMinusStatusImg);
  watchLeft.textContent = numberDefLeft;
  statusActive(watchColon);
  watchColon.textContent = ".";
  watchRight.textContent = numberDefRight;
  clickNumber = 0;
}

function funAutoPreparationMinus() {
  if (defrostingDef === "dEF1" && statusChanges) minus(1, 9, 1);
  if (defrostingDef === "dEF2") numberDefRight = 3;
  if (defrostingDef === "dEF3" && statusChanges) minus(1, 9, 1);
  if (defrostingDef === "dEF4") numberDefRight = 3;
  statusChanges = true;
  statusActive(kgStatusImg);
  statusActive(plusMinusStatusImg);
  watchLeft.textContent = numberDefLeft;
  statusActive(watchColon);
  watchColon.textContent = ".";
  watchRight.textContent = numberDefRight;
  clickNumber = 0;
}

function funAutoPreparationStart() {
  if (watchLeft.textContent !== "") {
    statusRemove(kgStatusImg);
    statusRemove(plusMinusStatusImg);
    const mass = (Number(watchLeft.textContent) + Number(watchRight.textContent) * 0.1).toFixed(1);
    const time = autoPreparationTime[defrostingDef][mass];
    watchLeft.textContent = String(Math.floor(time));
    watchColon.textContent = ':';
    if ((time - Math.floor(time)) * 60 === 0)  watchRight.textContent = '00'
    else watchRight.textContent = String((time - Math.floor(time)) * 60);
  }
}

function funYogurt () {
  if (!yogurtStatus) funButtonStop();
  yogurtStatus = true;
  statusActive(yogurtStatusImg);
  statusActive(degreeStatusImg);
  numberDefLeft = 2;
  numberDefRight = 0;
  watchLeft.textContent = '2';
  statusRemove(watchColon);
  watchRight.textContent = '0';
}

function funYogurtPlus() {
  if (!startYogurt) {
    plus(9, 9, 1);
    watchLeft.textContent = numberDefLeft;
    watchRight.textContent = numberDefRight;
  }
}

function funYogurtMinus() {
  if (!startYogurt) {
    minus(9, 9, 1);
    watchLeft.textContent = numberDefLeft;
    watchRight.textContent = numberDefRight;
  }
}

function startFunYogurt() {
  startYogurt = true;
}

function funButtonPlus() {
  if (defrostingStatus) funDefrostingPlus();
  if (microwavesStatusPower) funMicrowavesPowerPlus();
  if (microwavesStatusTime) funMicrowavesTimePlus();
  if (autoPreparationStatus) funAutoPreparationPlus();
  if (yogurtStatus) funYogurtPlus();
}

function funButtonMinus() {
  if (defrostingStatus) funDefrostingMinus();
  if (microwavesStatusPower) funMicrowavesPowerMinus();
  if (microwavesStatusTime) funMicrowavesTimeMinus();
  if (autoPreparationStatus) funAutoPreparationMinus();
  if (yogurtStatus) funYogurtMinus();
}

function funButtonStart() {
  clickNumber += 1;
  if (defrostingStatus) {
    if (clickNumber === 1) funDefrostingStart();
  }
  if (microwavesStatusTime && watchLeft.textContent !== '--') {
    funMicrowavesStart();
  }
  if (autoPreparationStatus) {
    if (clickNumber === 1) funAutoPreparationStart();
  }
  if (yogurtStatus) {
    startFunYogurt();
  }
}

function funButtonStop() {
  numberDefLeft = 0;
  numberDefRight = 1;
  numberDef = 0;
  defrostingStatus = false;
  microwavesStatusPower = false;
  microwavesStatusTime = false;
  autoPreparationStatus = false;
  statusChanges = false;
  yogurtStatus = false;
  startYogurt = false;
  defrostingDef = "";
  timeDefrosting = 0;
  watchLeft.textContent = "--";
  statusActive(watchColon);
  watchColon.textContent = ":";
  watchRight.textContent = "--";
  statusRemove(defrostingStatusImg);
  statusRemove(microwavesStatusImg);
  statusRemove(autoPreparationStatusImg);
  statusRemove(yogurtStatusImg);
  statusRemove(kgStatusImg);
  statusRemove(powerStatusImg);
  statusRemove(plusMinusStatusImg);
  statusRemove(degreeStatusImg);
  clickNumber = 0;
  microwavesPow = 2;
}

defrosting.addEventListener("mousedown", funDefrosting);
microwaves.addEventListener("mousedown", funMicrowaves);
yogurt.addEventListener("click", funYogurt);
autoPreparation.addEventListener("mousedown", funAutoPreparation);
buttonPlus.addEventListener("mousedown", funButtonPlus);
buttonMinus.addEventListener("mousedown", funButtonMinus);
buttonStart.addEventListener("mousedown", funButtonStart);
buttonStop.addEventListener("mousedown", funButtonStop);
