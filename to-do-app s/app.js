var firebaseConfig = {
    apiKey: "AIzaSyDd1wqSWVYwBeOqdw94bByK9-6BIgGr6zE",
    authDomain: "todo-app-24367.firebaseapp.com",
    databaseURL: "https://todo-app-24367-default-rtdb.firebaseio.com",
    projectId: "todo-app-24367",
    storageBucket: "todo-app-24367.appspot.com",
    messagingSenderId: "535477514087",
    appId: "1:535477514087:web:b14fc257dd8055b76549c2"
  };
  
  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
  
  firebase
    .database()
    .ref("todos")
    .on("child_added", function (data) {
      // console.log(data.val().key);
      // console.log(data.val().todoValue);
  
      var list = document.getElementById("list");
  
      var liElement = document.createElement("li");
  
      var liText = document.createTextNode(data.val().todoValue);
  
      liElement.appendChild(liText);
  
      var list = document.getElementById("list");
  
      list.appendChild(liElement);
  
      var delBtnELement = document.createElement("button");
  
      var delBtnText = document.createTextNode("delete");
  
      delBtnELement.appendChild(delBtnText);
  
      liElement.appendChild(delBtnELement);
  
      delBtnELement.style.backgroundColor = "blue";
      delBtnELement.style.color = "white";
  
      delBtnELement.setAttribute("onclick", "deleteItem(this)");
  
      delBtnELement.setAttribute("id", data.val().key);
      //   Edit button creation
  
      var EditBtnELement = document.createElement("button");
  
      var EditBtnText = document.createTextNode("edit");
  
      EditBtnELement.appendChild(EditBtnText);
  
      liElement.appendChild(EditBtnELement);
  
      EditBtnELement.setAttribute("class", "editBtn");
  
      EditBtnELement.setAttribute("id", data.val().key);
  
      EditBtnELement.setAttribute("onclick", "editItem(this)");
    });
  
    function addTodo() {
        var input = document.getElementById("todoInput");
      
        var id = Date.now().toString(31);
      
        var obj = {
          key: id,
          todoValue: input.value,
        };
      
        console.log(obj);
      
        firebase
          .database()
          .ref("todos/" + id) // Corrected from ValId to id
          .set(obj); // Corrected from setting faraz.id and updateValue to obj
      
        input.value = ""; // Clearing the input field after adding todo
    }
    
    
    function deleteAll() { // Corrected function name from delteAll to deleteAll
        firebase.database().ref("todos").remove();
        var list = document.getElementById("list");
        list.innerHTML = "";
    }
    
    function deleteItem(e) {
        firebase
          .database()
          .ref("todos/" + e.id)
          .remove();
        e.parentNode.remove();
    }
    
    function editItem(faraz) {
        var ValId = faraz.id;
        var updateValue = prompt("Enter updated value..");
      
        firebase
          .database()
          .ref("todos/" + ValId)
          .set({
            key: ValId, // Corrected from e.id to ValId
            todoValue: updateValue,
          });
      
        faraz.parentNode.firstChild.nodeValue = updateValue; // Corrected from e to faraz
    }
    