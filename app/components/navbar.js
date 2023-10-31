import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class NavbarComponent extends Component {
  @action
  visibility(isVisible, primaryNav, navToggle) {   // need to declare variables here instead of using const

    // assign ul menu to primaryNav and use its data-visible property
    navToggle = document.querySelector('.mobile-nav-toggle');
    primaryNav = document.querySelector('.primary-navigation');
    isVisible = primaryNav.getAttribute('data-visible');

    if (isVisible === 'false') {
      primaryNav.setAttribute('data-visible', true);
      navToggle.setAttribute('aria-expanded', true);
    } else if (isVisible === 'true') {
      primaryNav.setAttribute('data-visible', false);
      navToggle.setAttribute('aria-expanded', false);
    }
  }
}
