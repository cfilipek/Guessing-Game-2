/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

var generateWinningNumber = function() {
    return Math.floor(Math.random() * 100) + 1;
  };
  
  var shuffle = function(array) {
    var m = array.length;
    var t;
    var i;
  
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };
  
  function Game(playersGuess) {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }
  
  Game.prototype.difference = function() {
    let answer = this.playersGuess - this.winningNumber;
    return Math.abs(answer);
  };
  
  Game.prototype.isLower = function() {
    if (this.playersGuess < this.winningNumber) return true;
    else return false;
  };
  
  Game.prototype.playersGuessSubmission = function(num) {
    this.playersGuess = num;
    if (num < 1 || num > 100 || typeof num !== "number") {
      throw "That is an invalid guess.";
    }
    return this.checkGuess();
  };
  
  Game.prototype.checkGuess = function() {
    if (this.playersGuess === this.winningNumber) {
      $("#hhintbtn, #guessbtn").prop("disabled", true);
      $("#change-text")
        .html("Yes, it's " + this.winningNumber + "!" + "<br>" 
        + "It only took you " + this.pastGuesses.length + " guesses.");
      $("#header-img")
      .attr("src","img/winner-06.png");
      $("#colored-bkgrd")
      .css({
        "backgroundColor" : "#badedb"
      });
        
      return "You Win!";
    } else {
      if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
        $("#change-text")
          .html("You have already guessed that number. <br> *it is a number between 1 - 100");
        $("header-img")
          .attr("src","img/img-1-01.png");
        $("colored-bkgrd")
          .css({
            "backgroundColor" : "#fed3cb"
        });
          
      } else {
        this.pastGuesses.push(this.playersGuess);
        $("#guesses li:nth-child(" + this.pastGuesses.length + ")")
          .text(this.playersGuess)
          .css({
            "background-color": "white"
          });
        if (this.pastGuesses.length === 5) {
          $("#hhintbtn, #guessbtn").prop("disabled", true);
          $("#change-text")
            .html(`No more guesses left!<br>The number was: ${this.winningNumber}`);
          $("#header-img")
            .attr("src","img/img-1-01.png");
          $("#colored-bkgrd")
             .css({
             "backgroundColor" : "#fed3cb"
             });
          return "You Lose.";
        } else {
          var diff = this.difference();
          if (this.isLower()) {
            $("#change-text")
                .html("Guess a higher number! <br> *it is a number between 1 - 100");
            $("#header-img")
          .attr("src","img/high-06.png");
            $("#colored-bkgrd")
          .css({
            "backgroundColor" : "#badedb"
        });
          } else {
            $("#change-text")
                .html("Guess a lower number! <br> *it is a number between 1 - 100");
            $("#header-img")
            .attr("src","img/low-05.png");
             $("#colored-bkgrd")
            .css({
            "backgroundColor" : "#eae8ca"});
          }
          if (diff < 10) return "You're burning up!";
          else if (diff < 25) return "You're lukewarm.";
          else if (diff < 50) return "You're a bit chilly.";
          else return "You're ice cold!";
        }
      }
    }
  }; 
  
  
  function newGame() {
    return new Game();
  }
  
  Game.prototype.provideHint = function() {
    var hintArray = [
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber()
    ];
    return shuffle(hintArray);
    // return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
  };
  
  function makeAGuess(game) {
    var guess = $("#input").val();
    $("#input").val("");
    var output = game.playersGuessSubmission(parseInt(guess, 10));
    $("#headers").text(output);
  }
  
  $(document).ready(function() {
    var game = new Game();
    $("#guessbtn").click(function() {
      makeAGuess(game);
    });
  
    $("#input").keypress(function(event) {
      if (event.which == 13) {
        makeAGuess(game);
      }
    });
  
    $("#reset").click(function() {
      game = newGame();
      // $('.headers').removeClass('.headers');
      // $('#app').filter('.headers').addClass('.headers');
      $("#change-text").html("Please enter a number.<br>*it is a number between 1 - 100");
      // $("#subtitle").text("Guess a number between 1-100!");
      $("#headers")
        .text("Are you hot or cold?");
      $(".guess")
        .text("-");
      $("#header-img")
          .attr("src","img/img-1-01.png");
        $("#colored-bkgrd")
          .css({
            "backgroundColor" : "#fed3cb"
        });
      $("#hintbtn, #guessbtn").prop("disabled", false);
    });
  
    $("#hintbtn").click(function() {
      var hints = game.provideHint();
      $("#headers")
        .text(
          "The winning number is " +
            hints[0] +
            ", " +
            hints[1] +
            ", or " +
            hints[2]
        )
        
    });
  });
  



