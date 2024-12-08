import { system, world, DisplaySlotId, Player } from "@minecraft/server";
/**
 * @param {world} world
 */
class CustomScoreboard {
    constructor(scoreboardName) {
        this.objectiveName = scoreboardName;
        this.objective = world.scoreboard.getObjective(this.objectiveName);
        this.scoreboard = world.scoreboard
    }
    /**
     * Clear's the current objective at the specified display slot.
     * @param {DisplaySlotId} displayArea - Example: "Sidebar", "List", "BelowName"
     * @returns {Promise<void>}
     */
    clearObjOnDisplay(displayArea) {
        try {
            this.scoreboard.clearObjectiveAtDisplaySlot(displayArea);
        }
        catch {
            console.warn(`The display slot name is incrorect.`);
        }
    }
    /**
     * Set's the objective at the specified display slot.
     * @param {DisplaySlotId} displayArea - Example: "Sidebar", "List", "BelowName"
     * @returns {Promise<void>}
     */
    setObjOnDisplay(displayArea) {
        console.warn(displayArea);
        try {
            this.scoreboard.setObjectiveAtDisplaySlot(displayArea, { objective: this.objective });
        }
        catch (error) {
            console.warn(`The display slot name is incrorect. or The objective does not exist.`);
        }
    }
    /**
     * Add's the specified scoreboard into the game.
     * @param {string} displayName - The display name when being displayed on a List, Sidebar, or Below Name
     */
    addScoreboard(displayName) {
        try {
            this.scoreboard.addObjective(this.objectiveName, displayName);
        }
        catch {
            console.warn(`This objective already exists. Or the name format is incorrect.`);
        }
    }
    /**
     * Removes the specified scoreboard from the game.
     */
    removeScoreboard() {
        try {
            this.scoreboard.removeObjective(this.objectiveName);
        }
        catch {
            console.warn(`This objective does not exist.`);
        }
    }
    /**
     * Adds the specified score to the specified player's scoreboard.
     * @param {Player} player - The player 
     * @param {number} score - The score to be added
     */
    addScore(player, score) {
        try {
            this.objective.addScore(player, score);
        }
        catch {
            console.warn(`${player} does not exist. Or the amount is not a allowed integer. Or the objective does not exist.`);
        }
    }
    /**
     * Removes the specified score from the specified player's scoreboard.
     * @param {Player} player - The player
     * @param {number} score - The score to be removed. 
     */
    removeScore(player, score) {
        try {
            this.objective.setScore(player, world.scoreboard.getObjective(this.objectiveName).getScore(player) - score);
        }
        catch {
            console.warn(`${player} does not exist. Or the amount is not a allowed integer. Or the objective does not exist.`);
        }
    }
    /**
     * Sets the specified score to the specified player's scoreboard.
     * @param {Player} player - The player
     * @param {number} score - The score to be set to
     */
    setScore(player, score) {
        try {
            this.objective.setScore(player, score);
        }
        catch {
            console.warn(`${player} does not exist. Or the amount is not a allowed integer. Or the objective does not exist.`);
        }
    }
    /**
     * Gets the specified player's score from the scoreboard.
     * @param {Player} player - The player
     * @returns {number} The score, or 0 if the player does not exist or the objective does not exist.
     */
    getScore(player) {
        try {
            return this.objective.getScore(player);
        } catch {
            return 0
        }
    }
    /**
     * 
     * @returns {number} The total score of all values together on that scoreboard.
     */
    total() {
        try {
            let sc = 0;
            this.objective.getScores().forEach(scores => sc = sc + scores.score);
            return sc;
            
        }
        catch {
            console.warn(`No values found. Or the objective does not exist.`);
        }
    }
    /**
     * Gets the specified player's score from the scoreboard without the player having to be online.
     * @param {string} plrName - The name of the player
     * @returns {number} The score or 0, or an error if the player does not exist or the objective does not exist.
     */
    getScoreOffline(plrName) {
        if (!this.objective) {
            console.warn(`Objective ${this.objectiveName} does not exist.`);
            return null;
        }
        let score;
        world.getDynamicPropertyIds()
        .filter(id => id.startsWith('Name:'))
        .forEach(id => {
            const playerId = id.split(':')[1];
            const identityJson = id.substring(id.indexOf('{'));
            let identity;
            try { const parsedIdentity = JSON.parse(identityJson); identity = parsedIdentity.id; } catch {}
            const name = world.getDynamicProperty(`Name:${playerId}:{"id":${identity}}`); 
            this.objective.getScores().forEach(scores => {
                if (name == plrName && identity == scores.participant.id) {
                    try {
                        score = scores.score;
                    }
                    catch {
                        score = 0;
                    }
                }
            });
        });
        return score;
    }
    /**
     * 
     * @returns This returns a mapped array of all the player names on the scoreboard.
     * - Example: NeoTheCool1585,NeoTheCool1585(2)
     */
    listPlayers() {
        const names = [];
        world.getDynamicPropertyIds()
        .filter(id => id.startsWith('Name:'))
        .forEach(id => {
            const playerId = id.split(':')[1];
            const identityJson = id.substring(id.indexOf('{'));
            let identity;
            try { const parsedIdentity = JSON.parse(identityJson); identity = parsedIdentity.id; } catch {}
             this.objective.getScores().forEach(name => {
                if (identity == name.participant.id) {
                    names.push({ name: world.getDynamicProperty(`Name:${playerId}:{"id":${identity}}`)});
                }
             });
        });
        return names.map(name => name.name);
    }
    /**
     * 
     * @returns Return every single player name and their coresponding score on the scoreboard.
     * - Example: { name: 'NeoTheCool1585', 'NeoTheCool1585(2)', score: 100, 120 }
     */
    grabEveryValueAndName() {
        const results = [];
        world.getDynamicPropertyIds()
        .filter(id => id.startsWith('Name:'))
        .forEach(id => {
            const playerId = id.split(':')[1];
            const identityJson = id.substring(id.indexOf('{'));
            let identity;
            try { const parsedIdentity = JSON.parse(identityJson); identity = parsedIdentity.id; } catch {}
             this.objective.getScores().forEach(scores => {
                if (identity == scores.participant.id) {
                    results.push({ name: world.getDynamicProperty(`Name:${playerId}:{"id":${identity}}`), score: scores.score  });
                }
             });
        });
        return results;
    }
    /**
     * 
     * @param {number} amount - The top amount of players you would like to recieve. 
     * @returns An array of the top players with their scores and names.
     * - Example on how to use:
     * - Define the leaderboard and Grab each value and name:
     * - -------
        - const money = new CustomScoreboard("Money").leaderboard(15);
        - money.forEach((entry, index) => {
           console.warn(`§e[Leaderboard] §7${index + 1}. ${entry.name}: ${entry.score}`);
        })
     */
    leaderboard(amount) {
        const results = this.grabEveryValueAndName();
        const topResults = results.sort((a, b) => b.score - a.score).slice(0, amount);
        return topResults;
    }
}
export { CustomScoreboard };
system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        const joined = world.getDynamicProperty(`Name:${player.id}:${player.scoreboardIdentity}`);
        if (joined == undefined || joined !== player.name) {
            world.setDynamicProperty(`Name:${player.id}:${JSON.stringify(player.scoreboardIdentity)}`, player.name);
        }
    }
});
