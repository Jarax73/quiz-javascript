//récuperer les éléments html

const accueil = document.querySelectorAll('#accueil .description');
const form = document.querySelector("#accueil");
const questionsForm = document.querySelector("#form-questions");
const radios = document.querySelectorAll('answer-choice');
const radioStyle = document.querySelectorAll(".radio-style");
const forLabel = document.querySelectorAll('#radios label');
const questionsNumber = document.querySelector("#questions-number");
const crossdiv = document.querySelector("#crossdiv");
const resultScreen = document.querySelector("#result");
const showScore = document.querySelector("#points");
let resultName = document.querySelector("#result h1");
let resultMail = document.querySelector("#result p");

//Initialiser le contenu de questions

const questions = ["Quel est le type d'un fichier JavaScript ?", "Où est-il conseillé d'écrire du JavaScript ?", "Quelle est l'utilité d'une fonction ?"];
let answers = [
	[".ts", ".jsx", ".js", ".j"], 
	["dans la balise head", "dans la balise body", "dans un fichier externe", "aucune bonne reponse"],
	["ne pas repéter le même code plusieurs fois", "créer des balises html", "créer des boucles", "écrire plusieurs fois le même code"]
];
let correct = [".js", "dans un fichier externe", "ne pas repéter le même code plusieurs fois"];
let idAnswers = [
    ["ts", "jsx", "js", "j"], 
    ["head", "boDy", "externe", "none"], 
    ["repeter", "balises", "boucle", "same	"]
];
let id = 0;
let points = 0;
let index = 0;

resultScreen.style.display = "none";
//L'action à mener à l'écoute de l'évenement "submit"
form.addEventListener("submit", function(e){
    e.preventDefault();
	
	//récupérer le nom et l'addresse email
	
	const name = document.querySelector("#nom").value;
	const mail = document.querySelector("#mail").value;
	
	//fermer l'écran d'accueil et ouvrir l'écran de questions
	
	form.style.display = "none";
	questionsForm.style.display = "block";

	if(index < questions.length){
			
		let oneMinute = 59;
		display = document.querySelector('#time');
		startTimer(oneMinute, display);
		
		let questionCounter = document.createElement("p");
		questionCounter.textContent = `Question ${index + 1}/${questions.length}`;
		console.log(questionCounter);

		questionsNumber.prepend(questionCounter);

		let questionTitle = document.createElement("h1");
		questionTitle.textContent = questions[index];
		questionsForm.prepend(questionTitle);

		let questionAnswers = document.createElement("div");
		questionAnswers.setAttribute("id", "radios");
		let quitbtn = document.createElement("button");
		quitbtn.setAttribute("id", "orange");
		quitbtn.textContent  = "Quitter";
		let nextbtn = document.createElement("button");
		nextbtn.setAttribute("id", "green");
		nextbtn.textContent = "Suivant";
		let stylebtn = document.createElement("div");
		stylebtn.setAttribute("id", "submit-style");

		
		questionAnswers.appendChild(stylebtn);
		const radioIn = document.createElement('div');
		
		
		answers[index].forEach(function(answer){
			let radioStyle = document.createElement("div");
			radioStyle.setAttribute("class", "radio-style");
			let radiosInput = document.createElement("input");
			radiosInput.setAttribute("type", "radio");
			radiosInput.setAttribute("name", "answer-choice");
			let labelTitle = document.createElement("label");
			labelTitle.classList.add("answer-choice");
			radiosInput.setAttribute("value", answer);
			// labelTitle.setAttribute("for", id++);
			labelTitle.textContent = answer;
			// radiosInput.setAttribute("id", id++);
			radioStyle.appendChild(radiosInput);
			radioStyle.appendChild(labelTitle);
			radioIn.append(radioStyle);
			questionAnswers.append(radioIn);
			console.log(questionAnswers);
		})
		
		// console.log(labelTitle);
		stylebtn.appendChild(quitbtn);
		stylebtn.appendChild(nextbtn);

		nextbtn.addEventListener("click", function(e){
			e.preventDefault();
			display.remove();
			
			startTimer(oneMinute, display);
			
			let chose = document.querySelector('input[name="answer-choice"]:checked').value;
			console.log(chose);
			
			
			
			
			
			if(index < questions.length ){
				if(chose == correct[index]){
				points++;
				console.log(points);
				}	
				index++;
				
				
				
				questionTitle.textContent = questions[index];
				questionCounter.textContent = `Question ${index + 1}/${questions.length}`;
				answers.forEach(function(){
					labelTitle = document.querySelectorAll(".answer-choice");
					radiosInput = document.querySelectorAll("[type='radio']");
					for(let i = 0; i < labelTitle.length; i++){
						labelTitle[i].textContent = answers[index][i];
						radiosInput[i].setAttribute("value", correct[index]);
					}
				
					questionsForm.reset();
				})
			} 
			else{
				points;
				questionsForm.style.display = "none";
				resultScreen.style.display = "block";

				resultName = name;
				resultMail = mail;
			}
			showScore.textContent = `${points}/${questions.length}`;
		});

		questionsForm.appendChild(questionAnswers);
		console.log(questionsForm);
		console.log(questionCounter);
	}
	
	else{
			
	}

//function timer
	
	function startTimer(duration, display) {
		let timer = duration, minutes, seconds;
		setInterval(function () {
				minutes = parseInt(timer / 60, 10);
				seconds = parseInt(timer % 60, 10);

				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				display.textContent = minutes + ":" + seconds;

				if (--timer < 0) {
						timer = duration;
				}

		}, 1000);
	}
});
