'use strict';

const main = () => {
  let formData = {
    valid: false
  },
    fieldsWithError = [];

  const inputs = $('.field input, .field select');

  // clear form data
  const getCleanFormData = () => {
    formData = {
      username: '',
      email: '',
      password: '',
      repeatedPassword: '',
      gender: '',
    }
    for (let item in formData) {
      $(`input#${item}`).val('');
    }
    $('#gender').val($('#gender option:first').val());
  }

  const checkForInputErrors = ({ value, name, id }) => {
    const inputError = $(`#${id}`).siblings(`.errors`),
      email = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');

    let errorMessage = null;

    if (value === '') {
      errorMessage = 'field must not be empty';
    } else if (name === 'email') {
      errorMessage = !email.test(value) ? 'Please enter a valid email address' : null;
    } else if (value.length < 5 &&
        (name === 'username' || name === 'password')) {
      errorMessage = 'too short! (min. 5 characters)';
    } else if (name === 'repeat-password' &&
      ($('#password').val() !== value)) {
      errorMessage = `Passwords don't match! check again`
    } else if (value !== formData[name]) {
      errorMessage = `Something's wrong`
    } else {
      errorMessage = null;
    }

    if (errorMessage) {
      inputError.html(errorMessage);
      fieldsWithError.push(name);
    }
  }

  inputs.change(({ target }) => {
    const inputError = $(`#${target.id}`).siblings(`.errors`);
    inputError.html('');
    fieldsWithError.splice(fieldsWithError.indexOf(target.name), 1);
  })

  // check input field validity
  inputs.focusout(({ target }) => {
    formData[target.name] = target.value;

    checkForInputErrors(target);
  });

  // clean button
  $('#clearform').click(() => {
    getCleanFormData();
  })

  // submit form
  $('#form').submit(e => {
    e.preventDefault();
    fieldsWithError = [];

    const { target } = e,
      inputs = [target[0], target[1], target[2], target[3], target[4]];

    inputs.forEach(i => checkForInputErrors(i));

    formData.valid = fieldsWithError.length === 0;

    alert(formData.valid ?
      'Submitted data is OK!'
    :
      `${fieldsWithError} field${fieldsWithError.length > 1 ? 's have' : ' has'} errors`);
  });
}

$(document).ready(main);