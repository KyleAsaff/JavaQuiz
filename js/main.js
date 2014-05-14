/**
 * Created by Kyle on 01/05/2014.
 */

"use strict";

var score = 0;

$(window).load(function () {
    $.getJSON("questions.json", function (data) {
        var allQuestions = data.allQuestions;

        var mainContent = $('#mainContent');

        $('#create').on('click', function () {
            if($('#username').val() === "" || $('#password').val() === "") {
                $('#loginMessage').empty();
                $('#loginMessage').text("Oops! You left a text block blank");
            }
            else {
                localStorage.setItem('user', $('#username').val());
                localStorage.setItem('pass', $('#password').val());
                $('#username').val('');
                $('#password').val('');
                $('#loginMessage').empty();
                $('#loginMessage').text("Account creation successful! You may now login.");
            }
        });

        $('#login').on('click', function () {
           if(localStorage.user === $('#username').val() && localStorage.pass === $('#password').val())  {
               $('#loginDiv').fadeOut("slow", function() {
                   $('#globalMessage').text("Welcome " + localStorage.user + "! Let's test your knowledge.");
                   $('#globalMessage').fadeIn('slow');
                        askQuestion(0);
                   });
           }
           else {
               $('#loginMessage').empty();
               $('#loginMessage').text("You entered the wrong username or password.");
           }
        });

        function calculateScore() {
            for (var j = 0; j < allQuestions.length; j++) {
                if (allQuestions[j].yourAnswer === true) {
                    score++;
                }
            }
        }

        function askQuestion(i) {
            $('#mainContent').show();
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
    });
});

