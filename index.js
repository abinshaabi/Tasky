const taskContainer = document.querySelector("#task_container");


var globalStore = []; //changed to var for delete

const defaultImageUrl = "https://pmtips.net/Portals/0/EasyDNNNews/2137/700600p546EDNmainimg-3-types-of-tools-for-project-task-management1.jpg"

const createNewcard = (taskData) => 
    `<div class="col-md-6 col-lg-4 mt- 5 mb-5" >
        <div class="card shadow">
            <div class="card-header d-flex justify-content-end gap-1">
                <button type="button" class="btn btn-outline-success   id="${taskData.id}" onclick="editCard.apply(this, arguments)"">
                    <i class="fas fa-pencil-alt   id="${taskData.id}" onclick="editCard.apply(this, arguments)""></i>
                </button>
                <button type="button" class="btn btn-outline-danger" id="${taskData.id}" onclick="deleteCard.apply(this, arguments)">
                    <i class="fas fa-trash-alt" id="${taskData.id}" onclick="deleteCard.apply(this, arguments)"></i>
                </button>
            </div>
            <img src="${taskData.imageUrl}" alt="image url" style="height: 14rem">
            <div class="card-body">
                <h5 class="card-title">${taskData.taskTitle}</h5>
                <p class="card-text">${taskData.taskDescription}</p>
                <a href="#" class="btn btn-primary">${taskData.taskType}</a>
            </div>
            <div class="card-footer">
                <button type="button" id="${taskData.id}" class="btn btn-outline-primary float-end">
                Open Task
                </button>
            </div>
        </div>

    </div>
    `;

const loadInitialCardData = () =>{
    //get tasky data from localstorage
    const getCardData = localStorage.getItem("tasky");

    //convert from string to normal object
    const {cards} = JSON.parse(getCardData);

    //loop over the cards
    cards.map((cardObject) => {
        //inject it to DOM
        taskContainer.insertAdjacentHTML("beforeend", createNewcard(cardObject));
        
        //update our globalStore
        globalStore.push(cardObject);
    })
};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("imageurl").value? document.getElementById("imageurl").value : defaultImageUrl ,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };
     


    taskContainer.insertAdjacentHTML("beforeend", createNewcard(taskData));

    globalStore.push(taskData);

    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));
    
};
 
const deleteCard = (event) => {
    event = window.event;
    //id
    const targetId = event.target.id;
    const tagname = event.target.tagName;
    //match the id of the elemnt and  updating the globalStore
    const newUpdatedArray = globalStore.filter((cardObject) => cardObject.id != targetId);
    globalStore = newUpdatedArray;
    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));

    //contacting parent to remove child
    if(tagname === "BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }

}

const editCard = (event) => {
    event = window.event;

    const targetId = event.target.id;
    const tagname = event.target.tagName;

    let parent;
    if (tagname === "BUTTON") {
        parent = event.target.parentNode.parentNode
    } else {
        parent = event.target.parentNode.parentNode.parentNode
    }

    //finding the html elements
    let taskTitle = parent.childNodes[5].childNodes[1];
    let taskDesc = parent.childNodes[5].childNodes[3];
    let taskType = parent.childNodes[5].childNodes[5];
    let submitButton = parent.childNodes[7].childNodes[1];
    
    taskTitle.setAttribute("contenteditable", "true")    
    taskDesc.setAttribute("contenteditable", "true")    
    taskType.setAttribute("contenteditable", "true")    
    submitButton.innerHTML = "Save Changes";
    submitButton.setAttribute("onclick", "saveEditChangesButton.apply(this, arguments)")
    submitButton.setAttribute("class", " btn float-end  text-light bg-primary")

}

const saveEditChangesButton = (event) => {
    event = window.event;

    const targetId = event.target.id;
    const tagname = event.target.tagName;

    let parent;
    if (tagname === "BUTTON") {
        parent = event.target.parentNode.parentNode
    } else {
        parent = event.target.parentNode.parentNode.parentNode
    }

    let taskTitle = parent.childNodes[5].childNodes[1];
    let taskDesc = parent.childNodes[5].childNodes[3];
    let taskType = parent.childNodes[5].childNodes[5];
    let submitButton = parent.childNodes[7].childNodes[1];
    
    const updatedData = {
        taskTitle: taskTitle.innerHTML,
        taskType: taskType.innerHTML,
        taskDescription: taskDesc.innerHTML,

    }
    
    // adding the updateddata to globalstore
    globalStore = globalStore.map((task) => {
        if(task.id === targetId) {
            return {
                id: task.id,
                imageUrl: task.imageUrl ,
                taskTitle: taskTitle.innerHTML,
                taskType: taskType.innerHTML,
                taskDescription: taskDesc.innerHTML,
            };      
        }
        return task;
    })

    

    //updating localstorage
    
    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));

    taskTitle.setAttribute("contenteditable", "false")    
    taskDesc.setAttribute("contenteditable", "false")    
    taskType.setAttribute("contenteditable", "false")    
    submitButton.innerHTML = "Open Task";
    submitButton.removeAttribute("onclick")
    submitButton.setAttribute("class", " btn btn-outline-primary float-end ")

}