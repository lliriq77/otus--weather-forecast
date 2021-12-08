export function saveHistory(arr) {
  if (arr.length > 10) arr.shift();

  localStorage.setItem("history", JSON.stringify(arr));
}
