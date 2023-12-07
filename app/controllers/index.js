import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @action
  visibilityLogin(isVisible, formPopup, darkBg) {
    // need to declare variables here instead of using const

    // assign ul menu to primaryNav and use its data-visible property
    formPopup = document.querySelector('.form-container');
    isVisible = formPopup.getAttribute('data-visible');
    darkBg = document.querySelector('.dark-bg');

    console.log('hello');
    if (isVisible === 'false') {
      formPopup.setAttribute('data-visible', true);
      darkBg.setAttribute('data-visible', true);
    } else if (isVisible === 'true') {
      formPopup.setAttribute('data-visible', false);
      darkBg.setAttribute('data-visible', false);
    }
  }
}
