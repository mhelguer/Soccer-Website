import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import fetch from 'fetch';

export default class RosterRoute extends Route {
  @service auth;
  async model() {
    const player_id = this.auth.player[0].player_id;
    console.log('model this.auth.player id: ', this.auth.player[0].player_id);
    const url = `http://localhost:3000/api/data/roster?player_id=${this.auth.player[0].player_id}`;
    try {
      // TODO: player_id being passed but no roster object being returned
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player_id: player_id,
        }),
      });
      this.data = response;
      return this.data;
    } catch (error) {
      console.error('Error fetching roster:', error);
    }
    //const resp = await response.json();
  }
}
