var questions = [{
    question: "What was a Russian Tsar?",
    choices: ["Archbishop", "Duke", "Ambassador", "Emperor"],
    correctAnswer: 3
}, {
    question: "Who was the first Russian Tsar?",
    choices: ["Ivan IV", "Catherine the Great", "Feodor I", "Boris Godunov"],
    correctAnswer: 0
}, {
    question: "Who was the last Tsar of Russia?",
    choices: ["Alexis I", "Constantine Pavlovich", "Nicholas II", "Alexander III"],
    correctAnswer: 2
}, {
    question: "What event ended Russia being ruled by a Tsar?",
    choices: ["Foundation of the Bolshevik Party", "Imperial Faberge Egg Collection Destroyed", "Russian Revolution of 1917", "Lenin taking control of Russian Parliament"],
    correctAnswer: 2
}, {
    question: "Where does the word 'Tsar' come from?",
    choices: ["Ancient Bulgaria", "Ancient Rome", "Ancient Mongolia", "Ancient Greece"],
    correctAnswer: 1
}, {
    question: "Which advisor to Nicholas II survived several assassination attempts?",
    choices: ["Anton the Mensch", "Christina Adrondemov", "Vasily Tandusky", "Grigory Rasputin"],
    correctAnswer: 3
}, {
    question: "What animal is on the Russian Coat of Arms",
    choices: ["Two-headed Serpent", "Two-headed Eagle", "Roaring Lion", "Prancing Unicorn"],
    correctAnswer: 1
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {
    
    // get timer ready and start countdown
    $('.timer').rooster('start',
        {
        seconds: 30,
        onComplete: function() {
        alert('Game Over');
        }
        }
    );

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        var counter = 1;

        
            if(counter == 0){
                document.getElementById("imgClickAndChange").src = "assets/images/eagle.gif";
                counter++;
            }
            else if(counter == 1){
                document.getElementById("imgClickAndChange").src = "http://www.ahrc.ac.uk/ahrc/cache/file/F143D5A3-4A7A-41A5-B1C936425CDABD20.png";
                counter++;
            }
            else if(counter == 2){
                document.getElementById("imgClickAndChange").src = "assets/images/nick.jpg";
                counter++;
            }
            else if(counter == 3){
                document.getElementById("imgClickAndChange").src = "http://www.metalinjection.net/wp-content/uploads/2014/06/Soviet-Sickle.png";
                counter = 0;
            }
        

        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}