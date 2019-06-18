//BUDGET CNTRLR
var budgetController = (function(){

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            //crweate new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            

                //create nwe item inc or exp
            if (type === 'exp'){
                newItem = new Expense(ID, des, val)
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

                //push it into our data structure
            data.allItems[type].push(newItem);

            //return new element
            return newItem;
        },

        testing: function (){
            console.log(data);
        }
    }

})();

//UI CNTRLR
var UIController = (function(){

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,  //inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },

        getDOMStrings: function(){
            return DOMStrings;
        }
    };

})();

//GLOBAL APP CNTRLR
var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function () {
        var DOM = UIController.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){    
            if (event.keyCode === 13 || event.which === 13){
               ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function () {
        var input, newItem;

        //get value of add desc
        input = UICtrl.getInput();

        //add item to budget
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //add item to UI

        // calc budget

        // display budget to UI
    };

    return {
        init: function() {
            console.log('App started');
            setupEventListeners();
        }
    };
    
})(budgetController, UIController);

controller.init();