let modInfo = {
	name: "The Galactic Tree",
	id: "galactictree11",
	author: "C00LB0R1S",
	pointsName: "Money",
	modFiles: ["tree.js", "rocketfuel.js", "rockets.js", "achievements.js"],

	discordName: "COMING SOON",
	discordLink: "www.discord.com/comingsoon",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.3",
	name: "Early Alpha Release",
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}



// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	if (hasUpgrade('r', 11)) gain = gain.add(1)
	if (hasUpgrade('r', 12)) gain = gain.times(2)
	if (hasUpgrade('r', 13)) gain = gain.times(upgradeEffect('r', 13))
	if (hasUpgrade('r', 21)) gain = gain.times(2)
	if (hasUpgrade('r', 24)) gain = gain.pow(1.05)
	return gain

}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"SPACE SIMULATOR 3000"
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e100"))
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

let changelog = `<h1 style="color:Aquamarine;">UPDATES</h1><br>
	<br>
	<h2 style="color:Violet;">v0.0.4</h2><br>
		- Balanced Rocket  Fuel<br>
		- NEW LAYERS ARE SO HARD TO MAKE!!!<br>
		<br>
	<h2 style="color:Violet;">v0.0.3</h2><br>
		- Removed Rockets (will be back next update)<br>
		- Added Money<br>
		- Added 6 Rocket Upgrades<br>
		- 1 New Theme<br>
		<br>
	<h2 style="color:Violet;">v0.0.2</h2><br>
		- Added Rockets<br>
		- Added 4 Rocket Upgrades<br>
		<br>
	<h2 style="color:Violet;">v0.0.1</h2><br>
		- Added Rocket Fuel
		- basically nothing<br>`

let winText = `Congratulations! You have beaten The Galactic Tree!`