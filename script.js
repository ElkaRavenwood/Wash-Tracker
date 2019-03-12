// ***** @ Seanna So I'm actually not sure how this will reflect in the database, as in, do we get a new table with building codes and their information (building name and map)
// I think that if we have the separate table, we won't need the 'location' in the table for the ESPs, because that would be defined in the id
// Rooms should be a number value
// I'll assume it pulls as a map *****
// const BUILDINGS = pullAllDB ("type", "Building");
const BUILDINGS = [
	{ id: "ade", name: "Adelaide Hall", img: "Images/ade", rooms: null },
	{ id: "ban", name: "Ban Righ Hall", img: "Images/ban", rooms: null },
	{ id: "bra", name: "Brant House", img: "Images/bra", rooms: null },
	{ id: "cho", name: "Chown Hall", img: "Images/cho", rooms: null },
	{ id: "dav", name: "David C. Smith House", img: "Images/dav", rooms: null },
	{
		id: "gor",
		name: "Gordon-Brockington House",
		img: "Images/gor",
		rooms: null
	},
	{
		id: "gra",
		name: "Graduate Residence (JDUC)",
		img: null,
		rooms: [
			{ id: "g1", name: "Floor 1", img: "Images/g1" },
			{ id: "g2", name: "Floor 2", img: "Images/g2" }
		]
	},
	{ id: "har", name: "Harkness Hall", img: "Images/har", rooms: null },
	{
		id: "jea",
		name: "Jean Royce Hall",
		img: null,
		rooms: [
			{ id: "j1", name: "House 1", img: "Images/j1" },
			{ id: "j2", name: "House 2", img: "Images/j2" },
			{ id: "j3", name: "House 3", img: "Images/j3" },
			{ id: "j4", name: "House 4", img: "Images/j4" },
			{ id: "j5", name: "House 5", img: "Images/j4" },
			{ id: "j6", name: "House 6", img: "Images/j4" }
		]
	},
	{ id: "leg", name: "Leggett Hall", img: "Images/leg", rooms: null },
	{ id: "leo", name: "Leonard Hall", img: "Images/leo", rooms: null },
	{ id: "mcn", name: "McNeill House", img: "Images/mcn", rooms: null },
	{ id: "mor", name: "Morris Hall", img: "Images/mor", rooms: null },
	{
		id: "vic",
		name: "Victoria Hall",
		img: null,
		rooms: [
			{ id: "v1", name: "A Wing", img: "Images/v1" },
			{ id: "v2", name: "B Wing", img: "Images/v2" },
			{ id: "v3", name: "C Wing", img: "Images/v3" },
			{ id: "v4", name: "D Wing", img: "Images/v4" }
		]
	},
	{ id: "wal", name: "Waldron Tower", img: "Images/wal", rooms: null }
];

var currentRoom, data;

let reloadButton = document.getElementById("reloadButton");
reloadButton.addEventListener("click", function() {
	let sects = document.querySelectorAll("section");
	if (sects[1].classList.contains("used")) {
		// data = pullAllDB("rooms", rooms[currentRoom]);
		data = [["W1", true]];
	} else {
		// data = pullAllDB("id", BUILDINGS[currentRoom].id);
		data = [["W2", true]];
	}

	fillDiv(currentRoom, data, null);
});

let backButton = document.getElementById("backButton");

// Back button, and its effects
backButton.addEventListener("click", function() {
	let sects = document.querySelectorAll("section");
	// If washers are displayed
	if (!sects[2].classList.contains("inactive")) {
		sects[2].classList.add("inactive");
		//If the building had multiple laundry rooms
		if (sects[1].classList.contains("used")) {
			sects[1].classList.remove("inactive");
			// Otherwise
		} else {
			sects[0].classList.remove("inactive");
			sects[1].classList.remove("used");
			document.querySelector("header").style = "justify-content:center";
			backButton.classList.add("inactive");
			reloadButton.classList.add("inactive");
		}
		// If room are displayed
	} else if (!sects[1].classList.contains("inactive")) {
		sects[1].classList.add("inactive");
		sects[1].classList.remove("used");
		sects[0].classList.remove("inactive");
		backButton.classList.add("inactive");
		document.querySelector("header").style = "justify-content:center";
		reloadButton.classList.add("inactive");
	}
});

