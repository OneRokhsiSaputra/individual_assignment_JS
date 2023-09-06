const labels = document.querySelectorAll(".add-wrapper label")

labels.forEach((label) => {
    let input = label.querySelector("input");
    let span = label.querySelector("span");
    input.addEventListener("change", () => {
        span.innerHTML = input.value;
    });
});

let tasksArr = [
    {
        title: "Tugas 1",
        description: "Tugas 1 deskripsi",
        date: '01 Jul 2023',
        time: "10:30",
    },
    {
        title: "Tugas 2",
        description: "Tugas 2 deskripsi",
        date: '15 Aug 2023',
        time: "10:30",
    },
    {
        title: "Tugas 3",
        description: "Tugas 3 deskripsi",
        date: '01 Nov 2023',
        time: "10:30",
    },
];
const taskWrapper = document.querySelector(".tasks-wrapper");

function addTasks() {
    taskWrapper.innerHTML = "";
    // Tugas arr kosong
    if (tasksArr.length === 0) {
        taskWrapper.innerHTML = `<div class="no-tasks">Tambah Tugas Sekarang</div>`;
        return;
    }
    // arr memiliki tugas
    tasksArr.forEach((task) => {
        // cek expired
        let expired;
        expired = checkExpired(task) ? "expired" : "";

        taskWrapper.innerHTML += `
        <div class="task">
                    <div class="left">
                    <div class="radio">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    </div>
                    <div class="right">
                    <p class="title">${task.title}</p>
                    <p class="description">${task.description}</p>
                    <div class="info ${expired}">
                    <p class="date">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <span>${task.date}</span>
                    </p>
                    <p class="dot">
                    <svg height="24" width="24">
                    <ellipse cx="200" cy="80" rx="100" ry="50"
                    style="fill:yellow;stroke:purple;stroke-width:2" />
                    </svg></p>
                    <p class="time">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>${task.time}</span>
                    </p>
            </div>
            </div>
        </div>
        `;
    });

    taskWrapper.innerHTML += `
    <div class="delete">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
    </div>`;

    const tasks = document.querySelectorAll(".task");

    tasks.forEach((task) => {
        task.addEventListener("click", (item) => {
            // jika radio di klik
            if (item.target.classList.contains("radio")) {
                task.classList.toggle("selected");
                // tampilkan tombol hapus ketika tugas di pilih
                if (document.querySelector(".task.selected")) {
                    document.querySelector(".delete").classList.add("show");
                } else {
                    document.querySelector(".delete").classList.remove("show");
                }
            }
        })
    })

    // saat menghapus, hapus tugas dari arr dan addTask
    const deleteBtn = document.querySelector(".delete");
    deleteBtn.addEventListener("click", deleteTasks);
}

addTasks();

function checkExpired(task) {
    let date = new Date(task.date);
    let time = new Date(task.time);
    let now = new Date();
    if (date < now || time < now) {
        return true;
    }
    return false;
}

function deleteTasks() {
    const selectedTasks = document.querySelectorAll(".task.selected");
    if (selectedTasks.length === 0) return;
    // ketika tugas dipilih, di hapus
    let confirmDelete = confirm("Apa kamu yakin menghapus tugas yang di pilih?");
    if (confirmDelete) {
        selectedTasks.forEach((task) => {
            let title = task.querySelector(".title").innerHTML;
            tasksArr = tasksArr.filter((task) => task.title !== title);
        });
        addTasks();
    }
}

const addTaskForm = document.getElementById("add-task-form"),
    titleElem = document.getElementById("title"),
    descriptionElem = document.getElementById("description"),
    dateElem = document.getElementById("date"),
    timeElem = document.getElementById("time");

addTaskForm.addEventListener("submit", (item) => {
    item.preventDefault();
    let title = titleElem.value,
        description = descriptionElem.value,
        date = dateElem.value,
        time = timeElem.value;
    
    // validasi
    if (title === "" || description === "" || date === "" || time === "") {
    // jika ada yang kosong
    alert("Harus di idi semua");
}

let task = {
    title,
    description,
    date,
    time,
};

// push in arr
tasksArr.push(task);
addTasks();
clear();
});

function clear() {
    titleElem.value = "";
    descriptionElem.value = "";
    dateElem.value = "";
    timeElem.value = "";

    dateElem.nextElementSibling.innerHTML = "tanggal";
    timeElem.nextElementSibling.innerHTML = "waktu";
}
const clearBtn = document.querySelector(".clear");

clearBtn.addEventListener("click", clear)
