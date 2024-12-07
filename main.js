

const day = document.querySelector("#day");
const date = document.querySelector("#date");
const breakfast = document.querySelector("#breakfast");
const lunch = document.querySelector("#lunch");
const dinner = document.querySelector("#dinner");
const addmeal = document.querySelector("#addmeal");

// Function to load meals from localStorage
function loadMeals() {
    const meals = JSON.parse(localStorage.getItem('meals')) || [];
    meals.forEach(meal => {
        addMealToTable(meal);
    });
}

// Function to add a meal to the table
function addMealToTable(meal) {
    var newelement = document.createElement('tr');
    newelement.classList.add('newelement');

    const fields = [meal.day, meal.date, meal.breakfast, meal.lunch, meal.dinner];
    const classes = ['newday', 'newbreakfast', 'newlunch', 'newdinner'];
    for (let i = 0; i < fields.length; i++) {
        let newField = document.createElement('td');
        newField.classList.add(classes[i]);
        newField.textContent = fields[i];
        newelement.appendChild(newField);
    }

    var delete_btn = document.createElement('button');
    delete_btn.classList.add('deletebtn');
    delete_btn.textContent = 'Delete';
    delete_btn.addEventListener("click", function(){
        newelement.remove();
        removeMealFromStorage(meal); // Remove from localStorage
    });

    var btnContainer = document.createElement('td');
    btnContainer.setAttribute('class', 'btnbox');
    btnContainer.appendChild(delete_btn);

    newelement.appendChild(btnContainer);
    document.querySelector(".tablebody").appendChild(newelement);
}

// Function to remove a meal from localStorage
function removeMealFromStorage(meal) {
    let meals = JSON.parse(localStorage.getItem('meals')) || [];
    meals = meals.filter(m => m.day !== meal.day || m.date !== meal.date || m.breakfast !== meal.breakfast || m.lunch !== meal.lunch || m.dinner !== meal.dinner);
    localStorage.setItem('meals', JSON.stringify(meals));
}

addmeal.addEventListener("click", function(event){
    event.preventDefault(); // Prevent the default form submission behavior

    if (!day.value || !date.value|| !breakfast.value || !lunch.value || !dinner.value) {
        alert("Please fill in all the input fields.");
        return;
    }

    const meal = {
        day: day.value,
        date: date.value,
        breakfast: breakfast.value,
        lunch: lunch.value,
        dinner: dinner.value
    };

    addMealToTable(meal); // Add meal to the table
    saveMealToStorage(meal); // Save meal to localStorage

    day.value = '';
    date.value ='';
    breakfast.value = '';
    lunch.value = '';
    dinner.value = '';
});

// Function to save a meal to localStorage
function saveMealToStorage(meal) {
    let meals = JSON.parse(localStorage.getItem('meals')) || [];
    meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(meals));
}

// Load meals when the page is loaded
window.onload = loadMeals;


