/**
 * Created by Kyle on 01/05/2014.
 */

"use strict";

var score = 0;

var questions;

/*
var allQuestions = [
    {
        question: "Which of the following is NOT a macro nutrient?",
        choices: ["Protein", "Alcohol", "Fiber", "Carbohydrate"],
        correctAnswer: "Fiber",
        yourAnswer: false,
        selected: ""
    },
    {
        question: "How many calories are in a gram of fat?",
        choices: ["7", "5", "3", "9"],
        correctAnswer: "9",
        yourAnswer: false,
        selected: ""
    },
    {
        question: "Which of the following is a power lift?",
        choices: ["Power Clean", "Bench Press", "Snatch", "Rack Pull"],
        correctAnswer: "Bench Press",
        yourAnswer: false,
        selected: ""
    },
    {
        question: "Which of the following is NOT a BCAA?",
        choices: ["Valine", "Taurine", "Leucine", "Isoleucine"],
        correctAnswer: "Taurine",
        yourAnswer: false,
        selected: ""
    }
];

$.getJSON("questions.json", function(data) {
    // console.log(data);
    questions = data.allQuestions;
    console.log(questions[0].choices[0]);
    // data is a JavaScript object now. Handle it as such
    //console.log(data.allQuestions.question[0]);

}); */

$(window).load(function () {

    $.getJSON("questions.json", function(data) {
        var allQuestions = data.allQuestions;

    var mainContent = $('#mainContent');

    function calculateScore() {
        for (var j = 0; j < allQuestions.length; j++) {
            if (allQuestions[j].yourAnswer === true) {
                score++;
            }
        }
    }

    function askQuestion(i) {
        mainContent.html('<div id="questionDiv">' +
                '<h1>Question ' + (i + 1) + '</h1>' +
                '<h2>' + allQuestions[i].question + '</h2>' +
                '<input type="radio" name="choice" value="' + allQuestions[i].choices[0] + '">' + allQuestions[i].choices[0] + '</input>' +
                '<input type="radio" name="choice" value="' + allQuestions[i].choices[1] + '">' + allQuestions[i].choices[1] + '</input>' +
                '<input type="radio" name="choice" value="' + allQuestions[i].choices[2] + '">' + allQuestions[i].choices[2] + '</input>' +
                '<input type="radio" name="choice" value="' + allQuestions[i].choices[3] + '">' + allQuestions[i].choices[3] + '</input>' +
                '<br><button id="back" disabled>Back</button>' +
                '   <button id="next">Next</button>' +
                '</div>'
        );
        $('#questionDiv').fadeIn('slow');

        if (i > 0) {
            $('#back').removeAttr('disabled');
        }
        else {
            $('#back').attr('enabled');
        }

        $('#back').on('click', function () {
            $("#questionDiv").fadeOut("slow", function () {
                askQuestion(i - 1);
                $('[name=choice]:radio[value=' + allQuestions[i - 1].selected + ']').prop('checked', true);
            });
        });

        $('#next').on('click', function () {

                if ($('input:radio[name=choice]:checked').val() === allQuestions[i].correctAnswer) {
                    allQuestions[i].yourAnswer = true;
                    allQuestions[i].selected = $('input:radio[name=choice]:checked').val();
                }
                else {
                    allQuestions[i].yourAnswer = false;
                    allQuestions[i].selected = $('input:radio[name=choice]:checked').val();
                }

                if ($('input[type=radio]:checked').size() === 0) {
                    alert("You left your answer blank!");
                }
                else if (i < allQuestions.length - 1) {
                    $("#questionDiv").fadeOut("slow", function () {
                    askQuestion(i + 1);
                    });
                }
                else {
                    $("#questionDiv").fadeOut("slow", function () {
                        $('#questionDiv').remove();
                        calculateScore();
                        mainContent.html('<div id="resultsDiv">You Scored: ' + score + '/4 (' + (score / 4) * 100 + '%)</div>');
                    });
                }

        });
    }

    askQuestion(0);
    });
});

