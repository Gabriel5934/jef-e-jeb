// DOM Elements
const PROFILE_PICTURE = document.querySelector('#profilePicture')

const SIGNIN_MODAL = new bootstrap.Modal(document.querySelector('#signinModal'), { keyboard: false })
const SIGNIN_FORM = document.querySelector('#signinForm')
const SIGNIN_BUTTON = document.querySelector('#signinButton')

const SIGNUP_MODAL = new bootstrap.Modal(document.querySelector('#signupModal'), { keyboard: false })
const SIGNUP_FORM = document.querySelector('#signupForm')
const SIGNUP_BUTTON = document.querySelector('#signupButton')

const ACCOUNT_MODAL = new bootstrap.Modal(document.querySelector('#accountModal'), { keyboard: false })
const USER_EMAIL = document.querySelector('#userEmail')
const SIGNOUT_BUTTON = document.querySelector('#signoutButton')

// Authentication
// Auth state listener
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    PROFILE_PICTURE.setAttribute('data-bs-target', '#accountModal')
    USER_EMAIL.textContent = auth.currentUser.email
  } else {
    ACCOUNT_MODAL.hide()
    PROFILE_PICTURE.setAttribute('data-bs-target', '#signinModal')
  }
});

// Sign in logic
SIGNIN_BUTTON.addEventListener('click', (event) => {
  let email = SIGNIN_FORM['inputEmail'].value
  let password = SIGNIN_FORM['inputPassword'].value

  auth.signInWithEmailAndPassword(email, password).then(() => {
    SIGNIN_MODAL.toggle()
    SIGNIN_FORM.reset()
  })
  .catch(error => {
    SIGNIN_FORM['inputEmail'].classList.add('is-invalid')
    SIGNIN_FORM['inputPassword'].classList.add('is-invalid')
  })
})

// Sign up logic
SIGNUP_BUTTON.addEventListener('click', (event) => {
  let email = SIGNUP_FORM['inputEmail'].value
  let password = SIGNUP_FORM['inputPassword'].value
  let passwordConfirmation = SIGNUP_FORM['confirmPassword'].value

  let invalid = false

  if (!EMAIL_REGEX.test(String(email).toLowerCase())) {
    SIGNUP_FORM['inputEmail'].classList.add('is-invalid')
    invalid = true
  }

  if (password.length < 8) {
    SIGNUP_FORM['inputPassword'].classList.add('is-invalid')
    invalid = true
  }

  if  (password != passwordConfirmation) {
    SIGNUP_FORM['confirmPassword'].classList.add('is-invalid')
    invalid = true
  }

  if (!invalid) {
    auth.createUserWithEmailAndPassword(email, password)


    .then(credentials => {
      SIGNUP_MODAL.toggle()
      SIGNUP_FORM.reset()
    })
    .catch(error => {
      console.log(error)
    })
  }
})

// Sign out logic
SIGNOUT_BUTTON.addEventListener('click', (event) => {
  auth.signOut()
})