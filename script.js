const form = document.querySelector("#home");
const formInput = document.querySelectorAll('.home-input');
const nameError = document.querySelector("#name");
const mailError = document.querySelector("#email");
const questionsForm = document.querySelector("#form-questions");
const questionTitle = document.createElement("h1");
const questionCounterAndTimerContainer = document.createElement("div");
const questionCounter = document.createElement("p");
const timerQuiz = document.createElement("p");
const progressBarContainer = document.createElement('div');
const progressBar = document.createElement('p');
const answersChoiceContainer = document.createElement("div");
const inputsContainer = document.createElement('div');
const buttonContainer = document.createElement("div");
const quitButton = document.createElement("button");
const nextButton = document.createElement("button");
const resultScreen = document.querySelector("#result-screen");
const resultName = document.createElement("h1");
const resultMail = document.createElement("p");
const resultImage = document.querySelector("img");
const showScore = document.querySelector("#scores");
const resultButton = document.querySelector("#buton");
const homeInputName = document.querySelector("#nom");
const homeInputMail = document.querySelector("#mail");

questionsForm.append(questionTitle);
questionCounterAndTimerContainer.append(questionCounter);
questionCounterAndTimerContainer.setAttribute("id", "questions-number");
timerQuiz.setAttribute("id", "time");
questionCounterAndTimerContainer.append(timerQuiz);
questionsForm.append(questionCounterAndTimerContainer);
progressBarContainer.setAttribute("id", "progressBarContainer");
progressBar.setAttribute("id", "progressBar");
progressBarContainer.appendChild(progressBar);
questionsForm.appendChild(progressBarContainer);
answersChoiceContainer.setAttribute("id", "radios");
quitButton.setAttribute("id", "orange");
quitButton.textContent  = "Quitter";
nextButton.setAttribute("id", "green");
nextButton.textContent = "Suivant";
nextButton.disabled = true;
buttonContainer.setAttribute("id", "submit-style");
resultScreen.prepend(resultMail);
resultScreen.prepend(resultName);

