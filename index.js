const formEl = document.querySelector(".form");
const ulEl = document.querySelector(".list");
const inputEl = document.querySelector(".input");

let list = JSON.parse(localStorage.getItem("list"))
if (list) {
    list.forEach((task)=> {
        toDoList(task);
    })
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    toDoList();
});

function toDoList(task) {
    let newtask = inputEl.value;
    if(task) {
        newtask = task.name
    }
    const liEl = document.createElement("li");
    if(task && task.checked) {
        liEl.classList.add("checked")
    }
    liEl.innerText = newtask;
    ulEl.appendChild(liEl);
    inputEl.value = "";

    const checkbtnEl = document.createElement("div");
    checkbtnEl.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
    liEl.appendChild(checkbtnEl);

    const trashbtnEl = document.createElement("div");
    trashbtnEl.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    liEl.appendChild(trashbtnEl);

    checkbtnEl.addEventListener("click", () => {
        liEl.classList.toggle("checked");
        updateLocalStorage();
    });

    trashbtnEl.addEventListener("click", () => {
        liEl.remove();
        updateLocalStorage();
    });
    updateLocalStorage();
}

function updateLocalStorage() {
    const liEls = document.querySelectorAll("li");
    list = []
    liEls.forEach((liEl) => {
        list.push({
            name: liEl.innerText,
            checked: liEl.classList.contains("checked")
        });
    });
    localStorage.setItem("list", JSON.stringify(list));
}