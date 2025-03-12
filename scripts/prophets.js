// URL of the JSON data
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

// Select the div with id "cards"
const cards = document.querySelector('#cards');

const filterType = document.querySelector('#filter-type');
const filterValue = document.querySelector('#filter-value');
const filterButton = document.querySelector('#filter-button');
const clearFilterButton = document.querySelector("#clear-filter");

// Async function to fetch prophet data
async function getProphetData() {
    try {
        // Fetch data from the URL
        const response = await fetch(url);

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        console.table(data.prophets);

        displayProphets(data.prophets);

// Dynamic og:image
        updateOgImage(data.prophets);

// Filters options
        setupFilters(data.prophets);

    } catch (error) {
        console.error('Error fetching prophet data:', error);
    }
}

// Function to display prophets
function displayProphets(prophets) {
    cards.innerHTML = '';

    prophets.forEach(prophet => {
        const card = document.createElement('section');
        card.classList.add('card');

        const orderSuffix = getOrdinalSuffix(prophet.order);

        // Create HTML content for the card
        card.innerHTML = `
            <h2>${prophet.name} ${prophet.lastname}</h2>
            <img 
                src="${prophet.imageurl}"
                alt="Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}${orderSuffix} Latter-day President"
                loading="lazy"
                width="200"
                height="250"
                >
            <p>Birthdate: ${prophet.birthdate}</p>
            <p>Death: ${prophet.death || 'Still Living'}</p>
            <p>Birthplace: ${prophet.birthplace}</p>
            <p>Number of Children: ${prophet.numofchildren}</p>
            <p>Length of Service: ${prophet.length} years</p>
        `;

        // Append the card to the cards div
        cards.appendChild(card);
    });
}

// Function to add the tag in the img alt text
function getOrdinalSuffix(order) {
    const j = order %10;
    const k = order %100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
}

// Function to keep the og:image always with the living prophet
function updateOgImage(prophets) {
    if (!Array.isArray(prophets)) {
        console.error('Prophets data is not an array>:', prophets);
        return;
    }

    const livingProphet = prophets.find(prophet => prophet.death === null);

    if (livingProphet) {
        const ogImageMeta = document.querySelector('meta[property="og:image"]');
        ogImageMeta.setAttribute('content', livingProphet.imageurl);
        console.log('Updated og:image with living prophet:', livingProphet.name);
    } else {
        console.error('No living prophet found in the data.');
    }
}

// Setting up filter options
function setupFilters(prophets) {
    filterType.addEventListener('change', () => {
        const type = filterType.value;
        filterValue.innerHTML = '';

        switch (type) {
            case 'birthplace':
                filterValue.innerHTML = `
                <option value="Utah">Utah</option>
                <option value="inside">Out of Utah but inside USA</option>
                <option value="outside">Outside USA</option>
                `;
                break;

            case 'livedMoreThan':
                filterValue.innerHTML = `
                <option value="80">80 years+</option>
                <option value="90">90 years+</option>
                <option value="95">95 years+</option>
                `;
                break;
            
            case 'numOfChildren':
                filterValue.innerHTML = `
                <option value="less15">Less then 15 children</option>
                <option value="15ormore">15 or more children</option>
                `;
                break;

            case 'servedAtLeast':
                filterValue.innerHTML = `
                <option value="10">10 years</option>
                <option value="20">20 years</option>
                <option value="30">30 years</option>
                `;
                break;
            
            default:
                filterValue.innerHTML = '';
                break;
        }
    });

    filterButton.addEventListener('click', () => {
        const type = filterType.value;
        const value = filterValue.value;
        
        const filteredProphets = filterProphets(prophets, type, value);
        
        displayProphets(filteredProphets);
    });

    clearFilterButton.addEventListener('click', () => {
        filterType.selectedIndex = 0;
        filterValue.innerHTML = '';
        displayProphets(prophets);
    });
}

// Function to filter prophets based on the selected criteria
function filterProphets(prophets, type, value) {
    switch (type) {
        case 'birthplace':
            if (value === 'Utah') {
                return prophets.filter(prophet => prophet.birthplace === 'Utah');
            } else if (value === 'inside') {
                return prophets.filter(prophet => isUSABirthplace(prophet.birthplace) && prophet.birthplace !== 'Utah');
            } else if (value === 'outside') {
                return prophets.filter(prophet => !isUSABirthplace(prophet.birthplace));
            }
            break;

        case 'livedMoreThan':
            return prophets.filter(prophet => {
                const ageAtDeath = prophet.death ? new Date(prophet.death).getFullYear() - new Date(prophet.birthdate).getFullYear() : null;
                return ageAtDeath && ageAtDeath > parseInt(value);
            });

        case 'numOfChildren':
            if (value === 'less15') {
                return prophets.filter(prophet => prophet.numofchildren < 15);
            } else if (value === '15ormore') {
                return prophets.filter(prophet => prophet.numofchildren >= 15);
            }
            break;

        case 'servedAtLeast':
            return prophets.filter(prophet => prophet.length > parseInt(value));

        default:
            return prophets;
    }
}

// Function to check if a birthplace is in the USA
function isUSABirthplace(birthplace) {
    const usaStates = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
        'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
        'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
        'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
        'Tennessee', 'Texas', 'Utah','Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    return usaStates.includes(birthplace);
}

getProphetData();