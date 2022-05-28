//récuperer les éléments html
const accueil = document.querySelectorAll('#accueil .description');
const form = document.querySelector("#accueil");
const questionsForm = document.querySelector("#form-questions");
const radios = document.querySelectorAll('answer-choice');
const radioStyle = document.querySelectorAll(".radio-style");
const forLabel = document.querySelectorAll('#radios label');
const resultScreen = document.querySelector("#result");
const showScore = document.querySelector("#points");
const questionTitle = document.createElement("h1");
questionsForm.append(questionTitle);
const questionCounter = document.createElement("p");
const questionsNumber = document.createElement("div");
questionsNumber.append(questionCounter);
questionsNumber.setAttribute("id", "questions-number");
const timerQuiz = document.createElement("p");
timerQuiz.setAttribute("id", "time");
questionsNumber.append(timerQuiz);
questionsForm.append(questionsNumber);
const crossdiv = document.createElement('div');
crossdiv.setAttribute("id", "crossdiv");
const crossbar = document.createElement('p');
crossbar.setAttribute("id", "crossbar");
crossdiv.appendChild(crossbar);
questionsForm.appendChild(crossdiv);
const radioIn = document.createElement('div');
const questionAnswers = document.createElement("div");
questionAnswers.setAttribute("id", "radios");
const quitbtn = document.createElement("button");
quitbtn.setAttribute("id", "orange");
quitbtn.textContent  = "Quitter";
const nextbtn = document.createElement("button");
nextbtn.setAttribute("id", "green");
nextbtn.textContent = "Suivant";
const stylebtn = document.createElement("div");
stylebtn.setAttribute("id", "submit-style");
const nameError = document.querySelector("#name");
const mailError = document.querySelector("#email");
const success = document.querySelector(".success");
const wrong = document.querySelector(".wrong");
const backWelcome = document.querySelector("#buton");
let resultName = document.createElement("h1");
let resultMail = document.createElement("p");
resultScreen.prepend(resultMail);
resultScreen.prepend(resultName);
let interval = null;
let oneMinute = 59;

//Initialiser le contenu de questions

const questions = ["Quel est le type d'un fichier JavaScript ?", "Où est-il conseillé d'écrire du JavaScript ?", "Quelle est l'utilité d'une fonction ?", "Comment afficher le message 'Hello World' à l'écran ?", "Comment vider un tableau en JavaScript ?", "Quelle fonction ajoute exactement un élément au début et à la fin d'un tableau ?"];
let answers = [
	[".ts", ".jsx", ".js", ".j"], 
	["dans la balise head", "dans la balise body", "dans un fichier externe", "aucune bonne reponse"],
	["ne pas repéter le même code plusieurs fois", "créer des balises html", "créer des boucles", "écrire plusieurs fois le même code"],
	["msg('Hello World')", "msgBox('Hello World');", "alertBox('Hello World');", "alert('Hello World');"],
	["arrayList[]", "arrayList(0)", "arrayList.length=0", "arrayList.len(0)"],
	["push,unshift", "unshift,push", "first,push", "unshift,last"]
];
let correct = [".js", "dans un fichier externe", "ne pas repéter le même code plusieurs fois", "alert('Hello World');", "arrayList.length=0", "unshift,push"];
// let idAnswers = [
//     ["ts", "jsx", "js", "j"], 
//     ["head", "boDy", "externe", "none"], 
//     ["repeter", "balises", "boucle", "same	"]
// ];

let points = 0;
let index = 0;

resultScreen.style.display = "none";
/**
*@param {String} name >= 3
*@param {Object} mail 
*Validate name and mail provided by the user
*/
function ValidateEmail(name, mail){
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail) && name.length >= 3)
  {
		accueil.style.display = "none";
		questionsForm.style.display = "block";
    return (true)
  }
	nameError.textContent = "N’oubliez pas de renseigner votre nom avant de commencer le Quiz. ";
	mailError.textContent = "N’oubliez pas de renseigner votre email avant de commencer le Quiz";
	nameError.classList.add("validate");
	mailError.classList.add("validate");    
	return (false)
}

