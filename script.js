//TO-DO list controller
var todoController = (function(){
    
    var Element = function(id, description){
        this.id = id;
        this.description = description;
    };    
    
    var data = {
        unsolvedTasks: 0,
        solvedTasks: 0,
        tasksArr: [],
        solvedTasksArr: []
    }; 
    
    return{
        addData: function(desc){
            var element, ID;
            if(data.tasksArr.length === 0){
                ID = 0;
            } else if (data.tasksArr.length > 0){
                ID = data.tasksArr[data.tasksArr.length - 1].id + 1;
            }
            element = new Element(ID, desc);
            data.tasksArr.push(element);
            return element;
        },
        
        noOfTasks: function(){
            data.unsolvedTasks = data.tasksArr.length;
            data.solvedTasks = data.solvedTasksArr.length;
        },
        
        getTasks: function(){
            return {
                unsolved: data.unsolvedTasks,
                solved: data.solvedTasks
            }
        }, 
        
        deleteItem: function(id){
            var elem, rem;
            elem = data.tasksArr.map(function(current){
                return current.id;
            });
            rem = elem.indexOf(id);
            data.tasksArr.splice(rem, 1);
        }       
    }
    
})();

//UI Controller
var UIController = (function(){
    
    //Assign DOM strings
    var DOMStrings = {
        dayOfWeek: '.day',
        date: '.date',
        tasksNumber: '.task_number',
        solvedTasksNumber: '.solved_task_number',
        addInput: '.add-input',
        addButton: '.add-button',
        toDoTasks: '.to-do-tasks',
        solvedTasks: '.solved-tasks',
        toDoContainer: '.ttask',
        solvedContainer: '.stask',
        deleteTask: '.del',
        tasks: '.tasks'
    };
    
    return {
        getDOMStrings: function(){
            return DOMStrings;  
        },
        displayDayOfTheWeek: function(){
            var day, date;
            date = new Date();
            day = date.getDay();
            dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            dayOfTheWeek = dayArr[day];
            document.querySelector(DOMStrings.dayOfWeek).textContent = dayOfTheWeek;
        },
        displayFullDate: function(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear(); 
            date = dd + '/' + mm + '/' + yyyy;
            document.querySelector(DOMStrings.date).textContent = date;
        },
        displayTasksInUI : function(obj){
              document.querySelector(DOMStrings.tasksNumber).textContent = obj.unsolved;
              document.querySelector(DOMStrings.solvedTasksNumber).textContent = obj.solved;
        },
        readInputValue: function(){
            var inputValue;
            inputValue = document.querySelector(DOMStrings.addInput).value;
            return inputValue;
        },
        updateTasks: function(obj){
            document.querySelector(DOMStrings.tasksNumber).textContent = obj.unsolved;
            document.querySelector(DOMStrings.solvedTasksNumber).textContent = obj.solved;
        },
        createHTMLElement: function(obj){
            var html, newHTML;
            html = '<div class="ttask" id="%id%"><div class="tsk">%desc%</div><div class="del-solved"><div class="del" id="del"><i class="fa fa-trash-o fa-lg"></i></div><div class="solved" id="solved"><i class="fa fa-check-circle fa-lg"></i></div></div></div>';
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%desc%', obj.description);
            document.querySelector(DOMStrings.toDoTasks).insertAdjacentHTML('beforeend', newHTML);
        }
    }
    
})();

//App controller
var appController = (function(todoCtrl, UICtrl){
    
    //Set event listeners
    var setupEventListeners = function(){
         document.querySelector(DOM.addButton).addEventListener('click', addItem);
         document.addEventListener('keypress', function(event){
            if(event.keycode === 13 || event.which === 13){
                   addItem();
            }       
         });
        document.querySelector(DOM.tasks).addEventListener('click', deleteItem);
    };
    //Get DOM Strings
    var DOM = UICtrl.getDOMStrings();

        //Update task number
    var updateTasks = function(){
        //Get number of tasks in our data structure
        todoCtrl.noOfTasks();
        //Update tasks number in the UI
        var tasksObj = todoCtrl.getTasks();
        UICtrl.updateTasks(tasksObj);  
    };
    
    //Add item
    var addItem =  function(){
        //Check if input field is empty
        if(document.querySelector(DOM.addInput).value !== ""){
            document.querySelector(DOM.addInput).classList.remove('red');
            //Read input field value
            var inputVal = UICtrl.readInputValue();
            console.log(inputVal);
            //Add data to our data struture
            var addDta = todoCtrl.addData(inputVal);
            //Create new element
            var newElement = UICtrl.createHTMLElement(addDta);
            //Clear field
            document.querySelector(DOM.addInput).value = '';
            //Focus back on input fielld
            document.querySelector(DOM.addInput).focus();
            //Update Tasks
            updateTasks();
        } else {
            document.querySelector(DOM.addInput).classList.add('red');
        }
        
    };
    
    //Delete Item 
    var deleteItem = function(event){
        var clickedId, itemId, parent, child;
        
        clickedId = event.target.parentNode.id;
        itemId = parseFloat(event.target.parentNode.parentNode.parentNode.id);
        
        if(clickedId === 'del'){
            //Delete from data structure
            todoCtrl.deleteItem(itemId);
            //Delete from the UI
            parent = event.target.parentNode.parentNode.parentNode.parentNode;
            child = document.getElementById(itemId);
            parent.removeChild(child);
            //Update tasks
            updateTasks();
        } 
    };
    
    return{
        
        init: function(){
            //Setup event listeners
            setupEventListeners();
            //Display day and date
            UICtrl.displayDayOfTheWeek();
            UICtrl.displayFullDate();  
            UICtrl.displayTasksInUI({
                unsolved: 0,
                solved: 0
            });
        }    
        
    }    
    
})(todoController, UIController);


appController.init();
