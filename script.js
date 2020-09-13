const gameContainer = document.getElementById("game");
let firstCard, secondCard;
let allowClick = true;
let matchedCards = 0;
let frontFace;

const COLORS = [
  "url('img/1.jpg')",
  "url('img/2.jpg')",
  "url('img/3.jpg')",
  "url('img/4.jpg')",
  "url('img/5.jpg')",
  "url('img/6.jpg')",
  "url('img/7.jpg')",
  "url('img/8.jpg')",
  "url('img/1.jpg')",
  "url('img/2.jpg')",
  "url('img/3.jpg')",
  "url('img/4.jpg')",
  "url('img/5.jpg')",
  "url('img/6.jpg')",
  "url('img/7.jpg')",
  "url('img/8.jpg')"
];



// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let i = 0;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.classList.add("memory-card");
    //style and class info to the div (card)
    newDiv.classList.add("front-face"); //give two card classes for front and back
    newDiv.classList.add("back-face");
    newDiv.id = i;
    i ++;
    
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (!allowClick) {return}


  selectedCard = event.target;
  if (selectedCard.classList.contains("flipped")) {return}
  setTimeout(function() {
    selectedCard.style.backgroundImage = selectedCard.classList[0];
  }, 100)
  

  if (!firstCard || !secondCard) {
    selectedCard.classList.add("flipped");
    if (!firstCard) {
      firstCard = selectedCard;
    } else {
      secondCard = selectedCard;
    }
  }

  if (firstCard && secondCard) {
    allowClick = false; // no more clicking cards until cards are determined a match or flipped back over
    let firstColor = firstCard.classList[0];
    let secondColor = secondCard.classList[0];
    
    if (firstColor === secondColor) {
      firstCard.removeEventListener('click', handleCardClick); // dont want player to be able to selected matched cards
      secondCard.removeEventListener('click', handleCardClick); // dont want player to be able to selected matched cards
      firstCard = null;
      secondCard = null;
      allowClick = true;
      matchedCards += 2;
    } else {
      setTimeout(function() {
   
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.style.backgroundImage = "url('cacti.jpg')";
        secondCard.style.backgroundImage = "url('cacti.jpg')";
       
        firstCard = null;
        secondCard = null;
        allowClick = true;
        
      }, 1000)     
    }
  }

  if (matchedCards == 16) {
    setTimeout(function() {
      alert("Game Over! You're a winner winner chicken dinner!"),
       1000
      }
    )
  }

}

// when the DOM loads
createDivsForColors(shuffledColors);


