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
    let html = "<div class='coffee'>";
    html += `<h4 class="coffee-list-name">${coffee.name}</h4>`;
    html += `<p>${coffee.roast}</p>`;
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
// document.querySelector("#coffee-name").addEventListener("input", filterSearch)
// function filterSearch() {
//     const searchInput = document.querySelector("#coffee-name");
//     const filter = searchInput.value.toLowerCase();
//     const coffeeNames = Array.from(document.querySelector(".coffee-list-name"));
//
//     coffeeNames.forEach((item) => {
//         let text = item.textContent;
//         if (text.toLowerCase().includes(filter.toLowerCase())) {
//             console.log("it works")
//             // item.style.display = ""
//         } else {
//             // item.style.display = "none"
//         }
//     })
// }

// const coffeeSearchFunction = () => {
//     const searchCoffee = document.querySelector("#coffee-name").value.toLowerCase();
//     const coffee = document.querySelectorAll(".coffee-list-name");
//     const getCoffeeName = document.querySelectorAll(".coffee-list-name");
//
//     for(let i = 0; getCoffeeName.length; i++) {
//         let textMatch = coffee[i].querySelectorAll(".coffee-list-name")[0];
//     }
//     if(textMatch){
//         let text = textMatch.textContent
//         if (text.toLowerCase().indexOf(searchCoffee) > - 1) {
//             coffee[i].style.display = "";
//         } else {
//             coffee[i].style.display = "none"
//         }
//     }
// }
// document.addEventListener("input", coffeeSearchFunction);


// 2nd form
document.querySelector("#add-coffee-btn").addEventListener("click", addCoffee);

function addCoffee (){
    const newRoast = document.querySelector("#add-coffee").value;
    const newName = document.querySelector("#add-coffee-name").value;
    const newID = coffees.length + 1;

    const newCoffee = { id: newID, name: newName, roast: newRoast};
    coffees.push(newCoffee);
}


