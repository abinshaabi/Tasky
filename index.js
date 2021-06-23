const taskContainer = document.querySelector("#task_container");


const globalStore = [];

const createNewcard = (taskData) => 
    `<div class="col-md-6 col-lg-4 mb-5" id="${taskData.id}">
        <div class="card  shadow">
        <div class="card-header d-flex justify-content-end gap-1">
            <button type="button" class="btn btn-outline-success">
            <i class="fas fa-pencil-alt"></i>
            </button>
            <button type="button" class="btn btn-outline-danger">
            <i class="fas fa-trash-alt"></i>
            </button>
        </div>
        <img src="${taskData.imageUrl}" alt="image url">
        <div class="card-body">
            <h5 class="card-title">${taskData.taskTitle}</h5>
            <p class="card-text">${taskData.taskDescription}</p>
            <a href="#" class="btn btn-primary">${taskData.taskType}</a>
        </div>
        <div class="card-footer">
            <button type="button" class="btn btn-outline-primary float-end">
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
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };
     


    taskContainer.insertAdjacentHTML("beforeend", createNewcard(taskData));

    globalStore.push(taskData);

    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));
    
};
 
