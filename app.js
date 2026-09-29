const tripDays = [
  { day: "DAY 1", date: "日程非公開", title: "関西空港からグアムへ", icon: "✈", items: [
    ["11:05", "関西国際空港 出発"], ["15:45", "グアム国際空港 到着"], ["到着後", "PICチェックイン"], ["夕方", "PIC内で夕食"], ["夜", "翌日に備えて早めに就寝"]
  ]},
  { day: "DAY 2", date: "日程非公開", title: "キッズパイロット＆フィッシュアイ", icon: "🛩", items: [
    ["7:30〜8:20", "家族で朝食"],
    ["9:00〜12:00", "2グループに分かれる\n・大人1名＋2歳児：フィッシュアイ海中展望塔（送迎付き）\n・大人1名＋5歳児：PIC内でゆっくり過ごす（プールなど軽めに）"],
    ["12:15〜13:15", "家族で昼食"],
    ["13:15〜", "大人1名＋5歳児：お迎え→キッズパイロット（セスナ体験操縦）\n大人1名＋2歳児：2歳児は昼寝2時間（〜15:15）"],
    ["14:00〜16:00の間に開始", "キッズパイロット（説明約40分＋飛行25分）"],
    ["16:00〜18:00頃", "PICへ帰着"],
    ["夜", "夕食→PICからの無料シャトルでドン・ドン・ドンキへ（下の補足）"],
    ["補足", "・キッズパイロットは操縦・同乗する2名のみ参加可能（同行者は不可）\n・セスナの帰着が17:00より前なら：17:30 PICで夕食→18:30発の無料シャトル→20:00発で帰着20:10頃\n・セスナの帰着が17:00以降なら：18:30発の無料シャトル→ドンキのフードコートで夕食→20:30発で帰着20:40頃\n・無料シャトルはPIC正面ロビーエントランス発。PIC前の道路から出る有料の巡回シャトルと混同しない\n・疲れていればドンキは大人1名だけで行く"]
  ]},
  { day: "DAY 3", date: "日程非公開", title: "キッズクラブ＆シュノーケリングの日", icon: "🤿", items: [
    ["7:30〜8:20", "朝食"],
    ["9:00〜12:00", "5歳児：キッズクラブ（昼食もキッズクラブで可）\n大人2名＋2歳児：PIC内で過ごす"],
    ["12:15〜13:15", "昼食"],
    ["13:15〜15:15", "5歳児＋大人1名：PICシュノーケリング\n2歳児：昼寝（約2時間）"],
    ["15:30〜16:30", "Kマートへ徒歩で往復（PICから約1km・大人1名だけで行ってもよい）"],
    ["16:45〜17:45", "PICで早めの夕食"],
    ["18:00〜19:00", "アメリカンサーカス"],
    ["19:00〜", "部屋に戻って休む（翌日は朝のうちにPICを出発）"],
    ["補足", "キッズパイロットが天候や機体整備でDAY3へ振り替えになった場合は、キッズクラブを取りやめて充てます"]
  ]},
  { day: "DAY 4", date: "日程非公開", title: "帰国の日", icon: "✈", items: [
    ["朝", "朝食・最終荷造り"], ["9:30頃", "PIC出発"], ["13:00", "グアム発"], ["15:55", "成田着"]
  ]}
];

const todoItems = [
  [1, "往路航空券を予約（関西11:05発）", "予約・確認", true],
  [3, "キッズクラブ利用中に保護者全員がホテル外へ出られるか確認", "予約・確認", false],
  [4, "フィッシュアイを予約する（大人1名＋2歳児・12:00頃までにPICへ戻れる便を選ぶ）", "予約・確認", false],
  [5, "PIC〜フィッシュアイ間の移動手段を決定", "予約・確認", false],
  [28, "チェックイン時にPIC内アクティビティを申し込む（キッズクラブ〈DAY3午前〉、シュノーケリング〈DAY3午後〉、アメリカンサーカス〈DAY3 18:00〉、Let's Speak English）", "予約・確認", false],
  [18, "部屋リクエスト送信済み", "予約・確認", true],
  [19, "キッズパイロットを予約する（第2・第3希望まで登録する）", "予約・確認", true],
  [21, "現地到着後、催行会社へメールでリコンファームする（予約日時・氏名・部屋番号を連絡）", "予約・確認", false],
  [29, "チェックイン時にドンキ行き無料シャトルの時刻を確認する（DAY2夜に利用）", "予約・確認", false],
  [30, "予約サイトに現地で使える携帯電話番号を登録する", "予約・確認", false],
  [31, "キッズパイロットのお迎え時刻をバウチャーで確認する", "予約・確認", false],
  [11, "パスポートの有効期限を確認", "出発前", false],
  [12, "Guam-CNMI ETAを4名分申請する（出発の5〜7日前を目安に／紙のI-736は廃止済み・ESTAとは別物）", "出発前", true],
  [34, "ETAの承認メールを保存する", "出発前", false],
  [13, "海外旅行保険を確認", "出発前", false],
  [14, "子どもの水着・ラッシュガードを準備", "出発前", false],
  [15, "5歳児用シュノーケルマスクを事前練習", "出発前", false],
  [16, "2歳児の昼寝用ベビーカー・抱っこひもを検討", "出発前", false],
  [17, "帰国前日の荷物重量を確認", "出発前", false],
  [22, "5歳児・同乗者ともかかとの覆われた靴を用意する（クロックス・サンダル不可）", "出発前", false],
  [23, "パスポート原本とコピーを人数分用意する", "出発前", false],
  [32, "海外で使う通信を準備する（大人1：au海外放題を事前予約／大人2：データローミングON）", "出発前", false],
  [33, "キッズパイロットのバウチャーを印刷またはスマートフォンに保存する", "出発前", false]
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
