import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @tracked userInput = '';
  @service auth;

  @action
  submitUserInput(event) {
    // prevents page reloading and resetting isLoggedIn back to false
    event.preventDefault();

    const inputUsername = event.target.querySelector('#username').value;
    const inputPassword = event.target.querySelector('#psw').value;
    // call login() from auth service to set this.auth.isLoggedIn to true if login successful
    let player_id = this.auth.login(inputUsername, inputPassword);

    if (this.auth.isLoggedIn == 'true') {
      this.auth.getRoster(player_id);
    }
  }

  @action
  visibilityLogin(isVisible, formContainer, darkBg) {
    // need to declare variables here instead of using const

    // assign ul menu to primaryNav and use its data-visible property
    formContainer = document.querySelector('.form-container');
    isVisible = formContainer.getAttribute('data-visible');
    darkBg = document.querySelector('.dark-bg');

    if (isVisible === 'false') {
      formContainer.setAttribute('data-visible', true);
      darkBg.setAttribute('data-visible', true);
    } else if (isVisible === 'true') {
      formContainer.setAttribute('data-visible', false);
      darkBg.setAttribute('data-visible', false);
    }
  }

  @action expandLoginContainer(expand, formContainer){
    formContainer = document.querySelector('.form-container');
    expand = formContainer.getAttribute('expand');

    if(expand === 'false'){
      formContainer.setAttribute('expand', true);
    }
  }
}
