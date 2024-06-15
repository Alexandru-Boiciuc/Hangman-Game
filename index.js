const words = ['PROGRAMMING', 'JAVASCRIPT', 'DEVELOPMENT', 'INTERNET', 'COMPUTER'];
let word = words[Math.floor(Math.random() * words.length)];
let lives = 7;
let guessedWord = Array(word.length).fill('_');
let guessedLetters = [];

const wordDisplay = document.getElementById('wordDisplay');
const livesDisplay = document.getElementById('lives');
const messageDisplay = document.getElementById('message');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');

wordDisplay.textContent = guessedWord.join(' ');
livesDisplay.textContent = `Lives remaining: ${lives}`;

guessButton.addEventListener('click', () => {
    const letter = guessInput.value.toUpperCase();
    guessInput.value = '';
    if (letter.length === 0 || guessedLetters.includes(letter)) {
        return;
    }
    guessedLetters.push(letter);
    if (word.includes(letter)) {
        for (let i = 0; i < word.length; ++i) {
            if (word[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        wordDisplay.textContent = guessedWord.join(' ');
    } else {
        --lives;
        livesDisplay.textContent = `Lives remaining: ${lives}`;
    }
    if (lives === 0) {
        messageDisplay.textContent = `You lost! The word was: ${word}`;
        guessInput.disabled = true;
        guessButton.disabled = true;
    } else if (!guessedWord.includes('_')) {
        confetti({
            particleCount: 3000,
            spread: 20,
            origin: { y: 0.0 },
        });
        messageDisplay.textContent = 'Congratulations! You guessed the word!';
        guessInput.disabled = true;
        guessButton.disabled = true;
    }
});

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        guessButton.click();
    }
});
