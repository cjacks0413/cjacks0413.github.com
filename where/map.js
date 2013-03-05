var myLat = 42.40093; //for now near davis square 
var myLng = -71.121815;

request = new XMLHttpRequest(); 
request2 = new XMLHttpRequest(); 
var redStations = []; 
var redAshmont = [];
var redBraintree = [];
var markers = []; 

var locations;
var stops; 
var infowindow = new google.maps.InfoWindow(); 

var CarmenLat = 0;
var CarmenLng = 0;
var WaldoLat = 0;
var WaldoLng = 0; 

var distW = 0;
var distC = 0;

var mapContent; 
function getMyLocation()
{
	if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			placeMe(); 
	}); 
	}
	else {
		alert("Sorry, HTML5 geolocation is not supported on your browser.");
	}
}


center = new google.maps.LatLng(42.330678, -71.06678);
	mapOptions = {
		zoom:12,
		center:center,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		};

function init()
{
	map = new google.maps.Map(document.getElementById("map"), mapOptions); 
	getMyLocation();
	
}
function ShowDistances()
{
	distW = getDistanceFromPoint(myLat, myLng, WaldoLat, WaldoLng);
	distC = getDistanceFromPoint(myLat, myLng, CarmenLat, CarmenLng); 
	
	var content; 
	if(distC > 30 && distW > 30){
		content = "Where's Waldo..? Can't find Carmen either...";
	}
	else if(distC > 30) {
		content = "Can't find Carmen...";
		content += " You are " + distW + " miles from Waldo ";
	}
	else if(distW > 30) {
		content = "Can't find Waldo...";
		content += " You are " + distC + " from Carmen ";
	}
	else if (distW < 30 && distC<30) {
		content = "You are " + distC + " miles away from Carmen and "
		+ distW + " miles away from Waldo. ";
	}
	var info = new google.maps.InfoWindow();
	var pos = new google.maps.LatLng(42.41, -71.12);
/*	var mark = new google.maps.Marker ({
		position: pos,
		map: map
		}); 
	mark.setMap(map); */
	info.setPosition(pos); 
	info.setContent(content);
	info.open(map); 
//	google.maps.event.addListener(mark, 'click', function() {
//		info.open(map, mark);
//	}); //
}
function placeMe() {
	me = new google.maps.LatLng(myLat, myLng); 
	var meMarker = new google.maps.Marker({
	position: me, 
	map: map,
	title: "You are here: " 
	}); 
	meMarker.setMap(map); 
//	console.log("about to render map" );
	renderMap(); 
//	console.log("In place me " );
//	console.log(WaldoLat, WaldoLng, CarmenLat, CarmenLng); 
	distR = findClosestStop(); 
	//set up content
	content = meMarker.title + myLat + ", " + myLng + "! ";
	if(distR > 5) {
	content += "No Red Lines stops within 5 miles, sorry!";
	}
//	else if (WaldoLat != 0 && CarmenLat != 0){
//	content += " You are " + distW + " miles from Waldo "; 
//	content += "and " + distC + " miles from Carmen! ";
	content+= "The nearest Red Line stop is " + distR.stationName + ", and it is "
	+ distR.closest + " miles away."; 
//	}
	//set up info window
	var info = new google.maps.InfoWindow(); 	
	info.setContent(content);
    google.maps.event.addListener(meMarker, 'click', function() {
	info.open(map,meMarker)
	}); 
}


