import Service from '@ember/service';
import { inject as service } from '@ember/service';
import ENV from 'ember-quickstart/config/environment';

export default class AuthService extends Service {
  isLoggedIn = false;

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
          if (newData[0].user_exists == '1') this.set('isLoggedIn', true);
        });
    } catch (error) {
      console.error('error fetching in auth.js:', error);
    }
  }
}
