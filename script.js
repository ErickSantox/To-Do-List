document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.querySelector("#tasks");
    const addButton = document.querySelector("#btn");
    const taskList = document.querySelector("#list");

    // Carrega as tarefas salvas no localStorage ao carregar a página
    loadTasks();

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
    saveTasks(); // Salva as tarefas no localStorage após adicionar
}

function removeTask(taskElement) {
    taskElement.remove();
    saveTasks(); // Salva as mudanças no localStorage após remover
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
    saveTasks(); // Salva o estado no localStorage após marcar/desmarcar
}

function editTask(taskElement) {
    const taskText = taskElement.querySelector("span");
    const newText = prompt("Editar tarefa:", taskText.textContent);

    if (newText !== null) {
        taskText.textContent = newText;
        saveTasks(); // Salva as alterações no localStorage após editar
    }
}

// Função para salvar as tarefas no localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#list li").forEach(function(taskItem) {
        const taskText = taskItem.querySelector("span").textContent;
        const isCompleted = taskItem.querySelector(".check").style.color === "rgb(52, 146, 35)";
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para carregar as tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        const taskList = document.querySelector("#list");
        const newTaskItem = document.createElement("li");
        newTaskItem.innerHTML = `
            <ion-icon class="check icon" name="checkmark-circle-outline" style="color: ${task.completed ? '#349223' : ''}"></ion-icon>
            <span style="text-decoration: ${task.completed ? 'line-through' : ''}">${task.text}</span>
            <ion-icon name="create-outline" class="edit"></ion-icon>
            <ion-icon class="close" name="trash-outline"></ion-icon>
        `;
        taskList.appendChild(newTaskItem);
    });
}