function renderMap() 
{
	curLocation = new google.maps.LatLng(myLat, myLng);
//	parse_stops();
	map.panTo(me);
	renderRedLine();
	findCarmenAndWaldo();

}
/*
function parse_stops()
{
	request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
	request.send(null);
	request.onreadystatechange = callback; 
}

function callback()
{
	if(request.readyState == 4 && request.status == 200) {
		str = request.responseText; 
		stops = JSON.parse(str);
	}
}*/ 
function findThem(locations)
{
	//sentinel 
	if(location.length == 0) {
		CarmenLat = 0;
		WaldoLat = 0;
	}
	if(locations.length > 0) {	
		if(locations.length == 1) {
			if(locations[0].name == "Carmen Sandiego") {
				 CarmenLat = locations[0].loc.latitude;
				 CarmenLng = locations[0].loc.longitude;
				 WaldoLat = 0;
				}
			if(locations[0].name == "Waldo") {
				 WaldoLat = locations[0].loc.latitude;
				 WaldoLng = locations[0].loc.longitude;
				 CarmenLat = 0; 
				 }
		}
		if(locations.length == 2) {
				WaldoLat = locations[0].loc.latitude; 
				WaldoLng = locations[0].loc.longitude; 
				CarmenLat = locations[1].loc.latitude;
				CarmenLat = locations[1].loc.longitude;
		}
	} 
	loadMarkers();  
	console.log(WaldoLat, WaldoLng, CarmenLat, CarmenLng); 
	ShowDistances();
 
}
function findCarmenAndWaldo()
{
	getCarmenAndWaldo();
}
function loadMarkers()
{
	var waldo = {
		url: 'waldo.png',
		size: new google.maps.Size(71, 71),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(17, 34),
		scaledSize: new google.maps.Size(25,25)
		};
		
	var carmen = {
		url: 'carmen-sandiego.png',
		size: new google.maps.Size(71, 71),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(17, 34),
		scaledSize: new google.maps.Size(25,25)
		};

	console.log(WaldoLat, WaldoLng, CarmenLat, CarmenLng); 
	Waldo = new google.maps.LatLng(WaldoLat, WaldoLng);
	WaldoMarker = new google.maps.Marker ({position: Waldo, title: "Here's Waldo!", icon: waldo }); 
	WaldoMarker.setMap(map);
	wInfo = new google.maps.InfoWindow(); 
	google.maps.event.addListener(WaldoMarker, 'click', function() {
		wInfo.setContent(WaldoMarker.title), 
		wInfo.open(map, WaldoMarker)
		}); 
		
	Carmen = new google.maps.LatLng(CarmenLat, CarmenLng); 
	CarmenMarker = new google.maps.Marker ({position: Carmen, title: "Here's Carmen!", icon: carmen}); 
	CarmenMarker.setMap(map); 
	cInfo = new google.maps.InfoWindow();
	google.maps.event.addListener(CarmenMarker, 'click', function() {
		cInfo.setContent(CarmenMarker.title), 
		cInfo.open(map, CarmenMarker)
		});
}
		

function getCarmenAndWaldo()
{
	request2.open("GET", "http://messagehub.herokuapp.com/a3.json", true);
	request2.onreadystatechange = callback2;
	request2.send(null);
}


function callback2()
{
	if(this.readyState == 4 && this.status == 200) {
		string = this.responseText;
		locations = JSON.parse(string); 
		findThem(locations); 
	}
}
function getDistanceFromPoint(myLat, myLng, lat2, lng2)
{
	var R = 3961;
	var dLat = deg2rad(lat2 - myLat);
	var dLon = deg2rad(lng2 - myLng);
	var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(myLat)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var distance = R * c;
	return distance; 
}	

function deg2rad(deg) {
	return deg * (Math.PI/180); 
}


function findClosestStop()
{

	var closest = 5;
	var curr;  
	var stationName; 
	var allInfo = {closest: 5, stationName: ""}; 
	for(i=0;i<markers.length;i++){
		curr = getDistanceFromPoint(myLat,myLng,markers[i].position.hb,markers[i].position.ib);
		if(curr < closest) {
			closest = curr;
			stationName = markers[i].title;
		} 
	}
	allInfo.closest = closest;
	allInfo.stationName = stationName;
	return allInfo; 
}

