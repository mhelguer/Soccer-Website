import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import fetch from 'fetch';

export default class TeamsRoute extends Route {

  //FIXME: this.data is not appearing when page first loaded up
  async model() {
    const response = await fetch('http://localhost:3000/api/data/teams/1');
    const resp = await response.json();
    this.data = resp;
    console.log(this.data.data);
    // return fetch('http://localhost:3000/api/data/teams/1')
    // .then(response => response.json);


    return resp;
  }
}
