import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class TeamsTableComponent extends Component {
  @tracked headers = ['#', 'Team', 'GP', 'W', 'D', 'L', 'F', 'A', 'GD', 'P'];

  @tracked data = this.data;

  
  constructor(){
    super(...arguments);
    this.data = this.args.data;
    console.log('component constructor this.data: ', this.data);
  }

  @action
  changeData(){
    fetch('http://localhost:3000/api/data/teams/2')
    .then(response=>response.json())
    .then(newData =>{
      this.data=newData;
      console.log('newdata: ', newData);
    })
    .catch(error=>{
      console.error('error fetching in component:', error);
    });

    console.log('Data updated(component this.data): ', this.data);
  }
}
