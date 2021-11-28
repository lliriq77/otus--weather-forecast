export async function readHistory() {
  const history = localStorage.getItem("history");
  return JSON.parse(history) ?? [];
}
