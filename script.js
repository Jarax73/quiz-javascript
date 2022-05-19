const accueil = document.querySelectorAll('#accueil .description');
const form = document.querySelector("#accueil");
const questions = document.querySelector("#form-questions");
const radios = document.querySelectorAll('answer-choice');
const enoncedText = document.querySelector("#form-questions h1");
const answersChoice = document.querySelectorAll(".answer-choice");
const radiosInput = document.querySelectorAll("[type='radio']");
const forLabel = document.querySelectorAll('#radios label');
const questionNumbers = document.querySelectorAll("#questions-number p");

let question = "Quel est le type d'un fichier JavaScript ?";
let answers = [".ts", ".jsx", ".js", ".j"];
let idAnswers = ["ts", "jsx", "js", "j"];
let nb = ["Question 1/15", 30];

enoncedText.textContent = question;

for (let i = 0; i < nb.length; i++){
	questionNumbers[i].textContent += nb[i];
}
for(let i = 0; i < answersChoice.length; i++){
	answersChoice[i].textContent += answers[i];
	answersChoice[i].setAttribute("value", answers[i]);
	forLabel[i].setAttribute("for", idAnswers[i]);
	radiosInput[i].setAttribute("id", idAnswers[i]);
}


form.addEventListener("submit", function(e){
	e.preventDefault();
	
	// récupérer les valeurs de champs du formulaire d'accueil
	
	const inputValues = {};
	for (const info of this.elements){
		const {name, value} = info;
		if(name){
		inputValues[name] = value;
		}
	}
	for (const el in inputValues){
		// console.log(inputValues[el]);
		// form.textContent += inputValues[el] + " ";
		
	}
	form.style.display = "none";
	questions.style.display = "block";

	questions.addEventListener("submit", function(event){
		event.preventDefault();
		let valeur;
		for (let i = 0; i < questions.length; i++){
			if(questions[i].checked == true){
				valeur = questions[i].value;
				break;
			}
		}
		console.log(valeur);
		function Quizz(question, answer, correct){
			this.question = question;
			this.answer = answer;
			this.correct = correct;
	
			this.questioneEnonced = function(){
				let enonced = this.question;
				enoncedText.textContent = enonced;
				console.log(enonced);
				for (let i = 0; i < answer.length; i++){
					answersChoice.textContent += answer[i];
				}
			}
			this.addAnswer = function(choice){
				this.answer.push(choice);
			}
		}
		const question1 = Quizz("Quel est le type d'un fichier JavaScript ?", [".ts", ".jsx", ".js", ".j"], ".js");
	});
	
	
	
});




