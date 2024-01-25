const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const config = require('./config');

app.use(cors());

const connection = mysql.createConnection(config.mysql);

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

      dat = res.json({ data: resourceCollection });
      console.log(dat);
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

// schedule div 1
app.get('/api/data/schedule/1', (req, res) => {
  const query = `
    SELECT 
    date,
    DAYNAME(date) as day_name, 
    monthname(date) as month_name, 
    day(date) as day_number,
    DATE_FORMAT(time, '%H:%i') AS time,
    home_team,
    visiting_team,
    field,
    home_team_goals,
    visiting_team_goals
    FROM schedule 
    WHERE division=1 
    ORDER BY date`;

  connection.query(query, (error, result) => {
    if (error) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    } else {
      //console.log(result);
      const resourceCollection = result.map((schedule) => ({
        type: 'schedule',
        date: schedule.date,
        day_name: schedule.day_name,
        month_name: schedule.month_name,
        day_number: schedule.day_number,
        time: schedule.time,
        home_team: schedule.home_team,
        visiting_team: schedule.visiting_team,
        field: schedule.field,
        home_team_goals: schedule.home_team_goals,
        visiting_team_goals: schedule.visiting_team_goals,
      }));

      res.json({ data: resourceCollection });
      console.log(resourceCollection);
    }
  });
});

// schedule div 2
app.get('/api/data/schedule/2', (req, res) => {
  const query = `
    SELECT 
    date,
    DAYNAME(date) as day_name, 
    monthname(date) as month_name, 
    day(date) as day_number,
    DATE_FORMAT(time, '%H:%i') AS time,
    home_team,
    visiting_team,
    field,
    home_team_goals,
    visiting_team_goals
    FROM schedule 
    WHERE division=2 
    ORDER BY date`;

  connection.query(query, (error, result) => {
    if (error) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    } else {
      console.log(result);
      const resourceCollection = result.map((schedule) => ({
        type: 'schedule',
        date: schedule.date,
        day_name: schedule.day_name,
        month_name: schedule.month_name,
        day_number: schedule.day_number,
        time: schedule.time,
        home_team: schedule.home_team,
        visiting_team: schedule.visiting_team,
        field: schedule.field,
        home_team_goals: schedule.home_team_goals,
        visiting_team_goals: schedule.visiting_team_goals,
      }));

      res.json({ data: resourceCollection });
      console.log(resourceCollection);
    }
  });
});

// TODO: make endpoint that checks if username and password from controllers/index.js
//       are valid for a player account
app.get('/api/data/login', (req, res) => {
  const {username, password} = req.query;
  console.log(username, password);
  const query = `
  SELECT EXISTS(
    SELECT 1
    FROM players
    WHERE username = '${username}' AND password = '${password}'
  ) AS user_exists;
  `;

  connection.query(query, [username, password], (error, result) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
