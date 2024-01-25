import Service from '@ember/service';
import { inject as service } from '@ember/service';
import ENV from 'ember-quickstart/config/environment';

export default class AuthService extends Service {
  isLoggIn = false;

  async login(username, password) {
    const url = `${ENV.APP.host}/api/data/login?username=${username}&password=${password}`;

    try {
      const response = await fetch(url)
        .then((response) => response.json())
        .then((newData) => {
          console.log('hi', newData);
        });
      console.log(response);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('error fetching in auth.js:', error);
    }
  }
}
