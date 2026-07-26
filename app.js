const tripDays = [
  { day: "DAY 1", date: "日程非公開", title: "関西空港からグアムへ", icon: "✈", items: [
    ["11:05", "関西国際空港 出発"], ["15:45", "グアム国際空港 到着"], ["到着後", "PICチェックイン"], ["夕方", "PIC内で夕食"], ["夜", "翌日に備えて早めに就寝"]
  ]},
  { day: "DAY 2", date: "日程非公開", title: "キッズクラブ＆フィッシュアイ", icon: "🐠", items: [
    ["7:30〜8:20", "朝食"], ["9:00〜12:00", "5歳児：PICキッズクラブ\n大人2人＋2歳児：フィッシュアイ海中展望塔"],
    ["12:15〜13:15", "昼食"], ["13:15〜15:15", "2歳児：昼寝（約2時間）\n5歳児：休憩・自由時間"],
    ["15:30頃", "5歳児＋保護者1人：PICシュノーケリング"], ["17:15頃", "Kマートへ"], ["19:15頃", "PICで夕食"]
  ]},
  { day: "DAY 3", date: "日程非公開", title: "イルカ＆ドンキの日", icon: "🐬", items: [
    ["午前〜昼", "イルカウォッチング"], ["13:00〜14:00頃", "昼食"], ["14:00〜16:00", "2歳児：昼寝（約2時間）\n5歳児：自由時間"],
    ["16:30頃", "ドン・ドン・ドンキへ出発"], ["17:00〜18:30", "買い物"], ["18:30〜19:30", "フードホールで夕食"], ["20:00頃", "PIC帰着・荷造り"]
  ]},
  { day: "DAY 4", date: "日程非公開", title: "UA864で帰国", icon: "✈", items: [
    ["朝", "朝食・最終荷造り"], ["9:30頃", "PIC出発"], ["13:00", "UA864 グアム発"], ["15:55", "成田着"]
  ]}
];

const todoItems = [
  [1, "往路航空券を予約（関西11:05発）", "予約・確認", true],
  [2, "PICキッズクラブの実施時間・予約方法を確認", "予約・確認", false],
  [3, "キッズクラブ利用中に保護者全員がホテル外へ出られるか確認", "予約・確認", false],
  [4, "フィッシュアイ海中展望塔の入場方法・営業時間を確認", "予約・確認", false],
  [5, "PIC〜フィッシュアイ間の移動手段を決定", "予約・確認", false],
  [6, "イルカウォッチングを予約", "予約・確認", false],
  [7, "PICシュノーケリングの5歳児参加条件を確認", "予約・確認", false],
  [8, "サーカスの開催日と予約方法を確認", "予約・確認", false],
  [9, "Kマートへの移動手段を決定", "予約・確認", false],
  [10, "ドンキへの移動手段・シャトル運行状況を確認", "予約・確認", false],
  [18, "部屋リクエスト送信済み", "予約・確認", true],
  [11, "パスポートの有効期限を確認", "出発前", false],
  [12, "Guam-CNMI ETAなど入国手続きを確認", "出発前", false],
  [13, "海外旅行保険を確認", "出発前", false],
  [14, "子どもの水着・ラッシュガードを準備", "出発前", false],
  [15, "5歳児用シュノーケルマスクを事前練習", "出発前", false],
  [16, "2歳児の昼寝用ベビーカー・抱っこひもを検討", "出発前", false],
  [17, "帰国前日の荷物重量を確認", "出発前", false]
].map(([id, label, group, done]) => ({ id, label, group, done }));

const storageKey = "ikokka-guam-checks-v1";
let savedChecks = {};
try {
  savedChecks = JSON.parse(localStorage.getItem(storageKey) || "{}");
} catch {
  savedChecks = {};
}

const checks = todoItems.map((item) => ({
  ...item,
  done: Object.prototype.hasOwnProperty.call(savedChecks, item.id) ? Boolean(savedChecks[item.id]) : item.done
}));

function renderTimeline() {
  const timeline = document.querySelector("#timeline");
  timeline.innerHTML = tripDays.map((day) => `
    <section class="day">
      <div class="day-title">
        <div class="day-icon">${day.icon}</div>
        <div class="day-copy"><small>${day.day} <i>${day.date}</i></small><b>${day.title}</b></div>
      </div>
      <div class="day-slots">
        ${day.items.map(([time, activity]) => `
          <div class="slot"><time>${time}</time><span>${activity.replaceAll("\n", "<br>")}</span></div>
        `).join("")}
      </div>
    </section>
  `).join("");
}

function persistChecks() {
  localStorage.setItem(storageKey, JSON.stringify(Object.fromEntries(checks.map((item) => [item.id, item.done]))));
}

function updateProgress() {
  const completed = checks.filter((item) => item.done).length;
  const percent = Math.round((completed / checks.length) * 100);
  document.querySelector("#fact-percent").textContent = `${percent}%`;
  document.querySelector("#fact-count").textContent = `${completed}/${checks.length} 完了`;
  document.querySelector("#check-fraction").textContent = `${completed}/${checks.length}`;
  document.querySelector("#check-bar").style.width = `${percent}%`;
  document.querySelector("#mini-ring").style.setProperty("--p", `${percent * 3.6}deg`);
}

function renderChecks() {
  const groups = document.querySelector("#check-groups");
  groups.innerHTML = ["予約・確認", "出発前"].map((group) => `
    <div class="todo-group">
      <h3>${group}</h3>
      <div class="checks">
        ${checks.filter((item) => item.group === group).map((item) => `
          <label class="${item.done ? "done" : ""}">
            <input type="checkbox" data-id="${item.id}" ${item.done ? "checked" : ""}>
            <span class="box">✓</span><span>${item.label}</span>
          </label>
        `).join("")}
      </div>
    </div>
  `).join("");

  groups.querySelectorAll("input[type=checkbox]").forEach((input) => {
    input.addEventListener("change", () => {
      const item = checks.find((entry) => entry.id === Number(input.dataset.id));
      item.done = input.checked;
      input.closest("label").classList.toggle("done", item.done);
      persistChecks();
      updateProgress();
    });
  });
  updateProgress();
}

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.scroll;
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    document.querySelectorAll(".topbar nav button").forEach((item) => item.classList.toggle("active", item.dataset.scroll === id));
  });
});

renderTimeline();
renderChecks();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
