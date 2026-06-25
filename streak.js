const streakCount =
document.getElementById(
"streakCount"
);

const today =
new Date().toDateString();

const savedDay =
localStorage.getItem(
"lastVisit"
);

let streak =
parseInt(
localStorage.getItem(
"streak"
)
) || 0;

if (savedDay !== today) {

  streak++;

  localStorage.setItem(
    "streak",
    streak
  );

  localStorage.setItem(
    "lastVisit",
    today
  );

}

streakCount.textContent =
`🔥 ${streak} Day Streak`;