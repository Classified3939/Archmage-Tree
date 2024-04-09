addLayer("U", {
    name: "upgrades", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#157307",
    tooltip() {
        if(inChallenge('SR', 31)) return coolDynamicFormat(player.SR.tax, 2) + " Tax";
        else return coolDynamicFormat(player.points, 2) + " $"
    },
    deactivated() {
        return inChallenge('SR', 22)
    },
    resource: "$",
    type: "none",
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "buyables",
                "upgrades",
            ],
        },
        "The Machine": {
            content: [
                "main-display",
                ["display-text", function() {
                    if(hasUpgrade('U', 34) || hasUpgrade('R', 21)) return "The Machine can provide boosts to both $ and RP, but be aware that you can't change your selection once you make it.<br>Bonus is reset on Rebirth."; else return "The Machine is currently disabled because you don't have $ upgrade 12"
                }],
                "clickables",
                ["display-text", function() {
                    if(hasAchievement('A', 33)) return "Your bonuses to The Machine are multiplying $ and RP gain by " + coolDynamicFormat(machineBonuses(), 2)
                }],
            ],
            unlocked() {
                return hasAchievement('A', 31)
            }
        }
    },
    upgrades: {
        11: {
            title: "Economic Inflation",
            description()  {
                if(!hasMilestone('P', 8)) return "Start generating 1$ every second"
                if(hasMilestone('P', 8)) return "Start generating 100$ every second"
            },
            cost: new Decimal(0),
            currencyDisplayName: "$",
            currencyInternalName: "points",
        },
        12: {
            title: "Money Printer",
            description()  {
                if(!hasMilestone('P', 8)) return "Quadruple $ gain"
                if(hasMilestone('P', 8)) return "Quintuple $ gain"
            },
            cost: new Decimal(10),
            currencyDisplayName: "$",
            currencyInternalName: "points",
        },
        13: {
            title: "Superinflation",
            description: "Multiply $ gain based on $",
            tooltip()  {
                if(!hasMilestone('P', 8)) return "log5($ + 5)"
                if(hasMilestone('P', 8)) return "log4.5($ + 4.5)"
            },
            cost: new Decimal(50),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            effectDisplay() {
                if(!hasMilestone('P', 8)) {
                    if (hasUpgrade('U', 23) === false) return 'x' + coolDynamicFormat(player.points.add(5).log(5), 2)
                    if (hasUpgrade('U', 23) === true) return 'x' + coolDynamicFormat(player.points.add(3).log(3), 2)
                }
                if(hasMilestone('P', 8)) {
                    if (hasUpgrade('U', 23) === false) return 'x' + coolDynamicFormat(player.points.add(4.5).log(4.5), 2)
                    if (hasUpgrade('U', 23) === true) return 'x' + coolDynamicFormat(player.points.add(2.5).log(2.5), 2)
                }
            },
        },
        14: {
            title: "Another Money Printer",
            description()  {
                if(!hasMilestone('P', 8)) return "Double $ gain"
                if(hasMilestone('P', 8)) return "Triple $ gain"
            },
            cost: new Decimal(200),
            currencyDisplayName: "$",
            currencyInternalName: "points",
        },
        21: {
            title: "Hyperinflation",
            description()  {
                if(!hasMilestone('P', 8)) return "Raise $ gain by ^1.25"
                if(hasMilestone('P', 8)) return "Raise $ gain by ^1.3"
            },
            cost: new Decimal(500),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            tooltip: "All exponents are applied after all multipliers in the same layer",
        },
        22: {
            title: "Ultrainflation",
            description: "Multiply $ gain based on $ again",
            tooltip()  {
                if(!hasMilestone('P', 8)) return "sqrt(log8($^1.5 + 8))"
                if(hasMilestone('P', 8)) return "sqrt(log7($^1.55 + 7))"
            },
            cost: new Decimal(2000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            effectDisplay() {
                if(!hasMilestone('P', 8)) return 'x' + coolDynamicFormat(player.points.pow(1.5).add(8).log(8).pow(0.5), 2)
                if(hasMilestone('P', 8)) return 'x' + coolDynamicFormat(player.points.pow(1.55).add(7).log(7).pow(0.5), 2)
            },
        },
        23: {
            title: "Super-Superinflation",
            description: "Improve the above upgrades effect",
            tooltip()  {
                if(!hasMilestone('P', 8)) return "log5 -> log3"
                if(hasMilestone('P', 8)) return "log4.5 -> log2.5"
            },
            cost: new Decimal(15000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
        },
        24: {
            title: "Yet Another Money Printer",
            description()  {
                if(!hasMilestone('P', 8)) return "Multiply $ gain by 1.5"
                if(hasMilestone('P', 8)) return "Double $ gain"
            },
            cost: new Decimal(30000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
        },
        31: {
            title: "Gigainflation",
            description: "Multiply $ gain based on $ yet again",
            tooltip()  {
                if(!hasMilestone('P', 8)) return "sqrt(log($ + 10))"
                if(hasMilestone('P', 8)) return "sqrt(log8($ + 8))"
            },
            cost: new Decimal(5000000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 13)
            },
            effectDisplay() {
                if(!hasMilestone('P', 8)) return 'x' + coolDynamicFormat(player.points.add(10).log(10).pow(0.5), 2)
                if(hasMilestone('P', 8)) return 'x' + coolDynamicFormat(player.points.add(8).log(8).pow(0.5), 2)
            },
        },
        32: {
            title: "Certainly a concept",
            description: "Reduce RP gain scaling",
            tooltip()  {
                if(!hasMilestone('P', 8)) return "^0.5 -> ^0.7"
                if(hasMilestone('P', 8)) return "^0.5 -> ^0.8"
            },
            cost: new Decimal(35000000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 13)
            },
        },
        33: {
            title: "Blessing from the gods",
            description: "Increase RP's effect",
            tooltip()  {
                if(!hasMilestone('P', 8)) return "^0.6 -> ^0.7"
                if(hasMilestone('P', 8)) return "^0.6 -> ^0.8"
            },
            cost: new Decimal(250000000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 13)
            },
        },
        34: {
            title: "THE MACHINE",
            description() {
                if(!hasMilestone('P', 8)) return "Unlock The Machine"
                if(hasMilestone('P', 8)) return "Unlock The Machine<br>Boosts to the machine are raised ^1.25"
            },
            cost: new Decimal("1e9"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 13)
            },
        },
        41: {
            title: "Payrise",
            description() {
                if(!hasMilestone('P', 8)) return "Multiply $ gain by 10"
                if(hasMilestone('P', 8)) return "Multiply $ gain by 1,000"
            },
            cost: new Decimal("1e13"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 24)
            },
        },
        42: {
            title: "Relativity",
            description: "Boost RP's effect again",
            tooltip()  {
                if(!hasMilestone('P', 8)) return "^0.7 -> ^0.8"
                if(hasMilestone('P', 8)) return "^0.8 -> ^1"
            },
            cost: new Decimal("5e14"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 24)
            },
        },
        43: {
            title: "Synergism",
            description: "RP and $ boost each other",
            tooltip()  {
                if(!hasMilestone('P', 8)) return "RP*log(log($ + 10) + 10)<br>$*log(RP + 10)"
                if(hasMilestone('P', 8)) return "RP*log8(log9($ + 9) + 8)<br>$*log8(RP + 8)"
            },
            cost: new Decimal("3e15"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 24)
            },
            effectDisplay() {
                if(!hasMilestone('P', 8)) return 'RP x' + coolDynamicFormat(player.points.add(10).log(10).add(10).log(10), 2)
                + '<br>$ x' + coolDynamicFormat(player.R.points.add(10).log(10), 2)
                if(hasMilestone('P', 8)) return 'RP x' + coolDynamicFormat(player.points.add(9).log(9).add(8).log(8), 2)
                + '<br>$ x' + coolDynamicFormat(player.R.points.add(8).log(8), 2)
            },
        },
        44: {
            title: "Reincarnativism",
            description: "Boost the second RP buyables effect slightly",
            cost: new Decimal("1e25"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            tooltip() {
                if(!hasMilestone('P', 8)) return "+0.05 to base"
                if(hasMilestone('P', 8)) return "+0.15 to base"
            },
            unlocked() {
                return hasUpgrade('R', 24)
            },
        },
        51: {
            title: "Tesla Coils",
            description: "Multiply $ gain by Power",
            cost: new Decimal("1e80"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasMilestone('P', 6)
            },
            effectDisplay() { return "x" + coolDynamicFormat(player.P.points, 2)}
        },
        52: {
            title: "Heavenly Batteries",
            description: "Multiply RP gain based on Power",
            cost: new Decimal("1e92"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            tooltip: "log3(Power + 3)",
            unlocked() {
                return hasMilestone('P', 6)
            },
            effectDisplay() { return "x" + coolDynamicFormat(player.P.points.add(3).log(3), 2)}
        },
        53: {
            title: "Maybe too much inflation",
            description: "Unlock another challenge<br>The challenge is permanently unlocked after buying this upgrade",
            cost: new Decimal("1e95"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasMilestone('P', 6)
            },
        },
        54: {
            title: "Powerup",
            description: "Double efficiency of the first three Power Pylons",
            cost: new Decimal("1e100"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasMilestone('P', 6)
            },
        },
    },
    layerShown(){return true},
    automate() {

    },
    clickables: {
        11: {
            title: "Money Mode",
            display() {
                if(!getClickableState(this.layer, this.id)) return "Quadruples $ gain<br>Doubles RP gain"; else return "Quadruples $ gain<br>Doubles RP gain<br>ACTIVE"
            },
            canClick() {
                if(hasUpgrade('R', 32)) return true;
                if(!hasUpgrade('R', 31)) {
                    if(!getClickableState(this.layer, 12) && !getClickableState(this.layer, 13)) return true; else return false
                }
                if(hasUpgrade('R', 31)) {
                    if(!getClickableState(this.layer, 12) || !getClickableState(this.layer, 13)) return true; else return false
                }
            },
            onClick() {
                setClickableState(this.layer, this.id, true)
            },
        },
        12: {
            title: "Neutral Mode",
            display() {
                if(!getClickableState(this.layer, this.id)) return "Triples $ gain<br>Triples RP gain"; else return "Triples $ gain<br>Triples RP gain<br>ACTIVE"
            },
            canClick() {
                if(hasUpgrade('R', 32)) return true;
                if(!hasUpgrade('R', 31)) {
                    if(!getClickableState(this.layer, 11) && !getClickableState(this.layer, 13)) return true; else return false
                }
                if(hasUpgrade('R', 31)) {
                    if(!getClickableState(this.layer, 11) || !getClickableState(this.layer, 13)) return true; else return false
                }
            },
            onClick() {
                setClickableState(this.layer, this.id, true)
            },
        },
        13: {
            title: "Rebirth Mode",
            display() {
                if(!getClickableState(this.layer, this.id)) return "Doubles $ gain<br>Quadruples RP gain"; else return "Doubles $ gain<br>Quadruples RP gain<br>ACTIVE"
            },
            canClick() {
                if(hasUpgrade('R', 32)) return true;
                if(!hasUpgrade('R', 31)) {
                    if(!getClickableState(this.layer, 11) && !getClickableState(this.layer, 12)) return true; else return false
                }
                if(hasUpgrade('R', 31)) {
                    if(!getClickableState(this.layer, 11) || !getClickableState(this.layer, 12)) return true; else return false
                }
            },
            onClick() {
                setClickableState(this.layer, this.id, true)
            },
        },
    },
    buyables: {
        11: {
            cost(x) {
                return new Decimal(1000000).times(new Decimal(10).pow(x))
            },
            title: "Pay to Win Afterlife",
            effect(x) {
                if(!hasMilestone('SR', 3)) return new Decimal(1.1).pow(x)
                if(hasMilestone('SR', 3)) return new Decimal(1.3).pow(x)
            },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() { return player.points.gte(this.cost()) },
            display() {
                return "Boost RP gain<br>Cost: " + coolDynamicFormat(this.cost(), 3)
                + "<br>Count: " + coolDynamicFormat(getBuyableAmount(this.layer, this.id), 0)
                + "<br>Effect: x" + coolDynamicFormat(this.effect(), 2)
            },
            tooltip: "Base effect: 1.1^x<br>Base cost: 1,000,000*(10^x)",
            unlocked() { return hasMilestone('SR', 2) }
        },
        12: {
            cost(x) {
                return new Decimal("1e450").times(new Decimal(100000).pow(x).pow(0.1).pow(x))
            },
            title: "Time Manipulator",
            effect(x) {
                return new Decimal(1.2).pow(x)
            },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() { return player.points.gte(this.cost()) },
            display() {
                return "Boost Power Pylon effect<br>Cost: " + coolDynamicFormat(this.cost(), 3)
                + "<br>Count: " + coolDynamicFormat(getBuyableAmount(this.layer, this.id), 0)
                + "<br>Effect: x" + coolDynamicFormat(this.effect(), 2)
            },
            tooltip: "Base effect: 1.2^x<br>Base cost: 1e450*((1e5^x)^0.1)^x",
            unlocked() { return hasMilestone('P', 10) }
        },
    },
    doReset(resetlayer) {
        if(resetlayer == 'R') {
            if(!hasMilestone('SR', 5)) player.U.upgrades = []
            if(!inChallenge('SR', 21)) {
                if(hasMilestone('SR', 0)) player.U.upgrades.push(11, 12, 13, 14, 21, 22, 23, 24)
                if(hasMilestone('SR', 1)) player.U.upgrades.push(31, 32, 33)
                if(hasUpgrade('R', 21)) player.U.upgrades.push(34)
                if(hasMilestone('SR', 5)) player.U.upgrades.push(34, 41, 42, 43, 44)
            }
            if(inChallenge('SR', 21)) player.U.upgrades = []
        };
        if(resetlayer == 'SR') {
            if(!hasMilestone('SR', 5)) player.U.upgrades = []
            if(!inChallenge('SR', 21)) {
                if(hasMilestone('SR', 0)) player.U.upgrades.push(11, 12, 13, 14, 21, 22, 23, 24)
                if(hasMilestone('SR', 1)) player.U.upgrades.push(31, 32, 33)
                if(!hasMilestone('SR', 3)) setBuyableAmount('U', 11, new Decimal(0))
                if(hasMilestone('SR', 5)) player.U.upgrades.push(34, 41, 42, 43, 44)
            }
            if(inChallenge('SR', 21)) player.U.upgrades = []
        };
        if(!hasUpgrade('R', 32)) {
            setClickableState('U', 11, false)
            setClickableState('U', 12, false)
            setClickableState('U', 13, false)
        };
        if(hasUpgrade('R', 32)) {
            setClickableState('U', 11, true)
            setClickableState('U', 12, true)
            setClickableState('U', 13, true)
        };
    },
    automate() {
        player.U.points = player.points
        if(!inChallenge('SR', 21)) {
            if(hasUpgrade('R', 12) || hasAchievement('A', 43)) {
                buyUpgrade('U', 11)
                buyUpgrade('U', 12)
                buyUpgrade('U', 13)
                buyUpgrade('U', 14)
                buyUpgrade('U', 21)
                buyUpgrade('U', 22)
                buyUpgrade('U', 23)
                buyUpgrade('U', 24)
            };
            if(hasAchievement('A', 31)) {
                buyUpgrade('U', 31)
            };
            if(hasAchievement('A', 33)) {
                buyUpgrade('U', 32)
                buyUpgrade('U', 33)
                buyUpgrade('U', 34)
            };
            if(layers.U.buyables[11].canAfford() && hasMilestone('SR', 7)) {
                player.U.points = player.U.points.sub(layers.U.buyables[11].cost())
                setBuyableAmount('U', 11, getBuyableAmount('U', 11).add(1))
            }
            if(layers.U.buyables[12].canAfford() && hasUpgrade('SR', 14)) {
                player.U.points = player.U.points.sub(layers.U.buyables[12].cost())
                setBuyableAmount('U', 12, getBuyableAmount('U', 12).add(1))
            }
        }
        
        if(!hasUpgrade('U', 34)) {
            setClickableState('U', 11, false)
            setClickableState('U', 12, false)
            setClickableState('U', 13, false)
        };
        if(hasUpgrade('R', 32)) {
            setClickableState('U', 11, true)
            setClickableState('U', 12, true)
            setClickableState('U', 13, true)
        };
    }
})

