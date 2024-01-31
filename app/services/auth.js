import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'ember-quickstart/config/environment';

export default class AuthService extends Service {
  // using localStorage prevents user from being logged out when refreshing page
  @tracked isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  @tracked accountNotFound =
    sessionStorage.getItem('accountNotFound') === 'true';
  @tracked roster = sessionStorage.getItem('roster')
    ? JSON.parse(sessionStorage.getItem('roster'))
    : [];
  @tracked player = sessionStorage.getItem('player')
    ? JSON.parse(sessionStorage.getItem('player'))
    : [];

  async login(username, password) {
    const url = `${ENV.APP.host}/api/data/login?username=${username}&password=${password}`;
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((newData) => {
          if (newData[0]) {
            this.isLoggedIn = true;
            sessionStorage.setItem('isLoggedIn', 'true');

            this.player = [newData[0]]; // {player_id, first_name, last_name, name(team name)}
            sessionStorage.setItem('player', JSON.stringify(this.player));
            //this.getRoster(this.player.player_id);

            this.accountNotFound = false;
            sessionStorage.setItem('accountNotFound', 'false');
          } else {
            this.isLoggedIn = false;
            sessionStorage.setItem('isLoggedIn', 'false');

            this.accountNotFound = true;
            sessionStorage.setItem('accountNotFound', 'true');

            // this.player_id = 0;
            // sessionStorage.setItem('player_id', 0);

            this.roster = null;
            sessionStorage.setItem('roster', null);
          }
        });
    } catch (error) {
      console.error('error fetching in auth.js:', error);
    }
  }

  async getRoster(player_id) {
    console.log('in getRoster');
    const url = `${ENV.APP.host}/api/data/roster?playerId=${player_id}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player_id: player_id,
        }),
      });

      if (response.ok) {
        const newData = await response.json();
        this.roster = newData;
        sessionStorage.setItem('roster', JSON.stringify(this.roster));
      } else {
        console.error('Error fetching roster:', response.status);
      }
    } catch (error) {
      console.error('Error fetching roster:', error);
    }
  }

  logout = () => {
    this.isLoggedIn = false;
    sessionStorage.setItem('isLoggedIn', 'false');
    this.roster = null;
    sessionStorage.setItem('roster', null);
    this.player = [];
    sessionStorage.setItem('player', []);
    this.accountNotFound = false;
    sessionStorage.setItem('accountNotFound', false);
  };
}
