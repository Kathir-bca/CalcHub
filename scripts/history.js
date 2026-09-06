const STORAGE_KEY = "calchub-history";
const MAX_ENTRIES = 20;

function getHistory() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
        return [];
    }
}

function renderHistory() {
    const historyList = document.getElementById("historyList");
    if (!historyList) return;

    const history = getHistory();
    historyList.replaceChildren();

    if (!history.length) {
        const message = document.createElement("p");
        message.className = "history-empty";
        message.textContent = "No calculations saved yet. Your completed results will appear here.";
        historyList.append(message);
        return;
    }

    history.forEach((entry) => {
        const item = document.createElement("article");
        item.className = "history-item";

        const title = document.createElement("strong");
        title.textContent = entry.title;

        const summary = document.createElement("p");
        summary.textContent = entry.summary;

        const date = document.createElement("time");
        date.textContent = entry.date;

        item.append(title, summary, date);
        historyList.append(item);
    });
}

export function recordCalculation(title, summary) {
    const history = getHistory();
    history.unshift({
        title,
        summary,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_ENTRIES)));
    renderHistory();
}

function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
    renderHistory();
}

export function initHistory() {
    document.getElementById("clearHistoryBtn")?.addEventListener("click", clearHistory);
    renderHistory();
}