addLayer("A", {
    name: "achievements",
    symbol: "🏆",
    row: "side",
    type: "none",
    resource: "achievements",
    color: "#FFEE88",
    tooltip: "Achievements",
    startData() { return {
        unlocked: true,
    }},
    tabFormat: {
        "Achievements": {
            content: [
                "achievements"
            ]
        },
        "Secrets": {
            content: [
                ["layer-proxy", ["SA", [
                    ["display-text", "Secret Achievements only say what to do to get them after obtaining them<br>Most Secret Achievements will become impossible if too much progression is made before unlocking them<br>Each Secret Achievement will also eventually have its own exclusive visual theme (available in options) once I figure out how to do that<br>There will be a surprise for getting all of them once there are enough of them for it to be interesting"],
                    ["display-text", "<br>There is currently 1 Secret Achievement<br>Every Secret Achievement has a hint when hovering over them to make them possible to obtain without searching up the answers (you'll do it anyways)"],
                    "h-line",
                    "achievements"]]]
            ]
        }
    },
    achievements: {
        11: {
            name: "The Start",
            tooltip: "Start producing $",
            done() {
                if (hasUpgrade('U', 11)) return true
            },
        },
        12: {
            name: "100 antima- I mean cash is a lot",
            tooltip: "Get 100 $ <br>(no, that is not a typo)",
            done() {
                if (player.points.gte(100)) return true
            },
        },
        13: {
            name: "We couldn't afford 9",
            tooltip: "Get the 8th $ upgrade",
            done() {
                if (hasUpgrade('U', 24)) return true
            },
        },
        14: {
            name: "Millionaire",
            tooltip: "Get 1,000,000 $",
            done() {
                if (player.points.gte(1000000)) return true
            },
        },
        15: {
            name: "Very Rich Person",
            tooltip: "Get 5e11 $",
            done() {
                if (player.points.gte("5e11")) return true
            },
        },
        21: {
            name: "Reincarnated",
            tooltip: "Rebirth",
            done() {
                if (player.R.points.gte(1)) return true
            },
        },
        22: {
            name: "Wow, more upgrades...",
            tooltip: "Buy a Rebirth Upgrade",
            done() {
                if (hasUpgrade('R', 11)) return true
            },
        },
        23: {
            name: "We COULD afford 9",
            tooltip: "Get the 9th $ upgrade",
            done() {
                if (hasUpgrade('U', 31)) return true
            },
        },
        24: {
            name: "Life and Death",
            tooltip: "Get the 5th Rebirth upgrade",
            done() {
                if (hasUpgrade('R', 21)) return true
            },
        },
        25: {
            name: "Endless Cycle",
            tooltip: "Get 100,000 Rebirth Points",
            done() {
                if (player.R.points.gte(100000)) return true
            },
        },
        31: {
            name: "Mechanical Mechanic",
            tooltip: "Unlock The Machine<br>Reward: automate $ upgrade 9",
            done() {
                if (hasUpgrade('U', 34)) return true
            },
        },
        32: {
            name: "Secondary Choice",
            tooltip: "Unlock the ability to use two of The Machines modes at once",
            done() {
                if (achievement33()) return true
            },
        },
        33: {
            name: "No thoughts required",
            tooltip: "Use all of the Machine's modes at once<br>Reward: automate $ upgrades 10-12",
            done() {
                if (hasUpgrade('R', 32)) return true
            },
        },
        34: {
            name: "Now with technically infinite upgrades!",
            tooltip: "Purchase the first RP buyable",
            done() {
                if (getBuyableAmount('R', 11).gte(1)) return true
            },
        },
        35: {
            name: "Perfectly Balanced",
            tooltip: "Purchase the second RP buyable",
            done() {
                if (getBuyableAmount('R', 12).gte(1)) return true
            },
        },
        41: {
            name: "Wow, a content",
            tooltip: "Buy RP upgrade 8",
            done() {
                if (hasUpgrade('R', 24)) return true
            },
        },
        42: {
            name: "Super Duper Uber Rebirth",
            tooltip: "Reach 1e19 RP<br>Reward: retain all automation in future",
            done() {
                if (player.R.points.gte("1e19")) return true
            },
        },
        43: {
            name: "Can't wait for Hyper Rebirth",
            tooltip: "Perform a Super Rebirth reset",
            done() {
                if (player.SR.points.gte(1)) return true
            },
        },
        44: {
            name: "Monetary Incentive",
            tooltip: "Purchase the $ buyable",
            done() {
                if (getBuyableAmount('U', 11).gte(1)) return true
            },
        },
        45: {
            name: "The Ninth Milestone is a Lie",
            tooltip: "Get Super Rebirth Milestone 8",
            done() {
                if (hasMilestone('SR', 7)) return true
            },
        },
        51: {
            name: "Unchallenged",
            tooltip: "Complete a challenge",
            done() {
                if (hasChallenge('SR', 11)) return true
            },
        },
        52: {
            name: "Powerful",
            tooltip: "Unlock Power",
            done() {
                if (hasMilestone('SR', 8)) return true
            },
        },
        53: {
            name: "Megawatt",
            tooltip: "Reach 1,000,000 Power",
            done() {
                if (player.P.points.gte(1000000)) return true
            },
        },
        54: {
            name: "Googology",
            tooltip: "Reach e100 $",
            done() {
                if (player.points.gte("1e100")) return true
            },
        },
        55: {
            name: "The Seventh Pylon is a Lie",
            tooltip: "Buy a PPyF",
            done() {
                if (player.P.pylobF.gte(1)) return true
            },
        },
        61: {
            name: "Duo-Googology",
            tooltip: "Reach e200 $",
            done() {
                if (player.points.gte("1e200")) return true
            },
        },
        62: {
            name: "Afterlife Google",
            tooltip: "Reach e100 RP",
            done() {
                if (player.R.points.gte("1e100")) return true
            },
        },
        63: {
            name: "Power Hungry",
            tooltip: "Reach 1e50 Power",
            done() {
                if (player.P.points.gte("1e50")) return true
            },
        },
        64: {
            name: "Hyper Rebirthed",
            tooltip: "Reach 500 SRP",
            done() {
                if (player.SR.points.gte(500)) return true
            },
        },
        65: {
            name: "To Inifinity, and Beyond!",
            tooltip: "Reach Infinity",
            done() {
                if (player.points.gte(new Decimal(2).pow(1024))) return true
            },
        },
        71: {
            name: "Kilometrerock",
            tooltip: "Obtain all Power Milestones",
            done() {
                if (hasMilestone('P', 10)) return true
            },
        },
        72: {
            name: "Super Upgraded",
            tooltip: "Purchase four Super Rebirth layer upgrades",
            done() {
                if (hasUpgrade('SR', 14)) return true
            },
        },
        73: {
            name: "Beeg numba",
            tooltip: "Reach e1000 $",
            done() {
                if (player.points.gte("1e1000")) return true
            },
        },
        74: {
            name: "Infinite^0.3 Power",
            tooltip: "Reach e100 Power",
            done() {
                if (player.P.points.gte("1e100")) return true
            },
        },
        75: {
            name: "Just getting started (ENDGAME)",
            tooltip: "Purchase Omega",
            done() {
                if (hasUpgrade('SR', 21)) return true
            },
        },
    }
})