/**
*@param {String} name : name of the user to show on result
*@param {Object} mail : mail of the user to show on result
*@return {resultScreen}
*/
function showResult(name, mail){
	nextbtn.click();
	points;
	showScore.textContent = `${points}/${questions.length}`;
	resultName.textContent = name;
	resultMail.textContent = mail;
	questionsForm.style.display = "none";
	resultScreen.style.display = "block";
	if(points >= answers.length / 2){
		success.style.display = "block";
		wrong.style.display = "none";
	}else{
		wrong.style.display = "block";
		success.style.display = "none";
	}
}
/**
*@param {Number} duration
*@param {Object} display
*
*/
function startTimer(duration, display) {
	clearInterval(interval)
	let timer = duration, seconds
	interval  = setInterval(function () 
	{
		seconds = parseInt(timer % 60, 10);
		seconds = seconds < 10 ? "0" + seconds : seconds;
		display.textContent = seconds;
		if (--timer < 0) 
		{
			timer = duration;
			clearInterval(interval)
			nextbtn.click()
		}

	}, 1000);
}

//L'action à mener à l'écoute de l'évenement "submit"
form.addEventListener("submit", function(e){
    e.preventDefault();
	
//récupérer le nom et l'addresse email
	const name = document.querySelector("#nom").value;
	const mail = document.querySelector("#mail").value;
	if(name != "" && mail != "" && name.length >= 3){
//action à mener si le nom et le mail sont non-vide et la longueur du nom est >= 3 
		
		form.style.display = "none";
		questionsForm.style.display = "block";
		if(index < questions.length){
			questionTitle.textContent = questions[index];
			questionCounter.textContent = `Question ${index + 1}/${questions.length}`;
			startTimer(oneMinute, timerQuiz);
			
			answers[index].forEach(function(answer){
				let radioStyle = document.createElement("div");
				radioStyle.addEventListener("click", () => radiosInput.click());
				radioStyle.setAttribute("class", "radio-style");
				let radiosInput = document.createElement("input");
				radiosInput.setAttribute("type", "radio");
				radiosInput.setAttribute("name", "answer-choice");
				let labelTitle = document.createElement("label");
				labelTitle.classList.add("answer-choice");
				radiosInput.setAttribute("value", answer);
				labelTitle.textContent = answer;
				radioStyle.appendChild(radiosInput);
				radioStyle.appendChild(labelTitle);
				radioIn.append(radioStyle);
				questionAnswers.append(radioIn);
			})
			questionAnswers.appendChild(stylebtn);
			stylebtn.appendChild(quitbtn);
			stylebtn.appendChild(nextbtn);
	
			nextbtn.addEventListener("click", function(e){
				e.preventDefault();
				crossbar.remove();
				crossdiv.appendChild(crossbar)
				startTimer(oneMinute, timerQuiz);
				
				let chose = document.querySelector('input[name="answer-choice"]:checked');
				if(chose){
					chose = chose.value;
				}
				
				if(chose == correct[index]){
					points++;
				}
				index++;				
				if(index < answers.length ){
					questionTitle.textContent = questions[index];
					questionCounter.textContent = `Question ${index + 1}/${questions.length}`;
					answers[index].forEach(function(){
						labelTitle = document.querySelectorAll(".answer-choice");
						radiosInput = document.querySelectorAll("[type='radio']");
						for(let i = 0; i < labelTitle.length; i++){
							labelTitle[i].textContent = answers[index][i];
							radiosInput[i].setAttribute("value", answers[index][i]);
						}
						questionsForm.reset();
					})
				} 
				else{
					showResult(name, mail);
				}	
			});
			quitbtn.addEventListener("click", function(event){
				event.preventDefault();
				showResult(name, mail);
			});
			questionsForm.appendChild(questionAnswers);
		}
	}
	else
	{
		ValidateEmail(name, mail);
	}
	backWelcome.addEventListener("click", function(e){
		e.preventDefault();
		window.location.reload();
	});
});