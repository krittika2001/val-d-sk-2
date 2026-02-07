let currentSlide = 0;
let score = 0;
let totalQuestions = 4;
let userAnswers = {}; // Store user's answers

// Correct answers for reference
const correctAnswers = {
    1: '2 July 2021',
    2: '11 August 2021',
    3: '23 December 2021',
    4: '16 February 2022'
};

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    
    if (currentSlide < slides.length - 1) {
        slides[currentSlide].classList.remove('active');
        currentSlide++;
        slides[currentSlide].classList.add('active');
    }
}

function selectAnswer(questionNum, selectedAnswer, isCorrect, element) {
    // Prevent multiple selections
    const currentOptions = element.parentElement.querySelectorAll('.option');
    const alreadySelected = Array.from(currentOptions).some(opt => 
        opt.classList.contains('selected')
    );
    
    if (alreadySelected) {
        return;
    }

    // Store the answer
    userAnswers[questionNum] = {
        answer: selectedAnswer,
        isCorrect: isCorrect
    };

    // Mark as selected
    element.classList.add('selected');
    
    // Add correct/wrong class
    if (isCorrect) {
        element.classList.add('correct');
        score++;
    } else {
        element.classList.add('wrong');
    }

    // Disable all options
    currentOptions.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });

    // Auto-advance to next slide after 1.5 seconds
    setTimeout(() => {
        nextSlide();
        
        // If we've reached the results slide, show the final score
        if (currentSlide === 5) {
            showResults();
        }
    }, 1500);
}

function showResults() {
    const finalScore = document.getElementById('finalScore');
    const scoreMessage = document.getElementById('scoreMessage');
    const scoreEmoji = document.getElementById('scoreEmoji');

    // Update score
    finalScore.textContent = score + '/' + totalQuestions;
    
    // Set emoji based on score
    if (score === 4) {
        scoreEmoji.textContent = '😊';
        scoreEmoji.style.animation = 'emojiHappy 1.5s ease-in-out infinite';
    } else {
        scoreEmoji.textContent = '😠';
        scoreEmoji.style.animation = 'emojiAngry 1s ease-in-out infinite';
    }
    
    // Set message based on score
    if (score === totalQuestions) {
        scoreMessage.innerHTML = '🎉 Perfect Score! You remember all our special moments!<br>You\'re absolutely amazing! 💕';
    } else if (score === 3) {
        scoreMessage.innerHTML = '😊 Good! You remembered most of our special dates!<br>But you can do better! ❤️';
    } else if (score === 2) {
        scoreMessage.innerHTML = '😐 Hmm... You got half of them right!<br>You need to pay more attention! 💝';
    } else if (score === 1) {
        scoreMessage.innerHTML = '😠 Only one?! Really?!<br>You better remember these dates! 💔';
    } else {
        scoreMessage.innerHTML = '😡 Zero?! How could you forget everything?!<br>These are OUR special moments! 💢';
    }

    // Show answer review
    displayAnswerReview();
}

function displayAnswerReview() {
    for (let i = 1; i <= totalQuestions; i++) {
        const answerElement = document.getElementById('answer' + i);
        const userAnswer = userAnswers[i];
        
        if (userAnswer) {
            answerElement.textContent = userAnswer.answer;
            answerElement.classList.add(userAnswer.isCorrect ? 'correct' : 'wrong');
            
            // If wrong, show the correct answer
            if (!userAnswer.isCorrect) {
                const correctText = document.createElement('div');
                correctText.style.marginTop = '5px';
                correctText.style.fontSize = '0.9em';
                correctText.style.color = '#00b894';
                correctText.innerHTML = '✓ Correct: ' + correctAnswers[i];
                answerElement.parentElement.appendChild(correctText);
            }
        }
    }
}

// Add new animation for angry emoji
const style = document.createElement('style');
style.textContent = `
    @keyframes emojiAngry {
        0%, 100% { transform: scale(1) rotate(-5deg); }
        50% { transform: scale(1.2) rotate(5deg); }
    }
    @keyframes emojiHappy {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(10deg); }
    }
`;
document.head.appendChild(style);

function restartQuiz() {
    // Reset variables
    currentSlide = 0;
    score = 0;
    userAnswers = {};

    // Reset all slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    slides[0].classList.add('active');

    // Reset all options
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(option => {
        option.classList.remove('selected', 'correct', 'wrong');
        option.style.pointerEvents = 'auto';
    });

    // Reset score display
    document.getElementById('finalScore').textContent = '0/4';
    document.getElementById('scoreMessage').textContent = '';
    document.getElementById('scoreEmoji').textContent = '😊';
    
    // Reset answer review
    for (let i = 1; i <= totalQuestions; i++) {
        const answerElement = document.getElementById('answer' + i);
        answerElement.textContent = '';
        answerElement.className = 'review-answer';
        
        // Remove any correct answer text that was added
        const parent = answerElement.parentElement;
        const extraDivs = parent.querySelectorAll('div:not(.review-question):not(.review-answer)');
        extraDivs.forEach(div => div.remove());
    }
}