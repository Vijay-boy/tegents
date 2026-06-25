function updateProgress() {

  const totalMessages =
  document.querySelectorAll(
    ".user-message"
  ).length;

  const progressCount =
  document.getElementById(
    "progressCount"
  );

  if (progressCount) {

    progressCount.textContent =
    `${totalMessages} Messages`;

  }

}