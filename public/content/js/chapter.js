// DOM Elements
const LIKE_BUTTON = document.querySelector('#likeButton')
const LIKE_COUNT = document.querySelector('#likeCount')
const COUNTER_CLASS = document.querySelectorAll('.counter')

// Window objects
URL = window.location.href.split('/')
CHAPTER_NUMBER = parseInt(URL[URL.length - 1])

// Firestore 
const INCREMENT = firebase.firestore.FieldValue.increment(1)
const DECREMENT = firebase.firestore.FieldValue.increment(-1)
const APPEND = (value) => firebase.firestore.FieldValue.arrayUnion(value)
const REMOVE = (value) => firebase.firestore.FieldValue.arrayRemove(value)
const CURR_CHAPTER_REF = db.collection('chapters').doc(`chapter-1`)

// Likes 
db.collection('chapters').where('number', '==', CHAPTER_NUMBER).get().then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    LIKE_COUNT.textContent = doc.data().likes
  })
})

let likedChapters = []

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection('chapters').where('who_liked', 'array-contains', user.uid).get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        likedChapters.push(doc.data().number)
      })
      if (likedChapters.includes(CHAPTER_NUMBER)) {
        LIKE_BUTTON.childNodes[0].classList.toggle('bi-heart')
        LIKE_BUTTON.childNodes[0].classList.toggle('text-danger')
        LIKE_BUTTON.childNodes[0].classList.toggle('bi-heart-fill')
      }
      COUNTER_CLASS.forEach((node) => { 
        node.classList.toggle('hidden') 
      })
    })
  }
});

LIKE_BUTTON.addEventListener('click', () => {
  if (auth.currentUser) {
    LIKE_BUTTON.childNodes[0].classList.toggle('bi-heart')
    LIKE_BUTTON.childNodes[0].classList.toggle('text-danger')

    let addingLike = LIKE_BUTTON.childNodes[0].classList.toggle('bi-heart-fill')

    if (addingLike) {
      LIKE_COUNT.textContent = parseInt(LIKE_COUNT.textContent) + 1
      CURR_CHAPTER_REF.update({ likes: INCREMENT })
      CURR_CHAPTER_REF.update({ who_liked: APPEND(auth.currentUser.uid) })
    } else {
      LIKE_COUNT.textContent = parseInt(LIKE_COUNT.textContent) - 1
      CURR_CHAPTER_REF.update({ likes: DECREMENT })
      CURR_CHAPTER_REF.update({ who_liked: REMOVE(auth.currentUser.uid) })
    }
  } else {
    SIGNIN_MODAL.show()
  }
})
