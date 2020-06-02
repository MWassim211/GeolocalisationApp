import L from 'leaflet';
// initialisation de la map
window.mymap = L.map('map');
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
		
		periMarker = drawCircle(e.latlng,document.getElementById('radius').value);
		
	}
	if (defCible === true) {
		if(periMarker){
			document.getElementById('ciblelat').value = e.latlng.lat.toFixed(5);
			document.getElementById('ciblelon').value = e.latlng.lng.toFixed(5);
			document.getElementById('Hciblelat').value = e.latlng.lat.toFixed(5);
			document.getElementById('Hciblelon').value = e.latlng.lng.toFixed(5);
			document.getElementById('ciblelat').disabled = true;
			document.getElementById('ciblelon').disabled = true;
			defCible = false;
			var radius = periMarker.getRadius(); //in meters
			var circleCenterPoint = periMarker.getLatLng(); //gets the circle's center latlng
			var isInCircleRadius = Math.abs(circleCenterPoint.distanceTo(L.latLng(e.latlng.lat,e.latlng.lng))) <= radius;
			if (!isInCircleRadius){
				alert("Cible en dehors du périmetre de jeu, Veuillez positionner la cible dans le perimetre du jeu, Merci")
				return;
			}
			var tab = [e.latlng.lat,e.latlng.lng]
			localStorage.setItem('actuellatlngCible',JSON.stringify(tab));
			if (cibleMarker)
				mymap.removeLayer(cibleMarker);
			cibleMarker = addCible(e.latlng);
		}else{
			alert("Vous devez d'abord commencer par définier le périmetre de jeu (Cliquer sur le boutton Definir perimetre puis clicquer sur la map), Merci");
		}
	}
		
	});

// Ajout d'un marker	


// Mise à jour de la map
function updateMap() {
	// Affichage à la nouvelle position
	if (periMarker)
		mymap.setView(periMarker.getLatLng(), 15);
	else
		mymap.setView([45.782, 4.8656], 15);
	return false;
}

function itialiseMap() {
	//L.marker([45.78207, 4.86559], {
	//	icon: icon({
	//	  iconSize: [ 25, 41 ],
	//	  iconAnchor: [ 13, 41 ],
	//	  iconUrl: '/static/marker-icon.png',
	//	  shadowUrl: '/static/marker-shadow.png'
	//	})
	//  }).addTo(mymap).bindPopup('Entrée du bâtiment<br><strong>Nautibus</strong>.').openPopup();
	mymap.setView([45.782, 4.8656], 15);
	return false;
}

function addCible(LatLon){
	return L.marker(LatLon, {
		icon: icon({
		  iconSize : [ 25 , 41 ],
		  iconAnchor : [ 12 , 0 ],
		  iconUrl: '/static/target.png',
		  shadowUrl: '/static/marker-shadow.png'
		})
	  }).addTo(mymap).bindPopup('Cible !').openPopup();

}

function addMap(element) {
	L.marker(element.position, {
		icon: icon({
		  iconSize : [ 25 , 41 ],
		  iconAnchor : [ 12 , 0 ],
		  iconUrl: '/static/marker-icon.png',
		  shadowUrl: '/static/marker-shadow.png'
		})
	  }).addTo(mymap).bindPopup(element.id).openPopup();
}

function drawCircle(LatLon,myrad){
	return L.circle( LatLon, {radius : myrad , color : 'red'}).addTo(mymap);
}

function removeCircle(){
	if (periMarker){
		mymap.removeLayer(periMarker);
		periMarker = null;
	}
	localStorage.removeItem('actuellatlngPeri');
}

function removeCible(){
	if (cibleMarker){
		mymap.removeLayer(cibleMarker);
		cibleMarker = null;

	}
	localStorage.removeItem('actuellatlngCible');
}

function getAllElements() {
	if (localStorage.getItem('actuellatlngCible'))
		cibleMarker = addCible(JSON.parse(localStorage.getItem('actuellatlngCible')));
	if (localStorage.getItem('actuellatlngPeri'))
		periMarker = drawCircle(JSON.parse(localStorage.getItem('actuellatlngPeri')),document.getElementById("radius").value);

}

document.getElementById("radius").addEventListener("change", event => {
	console.log("listened");
	removeCircle();
	periMarker = drawCircle(JSON.parse(localStorage.getItem('actuellatlngPeri')),document.getElementById("radius").value)
});