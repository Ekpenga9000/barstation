const API_URL = `https://www.thecocktaildb.com/api/json/v1/1/`;

// Get the hero container class
const heroContainer = document.querySelector(".hero-container");
heroContainer.innerHTML = hero();

// create the hero section
function hero() {
    return `
    <section class ="hero">
        ${slidingDoor()}
        ${chatBalloon(`
            Hi, welcome to BarStation!
            My name is Maniil Dolodkov, how can
            I help you?
        `)}
        ${bottomSectionComponent()}
    </section>
  `;
}

// create a transition for the doors to slide away.
function slidingDoor() {
    return `
      <div class="door">
        <div class="door--left"></div>
        <div class="door--right"></div>
      </div>
  `;
}

// create components for the chat baloon
function chatBalloon(message) {
    return `
        <article class="message--hide">
            <p class="message__p">${message}</p>
        </article>
    `
}

//create a component for the bottom

function bottomSectionComponent() {
    return `
        <section class="bottom--hide">
            ${howCanIHelp()}
        </section>
    `
}

// the first questions
function howCanIHelp() {
    return `
        <article class="options">
            <div class="options__first">
                <p class="options__p">I know what I want 😏</p>
            </div>  
            <div class="options__second">
                <p class="options__p"> Help me decide 😁</p>
            </div>
        </article>
    `
}

const door = document.querySelector(".door");
// create a function that animates the doors on click.
door.addEventListener('click', () => {
    const doorLeft = document.querySelector(".door--left");
    const doorRight = document.querySelector(".door--right");
    doorLeft.classList.add("animate--left");
    doorLeft.classList.remove("door--left");

    doorRight.classList.add("animate--right");
    doorRight.classList.remove("door--right");

    setTimeout(() => {
        showBubble();
    }, 1500);

    setTimeout(() => {
        showBottom();
    }, 1800);
})

function showBubble() {
    const messageBubble = document.querySelector(".message--hide");
    messageBubble.classList.remove("message--hide");
    messageBubble.classList.add("message--show");
}

function showBottom() {
    const bottom = document.querySelector(".bottom--hide");
    bottom.classList.remove("bottom--hide");
    bottom.classList.add("bottom");
}


// create the I know what I want! component
const firstChoice = document.querySelector('.options__first');

firstChoice.addEventListener('click', () => {
    const bottom = document.querySelector(".bottom");
    const chat = document.querySelector(".message__p");
    const form = generateInputField();

    bottom.innerHTML = "";
    bottom.innerHTML = form;
    chat.innerText = "Great! What drink do you want me to make for you?"

    const submitEl = document.querySelector('.submit-drink');
    const drinkRequest = document.getElementById('drink');

    submitEl.addEventListener('click', event => {
        event.preventDefault();
        axios
            .get(API_URL + 'search.php?s=' + drinkRequest.value)
            .then((response) => {
                const selectedDrink = response.data.drinks[0]

                const drink = offerSelectedDrink(selectedDrink.strDrinkThumb, selectedDrink.strDrink);

                bottom.innerHTML = "";
                bottom.innerHTML = drink;
                chat.innerText = "I'll make that for you right now."

            })
            .catch((error) => {
                chat.innerText = `Sorry, I didn't hear you. What drink did you want?`;
                drinkRequest.value = '';
            });
    });
})

function generateInputField() {
    return `
        <article class="bottom__form-container">
            <form class ="bottom__input-form">
                <div class="bottom__label-div">
                    <label for="drink">What do you want to drink?</label>
                </div>
                <div class="bottom__input-div">
                    <input type="text" name="drink" id="drink" class="bottom__input">
                </div>
                <div>
                    <button class='submit-drink'> Make this drink 🍸</button>
                </div>
            </form>
        </article>
    `
}

function offerSelectedDrink(drinkPicture, drinkName) {
    return `
        <article class="bottom__form-container">
            <form class ="bottom__input-form">
                <div class="bottom__label-div">
                    <h3>Your ${drinkName} is served!</h3>
                </div>
                <div class="bottom__input-div">
                    <img class='drink-served' src='${drinkPicture}'/>
                </div>
            </form>
        </article>
    `
}

