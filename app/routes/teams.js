import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeamsRoute extends Route {
  @service store;
  async model() {
    try {
      return this.store.findAll('teams', []);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
