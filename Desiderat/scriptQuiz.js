function submitAnswers(){
	
	var numQuestions = 9;
	var score = 0;
	/*Hier werden die richtigen Antwortmöglichkeiten aufgeführt    */
	var answers = ["a", "b","c", "a", "b", "d","c", "c","b"];
	
	var name = document.querySelector('input[name="name"]').value;
	
	var frage1 = document.querySelector('input[name="frage1"]:checked');
	var frage2 = document.querySelector('input[name="frage2"]:checked');
	var frage3 = document.querySelector('input[name="frage3"]:checked');
	var frage4 = document.querySelector('input[name="frage4"]:checked');
	var frage5 = document.querySelector('input[name="frage5"]:checked');
	var frage6 = document.querySelector('input[name="frage6"]:checked');
	var frage7 = document.querySelector('input[name="frage7"]:checked');
	var frage8 = document.querySelector('input[name="frage8"]:checked');
	var frage9 = document.querySelector('input[name="frage9"]:checked');
	
	
	
	for(i=1; i <=numQuestions; i++){
		if(eval('frage'+ i) == null){
			alert("Zu Frage " + i +" fehlt noch die Antwort. Bitte wähle jeweils eine Antwortmöglichkeit aus.");
			return false;
		}
	} 
	
	for(i=1; i <= numQuestions; i++){
		if(eval('frage'+i).value == answers[i-1]){
			score++;
		}
	}
	
	var results = document.getElementById('results');
	results.innerHTML = '<h3>' +name + 'Du hast <span>' + score + '</span> von <span>' +numQuestions + '</span> Punkten errreicht</h3>';
	
	if(score == numQuestions){
		alert(name + ", das war super, Du hast alles richtig beantwortet. Glückwunsch!");
	 }else if(score>=1 && score<5){
			alert(name + ", Du hast " +score + " von " +numQuestions + " Fragen richtig! Das kannst Du sicher besser. Versuche es doch nocheinmal.");
	 }else if(score>=5 && score<7){
			alert(name + ", Du hast " +score + " von " +numQuestions + " Fragen richtig! Das war schon gut");
	 }else if(score>=7 && score<10){
			alert(name + ", Du hast " +score + " von " +numQuestions + " Fragen richtig! Das war wirklich gut");
		
	 }else{
		alert(name + ", das war leider alles falsch. Versuche es später nocheinmal.");
	}
	
	return false;

}