addLayer("R", {
    name: "rebirth",
    softcap: new Decimal("1e17"),
    softcapPower: new Decimal(0.25),
    symbol: "R",
    row: "1",
    type: "normal",
    baseResource: "$",
    resource: "Rebirth Points",
    baseAmount() { return player.points },
    onPrestige() {

    },
    requires() {
        let requirement = new Decimal(0)
        if(!inChallenge('SR', 11)) requirement = requirement.add(100000)
        if(inChallenge('SR', 11)) requirement = requirement.add("eeeeeeeee10")
        if(hasChallenge('SR', 12)) requirement = requirement.div(10)
        if(inChallenge('SR', 12)) requirement = requirement.times(10)
        return requirement
    },
    gainMult() {
        let remult = new Decimal(1)
        if (getClickableState('U', 11)) remult = remult.times(2)
        if (getClickableState('U', 12)) remult = remult.times(3)
        if (getClickableState('U', 13)) remult = remult.times(4)
        if (hasUpgrade('U', 43) && !hasMilestone('P', 8)) remult = remult.times(player.points.add(10).log(10).add(10).log(10))
        if (hasUpgrade('U', 43) && hasMilestone('P', 8)) remult = remult.times(player.points.add(9).log(9).add(8).log(8))
        remult = remult.times(layers.R.buyables[11].effect())
        if (hasUpgrade('R', 32)) remult = remult.times(1.3)
        remult = remult.times(layers.SR.effect()[0])
        remult = remult.times(layers.U.buyables[11].effect())
        remult = remult.times(layers.P.effect())
        if (hasUpgrade('U', 52)) remult = remult.times(player.P.points.add(3).log(3))
        return remult
    },
    exponent() {
        let power = new Decimal(0.5)
        if (hasUpgrade('U', 32)) power = power.add(0.2)
        if (hasMilestone('P', 8) && hasUpgrade('U', 32)) power = power.add(0.1)
        return power
    },
    gainExp() {
        let expo = new Decimal(1)
        if(hasUpgrade('SR', 11)) expo = expo.times(1.1)
        return expo
    },
    color: "#ba0022",
    branches: ['U'],
    effect() {
        let power = new Decimal(0.6)
        if (hasUpgrade('U', 33)) power = power.add(0.1)
        if (hasUpgrade('U', 42)) power = power.add(0.1)
        if (hasUpgrade('R', 33)) power = power.add(0.2)
        if (hasMilestone('P', 8) && hasUpgrade('U', 33)) power = power.add(0.1)
        if (hasMilestone('P', 8) && hasUpgrade('U', 42)) power = power.add(0.1)
        return player.R.points.pow(power).add(1)
    },
    layerShown() { return hasAchievement('A', 12) },
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    effectDescription() {
        return "multiplying $ gain by " + coolDynamicFormat(this.effect(), 2)
    },
    upgrades: {
        11: {
            title: "$$$$$",
            description: "Multiply $ gain by 5",
            cost: new Decimal(1),
        },
        12: {
            title: "Moneybots",
            description: "Automate $ upgrades 1-8",
            cost: new Decimal(3),
        },
        13: {
            title: "I need more!",
            description: "Unlock another row of $ upgrades",
            cost: new Decimal(15),
        },
        14: {
            title: "Underwhelming",
            description: "Double $ gain",
            cost: new Decimal(100),
        },
        21: {
            title: "Mechanical Reconstruction",
            description: "The Machine starts unlocked",
            cost: new Decimal(10000),
            unlocked() {
                return hasAchievement('A', 31)
            },
        },
        22: {
            title: "Repeated Costs",
            description: "Unlock a RP buyable",
            cost: new Decimal(50000),
            unlocked() {
                return hasAchievement('A', 31)
            },
        },
        23: {
            title: "Repeated Repeated Costs",
            description: "Unlock a second RP buyable",
            cost: new Decimal(1000000),
            unlocked() {
                return hasAchievement('A', 31)
            },
        },
        24: {
            title: "Upgrading Revival",
            description: "Unlock more upgrades (both RP and $)",
            cost: new Decimal("1e8"),
            unlocked() {
                return hasAchievement('A', 31)
            },
        },
        31: {
            title: "Doublatron 3000",
            description: "Allows use of two of The Machines modes at once",
            cost: new Decimal("1e16"),
            unlocked() {
                return hasUpgrade('R', 24)
            },
        },
        32: {
            title: "Machine automating Machine",
            description: "Automatically select all three modes of The Machine<br>The Machine also gets a buff",
            cost: new Decimal("1e18"),
            unlocked() {
                return hasUpgrade('R', 24)
            },
        },
        33: {
            title: "Rebirth Empowerment",
            description: "Boost RP effect, again",
            cost: new Decimal("1e23"),
            unlocked() {
                return hasMilestone('SR', 6)
            },
            tooltip: "^0.8 -> ^1",
        },
        34: {
            title: "Super Rebirth Empowerment",
            description: "Boost SRP's boost to Cash",
            cost: new Decimal("1e25"),
            unlocked() {
                return hasMilestone('SR', 6)
            },
            tooltip: "1.5x -> 1.5(x^2)",
        },
    },
    buyables: {
        11: {
            cost(x) {
                scalar = 2
                if(hasChallenge('SR', 21)) scalar = scalar - 0.5
                return new Decimal(20000).times(new Decimal(1.2).pow(new Decimal(x).pow(scalar)))
            },
            title: "Rebirth Booster",
            tooltip: "Base effect: 1.5^x<br>Base cost:20,000*(1.2^x^2)",
            display() {
                return "Multiply RP gain<br>Cost: " + coolDynamicFormat(this.cost(), 3)
                + "<br>Count: " + coolDynamicFormat(getBuyableAmount(this.layer, this.id), 0)
                + "<br>Effect: x" + coolDynamicFormat(this.effect(), 2)
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if(!hasMilestone('SR', 0)) player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasUpgrade('R', 22)
            },
            effect(x) {
                return new Decimal(1.5).add(layers.R.buyables[12].effect()).pow(x)
            },
        },
        12: {
            cost(x) {
                scalar = 2
                if(hasChallenge('SR', 21)) scalar = scalar - 0.25
                return new Decimal(1000000).times(new Decimal(3).pow(new Decimal(x).pow(scalar)))
            },
            title: "Rebirth Booster Booster",
            tooltip: "Base effect: +x/4<br>Base cost:1,000,000*(3^x^2)",
            display() {
                return "Boost the previous buyables power<br>Cost: " + coolDynamicFormat(this.cost(), 3)
                + "<br>Count: " + coolDynamicFormat(getBuyableAmount(this.layer, this.id), 0)
                + "<br>Effect: +" + coolDynamicFormat(this.effect(), 2)
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if(!hasMilestone('SR', 0)) player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasUpgrade('R', 23)
            },
            effect(x) {
                if (!hasUpgrade('U', 44)) return new Decimal(0.25).times(x)
                if (hasUpgrade('U', 44) && !hasMilestone('P', 8)) return new Decimal(0.3).times(x)
                if (hasUpgrade('U', 44) && hasMilestone('P', 8)) return new Decimal(0.4).times(x)
            },
        },
    },
    doReset(resetlayer) {
        if(resetlayer == 'SR') {
            player.R.points = new Decimal(0)
            if(!hasMilestone('SR', 5)) player.R.upgrades = []
            if(!inChallenge('SR', 21)) {
                if(hasMilestone('SR', 1)) player.R.upgrades.push(11, 12, 13, 14)
                if(hasMilestone('SR', 3)) player.R.upgrades.push(22, 23)
                if(!hasMilestone('SR', 3)) setBuyableAmount('R', 11, new Decimal(0))
                if(!hasMilestone('SR', 3)) setBuyableAmount('R', 12, new Decimal(0))
            }
            if(inChallenge('SR', 21)) player.R.upgrades = []
        }
    },
    passiveGeneration() {
        let passive = new Decimal(0)
        if(!inChallenge('SR', 21)) {
            if(hasChallenge('SR', 11)) passive = passive.add(0.2)
            if(hasChallenge('SR', 21)) passive = passive.times(10)
        }
        return passive
    },
    automate() {
        if(!inChallenge('SR', 21)) {
            if(layers.R.buyables[11].canAfford() && hasMilestone('SR', 7)) {
                if(!hasMilestone('SR', 0)) player.R.points = player.R.points.sub(layers.R.buyables[11].cost())
                setBuyableAmount('R', 11, getBuyableAmount('R', 11).add(1))
            }
            if(layers.R.buyables[12].canAfford() && hasMilestone('SR', 7)) {
                if(!hasMilestone('SR', 0)) player.R.points = player.R.points.sub(layers.R.buyables[12].cost())
                setBuyableAmount('R', 12, getBuyableAmount('R', 12).add(1))
            }
        }
    },
})

