// ***** @ Seanna So I'm actually not sure how this will reflect in the database, as in, do we get a new table with building codes and their information (building name and map)
// I think that if we have the separate table, we won't need the 'location' in the table for the ESPs, because that would be defined in the id
// Rooms should be a number value
// I'll assume it pulls as a map *****
// const BUILDINGS = pullAllDB ("type", "Building");
const BUILDINGS = [{id: 'ade', name: "Adelaide Hall", img: "img", rooms: null}, {id: "ban", name: "Ban Righ Hall", img:"img", rooms: null}, {id: "bra", name: "Brant House", img: "img", rooms: null}, {id: "vic", name: "Victoria Hall", img: "img", rooms: ["A Wing", "B Wing"]}];


for (let i = 0; i < BUILDINGS.length; i ++) {
	
	let div = document.createElement("div");
	div.classList.add("building");
	div.id = BUILDINGS[i].id;
	div.innerHTML = "<h1>" + BUILDINGS[i].name +"</h1>";

	document.querySelector("section").append(div);
}


let buildings = document.querySelectorAll(".building");

for (let i = 0; i < buildings.length; i ++) {
	buildings[i].addEventListener('click', function () {
		let sects = document.querySelectorAll("section");
		// For buildings that have multiple laundry rooms (Vic, JDUC, Jean Royce)
		if (BUILDINGS[i].id === 'vic' || buildings[i].id === 'jdu' || BUILDINGS[i].id === 'jea') {
			let rooms = BUILDINGS[i].rooms;
			
			for (let j = 0; j < rooms.length; j ++) {
				let div = document.createElement("div");
				div.classList.add("building");
				div.id = rooms[j];
				div.innerHTML = "<h1>" + rooms[j] + "<h1>";

				div.addEventListener('click', function () {
					// ***** Pull from database here
					// let data = pullAllDB("rooms", rooms[j]);
					let data = [["W1", true],["W2", true],["W3", false],["L1", true],["L2", false],["L3", true]];
					fillDiv(i, data);
					sects[1].classList.add("inactive");
					sects[2].classList.remove("inactive");
				});

				sects[1].append(div);

			}

			sects[0].classList.add("inactive");
			sects[1].classList.remove("inactive");
			
		} else {
			// ***** Pull from database here
			// let data = pullAllDB ("id",buildings[i].id); // Gets all washers for that building
			let data = [["W1", true],["W2", true],["W3", false],["L1", true],["L2", false],["L3", true]];
			
			fillDiv(i, data);

			
			sects[0].classList.add("inactive");
			sects[2].classList.remove("inactive");
		}

	});
}

// Fills div with information
function fillDiv (i, data) {
			
	let name = document.querySelector("#buildingName");
	name.innerHTML = BUILDINGS[i].name;

	let image = document.querySelector(".content img");
	image.src = BUILDINGS[i].img;

	let container = document.querySelector(".washers");

	for (let i = 0; i < data.length; i ++) {

		let div = document.createElement("div");
		let state = 't';
		if (data[i][1] === false) {
			state = 'f';
		}
		div.classList.add(state);
		div.innerHTML = "<h2>" + data[i][0] + "</h2>";
		container.append(div);

	}	
}


// Pulls one item from database
function pullDB (field, item) {
	$.ajax({
		type: "POST",
		url: "getWasherInfo.php",
		data: {id: "id"},
		crossDomain: true,
		cache: false,
		success: function(data){
			var data = json.decode(data);
			console.log(data);
		}
	});
}


// Pulls all of field with this value
function pullAllDB (field, value) {
	$.ajax({
		type: "POST",
		url: "getWasherInfo.php",
		data: {id: "id"},
		crossDomain: true,
		cache: false,
		success: function(data){
			var data = json.decode(data);
			console.log(data);
		}
	});
}
