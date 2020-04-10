import L from 'leaflet';
// initialisation de la map
let mymap = L.map('map');
window.updateMap= updateMap;
window.addMap = addMap;
window.itialiseMap = itialiseMap;

window.defPeri ;
window.defCible;

// Création d'un "tile layer" (permet l'affichage sur la carte)
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibTFpZjEzIiwiYSI6ImNqczBubmhyajFnMnY0YWx4c2FwMmRtbm4ifQ.O6W7HeTW3UvOVgjCiPrdsA', {
		maxZoom: 20,
		minZoom: 1,	
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

	mymap.on('click',function(e){
	if(defPeri === true){
		document.getElementById('perilat').value = e.latlng.lat.toFixed(5);
		document.getElementById('perilon').value = e.latlng.lng.toFixed(5);
		document.getElementById('perilat').disabled = true;
		document.getElementById('perilon').disabled = true;
		defPeri = false;
		
	}
	if (defCible === true) {
		document.getElementById('ciblelat').value = e.latlng.lat.toFixed(5);
		document.getElementById('ciblelon').value = e.latlng.lng.toFixed(5);
		document.getElementById('Hciblelat').value = e.latlng.lat.toFixed(5);
		document.getElementById('Hciblelon').value = e.latlng.lng.toFixed(5);
		document.getElementById('ciblelat').disabled = true;
		document.getElementById('ciblelon').disabled = true;
		defCible = false;
	}
		
	});

// Ajout d'un marker	
L.marker([45.78207, 4.86559]).addTo(mymap).bindPopup('Entrée du bâtiment<br><strong>Nautibus</strong>.').openPopup();
L.Icon.Default.imagePath = '/lib/leaflet/dist/images/';
// Mise à jour de la map
function updateMap() {
	// Affichage à la nouvelle position
	mymap.setView([$('#lat').val(), $('#lon').val()], $('#zoom').val());
	//console.log("New pos setted");

	// La fonction de validation du formulaire renvoie false pour bloquer le rechargement de la page.
	return false;
}

function itialiseMap() {
	mymap.setView([45.782, 4.8656], 15);
	return false;
}



function addMap(LatLon) {
	// Affichage à la nouvelle position
	//mymap.setView([$('#lat').val(), $('#lon').val()], $('#zoom').val());
	//console.log("New pos setted");
	L.circle( LatLon, {radius : 1000 , color : 'red'}).addTo(mymap);
	// La fonction de validation du formulaire renvoie false pour bloquer le rechargement de la page.
	return false;
}