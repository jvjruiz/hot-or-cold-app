$(document).ready(function(){
	/*--- Variable to be used ---*/
	var winningNumber;
	var guessCount;
	var guessCorrect = false;
	var guessValid = false;
	var userGuess

	/*---Generates random number ---*/
	function randomNumberGen() {
		var randomNumber =  Math.floor((Math.random()*100)+1);
		console.log("The winning number is "+randomNumber);
		return randomNumber;
	};

	/*--- Start new games---*/
	
	function newGame() {
		guessCorrect = false;
		guessValid = false;
		winningNumber = randomNumberGen();
		$('ul#guessList li').remove();
		guessCount = 0
		setCount()
		changeFeedback("Make your guess")
	};

	newGame()
	
	$("a.new").click(function() {
  		newGame();
  	})

	/*--- Entering Userchoice ---*/
	$('form').submit(function(event) {


		if(!guessCorrect) {
			userGuess = $('#userGuess').val();
			console.log("User guess = " + userGuess);
			clearGuess();
			guessValid = checkGuess(userGuess);
			if(guessValid) {
				guessCount++;
				setCount(guessCount);
				$("ul#guessList").append("<li>"+ userGuess + "</li>")
				guessFlag = checkTemparature(Math.abs(winningNumber - userGuess));
			};
		}
		else {
			changeFeedback("You already won, press new game to start again!");
		};
		
	});

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	/*---Clears guess box---*/
  	function clearGuess() {
  		$('#userGuess').val(' ');
  	}

  	/*--- Checks if guess is valid ---*/
  	function checkGuess(userGuess) {
  		if (isNaN(userGuess)) {
  			changeFeedback("We need a real number here");
  			return false;
  		}
  		else if(userGuess < 1 || userGuess > 100) {
  			changeFeedback("We need a number between 1 and 100");
  			return false;
  		}
  		else {
  			return true;
  		};
  	}

  	/*--- Change the feedback section---*/
	function changeFeedback(feedback) {
		$('#feedback').text(feedback);
	}

	/*--- Sets guesscount ---*/
	function setCount(){
	$('#count').text(guessCount)
	}

/*--- Check the temparature for feedback ---*/
	function checkTemparature(guessDifference) {

		if (guessDifference == 0) {
			changeFeedback("Congrats, you got it!");
			found = true;
			return false;
		} else if (guessDifference <= 5) {
			changeFeedback("Getting real hot in here");
			return true;
		} else if (guessDifference <= 10){
			changeFeedback("Getting hotter");
			return true;
		} else if (guessDifference>=10 && guessDifference <= 20) {
			changeFeedback("Little warm");
			return true;
		} else if (guessDifference>=20 && guessDifference <= 30) {
			changeFeedback("Brr.. its cold");
			return true;
		} else if (guessDifference>=30 && guessDifference <= 40) {
			changeFeedback("Yeah, I'm going to need a jacket");
			return true;
		} else {
			changeFeedback("Frozen.");
			return true;
		}

	}
	

	console.log(winningNumber)
});