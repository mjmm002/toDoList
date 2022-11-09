let createBtn = document.querySelector("#createBtn");
createBtn.addEventListener("click", createTodo);
let getDate = document.querySelector("#wew");
let toDoList = document.querySelector("#toDoList");




function limitList(){
    if (toDoList.childElementCount >= 5 ){
        createBtn.disabled = true;
    } else if (toDoList.childElementCount < 5){
        createBtn.disabled = false;
    }
}

function createTodo(){
    let createListName = document.querySelector("#floatingInput").value;
    let createListValue = document.querySelector("#floatingInput");
    let itemList = document.createElement("div")
    let itemListContent = document.createElement("div")
    let updateBtn = document.createElement("button");
    let removeBtn = document.createElement("button");
    let itemTitle = document.createElement("span");
    let itemDate = document.createElement("small");

    //createItem(div) attributes
    itemList.classList = "rounded item-row p-2 my-4 d-flex justify-content-between"
    itemListContent.classList = "d-flex"

    //update Button
    updateBtn.type = "button";
    updateBtn.innerHTML = "Update"
    updateBtn.classList = "badge text-bg-info btn-update mx-1"
    
    //Remove Button
    removeBtn.type = "button";
    removeBtn.innerHTML = "Delete"
    removeBtn.classList = "badge text-bg-danger btn-del mx-1 me-3"

    //set todo name
    itemTitle.innerHTML = createListName;
    itemTitle.style.fontSize = "1.2rem"
    itemTitle.classList= "pb-1"

    //get the current time
    let dtFormat = new Intl.DateTimeFormat("en-US", {

        hour: "2-digit",
     
        minute: "2-digit"
     
     });
     let time = new Date();
     let dFormat = new Intl.DateTimeFormat("default");
     
     let date = new Date()

    //set todo time
    itemDate.innerHTML = dFormat.format(date)+ " " + dtFormat.format(time);
    itemDate.style.fontSize = ".5rem"
    itemDate.classList = "d-none d-sm-block"
    
    //Add TodoList
    toDoList.appendChild(itemList);
    itemList.appendChild(itemListContent);
    itemListContent.appendChild(updateBtn);
    itemListContent.appendChild(removeBtn);
    itemListContent.appendChild(itemTitle);
    itemList.appendChild(itemDate);
    
    updateBtn.addEventListener("click", updateList);
    removeBtn.addEventListener("click", removeValue);

    createListValue.value = "";
    limitList()

    
    function updateList(){
        let saveBtn = document.createElement("button");
        let updateListName = document.createElement("input");
        let cancelBtn = document.createElement("Button");
        
        updateListName.type = "text";
        updateListName.value = itemTitle.innerHTML;
        updateListName.classList = "form-control"
        updateListName.maxLength = "15"

        saveBtn.innerHTML = "Save"
        saveBtn.classList = "badge text-bg-primary btn-update mx-1 me-3";
        
        cancelBtn.classList = "badge text-bg-secondary btn-update"
        cancelBtn.innerHTML = "cancel"
        
        updateBtn.setAttribute("disabled", "");
        itemListContent.removeChild(removeBtn);
        itemListContent.appendChild(saveBtn);
        itemListContent.removeChild(itemTitle);
        itemListContent.appendChild(updateListName);
        itemList.removeChild(itemDate);
        itemList.appendChild(cancelBtn);
        

        cancelBtn.addEventListener("click", cancelUpdate)
        saveBtn.addEventListener("click", saveValue);

        function saveValue(){
            let text = "Are you sure you want to save Changes?"
            updateBtn.removeAttribute("disabled", "");
            itemList.removeChild(cancelBtn);
            itemList.appendChild(itemDate);
            if (confirm(text) == true){
                let updateTitle = updateListName.value;
                itemTitle.innerHTML = updateTitle;
                console.log(updateTitle);
                itemListContent.appendChild(removeBtn);
                itemListContent.appendChild(itemTitle);
                itemListContent.removeChild(saveBtn);
                itemListContent.removeChild(updateListName)
            } else{
                itemListContent.appendChild(removeBtn);
                itemListContent.appendChild(itemTitle);
                itemListContent.removeChild(saveBtn);
                itemListContent.removeChild(updateListName);                
            }
            alert(text);
        }

        function cancelUpdate(){
            itemListContent.removeChild(saveBtn);
            itemListContent.removeChild(updateListName);
            itemListContent.appendChild(removeBtn);
            itemListContent.appendChild(itemTitle);
            itemList.removeChild(cancelBtn);
            itemList.appendChild(itemDate);
            updateBtn.removeAttribute("disabled", "")
        }
    }
    function removeValue(){
        

        let text = "Are you sure you want to delete " + itemTitle.innerHTML + "?"
        if (confirm(text) == true){
            itemListContent.parentNode.remove()
        } else{
            return false;      
        }
        limitList()
        
        
        
    }
    
}
