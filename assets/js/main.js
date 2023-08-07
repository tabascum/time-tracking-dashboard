const cardDataList = document.querySelectorAll(".card-data");
const switchBtnList = document.querySelectorAll(".switch-btn");

const views = ["daily", "weekly", "monthly"];
let currentView = "weekly"; // Default view is weekly

const previousPeriodText = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

fetch("../../data.json")
  .then((response) => response.json())
  .then((data) => {
    showData(data);
    setupSwitchButtons(data);
  });

function showData(data) {
  cardDataList.forEach((card, index) => {
    const timeframeData = data[index].timeframes[currentView];
    updateCardContent(card, timeframeData);
  });
}

function updateCardContent(card, timeframeData) {
  card.querySelector(".current-time").innerHTML = `${timeframeData.current}hrs`;
  card.querySelector(
    ".previous-time"
  ).innerHTML = `${previousPeriodText[currentView]} - ${timeframeData.previous}hrs`;
}

function setupSwitchButtons(data) {
  switchBtnList.forEach((button) => {
    button.addEventListener("click", () => {
      switchBtnList.forEach((btn) => {
        if (btn !== button) {
          btn.classList.remove("active");
        }
      });

      button.classList.toggle("active");
      currentView = button.getAttribute("data-view");

      showData(data);
    });
  });
}
