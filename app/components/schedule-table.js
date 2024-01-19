import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class TeamsTableComponent extends Component {
  headers = ['Time', 'Home', 'Result', 'Visitor', 'Field'];
  all_gamedays = this.all_gamedays;

  @tracked data = this.data;
  // get all unique dates to have a date header for each gameday container

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
        let matches = newData.data;


        // same code as organize_schedule() in routes/schedule.js
        let unique_dates = [];
        let all_gamedays = {};

        // separate this.data.data into gameday objects with corresponding matches(6 gameday objects with 2 match objects each)
        let gameday = {};
        let date_count = 0;
        let gameday_count = 0;
        let current_match = {};
        let current_date = '';

        for (const match_key in matches) {
          if (!unique_dates.includes(matches[match_key].date)) {
            unique_dates.push(matches[match_key].date);
          }

          current_match = matches[match_key];
          current_date = current_match.date;

          for (const date_key in unique_dates) {
            if (current_date == unique_dates[date_key]) {
              Object.assign(gameday, { [date_count]: current_match });
              date_count += 1;

              if (date_count == 2) {
                delete unique_dates[date_key];
                Object.assign(all_gamedays, { [gameday_count]: gameday });

                gameday = {};
                gameday_count += 1;
                date_count = 0;
              }
            }
          }
        }
        // assign organized schedule to this.data to change data on schedule page
        this.data=all_gamedays;
      })
      .catch((error) => {
        console.error('error fetching in component:', error);
      });
  }
}
