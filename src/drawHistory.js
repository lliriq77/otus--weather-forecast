export function drawHistory(elTwo, arr) {
  elTwo.innerHTML = arr
    .map((item) => `<span>${item}</span>`)
    .reverse()
    .join("");
}