addLayer("SR", {
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        tax: new Decimal(1),
    }},
    row: "2",
    canBuyMax() {
        return hasMilestone(this.layer, 2)
    },
    color: "#eb1a3d",
    resource: "Super Rebirth Points",
    requires: new Decimal(1e19),
    type: "static",
    base: new Decimal(2),
    exponent: new Decimal(1),
    roundUpCost: true,
    baseResource: "RP",
    branches: ["R"],
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
                "milestones",
            ]
        },
        "Challenges": {
            content: [
                ["display-text", "Entering a challenge forces a Super Rebirth reset<br>Whilst inside of a challenge, various nerfs are applied to you<br>A challenge can be completed after reaching its goal, which will vary between the challenges<br>After completing a challenge, a powerful upgrade is applied for free"],
                "blank",
                "h-line",
                "blank",
                "challenges",
            ]
        },
    },
    baseAmount() { return player.R.points },
    layerShown() {
        return hasAchievement('A', 41)
    },
    effect() {
        let pow = 1
        if (hasUpgrade('R', 34)) pow = pow + 1
        return [player.SR.points.pow(pow).times(1.5).add(1),
        player.SR.points.pow(0.5).add(1)]
    },
    effectDescription() {
        return "multiplying RP gain by " + coolDynamicFormat(this.effect()[1], 2)
        + " and $ gain by " + coolDynamicFormat(this.effect()[0], 2)
    },
    milestones: {
        0: {
            requirementDescription: "1 SRP",
            effectDescription: "$ upgrades 1-8 are kept on all resets, and RP buyables don't spend RP.",
            done() {
                return player.SR.points.gte(1)
            }
        },
        1: {
            requirementDescription: "2 SRP",
            effectDescription: "Keep first 4 RP upgrades on SRP reset, and keep $ upgrades 9-11 on all resets",
            done() {
                return player.SR.points.gte(2)
            }
        },
        2: {
            requirementDescription: "3 SRP",
            effectDescription: "Unlock a $ buyable (kept on Rebirths), and unlock the ability to buy max SRP",
            done() {
                return player.SR.points.gte(3)
            }
        },
        3: {
            requirementDescription: "5 SRP",
            effectDescription: "ALL buyables are kept on Super Rebirth resets, keep RP upgrade 6 and 7, boost the $ buyable, and unlock the first challenge",
            done() {
                return player.SR.points.gte(5)
            },
            tooltip: "$ buyable boost: 1.1^x -> 1.3^x"
        },
        4: {
            requirementDescription: "8 SRP",
            effectDescription: "Raise $ gain ^1.1",
            done() {
                return player.SR.points.gte(8)
            },
        },
        5: {
            requirementDescription: "12 SRP",
            effectDescription: "Keep ALL $ and RP upgrades on Rebirth and Super Rebirth, and unlock another challenge",
            done() {
                return player.SR.points.gte(12)
            },
        },
        6: {
            requirementDescription: "18 SRP",
            effectDescription: "Unlock more upgrades (above milestone affects them)",
            done() {
                return player.SR.points.gte(18)
            },
        },
        7: {
            requirementDescription: "20 SRP",
            effectDescription: "Automate all currently unlocked buyables",
            done() {
                return player.SR.points.gte(20)
            },
        },
        8: {
            requirementDescription: "25 SRP",
            effectDescription: "Unlock Power",
            done() {
                return player.SR.points.gte(25)
            },
        },
        9: {
            requirementDescription: "100 SRP",
            effectDescription: "Every bought upgrade before Super Rebirth increases $ gain by 40% (exponential)",
            done() {
                return player.SR.points.gte(100)
            },
            effect() {
                let upgs = new Decimal(1)

                if(hasUpgrade('U', 11)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 12)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 13)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 14)) upgs = upgs.times(1.4)

                if(hasUpgrade('U', 21)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 22)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 23)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 24)) upgs = upgs.times(1.4)

                if(hasUpgrade('U', 31)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 32)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 33)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 34)) upgs = upgs.times(1.4)

                if(hasUpgrade('U', 41)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 42)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 43)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 44)) upgs = upgs.times(1.4)

                if(hasUpgrade('U', 51)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 52)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 53)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 54)) upgs = upgs.times(1.4)

                
                if(hasUpgrade('R', 11)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 12)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 13)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 14)) upgs = upgs.times(1.4)

                if(hasUpgrade('R', 21)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 22)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 23)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 24)) upgs = upgs.times(1.4)

                if(hasUpgrade('R', 31)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 32)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 33)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 34)) upgs = upgs.times(1.4)

                return upgs
            },
            tooltip() {
                return "Currently: x" + coolDynamicFormat(this.effect(), 2)
            }
        },
        10: {
            requirementDescription: "Unlock the Fourth Challenge",
            effectDescription: "Keep the fourth challenge unlocked even when $ Upgrade 5:3 is locked or removed",
            done() {
                return hasUpgrade('U', 53)
            },
            unlocked() { return hasUpgrade('U', 53) }
        }
    },
    challenges: {
        11: {
            name: "Betrayed Gods",
            challengeDescription: "You cannot Rebirth",
            canComplete() { return player.points.gte(30000000) },
            unlocked() { return hasMilestone(this.layer, 3) },
            rewardDescription: "Gain 20% of RP gain every second",
            goalDescription: "Reach 30,000,000 $"
        },
        12: {
            name: "A Low Income Family<br>in the Midst of<br>Inflation",
            challengeDescription: "$ gain ^0.5 and Rebirth requirement x10,000",
            canComplete() { return player.R.points.gte("1e15") },
            unlocked() { return hasMilestone(this.layer, 3) },
            rewardDescription: "Rebirth Requirement /10",
            goalDescription: "Reach 1e15 RP"
        },
        21: {
            name: "Clicking Simulator<br>202X",
            challengeDescription: "Nothing is kept on any resets and all automation is disabled",
            canComplete() { return player.R.points.gte("1e20") },
            unlocked() { return hasMilestone('P', 1) },
            rewardDescription: "Multiply automatic RP gain by 10 and also reduce RP buyables scaling",
            goalDescription: "Reach 1e20 RP",
            onEnter() {
                player.U.upgrades = []
                player.R.upgrades = []
                setBuyableAmount('U', 11, new Decimal(0))
                setBuyableAmount('R', 11, new Decimal(0))
                setBuyableAmount('R', 12, new Decimal(0))
            }
        },
        22: {
            name: "Sold Out",
            challengeDescription: "All $ Upgrades and The Machine are disabled, but, you passively gain 1 $ per second",
            canComplete() { return player.R.points.gte("4e36") },
            unlocked() { return hasMilestone('SR', 10) },
            rewardDescription: "Unlock Power Pylon D, and $ boosts SRP gain slightly",
            goalDescription: "Reach 4e36 RP",
            rewardEffect() {
                return player.points.add(10).log(10).pow(0.1)
            },
            rewardDisplay() {
                return "Raising SRP cost by ^" + coolDynamicFormat(new Decimal(1).div(this.rewardEffect()), 4)
            }
        },
        31: {
            name: "Tax Evasion Simulator",
            challengeDescription: "There is rapidly increasing Tax that divides $ gain<br>Can be completed 4 times",
            canComplete() { return player.R.points.gte(new Decimal("1e50").times(new Decimal(1000).pow(challengeCompletions('SR', 31)))) },
            unlocked() { return hasMilestone('P', 7) },
            rewardDescription: "Boost each Power Pylon based on the previous Power Pylon<br>On first completion unlock Power Pylon E<br>On final completion unlock Power Pylon F",
            goalDescription() {
                let goal = new Decimal("1e50").times(new Decimal(1000).pow(challengeCompletions('SR', 31)))
                return "Reach " + coolDynamicFormat(goal, 0) + " RP"
            },
            rewardEffect() {
                return new Decimal(50).div(new Decimal(1.5).pow(challengeCompletions('SR', 31)))
            },
            rewardDisplay() {
                return "Multiplies by log" + coolDynamicFormat(this.rewardEffect(), 0) + " of previous Pylon"
            },
            completionLimit: new Decimal(4),
            onEnter() {
                player.SR.tax = new Decimal(10).pow(challengeCompletions('SR', 31))
            },
            style: {
                width: "450px"
            }
        },
    },
    position: 0,
    gainExp() {
        let expo = new Decimal(1)
        if(hasChallenge('SR', 22)) expo = expo.times(player.points.add(10).log(10).pow(0.1))
        if(hasUpgrade('SR', 12)) expo = expo.times(2.5)
        return expo
    },
    update(diff) {
        if(inChallenge('SR', 31)) {
            player.SR.tax = player.SR.tax.times(new Decimal(0.2).times(new Decimal(2).pow(challengeCompletions('SR', 31))).add(1).pow(diff))
        }
    },
    upgrades: {
        11: {
            unlocked() { return hasMilestone('P', 10) },
            cost: new Decimal("1e600"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            title: "Δ - Delta",
            description: "Raise RP gain by ^1.1"
        },
        12: {
            unlocked() { return hasMilestone('P', 10) },
            cost: new Decimal("1e280"),
            currencyDisplayName: "RP",
            currencyInternalName: "points",
            currencyLayer() { return 'R' },
            title: "Σ - Sigma",
            description: "Raise SRP cost by ^0.4"
        },
        13: {
            unlocked() { return hasMilestone('P', 10) },
            cost: new Decimal(4300),
            currencyDisplayName: "SRP",
            title: "Ψ - Phi",
            description: "Raise Power Pylon effect by ^2"
        },
        14: {
            unlocked() { return hasMilestone('P', 10) },
            cost: new Decimal("1e1000"),
            currencyDisplayName: "Power",
            currencyInternalName: "points",
            currencyLayer() { return 'P' },
            title: "Θ - Theta",
            description: "Automate the second $ buyable<br>And unlock another upgrade..."
        },
        21: {
            style: {
                width: "400px",
                height: "200px"
            },
            unlocked() { return hasUpgrade('SR', 14) },
            title: "Ω - Omega",
            description: "Beat the game",
            cost: new Decimal(600000)
        }
    }
})