function renderRedLine()
{
	var image = { 
		url: 'MBTA-Logo.png', 
		size: new google.maps.Size(71, 71),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(17,34),
		scaledSize: new google.maps.Size(25, 25)
		};
		
	alewife = new google.maps.LatLng(42.395428, -71.142483); 
	redStations.push(alewife); 
	markers.push(new google.maps.Marker ({position: alewife, title: "Alewife Station",
	keyNorth: "RALEN", keySouth: "", icon: image})); 

	davis = new google.maps.LatLng(42.39674, -71.121815);
	redStations.push(davis);
	markers.push(new google.maps.Marker({position: davis, title: "Davis Station", 
	keyNorth: "RDAVN", keySouth: "RDAVS", icon: image})); 
	
	porter = new google.maps.LatLng(42.3882,-71.119149); 
	redStations.push(porter); 
	markers.push(new google.maps.Marker({position: porter, title: "Porter Station", 
	keyNorth: "RPORN", keySouth: "RPORS", icon: image}));

	harvard = new google.maps.LatLng(42.373362, -71.118956);
	redStations.push(harvard); 
	markers.push(new google.maps.Marker ({position: harvard, title: "Harvard Station", 
	keyNorth: "RHARN", keySouth: "RHARS", icon: image}));

	central = new google.maps.LatLng(42.365486, -71.10382); 
	redStations.push(central); 
	markers.push(new google.maps.Marker ({position: central, title: "Central Station",
	keyNorth: "RCENN", keySouth: "RCENS", icon: image}));
	
	kendall = new google.maps.LatLng(42.365486, -71.10382);
	redStations.push(kendall);
	markers.push(new google.maps.Marker ({position: kendall,title: "Kendall Station",
	keyNorth: "RKENN", keySouth: "RKENS", icon: image}));

	mgh = new google.maps.LatLng(42.361166, -71.070628);
	redStations.push(mgh); 
	markers.push(new google.maps.Marker ({position: mgh,title: "Charles/MGH Station",
	keyNorth: "RMGHN", keySouth: "RMGHS", icon: image}));

	park = new google.maps.LatLng(42.35639457, -71.0624242);
	redStations.push(park);
	markers.push(new google.maps.Marker ({position: park,title: "Park St. Station", 
	keyNorth: "RPRKN", keySouth: "RPRKS", icon: image}));

	downtown = new google.maps.LatLng(42.355518, -71.060225);
	redStations.push(downtown);
	markers.push(new google.maps.Marker ({position: downtown,title: "Downtown Crossing Station",
	keyNorth: "RDTCN", keySouth: "RDTCS", icon: image
		}));

	south = new google.maps.LatLng(42.352271, -71.055242);
	redStations.push(south); 
	markers.push(new google.maps.Marker ({position: south,title: "South Station", 
	keyNorth: "RSOUN", keySouth: "RSOUS", icon: image}));

	broadway = new google.maps.LatLng(42.342622,-71.056967);
	redStations.push(broadway); 
	markers.push(new google.maps.Marker ( {position: broadway,title: "Broadway Station", 
	keyNorth: "RBRON", keySouth: "RBROS", icon: image}));

	andrew = new google.maps.LatLng(42.330154,-71.057655);
	redStations.push(andrew); 
	markers.push(new google.maps.Marker ({position: andrew,title: "Andrew Station",
	keyNorth: "RANDN", keySouth: "RANDS", icon: image}));

	jfk = new google.maps.LatLng(42.320685, -71.052391);
	redStations.push(jfk); 
	redAshmont.push(jfk);
	redBraintree.push(jfk); 
	markers.push(new google.maps.Marker ({position: jfk,title: "JFK Station", 
	keyNorth: "RJFKN", keySouth: "RJFKS", icon: image}));
	
	savin = new google.maps.LatLng(42.31129, -71.053331);
	redAshmont.push(savin); 
	markers.push(new google.maps.Marker ({position: savin,title: "Savin Hill Station", 
	keyNorth: "RSAVN" , keySouth: "RSAVS", icon: image}));

	fields = new google.maps.LatLng(42.300093, -71.061667);
	redAshmont.push(fields); 
	markers.push(new google.maps.Marker ({position: fields,title: "Fields Corner Station", 
	keyNorth: "RFIEN", keySouth: "RFIES", icon: image}));

	shawmut = new google.maps.LatLng(42.2931258, -71.065738);
	redAshmont.push(shawmut); 
	markers.push(new google.maps.Marker ({position: shawmut,title: "Shawmut Station",
	keyNorth: "RSHAN", keySouth: "RSHAS", icon: image}));

	ashmont = new google.maps.LatLng(42.284652, -71.064489); 
	redAshmont.push(ashmont); 
	markers.push(new google.maps.Marker ({position: ashmont,title: "Ashmont Station", 
	keyNorth: "", keySouth: "RASHS", icon: image}));

	nquincy = new google.maps.LatLng(42.275275, -71.029583);
	redBraintree.push(nquincy); 
	markers.push(new google.maps.Marker ({position: nquincy,title: "North Quincy Station",
	keyNorth: "RNQUN", keySouth: "RNQUS", icon: image}));

	wollaston = new google.maps.LatLng(42.2665139, -71.02033); 
	redBraintree.push(wollaston); 
	markers.push(new google.maps.Marker ({position: wollaston,title: "Wollaston Station",
	keyNorth: "RWOLN", keySouth: "RWOLS", icon: image}));

	quincenter = new google.maps.LatLng(42.251809, -71.005409);
	redBraintree.push(quincenter); 
	markers.push(new google.maps.Marker ({position: quincenter,title: "Quincy Center Station",
	keyNorth: "RQUCN", keySouth: "RQUCS", icon: image}));

	quinadams = new google.maps.LatLng(42.233391, -71.007153);
	redBraintree.push(quinadams); 
	markers.push(new google.maps.Marker ({position: quinadams,title: "Quincy Adams Station",
	keyNorth: "RQUAN", keySouth: "RQUAS", icon: image}));

	braintree = new google.maps.LatLng(42.2078543, -71.001139); 
	redBraintree.push(braintree); 
	markers.push(new google.maps.Marker ({position: braintree,title: "Braintree Station",
	keyNorth: "", keySouth: "RBRAS", icon: image }));

//polyline	
redLine = new google.maps.Polyline({
	path: redStations,
	strokeColor: "red",
	strokeOpacity: 1.0,
	strokeWeight: 10
	});
	
	redLine.setMap(map); 
redAshmontBranch = new google.maps.Polyline({
	path: redAshmont,
	strokeColor: "red",
	strokeOpacity: 1.0,
	strokeWeight: 10,
	});
	redAshmontBranch.setMap(map);
redBraintreeBranch = new google.maps.Polyline({
	path: redBraintree,
	strokeColor: "red",
	strokeOpacity: 1.0,
	strokeWeight: 10,
	});
	redBraintreeBranch.setMap(map); 
 
//markers 	
for (var m in markers) {
//	console.log(markers[m]); 
//	console.log(markers[m].title); 
	markers[m].setMap(map);
	google.maps.event.addListener(markers[m], 'click', function() {
		//	console.log(this.title); 
			object = this;
			mapContent = this.title;
			mapContent += '<table id ="schedule"><tr><th>Direction</th><th>Arrival Time</th></tr>';
		//	var content = this.title; 
		//	console.log(this.title); 
			//object = this;
			function useData(stops) {
//				console.log(object.keyNorth); 
				for(i=0;i<stops.length;i++) {
					if(object.keyNorth == stops[i].PlatformKey) {
						mapContent += '<tr><td>"NORTHBOUND"' + '</td><td>' + stops[i].Time + '</td></tr>';
					}
					if(object.keySouth == stops[i].PlatformKey) {
						mapContent += '<tr><td>"SOUTHBOUND"' + '</td><td>' + stops[i].Time + '</td></tr>';
					}
				}
				infowindow.setContent(mapContent);
				infowindow.open(map, object); 
			}
			request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
			request.send(null);
			request.onreadystatechange = function() {
				 	if(this.readyState == 4 && this.status == 200) {
					str = this.responseText; 
					stops = JSON.parse(str);
					useData(stops);
//					console.log(markers[m].title); 
//					makeData(stops, markers[m]);
					}
			}			
/*			infowindow.setContent("<p>Test</p>");
			console.log("endcontent"); 
			console.log(mapContent); 
			infowindow.open(map, object);*/ 
			}); 
		}

}


