/* Constants ---------- */
// DOM Elements
const PROFILE_PICTURE = document.querySelector('#profilePicture')

const SIGNIN_MODAL = new bootstrap.Modal(document.querySelector('#signinModal'), { keyboard: true })
const SIGNIN_FORM = document.querySelector('#signinForm')
const SIGNIN_BUTTON = document.querySelector('#signinButton')
const SIGNIN_GOOGLE_BUTTON = document.querySelector('.google-btn')

const SIGNUP_MODAL = new bootstrap.Modal(document.querySelector('#signupModal'), { keyboard: true })
const SIGNUP_FORM = document.querySelector('#signupForm')
const SIGNUP_BUTTON = document.querySelector('#signupButton')
const PROFILE_PICTURE_INPUT = document.querySelector('#profilePictureInput')

const ACCOUNT_MODAL = new bootstrap.Modal(document.querySelector('#accountModal'), { keyboard: true })
const USER_EMAIL = document.querySelector('#userEmail')
const USER_PICTURE = document.querySelector('.profilePicture')
const SIGNOUT_BUTTON = document.querySelector('#signoutButton')
const USERNAME = document.querySelector('#inputUsername')
const CHANGE_PICTURE_INPUT = document.querySelector('#changePictureInput')
const CHANGE_PICTURE = document.querySelector('#changePicture')
const PROFILE_PICTURE_FORM = document.querySelector('#profilePictureForm')

// Regular expressions
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Firebase
const STORAGE_REF = firebase.storage().ref()
const GOOGLE_PROVIDER = new firebase.auth.GoogleAuthProvider();

// Display user data when page loads
if (auth.currentUser) {
  toggleUserData(auth.currentUser)
}

// Default language for google auth interface
firebase.auth().useDeviceLanguage();

/* Functions ---------- */
// Hide or display user data
const toggleUserData = async (user) => {
  if (user) {
    PROFILE_PICTURE.setAttribute('data-bs-target', '#accountModal')
    if (user.photoURL && sessionStorage.getItem('photoURL')) {
      PROFILE_PICTURE.src = sessionStorage.getItem('photoURL')
    } else if (user.photoURL) {
      PROFILE_PICTURE.src = user.photoURL
    }
    USER_PICTURE.src = user.photoURL ? user.photoURL : '/content/images/user.png'
    USER_EMAIL.value = user.email
    USERNAME.value = user.displayName
  } else {
    PROFILE_PICTURE.src = '/content/images/user.png'
    PROFILE_PICTURE.setAttribute('data-bs-target', '#signinModal')
    USER_EMAIL.value = ' '
    USER_PICTURE.src = ' '
    USERNAME.value = ' '
  }
}

// Get downloadable URL for new users profile pictures
const getDownloadableURL = (user) => {
  return new Promise((resolve, reject) => {
    STORAGE_REF.child(`profile_pictures/${user.uid}`).getDownloadURL().then(function(url) {
      sessionStorage.setItem('photoURL', url)
      resolve(sessionStorage.getItem('photoURL'))
    }) 
  })
}

// Auth state listener
firebase.auth().onAuthStateChanged((user) => {
  if (!user) { // Not logged in
    toggleUserData(user)
    sessionStorage.clear();
  } else if (user){ // Just logged in
    toggleUserData(user)
    SIGNIN_MODAL.hide()
    SIGNIN_FORM.reset()

    if (user.providerData[0].providerId == 'google.com') {
      PROFILE_PICTURE_FORM.classList.add('hidden')
    }
  }
});

// Sign in logic
SIGNIN_BUTTON.addEventListener('click', (event) => {
  let email = SIGNIN_FORM['inputEmail'].value
  let password = SIGNIN_FORM['inputPassword'].value

  auth.signInWithEmailAndPassword(email, password).then((credentials) => {
    SIGNIN_MODAL.toggle()
    SIGNIN_FORM.reset()

    toggleUserData(auth.currentUser)
  })
  .catch(error => {
    SIGNIN_FORM['inputEmail'].classList.add('is-invalid')
    SIGNIN_FORM['inputPassword'].classList.add('is-invalid')
  })
})

SIGNIN_GOOGLE_BUTTON.addEventListener('click', (event) => {
  auth.signInWithPopup(GOOGLE_PROVIDER)
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
    .then((credentials) => {
      console.log(credentials)
      let x = credentials
      credentials.user.updateProfile({
        displayName: credentials.user.email.split('@')[0]
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
})

// Sign out logic
SIGNOUT_BUTTON.addEventListener('click', (event) => {
  ACCOUNT_MODAL.toggle()
  auth.signOut()
})

// Updload profile picture and change users photoURL
CHANGE_PICTURE.addEventListener('click', (event) => {
  if (CHANGE_PICTURE_INPUT.files[0]) {
    CHANGE_PICTURE.classList.toggle('disabled')
    const PROFILE_PICTURE_STORAGE = STORAGE_REF.child(`profile_pictures/${auth.currentUser.uid}`)
    PROFILE_PICTURE_STORAGE.put(CHANGE_PICTURE_INPUT.files[0])
    .then(() => {
      getDownloadableURL(auth.currentUser).then((url) => {
        auth.currentUser.updateProfile({
          photoURL: url
        }).then(() => {
          toggleUserData(auth.currentUser)
          PROFILE_PICTURE_FORM.reset()
          CHANGE_PICTURE.classList.toggle('disabled')
        })
      })
    })
  }
})
