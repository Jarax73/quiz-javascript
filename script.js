const accueil = document.querySelectorAll('#accueil .description');
console.log(accueil);
const form = document.querySelector("#accueil");
const questions = document.querySelector("#form-questions");
const radios = document.querySelectorAll('answer-choice');

form.addEventListener("submit", function(e){
	e.preventDefault();
	//récupérer les valeurs de champs du formulaire d'accueil
	// const inputValues = {};
	// for (const info of this.elements){
	// 	const {name, value} = info;
	// 	if(name){
	// 	inputValues[name] = value;
	// 	}
	// }
	// for (const el in inputValues){
	// 	console.log(inputValues[el]);
	// 	form.textContent += inputValues[el];
	// }
	// console.log(inputValues);
	
	
	
	function Quizz(){
		
	}
});
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
});
