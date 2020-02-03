import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find } from '@ember/test-helpers';
import { connect } from 'ember-redux';
import Component from '@glimmer/component';

module('Integration | Component | octane-clazz', function(hooks) {
  setupRenderingTest(hooks);

  test('octane state to be comppueted', async function(assert) {
    await render(hbs`<OctaneClazz/>`);
    assert.equal(document.querySelector('.number').textContent, 'number: 0');
    await click('.button');
    await click('.button');
    await click('.button');
    assert.equal(document.querySelector('.number').textContent, 'number: 3');
    assert.equal(document.querySelector('.into-five').textContent, 'number: 15');
    assert.equal(document.querySelector('.color').textContent, 'color: green');
    assert.equal(document.querySelector('.full-name').textContent, 'full name: full name');
  });

  test('should render args', async function(assert) {
    assert.expect(4);

    this.set('myName', 'Raghs');

    await render(hbs`<OctaneClazz @name={{this.myName}} />`);

    assert.equal(document.querySelector('.full-name').textContent, 'full name: Raghs');
    assert.equal(document.querySelector('.name').textContent, 'name: Raghs');

    this.set('myName', 'Toran');

    assert.equal(document.querySelector('.full-name').textContent, 'full name: Toran');
    assert.equal(document.querySelector('.name').textContent, 'name: Toran');
  });


  test('stateToComputed can be used with component level CP', async function(assert) {
    assert.expect(2);

    this.set('myName', 'Raghs');

    await render(hbs`<OctaneClazz @name={{this.myName}} />`);

    assert.equal(document.querySelector('.greeting').textContent, 'Hi Raghs');

    this.set('myName', 'Toran');

    assert.equal(document.querySelector('.greeting').textContent, 'Hi Toran');

  });

  test('glimmer component connecting dispatchToActions only', async function(assert) {
    assert.expect(1);

    const dispatchToActions = () => {};

    this.owner.register('component:test-component-1', connect(null, dispatchToActions)(class Foo extends Component {
      constructor() {
        super(...arguments);
        assert.ok(true, 'should be able to connect components passing `null` to stateToComputed');
      }
    }));
    await render(hbs`{{test-component-1}}`);
  });

  test('raghs the component should truly be extended meaning actions map over as you would expect', async function(assert) {
    await render(hbs`<OctaneClazz @name={{this.myName}} />`);

    let $random = find('.color');
    assert.equal($random.textContent, 'color: green');

    await click('.btn-random');

    assert.equal($random.textContent, 'color: yellow');
  });

});
