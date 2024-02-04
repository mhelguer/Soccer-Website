import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class RosterTableComponent extends Component {
    @service router;

    @action transitionToIndex() {
        this.router.transitionTo('index');
      }
}
