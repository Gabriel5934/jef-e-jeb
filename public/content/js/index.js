// DOM Elements
const profilePicture = document.querySelector('#profilePicture')

const signinModal = new bootstrap.Modal(document.querySelector('#signinModal'), { keyboard: false })
const signinForm = document.querySelector('#signinForm')
const signinButton = document.querySelector('#signinButton')

const signupModal = new bootstrap.Modal(document.querySelector('#signupModal'), { keyboard: false })
const signupForm = document.querySelector('#signupForm')
const signupButton = document.querySelector('#signupButton')

const accountModal = new bootstrap.Modal(document.querySelector('#accountModal'), { keyboard: false })
const userEmail = document.querySelector('#userEmail')
const signoutButton = document.querySelector('#signoutButton')

// Regular expressions
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

signinButton.addEventListener('click', (event) => {
  let email = signinForm['inputEmail'].value
  let password = signinForm['inputPassword'].value

  auth.signInWithEmailAndPassword(email, password)
  .then(credentials => {
    signinModal.toggle()
    signinForm.reset()

    profilePicture.setAttribute('data-bs-target', '#accountModal')
    userEmail.textContent = credentials.user.email
  })
  .catch(error => {
    signinForm['inputEmail'].classList.add('is-invalid')
    signinForm['inputPassword'].classList.add('is-invalid')
  })
})

signupButton.addEventListener('click', (event) => {
  let email = signupForm['inputEmail'].value
  let password = signupForm['inputPassword'].value
  let passwordConfirmation = signupForm['confirmPassword'].value

  let invalid = false

  if (!emailRegex.test(String(email).toLowerCase())) {
    signupForm['inputEmail'].classList.add('is-invalid')
    invalid = true
  }

  if (password.length < 8) {
    signupForm['inputPassword'].classList.add('is-invalid')
    invalid = true
  }

  if  (password != passwordConfirmation) {
    signupForm['confirmPassword'].classList.add('is-invalid')
    invalid = true
  }

  if (!invalid) {
    auth.createUserWithEmailAndPassword(email, password)
    .then(credentials => {
      signupModal.toggle()
      signupForm.reset()
    })
    .catch(error => {
      console.log(error)
    })
  }
})

signoutButton.addEventListener('click', (event) => {
  auth.signOut()
  .then(() => {
    accountModal.toggle()
    profilePicture.setAttribute('data-bs-target', '#signinModal')
  })
})

