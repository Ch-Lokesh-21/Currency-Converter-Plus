const dropList = document.querySelectorAll(".select-cont select");
const btn = document.querySelector("#btn");
const output = document.querySelector(".msg p");
let base_url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_EdmbFANGpqCfOekU1aZoytIyIS3oGGfmzUHAjwr3&base_currency=`;
for (let i = 0; i < dropList.length; i++) {
  for (code in countryCodes) {
    let opt = document.createElement("option");
    opt.value = code;
    opt.innerText = code;
    if (i === 0 && code === "USD") {
      opt.selected = "selected";
    } else if (i === 1 && code === "INR") {
      opt.selected = "selected";
    }
    dropList[i].append(opt);
  }
  dropList[i].addEventListener("change", (event) => {
    changeFlag(event.target);
  });
}
let changeFlag = (element) => {
  let curCode = element.value;
  let img = element.parentElement.querySelector("img");
  let newSrc = `https://flagsapi.com/${countryCodes[curCode]}/flat/64.png`;
  img.src = newSrc;
};
btn.addEventListener("click", (event) => {
  event.preventDefault();
  let amt = document.querySelector("#data");
  amtVal = amt.value;
  if (amtVal < 1.0) {
    amt.value = 1.0;
    amtVal = 1.0;
  }
  converter(parseFloat(amtVal));
});
const converter = async (val) => {
  try {
    let fromCode = document.querySelector("#f").value;
    let toCode = document.querySelector("#t").value;
    let res = 0;
    let url = base_url + fromCode;
    let response = await fetch(url);
    let resultJson = await response.json();
    let excRate = parseFloat(resultJson.data[toCode].value);
    res = parseFloat(val * excRate).toFixed(2);
    output.innerText = `${val} ${fromCode} = ${res} ${toCode}`;
  } catch (error) {
    console.error("Error Occurred: ", error);
  }
};
document.querySelector("#swap").addEventListener("click", () => {
  let temp = document.querySelector("#f").value;
  document.querySelector("#f").value = document.querySelector("#t").value;
  document.querySelector("#t").value = temp;
  let amt = document.querySelector("#data");
  amtVal = amt.value;
  if (amtVal < 1.0) {
    amt.value = 1.0;
    amtVal = 1.0;
  }
  converter(parseFloat(amtVal));
});
