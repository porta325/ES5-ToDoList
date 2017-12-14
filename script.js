//TO-DO list controller
var todoController = (function(){
    
    var data = {
        unsolvedTasks: 0,
        solvedTasks: 0,
        tasksArr: [],
        solvedTasksArr: []
    } 
    
    return{
        
    }
    
})();

//UI Controller
var UIController = (function(){
    
    return {
        
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
    var addItem =  function(){
        //Add items   
    }
    
    return{
        
        init: function(){
            //Setup event listeners
            setupEventListeners();
            //Display day and date
        }    
        
    }    
    
})(todoController, UIController);


appController.init();
