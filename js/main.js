import { Countries, getFirstThree, getCurrentNetwork } from "./utils.js";

const changeNetwork = document.querySelector(".selectNetwork");
const phoneCodeSelect = document.querySelector(".btnImg");
const netImagLogo = document.querySelector(".networkLogo");
const phoneContainer = document.querySelector(".phoneContainer");
const phoneInputArea = document.querySelector(".phoneInputArea");

Countries.forEach((country) => {
  const option = document.createElement("option");
  option.value = country.dial_code;
  option.textContent = country.dial_code;
  country.dial_code === "+234"
    ? (option.selected = true)
    : (option.selected = false);
  phoneCodeSelect?.appendChild(option);
});

let currentCounrtyCode = phoneCodeSelect.value;
let currentNetwork = changeNetwork.value;

const netImg = document.createElement("img");
const warning = document.createElement("p");
const success = document.createElement("p");

// Change Network
changeNetwork?.addEventListener("change", () => {
  currentNetwork = changeNetwork.value;

  phoneContainer?.removeChild(warning);
  phoneContainer?.removeChild(success);
});

// phonecode handler
phoneCodeSelect?.addEventListener("change", () => {
  currentCounrtyCode = phoneCodeSelect.value;
  if (currentCounrtyCode !== "+234") {
    warning.textContent = "*This is not a Nigeria Number";
    warning.classList.add("invalid");
    phoneContainer?.appendChild(warning);
  } else {
    phoneContainer?.removeChild(warning);
    phoneContainer?.removeChild(success);
  }
});

// Input Area
phoneInputArea?.addEventListener("input", () => {
  let phoneValue = phoneInputArea.value;
  const number = getFirstThree(phoneValue);
  const network = getCurrentNetwork(number, currentNetwork);

  if (!network) {
    netImagLogo?.removeChild(netImg);
    warning.textContent = "*This is not a valid Number";
    warning.classList.add("invalid");
    phoneContainer?.appendChild(warning);
    phoneContainer?.removeChild(success);
  } else {
    netImg.src = network?.logo;
    netImagLogo?.appendChild(netImg);
    success.textContent = `*This is a valid ${network.name.toUpperCase()} Number`;
    success.classList.add("valid");
    phoneContainer?.appendChild(success);
    phoneContainer?.removeChild(warning);
  }
});
