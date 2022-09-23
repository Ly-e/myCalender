let currentTime = new Date();
render(currentTime);
g('#lastMonth').onclick = () => {
    const fistDayOfCurrentMonth = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);
    render(new Date(fistDayOfCurrentMonth - 86400 * 1000));
}
g('#nextMonth').onclick = () => {
    const fistDayOfNextMonth = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 1);
    render(new Date(fistDayOfNextMonth));
}
g('#today').onclick = () => {
    render(new Date());
}


// 帮助函数
function render(time) {
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    initTime();
    generateDays();
    currentTime = time;
    function initTime() {
        const time = g('#time');
        const days = g('#days');
        time.textContent = `${year} 年 ${month} 月`;
        const scheduleDate = g('#scheduleDate');
        const scheduleDetails = g('#scheduleDetails');
        scheduleDate.textContent = `${month} 月 ${day} 日的日程`;
    }
    function generateDays() {
        const fistDayOfCurrentMonth = new Date(year, month - 1, 1);
        const weekdayOfFirstDayOfCurrentMonth = fistDayOfCurrentMonth.getDay();
        const lastDayOfCurrentMonth = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000);//js 用的 ms
        const daysOfCurrentMonth = lastDayOfCurrentMonth.getDate();
        const weekdayOfLastDayOfCurrentMonth = lastDayOfCurrentMonth.getDay();
        const liList = [];
        const now = new Date();
        let selectedLi;
        let n = 0
        days.innerHTML = "";//清空
        /*console.log("这个月有多少天");
        console.log(daysOfCurrentMonth);
        console.log("月初星期几");
        console.log(weekdayOfFirstDayOfCurrentMonth);
        console.log("月末星期几");
        console.log(weekdayOfLastDayOfCurrentMonth);*/
        // 填充
        for (let i = weekdayOfFirstDayOfCurrentMonth - 1; i >= 1; i--) {
            const li = document.createElement('li');
            const d = new Date(fistDayOfCurrentMonth - 86400 * 1000 * i);
            li.textContent = d.getDate();
            li.onclick = () => {
                if (selectedLi) {
                    selectedLi.classList.remove("calender-days-selected")
                }
                li.classList.add("calender-days-selected");
                selectedLi = li;
            }
            li.classList.add("calender-days-notCurrentMonth");
            days.append(li);
            n += 1;
        }
        for (let i = 1; i <= daysOfCurrentMonth; i++) {
            const li = document.createElement('li');
            li.textContent = i;
            if (i === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear()) {
                li.classList.add("calender-days-today");
            }
            li.onclick = () => {
                if (selectedLi) {
                    selectedLi.classList.remove("calender-days-selected")
                }
                li.classList.add("calender-days-selected");
                selectedLi = li;
            }
            days.append(li);
            n += 1;
        }
        let i = weekdayOfLastDayOfCurrentMonth + 1;
        for (let j = 0; j < 42 - n; j++) {
            const delta = i - weekdayOfLastDayOfCurrentMonth;
            const li = document.createElement('li');
            const d = new Date(lastDayOfCurrentMonth - 0 + 86400 * 1000 * delta);
            li.textContent = d.getDate();
            li.onclick = () => {
                if (selectedLi) {
                    selectedLi.classList.remove("calender-days-selected")
                }
                li.classList.add("calender-days-selected");
                selectedLi = li;
            }
            li.classList.add("calender-days-notCurrentMonth");
            days.append(li);
            i++;
        }
    }
}

function g(selector) {
    return document.querySelector(selector);
}
function gs(selector) {
    return document.querySelectorAll(selector);
}