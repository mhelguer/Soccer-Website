import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import fetch from 'fetch';

export default class ScheduleRoute extends Route {
  async model() {
    const response = await fetch('http://localhost:3000/api/data/teams/1');
    const resp = await response.json();
    this.data = resp;
    return this.data;
  }
}
