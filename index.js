// Represents a playing card with its face value, suit, and rank
class Card {
    constructor(face, suit, rank) {
        this.face = face; // The card's face value (e.g., 2, J, Q)
        this.suit = suit; // The suit of the card (e.g., Spades, Hearts)
        this.rank = rank; // The rank of the card for comparison (e.g., 2, 11, 14)
    }
}

let deck = []; // This will hold our full deck of cards

// List of card values and suits
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
let suits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"];

// Function to create a standard deck of 52 cards
function createDeck() {
    deck = []; // Clear the deck before creating a new one
    for (let value of values) {
        for (let suit of suits) {
            // Determine the rank of the card
            let rank = typeof value === 'number' ? value : (value === 'J' ? 11 : value === 'Q' ? 12 : value === 'K' ? 13 : 14);
            deck.push(new Card(value, suit, rank)); // Add the card to the deck
        }
    }
}

// Shuffle the deck to randomize the order of cards
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Pick a random index
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap the cards
    }
}

// Class to handle the game logic between two players
class Game {
    constructor() {
        this.player1 = { name: 'Player 1', score: 0, hand: [] }; // Player 1 setup
        this.player2 = { name: 'Player 2', score: 0, hand: [] }; // Player 2 setup
    }

    // Main function to play the game
    playGame() {
        createDeck(); // Create and prepare the deck
        shuffleDeck(); // Shuffle the deck to randomize card order

        // Deal the cards to both players
        while (deck.length > 0) {
            if (deck.length > 0) this.player1.hand.push(deck.shift()); // Deal a card to Player 1
            if (deck.length > 0) this.player2.hand.push(deck.shift()); // Deal a card to Player 2
        }

        this.compareHands(); // Compare the hands and determine scores
    }

    // Compare each card in the players' hands and update scores
    compareHands() {
        for (let i = 0; i < this.player1.hand.length; i++) {
            if (this.player1.hand[i].rank > this.player2.hand[i].rank) {
                // Player 1 wins this round
                this.player1.score++;
                console.log(`
    P1 Card: ${this.player1.hand[i].face} of ${this.player1.hand[i].suit}
    P2 Card: ${this.player2.hand[i].face} of ${this.player2.hand[i].suit}
    Player 1 wins this round!
    Score - P1: ${this.player1.score}, P2: ${this.player2.score}
                `);
            } else if (this.player1.hand[i].rank < this.player2.hand[i].rank) {
                // Player 2 wins this round
                this.player2.score++;
                console.log(`
    P1 Card: ${this.player1.hand[i].face} of ${this.player1.hand[i].suit}
    P2 Card: ${this.player2.hand[i].face} of ${this.player2.hand[i].suit}
    Player 2 wins this round!
    Score - P1: ${this.player1.score}, P2: ${this.player2.score}
                `);
            } else {
                // It's a tie for this round
                console.log(`
    P1 Card: ${this.player1.hand[i].face} of ${this.player1.hand[i].suit}
    P2 Card: ${this.player2.hand[i].face} of ${this.player2.hand[i].suit}
    This round is a tie!
    Score - P1: ${this.player1.score}, P2: ${this.player2.score}
                `);
            }
        }

        // Announce the final winner
        if (this.player1.score > this.player2.score) {
            console.log('Player 1 is the overall winner!');
        } else if (this.player2.score > this.player1.score) {
            console.log('Player 2 is the overall winner!');
        } else {
            console.log('The game is a tie!');
        }
    }
}

// Create a game instance and start the game
const game = new Game();
game.playGame();

