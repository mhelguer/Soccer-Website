import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class apiHandlerService extends Service {
  @service store;

  fetchData() {
    return fetch('/api/data/teams')
      .then((response) => response.json())
      .then((data) => {
        // Push the data into the Ember Data store to make it tracked
        this.store.pushPayload('teams', data);
        return this.store.peekAll('teams');
      });
  }
}
