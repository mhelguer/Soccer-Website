import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class TeamsTableComponent extends Component {
  @tracked headers = ['#', 'Team', 'GP', 'W', 'D', 'L', 'F', 'A', 'GD', 'P'];

  @tracked data;


  constructor(){
    super(...arguments);
    this.data = this.args.data;
    this.data = fetch('http://localhost:3000/api/data/teams/1').then(response => response.json);    
  }

  @action
  changeData(){
    fetch('http://localhost:3000/api/data/teams/2')
    .then(response=>response.json())
    .then(newData =>{
      this.data=newData;
    })
    .catch(error=>{
      console.error('error fetching in component:', error);
    });
    console.log('Data updated: ', this.data);
  }
  // @action
  // async changeData(){
  //   console.log('changing data');
  //   const response = await fetch('http://localhost:3000/api/data/teams/2');
  //   const newData = await response.json();
  //   this.teams = newData;
  //   console.log('Data updated: ', this.teams);
  // }
}
