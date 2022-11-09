let createBtn = document.querySelector("#createBtn");
createBtn.addEventListener("click", createTodo);
let getDate = document.querySelector("#wew");
let toDoList = document.querySelector("#toDoList");



let dFormat = new Intl.DateTimeFormat("en-US", {

    year: "numeric",
 
    month: "short",
 
    day: "2-digit"
 
 });
 let date = new Date();

 function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
}

function showDate(){
    MyDateDisplay.innertext = dFormat.format(date);
    MyDateDisplay.textContent = dFormat.format(date);
}

showTime();
showDate();

function limitList(){
    let rmvBtn = document.querySelectorAll(".btn-del");
    if (toDoList.childElementCount >= 5 ){
        createBtn.disabled = true;
    } else if (toDoList.childElementCount < 5){
        createBtn.disabled = false;
    }

    if (toDoList.childElementCount <= 1){
        rmvBtn[0].disabled = true;
    } else if(toDoList.childElementCount > 1){
        rmvBtn[0].disabled = false;
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
    if (createListName === ""){
        alert("Please Input a task");
    } else{
        //createItem(div) attributes
        itemList.classList = "rounded item-row p-2 mb-4 d-flex justify-content-between"
        itemListContent.classList = "d-flex"

        //update Button
        updateBtn.type = "button";
        updateBtn.innerHTML = `<i class="fa-solid fa-pen px-sm-0 px-1"></i><span class="d-sm-block d-none">Update</span>`
        updateBtn.classList = "badge text-bg-info btn-update mx-1"
        
        //Remove Button
        removeBtn.type = "button";
        removeBtn.innerHTML = `<i class="fa-solid fa-trash-can px-sm-0 px-1"></i><span class="d-sm-block d-none">Delete</span>`
        removeBtn.classList = "badge text-bg-danger btn-del mx-1 me-3"

        //set todo name
        itemTitle.innerHTML = createListName;
        itemTitle.style.fontSize = "1.2rem"
        itemTitle.classList= "pb-1 overflow-hidden"

        //get the current time
        let dtFormat = new Intl.DateTimeFormat("en-US", {

            hour: "2-digit",
        
            minute: "2-digit"
        
        });
        let time = new Date();
        
         
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
        limitList();

        
        function updateList(){
            let saveBtn = document.createElement("button");
            let updateListName = document.createElement("input");
            let cancelBtn = document.createElement("Button");
            
            updateListName.type = "text";
            updateListName.value = itemTitle.innerHTML;
            updateListName.classList = "form-control"
            updateListName.maxLength = "15"

            saveBtn.innerHTML = `<i class="fa-solid fa-check px-sm-0 px-1"></i><span class="d-sm-block d-none">Save</span>`
            saveBtn.classList = "badge text-bg-primary btn-update mx-1 me-sm-3";
            
            cancelBtn.classList = "badge text-bg-secondary btn-update"
            cancelBtn.innerHTML = `<i class="fa-solid fa-xmark px-sm-0 px-1"></i><span class="d-sm-block d-none">Cancel</span>`
            
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
                let text = "Are you sure you want to save changes?"
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
    
}
