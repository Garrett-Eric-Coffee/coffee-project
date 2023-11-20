"use strict"

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
const coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    const selectedRoast = roastSelection.value;
    const filteredCoffees = [];
    coffees.forEach(coffee => {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

function renderCoffees(coffees) {
    let html = '';
    for (let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);

        // for(let i = coffees.length - 1; i >= 0; i--) {
        //     html += renderCoffee(coffees[i]);
    }
    return html;
}

function renderCoffee(coffee) {
    let html = "<div class='coffee col-6 p-2'>";
    html += `<h4 class="coffee-list-name p-2">${coffee.name}</h4>`;
    html += `<p class="text-secondary">${coffee.roast}</p>`;
    html += "</div>";

    // let html = '<tr class="coffee">';
    // html += `<td>${coffee.id}</td>`;
    // html += `<td>${coffee.name}</td>`;
    // html += `<td>${coffee.roast}</td>`;
    // html += '</tr>';

    return html;
}

const tbody = document.querySelector('#coffees');
const submitButton = document.querySelector('#submit');
const roastSelection = document.querySelector('#roast-selection');

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);

// FLOW: updateCoffees --> renderCoffees --> renderCoffee

// Coffee search - click
document.querySelector("#roast-selection").addEventListener("input", clickSearch)

function clickSearch(ev) {
    const roastVal = ev.target.value;

    // filter
    let roastFilter;
    if (roastVal !== "all") {
        roastFilter = coffees.filter(coffee => coffee.roast === roastVal);
    } else {
        roastFilter = coffees;
    }

    tbody.innerHTML = renderCoffees(roastFilter);
}


// Coffee Search
const searchBar = document.querySelector("#coffee-name");
function searchForCoffee() {
    let searchCoffee = searchBar.value.toUpperCase();
    let filteredSearch = [];
    coffees.forEach(function(coffee) {
        if (coffee.name.toUpperCase().includes(searchCoffee)) {
            filteredSearch.push(coffee);
            console.log(filteredSearch);
        }
    });
    tbody.innerHTML = renderCoffees(filteredSearch);
}
searchBar.addEventListener('keyup', searchForCoffee);


// 2nd form
document.querySelector("#add-coffee-btn").addEventListener("click", addCoffee);

function addCoffee (){
    const newRoast = document.querySelector("#add-coffee").value;
    const newName = document.querySelector("#add-coffee-name").value;
    const newID = coffees.length + 1;

    const newCoffee = { id: newID, name: newName, roast: newRoast};
    coffees.push(newCoffee);
}


