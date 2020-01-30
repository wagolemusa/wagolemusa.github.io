const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
    // this.classList.toggle('flip')
    
    if (lockBoard) return;
    // if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard){
        // first click
        hasFlippedCard = true;
        firstCard = this;
    }
    else{
        // second click
        hasFlippedCard = false;
        secondCard = this;

        // console.log({firstCard, secondCard});
        // console.log(firstCard.dataset.framework);
        checkFormatch()
    }
}

function checkFormatch(){
    
        // do card match !!
        if (firstCard.dataset.framework === secondCard.dataset.framework){

            // it's a match !!
            disableCards()

        }
        // console.log('Function was executed!')
        else{
            // not a match
            unFlipCards()

        }
}

// it's a match !!
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    // resetBoard();
}

// not a match
function unFlipCards(){

    lockBoard = true;
    setTimeout(() =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
        // resetBoard();
     }, 1500);  
}

// function resetBoard(){
//     [hasFlippedCard, lockBoard] = [false, false];
//     [firstCard, secondCard] = [null, null];
// }
cards.forEach(card => card.addEventListener('click', flipCard))