addLayer("p", {
    name: "superpositions", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "superpositions", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 14)) mult = mult.times(upgradeEffect('p', 14))
        if (hasUpgrade('p',22)) mult = mult.times(upgradeEffect('p', 22))
        if (hasMilestone('e', 0)) mult = mult.pow(1.05)
        if (hasUpgrade('p', 21)) mult = mult.pow(1.1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for superpositions", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Increase point gain by 2",
            description: "how cool!",
            cost: new Decimal(1),
        },
        12: {
            title: "Increase point gain based on points",
            description: "complex...",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.3)
            },
            effectDisplay() { return format (upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "Increase point gain based on SP",
            description: "Interesting...",
            cost: new Decimal(20),
            effect () {
                return player[this.layer].points.add(1).pow(0.35)
            },
            effectDisplay() { return format (upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "Increase SP gain based on points",
            description: "",
            cost: new Decimal(50),
            effect () {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return format (upgradeEffect(this.layer, this.id))+"x" },
        },
        21: {
            title: "Raise SP mult to the power ^1.1",
            description: "",
            cost: new Decimal(1000),
        },
        22: {
            title: "Multiply SP gain based on SP",
            description: "",
            cost: new Decimal(2500),
            effect () {
                return player.p.points.add(1).pow(0.05)
            },
            effectDisplay() { return format (upgradeEffect(this.layer, this.id))+"x"},
        },
    },
})
addLayer("e", {
    name: "entanglement", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#561FBD",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "entanglement", // Name of prestige currency
    baseResource: "superpositions", // Name of resource prestige is based on
    baseAmount() {return player["p"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('e', 12)) mult = mult.times(upgradeEffect('e', 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for entanglement", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Multiply point gain based on points",
            description: "huh",
            cost: new Decimal(1),
            effect () {
                return player.points.add(1).pow(0.3)
            },
            effectDisplay() { return format (upgradeEffect(this.layer, this.id))+"x" }
        },
        12: {
            title: "Multiply Entanglement gain based on SP",
            description: "^0.1",
            cost: new Decimal(250),
            effect () {
                return player.p.points.add(1).pow(0.07)
            },
            effectDisplay() { return format (upgradeEffect(this.layer, this.id))+"x"}
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 Entanglement",
            effectDescription: "Raise SP mult ^1.05",
            done() { return player.e.points.gte(1) }
        },
        1: {
            requirementDescription: "10 Entanglement",
            effectDescription: "Unlock a Challenge",
            done() { return player.e.points.gte(10) },
        },
        2: {
            requirementDescription: "50 Entanglement",
            effectDescription: "Unlock a second Challenge",
            done() { return player.e.points.gte(50)},
        },
    },
    challenges: {
        11: {
            name: "slowdown",
            challengeDescription: "Point gain is raised to the power ^0.55",
            goalDescription: "reach 1,000 points",
            rewardDescription() {return format ("Point gain is boosted based on entanglements. Currently: x"+(player.e.points.add(1).times(100).pow(0.25)))},
            unlocked: function() {return hasMilestone('e', 1)},
            canComplete: function() {return player.points.gte("1e3")},
        },
        12: {
            name: "softcapped",
            challengeDescription: "Point gain is divided by current points",
            goalDescription() {return format (challengeCompletions('e', 12).add(1).times(500))},
            rewardDescription() {return format ("Increase Base gain based on Entanglement. Currently: +"+(player.e.points.pow(0.3).times(challengeCompletions('e', 12))))},
            completionLimit: 3,
            unlocked: function() {return hasMilestone('e', 2)},
            canComplete: function() {return player.points.gte(challengeCompletions('e', 12).add(1).times(500))},
        },
    },
})