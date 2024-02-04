import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class RosterRoute extends Route {
  @service auth;
  async model() {
    const player_id = this.auth.player[0].player_id;
    const url = `http://localhost:3000/api/data/roster?player_id=${player_id}`;
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
      const resp = await response.json();

      this.team_name = resp.data[0].name;
      this.data = resp;
      return this.data;
    } catch (error) {
      console.error('Error fetching roster:', error);
    }
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('team_name', this.team_name);
  }
}
