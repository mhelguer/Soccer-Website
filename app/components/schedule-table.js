import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class TeamsTableComponent extends Component {
  headers = ['Time', 'Home', 'Result', 'Visitor', 'Field'];

  @tracked data = this.data;

  constructor() {
    super(...arguments);
    this.data = this.args.data;

    // get all unique dates to have a date header for each gameday container
    let matches = this.data.data;
    this.unique_dates = [];
    this.date_headers = [];
    for (const index in matches) {
      let gameday = matches[index];
      if (!this.unique_dates.includes(matches[index].date)) {
        this.unique_dates.push(matches[index].date);
        this.date_headers.push(`${gameday.day_name}, ${gameday.month_name} ${gameday.day_number}`);
        }
    }
   

    // separate this.data.data into gameday objects with corresponding matches(6 gameday objects with 2 match objects each)
    let all_gamedays={};
    let gameday={};
    let date_count=0;
    let gameday_count=0;
    let current_match={};
    let current_date='';

    for(const match_key in matches){      
      current_match=matches[match_key];
      current_date = current_match.date;

        for (const date_key in this.unique_dates){
          if(current_date==this.unique_dates[date_key]){
            Object.assign(gameday, {[date_count]: current_match});
            date_count+=1;

            if(date_count==2){
              delete this.unique_dates[date_key];
              Object.assign(all_gamedays, {[gameday_count]: gameday})
              
              gameday={};
              gameday_count+=1;       
              date_count=0;
            }
        }

        
        
      }
    }
    console.log(all_gamedays);

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
  }
}
