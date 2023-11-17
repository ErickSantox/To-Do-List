document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.querySelector("#tasks");
    const addButton = document.querySelector("#btn");
    const taskList = document.querySelector("#list");

    addButton.addEventListener("click", function() {
        addTask(taskInput.value);
        taskInput.value = "";
    });

    taskList.addEventListener("click", function(e) {
        const targetElement = e.target;

        if (targetElement.classList.contains("close")) {
            removeTask(targetElement.parentElement);
        } else if (targetElement.classList.contains("check")) {
            toggleTaskCompletion(targetElement.parentElement);
        } else if (targetElement.classList.contains("edit")) {
            editTask(targetElement.parentElement);
        }
    });
});

function addTask(taskText) {
    if (taskText.trim() === "") {
        alert("Digite uma tarefa válida");
        return;
    }

    const taskList = document.querySelector("#list");
    const newTaskItem = document.createElement("li");
    newTaskItem.innerHTML = `
        <ion-icon class="check icon" name="checkmark-circle-outline"></ion-icon>
        <span>${taskText}</span>
        <ion-icon name="create-outline" class="edit"></ion-icon>
        <ion-icon class="close" name="trash-outline"></ion-icon>
    `;

    taskList.appendChild(newTaskItem);
}

function removeTask(taskElement) {
    taskElement.remove();
}

function toggleTaskCompletion(taskElement) {
    const checkIcon = taskElement.querySelector(".check");
    const taskText = taskElement.querySelector("span");

    if (checkIcon.style.color === "rgb(52, 146, 35)") {
        // Se a tarefa estiver concluída, desmarcar
        checkIcon.style.color = "";
        taskText.style.textDecoration = "";
    } else {
        // Se a tarefa não estiver concluída, marcar como concluída
        checkIcon.style.color = "#349223";
        taskText.style.textDecoration = "line-through";
    }
}

function editTask(taskElement) {
    const taskText = taskElement.querySelector("span");
    const newText = prompt("Editar tarefa:", taskText.textContent);

    if (newText !== null) {
        taskText.textContent = newText;
    }
}
