let currentSlide = 0;
let score = 0;
let totalQuestions = 4;

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

    finalScore.textContent = score + '/' + totalQuestions;
    
    if (score === totalQuestions) {
        scoreMessage.innerHTML = '🎉 Perfect Score! You remember all our special moments!<br>You\'re absolutely amazing! 💕';
    } else if (score === 3) {
        scoreMessage.innerHTML = '😊 Excellent! You remembered most of our special dates!<br>You know our story so well! ❤️';
    } else if (score === 2) {
        scoreMessage.innerHTML = '💝 Good job! You got half of them right!<br>Our memories are precious! 🥰';
    } else if (score === 1) {
        scoreMessage.innerHTML = '💖 You got one! That\'s a start!<br>Let\'s make more unforgettable memories! 😘';
    } else {
        scoreMessage.innerHTML = '💕 That\'s okay! What matters most is our love!<br>Every day with you is a new beautiful memory! 🌹';
    }
}

function restartQuiz() {
    // Reset variables
    currentSlide = 0;
    score = 0;

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
}