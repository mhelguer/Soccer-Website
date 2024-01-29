import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'ember-quickstart/config/environment';

export default class AuthService extends Service {
  // using localStorage prevents user from being logged out when refreshing page
  @tracked isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  @tracked accountNotFound = sessionStorage.getItem('accountNotFound') === 'false';
  @tracked playerId = sessionStorage.getitem('playerId') === null;

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
          if (newData[0].user_exists == '1') {
            this.isLoggedIn = true;
            sessionStorage.setItem('isLoggedIn', 'true');

            this.accountNotFound = false;
            sessionStorage.setItem('accountNotFound', 'false');
          } else {
            this.isLoggedIn = false;
            sessionStorage.setItem('isLoggedIn', 'false');

            this.accountNotFound = true;
            sessionStorage.setItem('accountNotFound', 'true');
          }
        });
    } catch (error) {
      console.error('error fetching in auth.js:', error);
    }
  }

  async getRoster(playerId){
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
          if (newData[0].user_exists == '1') {
            this.isLoggedIn = true;
            sessionStorage.setItem('isLoggedIn', 'true');

            this.accountNotFound = false;
            sessionStorage.setItem('accountNotFound', 'false');
          } else {
            this.isLoggedIn = false;
            sessionStorage.setItem('isLoggedIn', 'false');

            this.accountNotFound = true;
            sessionStorage.setItem('accountNotFound', 'true');
          }
        });
    } catch (error) {
      console.error('error fetching in auth.js:', error);
    }
  }

  logout = () => {
    this.isLoggedIn = false;
    sessionStorage.setItem('isLoggedIn', 'false');
  };
}
