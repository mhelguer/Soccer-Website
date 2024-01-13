import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class ScheduleModel extends Model {
  @attr('date') day_name;
  @attr('date') month_name;
  @attr('date') day_number;
  @attr('time') time;
  @attr('string') home_team;
  @attr('string') visiting_team;
  @attr('int') field;
  @attr('int') home_team_goals;
  @attr('int') visiting_team_goals;  
  @attr('string') division;
}
