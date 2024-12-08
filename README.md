# Custom Scoreboard Class

Manage your scoreboards for your MCBE Realm/BDS Server with ease. This class comes with some extra features including grabbing the player data while are offline and making leaderboards and more easier!

#- Keep in mind their will most likely bee bugs that need to be fixed and if you find any message bubblestogo_ on discord!

## How to use

**How to remake or make getScore, addScore, setScore, removeScore, getScoreOffline**

- Make sure to export these from a handlers file or keep them at the top of each file you are using them in so you can use them anywhere!
**Creating a getScore:**
To create a getScore put this variable at the top of your file:
- const getScore = (player, objective) => { return new CustomScoreboard(objective).getScore(player); }
**Creating the others:**
To create these put this variable at the top of your file:
- const addMoney = (player, amount) => { new CustomScoreboard("Money").addScore(player, amount); }
**Creating a getScoreOffline**
To create this put this variable at the top of your file:
- const getScoreOffline = (playerName) => { new CustomScoreboard("Money").getScoreOffline(playerName); }

**How to create a leaderboard?**
To create a leaderboard we will do this:
- const moneyLB = new CustomScoreboard("Money").leaderboard(15);
Now that we defined out leaderboard, we will now grab each value/name and loop it and create our leaderboard.
- moneyLB.forEach((entry, index) => { console.warn(`§e[Leaderboard] §7${index + 1}. ${entry.name}: ${entry.score}`); })
