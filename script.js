//TO-DO list controller
var todoController = (function(){
    
    var data = {
        unsolvedTasks: 0,
        solvedTasks: 0,
        tasksArr: [],
        solvedTasksArr: []
    }; 
    
    return{
        
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
    };
    //Get DOM Strings
    var DOM = UICtrl.getDOMStrings();

    var addItem =  function(){
        //Add items   
    }
    
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
