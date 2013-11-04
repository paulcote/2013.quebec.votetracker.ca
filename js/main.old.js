$(function() {
	/*$.ajax({
	  dataType: "json",
	  url: '23027.json',
	  success: buildHtmlFromData
	});*/
});

function buildHtmlFromData(data){
	console.log(data);
	var length = data.ville.postes.length,
	    poste = null;
	var output = "";
	for (var i = 0; i < length; i++) {
		poste = data.ville.postes[i];
		
		if(poste.type_poste == 'M'){
			output += "<h2>Poste de maire<h2>";
		}
		else{
			output += "<h2>Poste de conseiller dans le district " + poste.nom + "</h2>";
		}
		
		output += "<h3>Candidats</h3><ul>";
		
		var length2 = poste.candidats.length,
		    candidat = null;
		for (var ii = 0; ii < length2; ii++) {
			candidat = poste.candidats[ii];
			
			output += "<li>" + candidat.prenom + " " + candidat.nom + " : " + candidat.nb_vote + " votes</li>";
		}
		
		output += "</ul>";
		
		output += "<p>Nombre de votes rejetés : " + poste.nb_votes_rejet + " votes</p>";
	}
	
	output += "<p>Comprend des données ouvertes préliminaires octroyées le " + data.maj + " sous la licence d'utilisation des données ouvertes du ministère des Affaires municipales, des Régions et de l'Occupation du territoire disponible à l'adresse Web : <a href='http://www.electionsmunicipales.gouv.qc.ca'>http://www.electionsmunicipales.gouv.qc.ca</a>. L'octroi de la licence n'implique aucune approbation par le ministère des Affaires municipales, Régions et Occupation du territoire de l'utilisation des données ouvertes qui en est faite.</p>";
	
	$('body').html(output);
}