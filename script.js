"use strict";
// VARIABLES
const taskList = document.querySelector(".task--lists");
const enterBtn = document.querySelector(".enter");
const input = document.querySelector(".text--input");
const box = document.querySelectorAll(".box");
const numTask = document.querySelector(".task--not--done p");
const numTaskDone = document.querySelector(".task--done p");
// FUNCTIONS

const tas = {
  taskDone: [],
  taskNotDone: [],
};

const dispalyTask = function () {
  taskList.innerHTML = "";
  tas.taskNotDone.forEach((value, index) => {
    const html = `
  <div class="task task${index + 1} unmark__task">
            <input type="checkbox" class="box" id='check${value}'  />
          <p class="task-data">${value}</p>
          <p class="delete">X</p>
        </div>
  `;
    taskList.insertAdjacentHTML("afterbegin", html);
  });
};

const dispalyTaskDone = function () {
  if (tas.taskDone.length !== 0) {
    tas.taskDone.forEach((value, index) => {
      const html = `
  <div class="task task${index + 1} mark__task">
            <input type="checkbox" class="box" id='check${value}' checked />
          <p class="task-data task-data--completed">${value}</p>
          <p class="delete">X</p>
        </div>
  `;
      taskList.insertAdjacentHTML("beforeend", html);
    });
  }
};

const addTask = function () {
  if (!(input.value === "")) {
    tas.taskNotDone.push(`${input.value}`);
    update();
  }
};

const taskSummery = function () {
  numTask.textContent = tas.taskNotDone.length;
  numTaskDone.textContent = tas.taskDone.length;
};

const update = function () {
  input.value = "";
  dispalyTask();
  dispalyTaskDone();
  taskSummery();
};

// EVENTS
enterBtn.addEventListener("click", addTask);
update();

document.addEventListener("keydown", function (el) {
  if (el.key === "Enter") addTask();
});

let condition = true;

taskList.addEventListener("click", function (el) {
  const active = el.target;
  const activeParent = active.parentElement.classList;
  const activTask = document.querySelector(
    `.${activeParent[1]} p`
  )?.textContent;
  const activeIndex = condition
    ? tas.taskNotDone.findIndex((l) => l === `${activTask}`)
    : tas.taskDone.findIndex((l) => l === `${activTask}`);

  //MARK

  if (active.classList.contains("box") && active.checked) {
    condition = true;
    const [doneIndex] = tas.taskNotDone.splice(activeIndex, 1);

    tas.taskDone.push(doneIndex);
    update();
  }

  // UN MARK

  if (active.classList.contains("box") && !active.checked) {
    condition = false;
    const [notDone] = tas.taskDone.splice(activeIndex, 1);
    tas.taskNotDone.push(notDone);
    console.log(tas.taskDone, tas.taskNotDone);
    update();
  }

  // DELETE

  if (active.classList.contains("delete")) {
    const taskDelete =
      activeParent[2] === "unmark__task" ? tas.taskNotDone : tas.taskDone;

    console.log(activeIndex);
    taskDelete.splice(activeIndex, 1);
    console.log(taskDelete);
    update();
  }
});
