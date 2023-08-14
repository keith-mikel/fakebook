const loginFormHandler = async (event) => {
    // Stopping the browser from submitting the form so we can handle it ourselves.
    event.preventDefault();

    // Getting the value out of the form inputs/ Get the data from the login info and put it in a js object.
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {

      // Sending the information to the backend to process.
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);