const questions = [
	"Quel sera le resultat de 3+2+'7' ?",
	"Quel est le type d'un fichier JavaScript ?", 
	"Où est-il conseillé d'écrire du JavaScript ?", 
	"Quelle est l'utilité d'une fonction ?", 
	"Comment afficher le message 'Hello World' à l'écran ?", 
	"Comment vider un tableau en JavaScript ?", 
	"Quelle fonction ajoute exactement un élément au début et à la fin d'un tableau ?", 
	"Quelle sera le resultat de ce script : let a = \[1, 2, 3\]; console.log(a\[6\]);",
	"Quel va donner ce code ? let a = console.log(typeof typeof 1);", 
	"Quelle compagnie a développé JavaScript ?",
	"Comment ajouter une valeur à un tableau ?", 
	"Qu'est-ce que ce code renvoie à la console ? : console.log(1 + '2' + '2');", 
	"Dans quel balise HTML plaçons-nous le code JavaScript ?", 
	"Comment faire appelle à une fonction nommée « sum » ?", 
	"Comment écrire une condition IF en JavaScript ?"
];
const answers = [
	["327", "12", "14", "57"],
	[".ts", ".jsx", ".js", ".j"], 
	["dans la balise head", "dans la balise body", "dans un fichier externe", "aucune bonne reponse"],
	["ne pas repéter le même code plusieurs fois", "créer des balises html", "créer des boucles", "écrire plusieurs fois le même code"],
	["msg('Hello World')", "msgBox('Hello World');", "alertBox('Hello World');", "alert('Hello World');"],
	["arrayList[]", "arrayList(0)", "arrayList.length=0", "arrayList.len(0)"],
	["push,unshift", "unshift,push", "first,push", "unshift,last"],
	["undefined", "0", "rien n'apparaît", "erreur de syntaxe"],
	["string", "number", "erreur de syntaxe", "undefined"],
	["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
	["arr(length).value;", "arr[arr.length]=value;", "arr[]=add(value);", "aucune bonne reponse"],
	["32", "122", "13", "14"],
	["<js></js>","<javascript></javascript>", "<script></script>", "<rel></rel>"], 
	["sum()", "call function sum()", "call sum()", "aucune bonne reponse"], 
	["if a = 2 then", "if a = 2", "if a = 2 else", "if (a == 2)"]
];
const correct = [
	"14",
	".js", 
	"dans un fichier externe", 
	"ne pas repéter le même code plusieurs fois", 
	"alert('Hello World');", 
	"arrayList.length=0", 
	"unshift,push", 
	"undefined", 
	"string", 
	"Netscape", 
	"arr[arr.length]=value;", 
	"32", 
	"<script></script>", 
	"sum()", 
	"if (a == 2)"
];

let interval = null;
let scores = 0;
let index = 0;
let name;
let mail = "";
const oneMinute = 59;

function showMessageError(name){
	if(name && !mail){
		mailError.textContent = "N’oubliez pas de renseigner votre email avant de commencer le Quiz";
		nameError.textContent = "";
		mailError.classList.add("validate");
		homeInputName.classList.remove("red");
		homeInputMail.classList.add("red");
	}else if(!name && mail){
		nameError.textContent = "N’oubliez pas de renseigner votre nom avant de commencer le Quiz. ";
		mailError.textContent = "";
		nameError.classList.add("validate");
		homeInputName.classList.add("red");
		homeInputMail.classList.remove("red");
	}else{
		nameError.textContent = "N’oubliez pas de renseigner votre nom avant de commencer le Quiz. ";
		mailError.textContent = "N’oubliez pas de renseigner votre email avant de commencer le Quiz";
		nameError.classList.add("validate");
		mailError.classList.add("validate");
		homeInputName.classList.add("red");
		homeInputMail.classList.add("red");
	}
}
function ValidateEmail(name, mail){
	if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,3}$/.test(mail) && name.length >= 3)
	{
		home.style.display = "none";
		questionsForm.style.display = "block";
	}else{
		showMessageError();
	}
}
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
			nextButton.disabled = false;
			nextButton.click()
		}

	}, 1000);
}
function questionsContent(){
	questionTitle.textContent = questions[index];
	questionCounter.textContent = `Question ${index + 1}/${questions.length}`;
	startTimer(oneMinute, timerQuiz);
}
function answersContent(){
	answers[index].forEach(function(answer){	
		let radiosInput = document.createElement("input");
		radiosInput.setAttribute("type", "radio");
		radiosInput.setAttribute("name", "answer-choice");
		let radioStyle = document.createElement("div");
		radioStyle.addEventListener("click", function(){ 	
			radiosInput.click();
			nextButton.disabled = false;
		});
		radioStyle.setAttribute("class", "radio-style");
		let labelTitle = document.createElement("label");
		labelTitle.classList.add("answer-choice");
		radiosInput.setAttribute("value", answer);
		labelTitle.textContent = answer;
		radioStyle.appendChild(radiosInput);
		radioStyle.appendChild(labelTitle);
		inputsContainer.append(radioStyle);
		answersChoiceContainer.append(inputsContainer);
	})
}
function nextQuestionsContent(){
	if(index < answers.length ){
		if(index == answers.length - 1){
			nextButton.textContent = "Terminer";
		}
		nextButton.disabled = true;
		questionsContent();
		answers[index].forEach(function(){
			labelTitle = document.querySelectorAll(".answer-choice");
			radiosInput = document.querySelectorAll("[type='radio']");
			for(let i = 0; i < labelTitle.length; i++){
				labelTitle[i].textContent = answers[index][i];
				radiosInput[i].setAttribute("value", answers[index][i]);
			}
			questionsForm.reset();
		})
	}else{
		showResult(name, mail);
	}
}
function showContent(){
	form.style.display = "none";
	questionsForm.style.display = "block";
	if(index < questions.length){
		questionsContent();
		answersContent();
		nextButton.disabled = true;
		answersChoiceContainer.appendChild(buttonContainer);
		buttonContainer.appendChild(quitButton);
		buttonContainer.appendChild(nextButton);
		questionsForm.appendChild(answersChoiceContainer);
	}
}
function inputCheckedVerification(){
	let inputChecked = document.querySelector('input[name="answer-choice"]:checked');
	if(inputChecked){
		inputChecked = inputChecked.value;
		if(inputChecked == correct[index]){
			scores++;
		}
	}
}
function showResult(name, mail){
	nextButton.click();
	showScore.textContent = `${scores}/${questions.length}`;
	resultName.textContent = name;
	resultMail.textContent = mail;
	questionsForm.style.display = "none";
	resultScreen.style.display = "block";
	resultImage.style.display = "block";
	if(scores >= answers.length / 2){
		resultImage.src = "ant-design_check-circle-outlined.png";
	}else{
		resultImage.src = "ant-design_close-circle-outlined.png";
	}
}
form.addEventListener("submit", function(e){
	e.preventDefault();
	name = document.querySelector("#nom").value;
	mail = document.querySelector("#mail").value;
	if(name != "" && mail != "" && name.length >= 3){
	showContent();
	}else{
		ValidateEmail(name, mail);
	}
});
nextButton.addEventListener("click", function(e){
	e.preventDefault();
	progressBar.remove();
	progressBarContainer.appendChild(progressBar)
	startTimer(oneMinute, timerQuiz);
	inputCheckedVerification();	
	index++;
	nextQuestionsContent();	
});
quitButton.addEventListener("click", function(event){
	event.preventDefault();
	showResult(name, mail);
});
resultButton.addEventListener("click", function(e){
	e.preventDefault();
	window.location.reload();
});