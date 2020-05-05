import L from 'leaflet';
// initialisation de la map
let mymap = L.map('map');
window.updateMap= updateMap;
window.addMap = addMap;
window.itialiseMap = itialiseMap;
window.drawCircle= drawCircle;
window.removeCircle = removeCircle;	
window.addCible = addCible;
window.removeCible = removeCible;
window.getAllElements = getAllElements;
	

import 'leaflet/dist/leaflet.css';
import {  icon }  from 'leaflet'

let actuellatlngPeri;
let actuellatlngCible;
window.defPeri ;
window.defCible;
let periMarker;
let cibleMarker;

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
		document.getElementById('Hperilat').value = e.latlng.lat.toFixed(5);
		document.getElementById('Hperilon').value = e.latlng.lng.toFixed(5);
		document.getElementById('perilat').disabled = true;
		document.getElementById('perilon').disabled = true;
		//actuellatlngPeri = e.latlng;
		var tab = [e.latlng.lat,e.latlng.lng]
		localStorage.setItem('actuellatlngPeri', JSON.stringify(tab));
		defPeri = false;
		if (periMarker)
			mymap.removeLayer(periMarker);
		
		periMarker = drawCircle(e.latlng);
		
	}
	if (defCible === true) {
		document.getElementById('ciblelat').value = e.latlng.lat.toFixed(5);
		document.getElementById('ciblelon').value = e.latlng.lng.toFixed(5);
		document.getElementById('Hciblelat').value = e.latlng.lat.toFixed(5);
		document.getElementById('Hciblelon').value = e.latlng.lng.toFixed(5);
		document.getElementById('ciblelat').disabled = true;
		document.getElementById('ciblelon').disabled = true;
		defCible = false;
		//actuellatlngCible = e.latlng;
		var tab = [e.latlng.lat,e.latlng.lng]
		localStorage.setItem('actuellatlngCible',JSON.stringify(tab));
		if (cibleMarker)
			mymap.removeLayer(cibleMarker);
		cibleMarker = addCible(e.latlng);
	}
		
	});

// Ajout d'un marker	


// Mise à jour de la map
function updateMap() {
	// Affichage à la nouvelle position
	mymap.setView([$('#lat').val(), $('#lon').val()], $('#zoom').val());
	return false;
}

function itialiseMap() {
	L.marker([45.78207, 4.86559], {
		icon: icon({
		  iconSize: [ 25, 41 ],
		  iconAnchor: [ 13, 41 ],
		  iconUrl: '/static/marker-icon.png',
		  shadowUrl: '/static/marker-shadow.png'
		})
	  }).addTo(mymap).bindPopup('Entrée du bâtiment<br><strong>Nautibus</strong>.').openPopup();
	mymap.setView([45.782, 4.8656], 15);
	return false;
}

function addCible(LatLon){
	return L.marker(LatLon, {
		icon: icon({
		  iconSize: [ 25, 41 ],
		  iconAnchor: [ 13, 41 ],
		  iconUrl: '/static/target.png',
		  shadowUrl: '/static/marker-shadow.png'
		})
	  }).addTo(mymap).bindPopup('Cible !').openPopup();

}

function addMap(element) {
	L.marker(element.position, {
		icon: icon({
		  iconSize: [ 25, 41 ],
		  iconAnchor: [ 13, 41 ],
		  iconUrl: '/static/marker-icon.png',
		  shadowUrl: '/static/marker-shadow.png'
		})
	  }).addTo(mymap).bindPopup(element.id).openPopup();
}

function drawCircle(LatLon){
	return L.circle( LatLon, {radius : 3000 , color : 'red'}).addTo(mymap);
}

function removeCircle(){
	if (periMarker)
			mymap.removeLayer(periMarker);
}

function removeCible(){
	if (cibleMarker)
			mymap.removeLayer(cibleMarker);
}

function getAllElements() {
	if (localStorage.getItem('actuellatlngCible'))
		cibleMarker = addCible(JSON.parse(localStorage.getItem('actuellatlngCible')));
	if (localStorage.getItem('actuellatlngPeri'))
		periMarker = drawCircle(JSON.parse(localStorage.getItem('actuellatlngPeri')));

}