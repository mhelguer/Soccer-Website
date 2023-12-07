import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
export default class PeopleListComponent extends Component {
  @tracked headers = ['#', 'Team', 'GP', 'W', 'D', 'L', 'F', 'A', 'GD', 'P'];

  @action
  showTeam(team) {
    alert(`The team's name is ${team}!`);
    document.querySelector;
  }
}
