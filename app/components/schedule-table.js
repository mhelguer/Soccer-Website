import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class TeamsTableComponent extends Component {
  @tracked headers = ['Time', 'Home', 'Result', 'Visitor', 'Field'];

  @tracked data = this.data;

  constructor() {
    super(...arguments);
    this.data = this.args.data;
  }

  @action
  changeScheduleData(division) {
    console.log(division, 'changeScheduleData');
    fetch(`http://localhost:3000/api/data/schedule/${division}`)
      .then((response) => response.json())
      .then((newData) => {
        this.data = newData;
      })
      .catch((error) => {
        console.error('error fetching in component:', error);
      });
      console.log(this.data)
  }
}
