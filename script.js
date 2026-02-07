let score = 0;
let answered = 0;
const totalQuestions = 4;

function checkAnswer(questionNum, selectedAnswer, isCorrect) {
    // Prevent multiple answers
    const section = document.getElementById('q' + questionNum);
    if (section.classList.contains('answered-correct') || section.classList.contains('answered-wrong')) {
        return;
    }

    answered++;
    
    // Get all options in this question
    const options = section.querySelectorAll('.option');
    
    // Disable all options
    options.forEach(opt => {
        opt.classList.add('disabled');
        if (opt.textContent === selectedAnswer) {
            if (isCorrect) {
                opt.classList.add('selected-correct');
            } else {
                opt.classList.add('selected-wrong');
            }
        }
    });

    // Update section styling
    if (isCorrect) {
        section.classList.add('answered-correct');
        score++;
    } else {
        section.classList.add('answered-wrong');
    }

    // Show result message
    const resultDiv = document.getElementById('result' + questionNum);
    resultDiv.classList.add('show');
    if (isCorrect) {
        resultDiv.classList.add('correct');
        resultDiv.textContent = '✓ Correct! You remembered! 💖';
    } else {
        resultDiv.classList.add('wrong');
        resultDiv.textContent = '✗ Oops! Try to remember this special date! 😊';
    }

    // Show final score if all questions answered
    if (answered === totalQuestions) {
        showFinalScore();
    }
}

function showFinalScore() {
    setTimeout(() => {
        const scoreContainer = document.getElementById('scoreContainer');
        const finalScore = document.getElementById('finalScore');
        const scoreMessage = document.getElementById('scoreMessage');

        finalScore.textContent = score + '/' + totalQuestions;
        
        if (score === totalQuestions) {
            scoreMessage.textContent = '🎉 Perfect! You remember all our special moments! You\'re amazing! 💕';
        } else if (score >= totalQuestions / 2) {
            scoreMessage.textContent = '😊 Good job! You remembered most of our special dates! ❤️';
        } else {
            scoreMessage.textContent = '💝 That\'s okay! What matters is that we\'re making more memories together! 🥰';
        }

        scoreContainer.classList.add('show');
        scoreContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
}