addLayer("SA", {
    name: "secret-achievements",
    symbol: "🔮",
    // row: "side",
    type: "none",
    resource: "secretachievements",
    color: "#9966BB",
    tooltip: "SecretAchievements",
    tabFormat: [
        ["display-text", "Secret Achievements are only visible once completed<br>Most Secret Achievements will become impossible if too much progression is made before unlocking them<br>Each Secret Achievement will also eventually have its own exclusive visual theme (available in options) once I figure out how to do that<br>There will be a surprise for getting all of them once there are enough of them for it to be interesting"],
        ["display-text", "<br>There is currently 1 Secret Achievement<br>Every Secret Achievement has a hint when hovering over them to make them possible to obtain without searching up the answers (you'll do it anyways)"],
        "h-line",
        "achievements"
    ],
    unlocked: true,
    achievements: {
        11: {
            name: "Out of Order",
            tooltip() { if(!hasAchievement(this.layer, this.id)) return "That's not going to do anything"; else return "Buy $ Upgrade 7 before $ Upgrade 3<br>That's not going to do anything"},
            unlocked() { return true },
            done() { return !hasUpgrade('U', 13) && hasUpgrade('U', 23) }
        },
        12: {
            name: "Minimum Wage",
            tooltip() { if(!hasAchievement(this.layer, this.id)) return "Infinite Tax"; else return "Get 1e308 tax<br>Infinite Tax"},
            unlocked() { return true },
            done() { return player.SR.tax.gte("1e308") }
        },
    },
})

