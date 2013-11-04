$(function() {
	$.ajax({
	  dataType: "json",
	  url: '23027.json',
	  success: buildHtmlFromData
	});
});


var currentSlide = 0;
function changeSlide(){
	if($('section').eq(currentSlide).length > 0){
		$('section').removeClass('show');
		$('section').eq(currentSlide).addClass('show');
		currentSlide++;
	}
	else{
		currentSlide = 0;
		$('section').removeClass('show');
		$('section').eq(currentSlide).addClass('show');
		currentSlide++;
	}
}

function buildHtmlFromData(data){
	console.log(data);
	var length = data.ville.postes.length,
	    poste = null;
	var output = "";
	output += '<a href="https://github.com/paulcote/qc_election_results"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png" alt="Fork me on GitHub"></a>';
	for (var i = 0; i < length; i++) {
		poste = data.ville.postes[i];
		
		if(i == 0){
			output += "<section class='show'>";
		}
		else{
			output += "<section>";
		}
		output += "<div class='title'>";
		
		if(poste.type_poste == 'M'){
			output += "<h1>Poste de <strong>maire</strong><h1>";
		}
		else{
			output += "<h1>Conseiller <strong>" + poste.nom.replace('-', '<wbr>-') + "</strong></h1>";
		}
		
		output += "</div><ul>";
		
		var length2 = poste.candidats.length,
		    candidat = null;
		for (var ii = 0; ii < length2; ii++) {
			candidat = poste.candidats[ii];
			
			if(candidat.parti == 'Équipe Labeaume'){
				output += "<li class='blue'>";
			}
			else if(candidat.parti == 'Démocratie Québec'){
				output += "<li class='green'>";
			}
			else{
				output += "<li>";
			}
				output += "<span class='name'><span>" + candidat.prenom + "</span> <strong>" + candidat.nom + "</strong></span>";
				output += "<span class='image'><img src=''></span>";
				output += "<div class='left'>";
					output += "<span class='result'>" + candidat.nb_vote + "</span>";
					output += "<span class='team'>" + candidat.parti + "</span>";
				output += "</div>";
			output += "</li>";
		}
		
		output += "</ul></section>";
	}
	
	output += "<p>Comprend des données ouvertes préliminaires octroyées le " + data.maj + " sous la licence d'utilisation des données ouvertes du ministère des Affaires municipales, des Régions et de l'Occupation du territoire disponible à l'adresse Web : <a href='http://www.electionsmunicipales.gouv.qc.ca'>http://www.electionsmunicipales.gouv.qc.ca</a>. L'octroi de la licence n'implique aucune approbation par le ministère des Affaires municipales, Régions et Occupation du territoire de l'utilisation des données ouvertes qui en est faite.</p>";
	
	$('body').html(output);
	computePercentage();
	
	changeSlide();
	setInterval(changeSlide, 5000);
}

function computePercentage(){
	
	$('section').each(function(){
		var totalVotes = 0;
		$(this).find('li .result').each(function(){
			totalVotes += parseInt($(this).text());
		});
		
		$(this).find('li .result').each(function(){
			$(this).prepend("<strong>" + Math.round((parseInt($(this).text())/totalVotes)*100) + "</strong>%")
		});
	});
}