function makeData(stops, m)
{
	console.log(stops); 
	tab = document.createElement('table'); 
	tab.setAttribute('id', 'newtable'); 
	tableBody = document.createElement('tbody'); 
	for(i=0;i<stops.length;i++){
		if(stops[i].Line == "Red") { 
		console.log(stops[i].PlatformKey); 
		console.log(m.title); 
			if(stops[i].PlatformKey == m.keyNorth){
				row = document.createElement('tr'); 
				cell = document.createElement('td'); 
				content = document.createTextNode(stops[i].TimeRemaining); 
				cell.appendChild(content); 
				row.appendChild(cell);
				dir = document.createElement('td');
				content2 = document.createTextNode("NORTHBOUND"); 
				dir.appendChild(content2);
				cell.appendChild(content);
				tableBody.appendChild(cell); 
/*			console.log(m.title); 
			console.log(stops[i].PlatformKey); 
			console.log("Direction is NORTH");
			console.log(stops[i].TimeRemaining);*/
			}
			if(stops[i].PlatformKey == m.keySouth){
				row = document.createElement('tr'); 
				cell = document.createElement('td'); 
				content = document.createTextNode(stops[i].TimeRemaining); 
				cell.appendChild(content); 
				row.appendChild(cell);
				dir = document.createElement('td');
				content2 = document.createTextNode("SOUTHBOUND"); 
				dir.appendChild(content2);
				cell.appendChild(content);
				tableBody.appendChild(cell); 
/*				console.log(m.title); 
				console.log(stops[i].PlatformKey); 
				console.log("Direction is SOUTH");
				console.log(stops[i].TimeRemaining); */
			}
		//m will have the name
		//keyOf, passed m.title
		//if the key of m.title == to stops[i].plaformkey
		//add the time
		//add the direction 
			
 		}
 	//}
	}
}