// create the Help me decide! component
const secondChoice = document.querySelector('.options__second');

secondChoice.addEventListener('click', () => {
    const bottom = document.querySelector(".bottom");
    const chat = document.querySelector(".message__p");
    // const form = generateInputField();

    bottom.innerHTML = "";
    // bottom.innerHTML = form;
    chat.innerText = "What kind of drink do you want?"

    // const submitEl = document.querySelector('.submit-drink');
    // const drinkRequest = document.getElementById('drink');

        // new options appear
        const shotEl = document.createElement('button');
        shotEl.innerText = 'Shot 🥃';
        bottom.appendChild(shotEl);
    
        const cocktailEl = document.createElement('button');
        cocktailEl.innerText = 'Cocktail 🍸';
        bottom.appendChild(cocktailEl);
    
        const coffeeteaEl = document.createElement('button')
        coffeeteaEl.innerText = 'Coffee / Tea ☕';
        bottom.appendChild(coffeeteaEl);
    
        shotEl.addEventListener('click', event => {
            bottom.innerHTML = "";
            axios
                .get(API_URL + 'filter.php?c=shot')
                .then((response) => {
                    // actual drinks array is here
                    const drinksResponse = response.data.drinks;
                    const threeDrinks = getRandomThree(drinksResponse);

                    chat.innerText = 'How about one of these?';
                    for (let i = 0; i < threeDrinks.length; i++) {
                        const element = threeDrinks[i];
                        displayDrinkOption(bottom, element.strDrink);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    
        cocktailEl.addEventListener('click', event => {
            bottom.innerHTML = "";
            axios
                .get(API_URL + 'filter.php?c=cocktail')
                .then((response) => {
                    // actual drinks array is here
                    const drinksResponse = response.data.drinks;
                    const threeDrinks = getRandomThree(drinksResponse);
    
                    chat.innerText = 'How about one of these?';
                    for (let i = 0; i < threeDrinks.length; i++) {
                        const element = threeDrinks[i];
                        displayDrinkOption(bottom, element.strDrink);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        })
    
        coffeeteaEl.addEventListener('click', event => {
            bottom.innerHTML = "";
            axios
                .get(API_URL + 'filter.php?c=coffee_/_tea')
                .then((response) => {
                    // actual drinks array is here
                    const drinksResponse = response.data.drinks;
                    const threeDrinks = getRandomThree(drinksResponse);
    
                    chat.innerText = 'How about one of these?';
                    for (let i = 0; i < threeDrinks.length; i++) {
                        const element = threeDrinks[i];
                        displayDrinkOption(bottom, element.strDrink);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        })
});


function displayDrinkOption(parentDiv, textContent) {
    const element = document.createElement('button');
    element.innerText = textContent;
    element.classList.add('drink-option');
    parentDiv.appendChild(element);

    element.addEventListener('click', event => {
        const bottom = document.querySelector(".bottom");
        bottom.innerHTML = '';
        event.preventDefault();
            axios
                .get(API_URL + 'search.php?s=' + textContent)
                .then((response) => {
                    const selectedDrink = response.data.drinks[0]
    
                    const drink = offerSelectedDrink(selectedDrink.strDrinkThumb, selectedDrink.strDrink);
    
                    bottom.innerHTML = "";
                    bottom.innerHTML = drink;
                    chat.innerText = "I'll make that for you right now."
    
                })
                .catch((error) => {
                    chat.innerText = 'That is not a real drink. Get out of my bar!';
                }); 
    })
}

function getRandomThree(array) {
    // Shuffle array
    const shuffled = array.sort(() => 0.5 - Math.random());

    // Get sub-array of first 3 elements after shuffled
    let selected = shuffled.slice(0, 3);
    return selected
}

// create a component that would hold the doors

// get images for the doors.
