import Model from '@ember-data/model';

export default class RosterModel extends Model {
  @attr('string') first_name;
  @attr('string') last_name;
  @attr('date') birth_date;
  @attr('int') goals;
}
