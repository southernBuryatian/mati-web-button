export function htmlDecode(string) {
  const e = document.createElement("textarea");
  e.innerHTML = string;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}
