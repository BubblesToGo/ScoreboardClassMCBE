# Custom Scoreboard Class

Manage your scoreboards for your MCBE Realm/BDS Server with ease. This class comes with some extra features including grabbing the player data while are offline and making leaderboards and more easier!

Keep in mind their will most likely bee bugs that need to be fixed and if you find any message bubblestogo_ on discord!

## How to make/use complex systems
# **How to use any of the functions?**
To use any of the functions, the examples for complex will be below BUT, to understand how it's working it's like this:
```js
- new CustomScoreboard("PUT THE SCOREBOARD NAME").THEFUNCTIONYOUWANTTOUSE
```
# **How to remake or make getScore, addScore, setScore, removeScore, getScoreOffline**

- Make sure to export these from a handlers file or keep them at the top of each file you are using them in so you can use them anywhere!
## **Creating a getScore:**
To create a getScore put this variable at the top of your file:
```js
- const getScore = (player, objective) => { return new CustomScoreboard(objective).getScore(player); }
```
## **Creating the others:**

To create these put this variable at the top of your file:
```js
- const addMoney = (player, amount) => { new CustomScoreboard("Money").addScore(player, amount); }
```
## **Creating a getScoreOffline**
To create this put this variable at the top of your file:
```js
- const getScoreOffline = (playerName) => { new CustomScoreboard("Money").getScoreOffline(playerName); }
```

# **How to create a leaderboard?**
To create a leaderboard we will do this:
```js
- const moneyLB = new CustomScoreboard("Money").leaderboard(15);
```
Now that we defined out leaderboard, we will now grab each value/name and loop it and create our leaderboard.
```js
- moneyLB.forEach((entry, index) => { console.warn(`§e[Leaderboard] §7${index + 1}. ${entry.name}: ${entry.score}`); })
```

# **How to grab everyone's name on a scoreboard?**
To grab everyone's name on a scoreboard. It's very easy! Do this:
```js
- const names = new CustomScoreboard("Money").listPlayers();
```
Make sure it's at the top of your file for best use!
```js
- console.warn(names)
```

# **How to grab the total value/scores on that scoreboard?**
Very easy, make sure to define this at the top of your file for best use!
```js
- const totalScore = new CustomScoreboard("Money").total();
```
Let's display it:
```js
- console.warn(`Total Money: ${totalScore}`);
```
