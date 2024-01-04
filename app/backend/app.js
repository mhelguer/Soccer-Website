const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysqlsun1',
  database: 'soccer_league',
});

connection.connect((err) => {
  if (err) console.error('error connecting to mysql database', err);
  else {
    console.log('connected to mysql database!');
  }
});

// API endpoint to fetch data from MySQL
app.get('/api/data/teams/1', (req, res) => {
  const query = `
    SELECT 
      t.rank, 
      t.name, 
      t.games_played, 
      t.wins, 
      t.draws, 
      t.losses, 
      t.goals_scored, 
      t.goals_conceded, 
      t.goal_differential, 
      t.points 
    FROM (
      SELECT 
        ROW_NUMBER() OVER (
          PARTITION BY division =1 
          ORDER BY points DESC, goal_differential DESC
        ) 
      AS 'rank', name, games_played, wins, draws, losses, goals_scored, goals_conceded, goal_differential, points, division 
        FROM teams
    ) t 
    WHERE t.division = 1;`;
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      //console.log(result);
      let i = 1;
      const resourceCollection = result.map((team) => ({
        type: 'teams',
        id: i++,

        rank: team.rank,
        name: team.name,
        team_id: team.team_id,
        games_played: team.games_played,
        wins: team.wins,
        draws: team.draws,
        losses: team.losses,
        goals_scored: team.goals_scored,
        goals_conceded: team.goals_conceded,
        goal_differential: team.goal_differential,
        points: team.points,
      }));

      res.json({ data: resourceCollection });
    }
  });
});

// division 2
app.get('/api/data/teams/2', (req, res) => {
  const query = `
    SELECT 
      t.rank, 
      t.name, 
      t.games_played, 
      t.wins, t.draws, 
      t.losses, 
      t.goals_scored, 
      t.goals_conceded, 
      t.goal_differential, 
      t.points 
    FROM (
      SELECT 
        ROW_NUMBER() OVER (
          PARTITION BY division =2 
          ORDER BY points DESC, goal_differential DESC
        ) 
      AS 'rank', name, games_played, wins, draws, losses, goals_scored, goals_conceded, goal_differential, points, division 
      FROM teams
    ) t 
    WHERE t.division = 2;`;
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      let i = 1;
      const resourceCollection = result.map((team) => ({
        type: 'teams',
        id: i++,
        rank: team.rank,
        name: team.name,
        team_id: team.team_id,
        games_played: team.games_played,
        wins: team.wins,
        draws: team.draws,
        losses: team.losses,
        goals_scored: team.goals_scored,
        goals_conceded: team.goals_conceded,
        goal_differential: team.goal_differential,
        points: team.points,
      }));

      res.json({ data: resourceCollection });
    }
  });
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
