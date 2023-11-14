const task = document.querySelector("#tasks");
const btn = document.querySelector("#btn");
const list = document.querySelector("#list");

btn.addEventListener("click", function(){
    if(task.value == ""){
        alert("Digite uma tarefa valida")
    } 
    else{
        list.innerHTML += `<li>
                                <ion-icon class="check icon" name="checkmark-circle-outline"></ion-icon>
                                <span>${task.value}</span>
                                <ion-icon class="close" name="trash-outline"></ion-icon>
                            </li>`
    }
    task.value = ""


    const close = document.querySelectorAll(".close");

    for(let i=0; i<close.length; i++){
        close[i].addEventListener("click", function(){
            close[i].parentElement.remove();
        })
    }

    list.addEventListener("click",function(e){
        e.target.parentElement.querySelector(".check").style.color = "#349223";
        e.target.parentElement.querySelector("span").style.textDecoration = "line-through";
    })


})