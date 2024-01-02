// Selecting HTML elements
const fullname = document.getElementById("fullname");
const first = document.getElementById("first");
const last = document.getElementById("last");
const mail = document.getElementById("email");
const photo = document.getElementById("photo");
const id_num = document.getElementById("id_num");
const sign = document.getElementById("sign");
const out = document.getElementById("out");
const info = document.getElementById("info");

// Window load event listener
window.addEventListener("load",showDataFromLocalStorage());

// Show all data from localStorage on the web page
function showDataFromLocalStorage() {
  if (localStorage.getItem("infos")) {
    const infos = JSON.parse(localStorage.getItem("infos"));

    info.style.display = "block";
    out.style.display = "block";
    sign.style.display = "none";


    fullname.innerHTML = infos.fullnameL;
    photo.src = infos.photo_linkL;
    first.innerHTML = infos.firstL;
    last.innerHTML = infos.lastL;
    mail.innerHTML = infos.mailL;
    id_num.innerHTML = infos.id_numL;
  } else {
    info.style.display = "none";
    out.style.display = "none";
    sign.style.display = "block";

  }
}

// Handle credential response after sign-in
function handleCredentialResponse(response) {
  const responsePayload = decodeJwtResponse(response.credential);

  const infos = {
    fullnameL: responsePayload.name,
    photo_linkL: responsePayload.picture,
    firstL: responsePayload.given_name,
    lastL: responsePayload.family_name,
    mailL: responsePayload.email,
    id_numL: responsePayload.sub
  };

  const infosL = JSON.stringify(infos);

  localStorage.setItem("infos", infosL);

  showDataFromLocalStorage();
}

// Decode JWT response
function decodeJwtResponse(data) {
  const tokens = data.split(".");
  return JSON.parse(atob(tokens[1]));
}

// Sign out event listener
out.addEventListener("click", () => {
  localStorage.clear();
  showDataFromLocalStorage();
});