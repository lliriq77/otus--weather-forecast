export function drawHistory(elTwo, arr) {
  elTwo.innerHTML = arr
    .map((item) => `<span style="margin: 2px;">${item}</span>`)
    .reverse()
    .join("");
}
