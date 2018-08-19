$(document).ready(function restart() {
    var clock = 30;
    var i = 0;
    var interval;
    var correct = 0;
    var wrong = 0;

    var questions = [{
        question: "What floats in water?",
        answers: ["Bread!", "Apples!", "Very Small Rocks!", "A Duck!"],
        correct: "A Duck!",
        img: "<img src='assets/images/duck.jpg'/>"
    }, {
        question: "What is 'wafer thin?'",
        answers: ["A wafer", "An After Dinner Mint", "Very Small Rocks!", "Spam!"],
        correct: "An After Dinner Mint",
        img: "<img src='assets/images/wafer.gif'/>"
    }, {
        question: "The ministry of ___________",
        answers: ["Spam!", "Very Small Rocks!", "Silly Walks", "Dead Parrots"],
        correct: "Silly Walks",
        img: "<img src='assets/images/silly.gif'/>"
    }, {
        question: "Very Small Rocks!",
        answers: ["Very Small Rocks!", "Very Small Rocks!", "Very Small Rocks!", "Very Small Rocks!"],
        correct: "Very Small Rocks!",
        img: "<img src='assets/images/sacked.jpg'/>"
    }, {
        question: "Nobody Expects the ______________",
        answers: ["Spanish Inquisition!", "Bicycle Repairman!", "The... Larch...", "Large Wooden Badger..."],
        correct: "Spanish Inquisition!",
        img: "<img src='assets/images/spanish.gif'/>"
    }, {
        question: "1... 2...",
        answers: ["5!", "3, Sir!", "3!", "I don't know that!"],
        correct: "3!",
        img: "<img src='assets/images/three.gif'/>"
    }, {
        question: "I'd rather just...SING!",
        answers: ["It's my only line!", "We interrupt this program to annoy you and make things generally irritating.", "No Singing!", "Good-a-night, ding ding ding ding ding."],
        correct: "No Singing!",
        img: "<img src='assets/images/singing.gif'/>"
    }, {
        question: "Spam! Spam! Spam! Spam!",
        answers: ["Spam! Spam! Spam! Spam!", "Spam! Spam! Spam! Spam!", "Spam! Spam! Spam! Spam!", "Spam! Spam! Spam! Spam!"],
        correct: "Spam! Spam! Spam! Spam!",
        img: "<img src='assets/images/sacked2.jpg'/>"
    }, {
        question: "I put on women's clothing an hang around in bars!",
        answers: ["It's Pining for the fjords!", "Your Mother was a Hamster, and your Father smelt of Elderberries!", "There are some who call me...Tim.", "I'm a lumberjack and I'm ok!"],
        correct: "I'm a lumberjack and I'm ok!",
        img: "<img src='assets/images/lumberjack.gif'/>"
    }, {
        question: "It's not pining, it's passed on. This parrot is no more. It has ceased to be. It's expired and gone to meet its maker. This is a late parrot. It's a stiff. Bereft of life, it rests in peace. If you hadn't nailed it to the perch, it would be pushing up daisies. It's rung down the curtain and joined the choir invisible. This is an ex-parrot.",
        answers: ["And now for something completely different", "The Dead Parrot Sketch!", "Strange women lying in ponds distributing swords is no basis for a system of government", "A Shrubbery!"],
        correct: "The Dead Parrot Sketch!",
        img: "<img src='assets/images/parrot.gif'/>"
    }]

    console.log(questions);

    //default game load
    $(".start").show();
    $("#start").unbind().click(start);
    $("#timer").text(clock);
    $("#timer").hide();
    $(".timer").hide();
    $("#q").hide();
    $("#a").hide();
    $("#score").hide();
    i = 0;


    //on start button click
    function start() {
        clock = 30;
        clearInterval(interval);
        $(".start").hide();
        $("#q").show();
        $("#a").show();
        $("#timer").show();
        $(".timer").show();
        $("#timer").text("Time Left: " + clock);
        $("#result").empty();
        $("#result").hide();


        nextQ();

        //clock countdown and trigger timeout function

        interval = setInterval(function () {
            clock--;
            if (clock == 0) {
                //out of time

                var timeout = $("<h4> Nope! Too late!" + "</h4>");
                $("#q").empty();
                $("#a").empty();
                $("#result").html(timeout);
                $("#result").append("<img src='assets/images/sad.gif'/>");
                $("#result").show();
                $("#result").append("<h4> WRONG! The Correct Answer Is... " + questions[i].correct + "</h4>");
                result();

            }
            $("#timer").text("Time Left: " + clock);
        }, 1000);

    };



    //load next question into DOM
    function nextQ() {
        
        var q = $("<h3> Question: " + questions[i].question + "</h3>");
        $("#q").append(q);
        for (var j = 0; j < questions[i].answers.length; j++) {
            var a = $("<li>" + questions[i].answers[j] + "</li>");
            $("#a").append(a);
        }

        //test if answer is correct
        $(document).unbind().on("click", "#a li", testA);

        function testA() {
            $("#result").empty();
            clearInterval(interval);
            //incorrect
            if (this.innerText !== questions[i].correct) {
                result();
                $("#result").prepend("<h4> WRONG! The Correct Answer Is... " + questions[i].correct + "</h4>");
                wrong++;
                //correct
            } else {
                result();
                correct++;
                $("#result").prepend("<h4> CORRECT! " + questions[i].correct + "</h4>");
            }
        }
        console.log("correct " + correct);
        console.log("wrong " + wrong);
    }




    //correct function
    function result() {
        clearInterval(interval);

        $("#q").empty();
        $("#a").empty();
        $("#result").append(questions[i].img);
        $("#result").show();

        //countdown to next Question
        clock = 11;
        interval = setInterval(function () {
            clock--;
            if (clock == 0) {
                i++;
                console.log(i);
                clearInterval(interval);
                if (i == 10) {
                    console.log("end trigger");
                    score();
                }
                start();

            }
            $("#timer").text("Next Round In... " + clock);
        }, 1000);



    };

    function score() {

        $("#timer").hide();
        $(".timer").hide();
        $("#score").prepend("<h3> You got " + correct + " Right! </h3>");
        $("#score").append("<h3> You got " + wrong + " Wrong! </h3>");
        $("#score").show();
        var r = $("<button>");
        r.addClass("restart");
        r.text("Play Again?")
        $("#score").append(r);
        clearInterval(interval);

        if (correct <= 5) {
            $("#score").append("<img src='assets/images/brain.gif'/>");
        } else {
            $("#score").append("<img src='assets/images/rejoice.gif'/>");
        }
        $("#q").empty();
        $("#a").empty();
        $(".restart").unbind().click(restart);
    }







});