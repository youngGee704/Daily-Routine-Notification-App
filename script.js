// requesting notification permission
if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
}

// my own custom tasks in an array
const tasks = [
    { time: "05:30 AM", activity: "Bible app and pray" },
    { time: "05:35 AM", activity: "Meditation" },
    { time: "05:50 AM", activity: "Airdrops" },
    { time: "08:00 AM", activity: "Home workout app" },
    { time: "08:15 AM", activity: "Bath and brush" },
    { time: "08:30 AM", activity: "Eat" },
    { time: "10:00 AM", activity: "Start studying programming" },
    { time: "12:00 PM", activity: "Rest and launch" },
    { time: "02:00 PM", activity: "Resume studying programming" },
    { time: "04:00 PM", activity: "Rest and chill" },
    { time: "06:00 PM", activity: "Meditation" },
    { time: "06:15 PM", activity: "TTW app study" },
    { time: "06:45 PM", activity: "Dinner prep" },
    { time: "07:30 PM", activity: "Bath" },
    { time: "10:50 PM", activity: "Daily combo And Next day plan" }
];

// targetting all the html ID's 
const taskList = document.getElementById("task-list");
const timeInput = document.getElementById("time-input");
const activityInput = document.getElementById("activity-input");
const addTaskBtn = document.getElementById("add-task-btn");
const usePredefinedBtn = document.getElementById("use-predefined-btn");
const setOwnAlarmBtn = document.getElementById("set-own-alarm-btn");

let isCustomAlarm = false; // Track if user is setting custom alarms

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle 0 as 12

    document.getElementById("clock").textContent = `Current Time: ${hours}:${minutes}:${seconds} ${ampm}`;
}

setInterval(updateClock, 1000); // Update clock every second

function logActivity(task) {
    setTimeout(() => {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";
        taskItem.innerHTML = `<span class='task-time'>[${task.time}]</span> ${task.activity} <input class='time-input' type='text' value='${task.time}' data-task='${task.activity}'>`;
        taskList.appendChild(taskItem);

        // Send notification
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(`${task.time}: ${task.activity}`);
        } else {
            alert(`${task.time}: ${task.activity}`);
        }
    }, calculateDelay(task.time));
}

function calculateDelay(targetTime) {
    const [time, modifier] = targetTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const now = new Date();
    const target = new Date();
    target.setHours(hours, minutes, 0, 0);

    let delay = target - now;
    if (delay < 0) delay += 24 * 60 * 60 * 1000; // Adjust for next day if time already passed

    return delay;
}

// Button event handlers
usePredefinedBtn.addEventListener("click", () => {
    taskList.innerHTML = ""; // Clear task list
    tasks.forEach(logActivity);
    alert('You are now using the Predefined Tasks!');
});

setOwnAlarmBtn.addEventListener("click", () => {
    isCustomAlarm = true;
    taskList.innerHTML = "";
    timeInput.value = "";
    activityInput.value = "";
    alert("Set your own alarms below");
});

addTaskBtn.addEventListener("click", () => {
    const time = timeInput.value;
    const activity = activityInput.value;

    if (time && activity) {
        tasks.push({ time, activity });
        logActivity({ time, activity });
        timeInput.value = "";
        activityInput.value = "";
        alert('Task Added successfully!')
    } else{
        alert('Task is not Set!');
    }
});
