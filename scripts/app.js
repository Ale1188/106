function saveTask(){
    console.log("Saving Task");
    const title = $("#txtTitle").val();
    const description = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    let taskToSave = new Task (title,description,color,date,status,budget);
    console.log(taskToSave);

    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data:JSON.stringify(taskToSave),
        contentType: "application/json",
        success: function(response){
            // console.log(response);
            displayTask(taskToSave);
            $("input, select, textarea").val(""); //clear all.
        },
        error: function(error){
            console.log(error);
        }
    });
}

function loadTask(){
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        success: function(response){
            let data = JSON.parse(response);
            // console.log(data);
            for(let i=0;i<data.length;i++){
                let task = data[i];
                if(task.name == "Johan"){
                    displayTask(task);
                }
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}

function deleteTask(id) {
    console.log(id);
    $.ajax({
        type: "DELETE",
        url: `https://fsdiapi.azurewebsites.net/api/tasks/${id}/`,
        success: function(response) {
            console.log("Task deleted:", response);
            $(`#${id}`).remove();
        },
        error: function(error) {
            console.log("Error deleting task:", error);
        }
    });
}

function displayTask(task){
    let syntax = `
    <div class="task" id="${task._id}">
        <div class="info">
            <h3>${task.title}</h3>
            <h5>${task.description}</h5>
        </div>
        <label class="status">${task.status} - ${task.color} </label>
        <div class="date-budget">
            <label>${task.date}</label>
            <label>$ ${task.budget}</label>
        </div>
        <button class="btn" id="btnDelete" onclick="deleteTask('${task._id}')">Remove</button>
    </div>
    `
    $(".list-task").append(syntax);
}

// function testRequest(){

// }

function init(){
    loadTask();
    // console.log("Task manager");
    $("#btnSave").click(function(){
        saveTask();
    });
}

window.onload = init;