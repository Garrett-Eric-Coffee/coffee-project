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

// Changed Loop to render coffee info in ascending "ID" order
function renderCoffees(coffees) {
    let html = '';
    for (let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// Changed code to input coffee info as a div with a h4 and paragraph
function renderCoffee(coffee) {
    let html = "<div class='coffee col-6 p-2'>";
    html += `<h4 class="coffee-list-name p-2">${coffee.name}</h4>`;
    html += `<p class="text-secondary">${coffee.roast}</p>`;
    html += "</div>";

    return html;
}

// already established variables
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


// COFFEE SEARCH BAR

// Var for html searchbar
const searchBar = document.querySelector("#coffee-name");

// Function to create cohesive select search and searchbar search
function searchForCoffee(e) {
    // Leveraging select box feature to refine searchbar
    let selectedRoast = document.querySelector("#roast-selection").value;
    let filterArray;
    if (selectedRoast !== "all") {
        filterArray = coffees.filter(coffee => coffee.roast === selectedRoast);
    } else {
        filterArray = coffees;
    }

    // toLowerCase to make search case insensitive
    let searchCoffee = searchBar.value.toLowerCase();
    let filteredSearch = [];
    filterArray.forEach(function (coffee) {
        if (coffee.name.toLowerCase().includes(searchCoffee)) {
            filteredSearch.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredSearch);
}
searchBar.addEventListener('keyup', searchForCoffee);



// 2nd form "Add a Coffee"
document.querySelector("#add-coffee-btn").addEventListener("click", addCoffee);

function addCoffee() {
    const newRoast = document.querySelector("#add-coffee").value;
    const newName = document.querySelector("#add-coffee-name").value;
    const newID = coffees.length + 1;

    // have value so clear the entry name
    document.querySelector("#add-coffee-name").value = "";

    // some user input checking - try to identify nonsensical strings
    // chars a-z are ASCII 97-122
    // e.g. valid:  'bustello - **!'        - most chars are alphanumeric
    // e.g. invalid 'bustello ---@@^%&))*&' - most chars are nonsensical
    function checkName(newName){
        let validCount = 0;
        for (let c of newName) {
            if (c.toLowerCase().charCodeAt(0) >= 97 && c.toLowerCase().charCodeAt(0) <= 122){
                validCount++;
            }
        }
        return validCount > newName.length*.5;
    }
    const validName = checkName(newName);

    if (validName) {
        const newCoffee = {id: newID, name: newName, roast: newRoast};
        coffees.push(newCoffee);
        tbody.innerHTML = renderCoffees(coffees);
    }
}


