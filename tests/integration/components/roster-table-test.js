import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-quickstart/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | roster-table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<RosterTable />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <RosterTable>
        template block text
      </RosterTable>
    `);

    assert.dom().hasText('template block text');
  });
});
