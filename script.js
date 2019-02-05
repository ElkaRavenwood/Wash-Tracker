// const BUILDINGS = ***** Pull all buildings from database // requires building id and name
// or can leave as is
const BUILDINGS = [["leo", "Leonard Hall", "leonardImg"], ["ban", "Ban Righ Hall", "banImg"], ["gor", "Gordon Brockington House", "gordImg"], ["leg", "Leggett Hall", "leggettImg"]];

for (let i = 0; i < BUILDINGS.length; i ++) {
	
	let div = document.createElement("div");
	div.classList.add("building");
	div.id = BUILDINGS[i][0];
	div.innerHTML = "<h1>" + BUILDINGS[i][1] +"</h1>";

	document.querySelector("section").append(div);
}


let buildings = document.querySelectorAll(".building");

for (let i = 0; i < buildings.length; i ++) {
	buildings[i].addEventListener('click', function () {

		// let data = *****Pull from database here
		// use BUILDINGS[i][0] for id
		let data = [["W1", true],["W2", true],["W3", false],["L1", true],["L2", false],["L3", true]];
		
		let name = document.querySelector("#buildingName");
		name.innerHTML = BUILDINGS[i][1];

		let image = document.querySelector(".content img");
		image.src = BUILDINGS[i][3];

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
		
		let sects = document.querySelectorAll("section");
		sects[0].classList.add("inactive");
		sects[1].classList.remove("inactive");

	});
}
