import { world } from "@minecraft/server";
import { CustomScoreboard } from "../class";

/**
 * Welcome! This is my examples on how to use the CustomScoreboard class to create simple functions!.
 * Add, Remove, Set, Get Score examples:
 * ------------------------------------------------------------------------------------------------------
 * const addMoney = (player, amount) => { new CustomScoreboard("Money").addScore(player, amount); }
 * const removeMoney = (player, amount) => { new CustomScoreboard("Money").removeScore(player, amount); }
 * const getScore = (player, objective) => { return new CustomScoreboard(objective).getScore(player); }
 * ------------------------------------------------------------------------------------------------------
 * These examples can be exported and imported through files. I reccomend just putting them at the top of your file you are using them in so you can use them throughout your file.
 * ----------------------------
 * Getting a players score offline by name:
 * ------------------------------------------------------------------------------------------------------
 * const getScoreOffline = (playerName) => { new CustomScoreboard("Money").getScoreOffline(playerName); }
 * console.warn(`${getScoreOffline("NeoTheCool1585")}`);
 * ------------------------------------------------------------------------------------------------------
 * This will return my score for me aka NeoTheCool1585's score.
 * ------------------------------------------------------------
 * Custom Leaderboard examples:
 * ------------------------------------------------------------------------------------------------------
 * const moneyLB = new CustomScoreboard("Money").leaderboard(15);
 * moneyLB.forEach((entry, index) => { console.warn(`§e[Leaderboard] §7${index + 1}. ${entry.name}: ${entry.score}`); })
 * -----------------------------------------------------------------------------------------------------
 * To explain how this works, here's a simple explanation: You define the moneyLB varible to use the scoreboard class and put the 15 as how many of the top players you want to display. Then you loop through the leaderboard and print out the top 15 players with their scores.
 * For any help feel free to ask me! My discord is bubblestogo_
 * ------------------------------------------------------------
 * Grabbing the names on a scoreboard:
 * ---------------------------------------------------------
 * const names = new CustomScoreboard("Money").listPlayers();
 * ---------------------------------------------------------
 * This is very simple! The names variable just prints out all the names of the players on the Money scoreboard. Then I print out the names into a console.warn statement.
 * -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * Grabbing the total value of scores on a scoreboard:
 * ----------------------------------------------------------
 * const totalScore = new CustomScoreboard("Money").total();
 * console.warn(`Total Money: ${totalScore}`);
 * ----------------------------------------------------------
 * This is also very simple! The totalScore variable just prints out the total value of all the scores on the Money scoreboard. Then I print out the total into a console.warn statement.
 */