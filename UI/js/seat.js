class MixOrMatch{
    constructor(totalTime, cards){
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaing = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
    }
    startGame(){
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaing = this.totalTime;
        this.matchedCards = [];
        this.busy = true;

        // counting time
        setTimeout(() =>{
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);

        this.hideCards();
        this.timer.innerText = this.timeRemaing;
        this.ticker.innerText = this.totalClicks;
    }

    startCountDown(){
        return setInterval(() => {
            this.timeRemaing--;
            this.timer.innerText = this.timeRemaing;
            if (this.timeRemaing === 0)
                this.gameOver();
        }, 1000);
    }

    gameOver(){
        clearInterval(this.countDown);
        document.getElementById('game-over-text').classList.add('visible');
    }

    victory(){
        clearInterval(this.countDown);
        document.getElementById('victory-text').classList.add('visible');    
    }

    hideCards(){
        this.cardsArray.forEach(card =>{
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    flipCard(card){
        if(this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            // if statement
        }
    }

    shuffleCards(){
        for (let i = this.cardsArray.length - 1; i > 0; i--){
            let randIndex = Math.floor(Math.random() *  (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCard(card){
        return true;
        // return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;        
    }

}

function ready(){
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(100, cards);

    overlays.forEach(overlay =>{
        overlay.addEventListener('click', () =>{
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () =>{
            game.flipCard(card)
        });
    });

}

if (document.readyState ===  'loading'){
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}
