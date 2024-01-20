import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class IndexController extends Controller {
  // set up session to see if user is logged in
  @tracked userInput = '';
  @action
  submitUserInput(event) {
    event.preventDefault();
    const inputUsername = event.target.querySelector('#username').value;
    const inputPassword = event.target.querySelector('#psw').value;
    this.checkLogin(inputUsername, inputPassword);
  }


  @action
  checkLogin(username, password){
    console.log(username,password)

  }
  @action
  visibilityLogin(isVisible, formPopup, darkBg) {
    // need to declare variables here instead of using const

    // assign ul menu to primaryNav and use its data-visible property
    formPopup = document.querySelector('.form-container');
    isVisible = formPopup.getAttribute('data-visible');
    darkBg = document.querySelector('.dark-bg');

    if (isVisible === 'false') {
      formPopup.setAttribute('data-visible', true);
      darkBg.setAttribute('data-visible', true);
    } else if (isVisible === 'true') {
      formPopup.setAttribute('data-visible', false);
      darkBg.setAttribute('data-visible', false);
    }
  }
}
