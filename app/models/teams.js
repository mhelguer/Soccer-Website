import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class TeamsModel extends Model {
  @attr('int') rank;
  @attr('string') name;
  @attr('int') team_id;
  @attr('int') games_played;
  @attr('int') wins;
  @attr('int') draws;
  @attr('int') losses;
  @attr('int') goals_scored;
  @attr('int') goals_conceded;
  @attr('int') goal_differential;
  @attr('int') points;
}
