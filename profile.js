const welcomeText =
document.getElementById(
"welcomeText"
);

let userName =
localStorage.getItem(
"tegentsUser"
);

if (!userName) {

  userName = prompt(
    "Enter your name"
  );

  if (userName) {

    localStorage.setItem(
      "tegentsUser",
      userName
    );

  }

}

if (welcomeText && userName) {

  welcomeText.textContent =
  `Hello, ${userName}`;

}