// Makes building DOM elements
for (let i = 0; i < BUILDINGS.length; i++) {
	let div = document.createElement("div");
	div.classList.add("building");
	div.id = BUILDINGS[i].id;
	div.innerHTML = "<h1>" + BUILDINGS[i].name + "</h1>";

	document.querySelector("section").append(div);
}

let buildings = document.querySelectorAll(".building");

// Adds listeners to each building - will then display either rooms then washers, or washers directly
for (let i = 0; i < buildings.length; i++) {
	let sects = document.querySelectorAll("section");
	buildings[i].addEventListener("click", function() {
		document.querySelector("header").style =
			"justify-content:space-between";

		//shows back button
		backButton.classList.remove("inactive");
		reloadButton.classList.remove("inactive");
		// For buildings that have multiple laundry rooms (Vic, JDUC, Jean Royce)
		if (
			BUILDINGS[i].id === "vic" ||
			buildings[i].id === "gra" ||
			BUILDINGS[i].id === "jea"
		) {
			let rooms = BUILDINGS[i].rooms;
			sects[1].classList.add("used"); //Marks as used
			sects[1].innerHTML = ""; // Empties section

			for (let j = 0; j < rooms.length; j++) {
				let div = document.createElement("div");
				div.classList.add("building");
				div.id = rooms[j];
				div.innerHTML = "<h1>" + rooms[j].name + "<h1>";

				div.addEventListener("click", function() {
					currentRoom = j;

					// ***** Pull from database here
					// data = pullAllDB("rooms", rooms[j]);
					data = [
						["W1", true],
						["W2", true],
						["W3", false],
						["L1", true],
						["L2", false],
						["L3", true]
					];
					fillDiv(i, data, rooms[j].img);
					sects[1].classList.add("inactive");
					sects[2].classList.remove("inactive");
				});

				sects[1].append(div);
			}

			sects[0].classList.add("inactive");
			sects[1].classList.remove("inactive");
		} else {
			currentRoom = i;
			// ***** Pull from database here
			// data = pullAllDB ("id",buildings[i].id); // Gets all washers for that building
			data = [
				["W1", true],
				["W2", true],
				["W3", false],
				["L1", true],
				["L2", false],
				["L3", true]
			];

			fillDiv(i, data, null);

			sects[0].classList.add("inactive");
			sects[2].classList.remove("inactive");
		}
	});
}

// Fills div with information
function fillDiv(i, data, img) {
	let name = document.querySelector("#buildingName");
	name.innerHTML = BUILDINGS[i].name;

	let image = document.querySelector(".content img");
	if (img === null) {
		image.src = BUILDINGS[i].img;
	} else {
		image.src = img;
	}

	let container = document.querySelector(".washers");
	container.innerHTML = ""; // Empties Section

	for (let i = 0; i < data.length; i++) {
		let div = document.createElement("div");
		let state = "t";
		if (data[i][1] === false) {
			state = "f";
		}
		div.classList.add(state);
		div.innerHTML = "<h2>" + data[i][0] + "</h2>";
		container.append(div);
	}
}

// Pulls one item from database
function pullDB(field, item) {
	$.ajax({
		type: "POST",
		url: "getWasherInfo.php",
		data: { id: "id" },
		crossDomain: true,
		cache: false,
		success: function(data) {
			var data = json.decode(data);
			console.log(data);
		}
	});
}

// Pulls all of field with this value
function pullAllDB(field, value) {
	$.ajax({
		type: "POST",
		url: "getWasherInfo.php",
		data: { id: "id" },
		crossDomain: true,
		cache: false,
		success: function(data) {
			var data = json.decode(data);
			console.log(data);
		}
	});
}
