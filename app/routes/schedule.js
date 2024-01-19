import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import fetch from 'fetch';

export default class ScheduleRoute extends Route {
  async model() {
    const response = await fetch('http://localhost:3000/api/data/schedule/1');
    const resp = await response.json();
    this.data = resp;

    let matches = this.data.data;
    this.data = this.organize_schedule(matches);
    return this.data;
  }

  organize_schedule(matches) {
    this.unique_dates = [];
    this.all_gamedays = {};

    // separate this.data.data into gameday objects with corresponding matches(6 gameday objects with 2 match objects each)
    let gameday = {};
    let date_count = 0;
    let gameday_count = 0;
    let current_match = {};
    let current_date = '';

    for (const match_key in matches) {
      if (!this.unique_dates.includes(matches[match_key].date)) {
        this.unique_dates.push(matches[match_key].date);
      }

      current_match = matches[match_key];
      current_date = current_match.date;

      for (const date_key in this.unique_dates) {
        if (current_date == this.unique_dates[date_key]) {
          Object.assign(gameday, { [date_count]: current_match });
          date_count += 1;

          if (date_count == 2) {
            delete this.unique_dates[date_key];
            Object.assign(this.all_gamedays, { [gameday_count]: gameday });

            gameday = {};
            gameday_count += 1;
            date_count = 0;
          }
        }
      }
    }
    console.log('schedule.js this.all_gamedays:', this.all_gamedays);
    return this.all_gamedays;
  }
}