addLayer("P", {
    name: "power",
    symbol: "P",
    row: "2",
    resource: "Power",
    color: "#d6c611",
    type: "static",
    baseAmount() { return player.SR.points },
    baseResource: "SRP",
    resetsNothing: true,
    exponent: new Decimal("1ee10"),
    requires: new Decimal(25),
    base: new Decimal("1ee10"),
    tooltip() { return coolDynamicFormat(player.P.points, 2) + " Power" },
    prestigeButtonText() {
        return "Unlock Power"
    },
    branches: [['SR', 2]],
    layerShown() { return hasAchievement('A', 52) },
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            pylonA: new Decimal(1),
            pylonB: new Decimal(0),
            pylonC: new Decimal(0),
            pylonD: new Decimal(0),
            pylonE: new Decimal(0),
            pylonF: new Decimal(0),
            pylobA: new Decimal(0),
            pylobB: new Decimal(0),
            pylobC: new Decimal(0),
            pylobD: new Decimal(0),
            pylobE: new Decimal(0),
            pylobF: new Decimal(0),
        }
    },
    update(diff) {
        if (player.P.points.gte(1) || player.P.pylobA.gte(1)) player.P.points = player.P.points.add(layers.P.clickables[11].effect().times(diff))
        if (hasMilestone('SR', 8)) player.P.pylonA = player.P.pylonA.add(layers.P.clickables[12].effect().times(diff))
        if (hasMilestone('SR', 8)) player.P.pylonB = player.P.pylonB.add(layers.P.clickables[13].effect().times(diff))
        if (hasMilestone('SR', 8)) player.P.pylonC = player.P.pylonC.add(layers.P.clickables[14].effect().times(diff))
        if (hasMilestone('SR', 8)) player.P.pylonD = player.P.pylonD.add(layers.P.clickables[15].effect().times(diff))
        if (hasMilestone('SR', 8)) player.P.pylonE = player.P.pylonE.add(layers.P.clickables[16].effect().times(diff))
    },
    effect() {
        return player.P.points.div(100).add(1)
    },
    effectDescription() {
        return "boosting The Machine by x" + coolDynamicFormat(layers.P.effect(), 3)
    },
    position: 1,
    milestones: {
        0: {
            requirementDescription: "1 Power",
            effectDescription: "Unlock Power Pylons",
            done() {
                return player.P.points.gte(1)
            }
        },
        1: {
            requirementDescription: "2 Power Pylon A (PPyA)",
            effectDescription: "Unlock another challenge",
            done() {
                return player.P.pylobA.gte(2)
            }
        },
        2: {
            requirementDescription: "20 Power",
            effectDescription: "Unlock Power Pylon B (PPyB)",
            done() {
                return player.P.points.gte(20)
            }
        },
        3: {
            requirementDescription: "5 PPyB",
            effectDescription: "Each manually bought PPy boosts its own type by x1.15 (exponential)",
            done() {
                return player.P.pylobB.gte(5)
            }
        },
        4: {
            requirementDescription: "15,000 Power",
            effectDescription: "Boost PPyA's effect by x5",
            done() {
                return player.P.points.gte(15000)
            }
        },
        5: {
            requirementDescription: "100,000 Power",
            effectDescription: "Unlock Power Pylon C",
            done() {
                return player.P.points.gte(100000)
            }
        },
        6: {
            requirementDescription: "1,000,000 Power",
            effectDescription: "Slightly reduce Power Pylon Costs, unlock some more upgrades",
            done() {
                return player.P.points.gte("1e6")
            }
        },
        7: {
            requirementDescription: "123,456,789 Power",
            effectDescription: "Unlock the final challenge",
            done() {
                return player.P.points.gte("123456789")
            }
        },
        8: {
            requirementDescription: "1e18 Power",
            effectDescription: "Boost the first 16 $ upgrades ($ Upgrades v2)",
            done() {
                return player.P.points.gte("1e18")
            }
        },
        9: {
            requirementDescription: "1e20 Power",
            effectDescription: "Divide PPyF cost by SRP, PPyE by SRP^2, PPyD by SRP^3, PPyC by SRP^4, PPyB by SRP^5, PPyA by SRP^6",
            done() {
                return player.P.points.gte("1e20")
            }
        },
        10: {
            requirementDescription: "12 PPyF",
            effectDescription: "Unlock another $ buyable, and unlock some more upgrades (in SR layer)",
            done() {
                return player.P.pylobF.gte(12)
            }
        },
        11: {
            requirementDescription: "1e400 Power",
            effectDescription: "Automate Power Pylons, automatically bought Pylons spend nothing",
            done() {
                return player.P.points.gte("1e400")
            }
        },
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "milestones",
                "upgrades",
            ]
        },
        "Power Pylons": {
            content: [
                "main-display",
                "clickables",
            ]
        },
    },
    automate() {
        if(hasMilestone('P', 11)) {
            if(player.P.points.gte(layers.P.clickables[11].cost())) {
                player.P.pylonA = player.P.pylonA.add(1)
                player.P.pylobA = player.P.pylobA.add(1)
            }
            if(player.P.pylonA.gte(layers.P.clickables[12].cost())) {
                player.P.pylonB = player.P.pylonB.add(1)
                player.P.pylobB = player.P.pylobB.add(1)
            }
            if(player.P.pylonB.gte(layers.P.clickables[13].cost())) {
                player.P.pylonC = player.P.pylonC.add(1)
                player.P.pylobC = player.P.pylobC.add(1)
            }
            if(player.P.pylonC.gte(layers.P.clickables[14].cost())) {
                player.P.pylonD = player.P.pylonD.add(1)
                player.P.pylobD = player.P.pylobD.add(1)
            }
            if(player.P.pylonD.gte(layers.P.clickables[15].cost())) {
                player.P.pylonE = player.P.pylonE.add(1)
                player.P.pylobE = player.P.pylobE.add(1)
            }
            if(player.P.pylonE.gte(layers.P.clickables[16].cost())) {
                player.P.pylonF = player.P.pylonF.add(1)
                player.P.pylobF = player.P.pylobF.add(1)
            }
        }
    },
    clickables: {
        11: {
            style: {
                height: '100px',
                width: '200px'
            },
            title: "Power Pylon A",
            display() {
                return "Cost: " + coolDynamicFormat(this.cost(), 2) + " Power"
                + "<br>Count: " + coolDynamicFormat(player.P.pylonA, 2) + " [" + coolDynamicFormat(player.P.pylobA, 0) + "]"
                + "<br>Producing +" + coolDynamicFormat(this.effect(), 3) + " Power/s"
            },
            canClick() { return player[this.layer].points.gte(this.cost()) },
            onClick() {
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                player.P.pylonA = player.P.pylonA.add(1)
                player.P.pylobA = player.P.pylobA.add(1)
            },
            unlocked() {
                return hasMilestone('P', 0)
            },
            effect() {
                let effect = player.P.pylonA.div(10)
                if(hasMilestone('P', 3)) effect = effect.times(new Decimal(1.15).pow(player.P.pylobA))
                if(hasMilestone('P', 4)) effect = effect.times(5)
                if(hasUpgrade('U', 54)) effect = effect.times(2)
                if(hasChallenge('SR', 31)) effect = effect.times(player.P.points.add(layers.SR.challenges[31].rewardEffect()).log(layers.SR.challenges[31].rewardEffect()))
                if(hasUpgrade('SR', 13)) effect = effect.pow(2)
                effect = effect.times(layers.U.buyables[12].effect())
                return effect
            },
            cost() {
                let expo = new Decimal(1.5)
                let divi = new Decimal(1)
                if(hasMilestone('P', 6)) expo = expo.sub(0.05)
                if(hasMilestone('P', 9)) divi = divi.times(player.SR.points.pow(6))
                if(player.P.pylobA.gte(1001)) expo = expo.add(player.P.pylobA.sub(1000).div(100).pow(2))
                return expo.pow(player.P.pylobA).div(divi)
            }
        },
        12: {
            style: {
                height: '100px',
                width: '200px'
            },
            title: "Power Pylon B",
            display() {
                return "Cost: " + coolDynamicFormat(this.cost(), 2) + " PPyA"
                + "<br>Count: " + coolDynamicFormat(player.P.pylonB, 2) + " [" + coolDynamicFormat(player.P.pylobB, 0) + "]"
                + "<br>Producing +" + coolDynamicFormat(this.effect(), 3) + " PPyA/s"
            },
            canClick() { return player[this.layer].pylonA.gte(this.cost()) },
            onClick() {
                player[this.layer].pylonA = player[this.layer].pylonA.sub(this.cost());
                player.P.pylonB = player.P.pylonB.add(1)
                player.P.pylobB = player.P.pylobB.add(1)
            },
            unlocked() {
                return hasMilestone('P', 2)
            },
            effect() {
                let effect = player.P.pylonB.div(10)
                if(hasMilestone('P', 3)) effect = effect.times(new Decimal(1.15).pow(player.P.pylobB))
                if(hasUpgrade('U', 54)) effect = effect.times(2)
                if(hasChallenge('SR', 31)) effect = effect.times(player.P.pylonA.add(layers.SR.challenges[31].rewardEffect()).log(layers.SR.challenges[31].rewardEffect()))
                if(hasUpgrade('SR', 13)) effect = effect.pow(2)
                effect = effect.times(layers.U.buyables[12].effect())
                return effect
            },
            cost() {
                let expo = new Decimal(2)
                let divi = new Decimal(1)
                if(hasMilestone('P', 6)) expo = expo.sub(0.05)
                if(hasMilestone('P', 9)) divi = divi.times(player.SR.points.pow(5))
                if(player.P.pylobB.gte(1001)) expo = expo.add(player.P.pylobB.sub(1000).div(100).pow(2))
                return expo.pow(player.P.pylobB).div(divi)
            }
        },
        13: {
            style: {
                height: '100px',
                width: '200px'
            },
            title: "Power Pylon C",
            display() {
                return "Cost: " + coolDynamicFormat(this.cost(), 2) + " PPyB"
                + "<br>Count: " + coolDynamicFormat(player.P.pylonC, 2) + " [" + coolDynamicFormat(player.P.pylobC, 0) + "]"
                + "<br>Producing +" + coolDynamicFormat(this.effect(), 3) + " PPyB/s"
            },
            canClick() { return player[this.layer].pylonB.gte(this.cost()) },
            onClick() {
                player[this.layer].pylonB = player[this.layer].pylonB.sub(this.cost());
                player.P.pylonC = player.P.pylonC.add(1)
                player.P.pylobC = player.P.pylobC.add(1)
            },
            unlocked() {
                return hasMilestone('P', 5)
            },
            effect() {
                let effect = player.P.pylonC.div(10)
                if(hasMilestone('P', 3)) effect = effect.times(new Decimal(1.15).pow(player.P.pylobC))
                if(hasUpgrade('U', 54)) effect = effect.times(2)
                if(hasChallenge('SR', 31)) effect = effect.times(player.P.pylonB.add(layers.SR.challenges[31].rewardEffect()).log(layers.SR.challenges[31].rewardEffect()))
                if(hasUpgrade('SR', 13)) effect = effect.pow(2)
                effect = effect.times(layers.U.buyables[12].effect())
                return effect
            },
            cost() {
                let expo = new Decimal(2.5)
                let divi = new Decimal(1)
                if(hasMilestone('P', 6)) expo = expo.sub(0.05)
                if(hasMilestone('P', 9)) divi = divi.times(player.SR.points.pow(4))
                if(player.P.pylobC.gte(1001)) expo = expo.add(player.P.pylobC.sub(1000).div(100))
                return expo.pow(player.P.pylobC).div(divi)
            }
        },
        14: {
            style: {
                height: '100px',
                width: '200px'
            },
            title: "Power Pylon D",
            display() {
                return "Cost: " + coolDynamicFormat(this.cost(), 2) + " PPyC"
                + "<br>Count: " + coolDynamicFormat(player.P.pylonD, 2) + " [" + coolDynamicFormat(player.P.pylobD, 0) + "]"
                + "<br>Producing +" + coolDynamicFormat(this.effect(), 3) + " PPyC/s"
            },
            canClick() { return player[this.layer].pylonC.gte(this.cost()) },
            onClick() {
                player[this.layer].pylonC = player[this.layer].pylonC.sub(this.cost());
                player.P.pylonD = player.P.pylonD.add(1)
                player.P.pylobD = player.P.pylobD.add(1)
            },
            unlocked() {
                return hasChallenge('SR', 22)
            },
            effect() {
                let effect = player.P.pylonD.div(10)
                if(hasMilestone('P', 3)) effect = effect.times(new Decimal(1.15).pow(player.P.pylobD))
                if(hasChallenge('SR', 31)) effect = effect.times(player.P.pylonC.add(layers.SR.challenges[31].rewardEffect()).log(layers.SR.challenges[31].rewardEffect()))
                if(hasUpgrade('SR', 13)) effect = effect.pow(2)
                effect = effect.times(layers.U.buyables[12].effect())
                return effect
            },
            cost() {
                let expo = new Decimal(3)
                let divi = new Decimal(1)
                if(hasMilestone('P', 6)) expo = expo.sub(0.05)
                if(hasMilestone('P', 9)) divi = divi.times(player.SR.points.pow(3))
                if(player.P.pylobD.gte(1001)) expo = expo.add(player.P.pylobD.sub(1000).div(100))
                return expo.pow(player.P.pylobD).div(divi)
            }
        },
        15: {
            style: {
                height: '100px',
                width: '200px'
            },
            title: "Power Pylon E",
            display() {
                return "Cost: " + coolDynamicFormat(this.cost(), 2) + " PPyD"
                + "<br>Count: " + coolDynamicFormat(player.P.pylonE, 2) + " [" + coolDynamicFormat(player.P.pylobE, 0) + "]"
                + "<br>Producing +" + coolDynamicFormat(this.effect(), 3) + " PPyD/s"
            },
            canClick() { return player[this.layer].pylonD.gte(this.cost()) },
            onClick() {
                player[this.layer].pylonD = player[this.layer].pylonD.sub(this.cost());
                player.P.pylonE = player.P.pylonE.add(1)
                player.P.pylobE = player.P.pylobE.add(1)
            },
            unlocked() {
                return hasChallenge('SR', 31)
            },
            effect() {
                let effect = player.P.pylonE.div(10)
                if(hasMilestone('P', 3)) effect = effect.times(new Decimal(1.15).pow(player.P.pylobE))
                if(hasChallenge('SR', 31)) effect = effect.times(player.P.pylonD.add(layers.SR.challenges[31].rewardEffect()).log(layers.SR.challenges[31].rewardEffect()))
                if(hasUpgrade('SR', 13)) effect = effect.pow(2)
                effect = effect.times(layers.U.buyables[12].effect())
                return effect
            },
            cost() {
                let expo = new Decimal(3.5)
                let divi = new Decimal(1)
                if(hasMilestone('P', 6)) expo = expo.sub(0.05)
                if(hasMilestone('P', 9)) divi = divi.times(player.SR.points.pow(2))
                if(player.P.pylobE.gte(1001)) expo = expo.add(player.P.pylobE.sub(1000).div(100))
                return expo.pow(player.P.pylobE).div(divi)
            }
        },
        16: {
            style: {
                height: '100px',
                width: '200px'
            },
            title: "Power Pylon F",
            display() {
                return "Cost: " + coolDynamicFormat(this.cost(), 2) + " PPyE"
                + "<br>Count: " + coolDynamicFormat(player.P.pylonF, 2) + " [" + coolDynamicFormat(player.P.pylobF, 0) + "]"
                + "<br>Producing +" + coolDynamicFormat(this.effect(), 3) + " PPyE/s"
            },
            canClick() { return player[this.layer].pylonE.gte(this.cost()) },
            onClick() {
                player[this.layer].pylonE = player[this.layer].pylonE.sub(this.cost());
                player.P.pylonF = player.P.pylonF.add(1)
                player.P.pylobF = player.P.pylobF.add(1)
            },
            unlocked() {
                return maxedChallenge('SR', 31)
            },
            effect() {
                let effect = player.P.pylonF.div(10)
                if(hasMilestone('P', 3)) effect = effect.times(new Decimal(1.15).pow(player.P.pylobF))
                if(hasChallenge('SR', 31)) effect = effect.times(player.P.pylonE.add(layers.SR.challenges[31].rewardEffect()).log(layers.SR.challenges[31].rewardEffect()))
                if(hasUpgrade('SR', 13)) effect = effect.pow(2)
                effect = effect.times(layers.U.buyables[12].effect())
                return effect
            },
            cost() {
                let expo = new Decimal(3.5)
                let divi = new Decimal(1)
                if(hasMilestone('P', 6)) expo = expo.sub(0.05)
                if(hasMilestone('P', 9)) divi = divi.times(player.SR.points)
                if(player.P.pylobF.gte(1001)) expo = expo.add(player.P.pylobF.sub(1000).div(100))
                return expo.pow(player.P.pylobF).div(divi)
            }
        },
    },
})