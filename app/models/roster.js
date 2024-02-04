import Model from '@ember-data/model';

export default class RosterModel extends Model {
  @attr('string') first_name;
  @attr('string') last_name;
  @attr('int') goals;
}
