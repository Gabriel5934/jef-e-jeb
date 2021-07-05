// DOM Elements
const LIKE_BUTTON = document.querySelector('#likeButton')
const LIKE_COUNT = document.querySelector('#likeCount')

// Like Button
LIKE_BUTTON.addEventListener('click', () => {
  LIKE_BUTTON.childNodes[0].classList.toggle('bi-heart')
  LIKE_BUTTON.childNodes[0].classList.toggle('text-danger')

  let addingLike = LIKE_BUTTON.childNodes[0].classList.toggle('bi-heart-fill')

  if (addingLike) {
    LIKE_COUNT.textContent = parseInt(LIKE_COUNT.textContent) + 1
  } else {
    LIKE_COUNT.textContent = parseInt(LIKE_COUNT.textContent) - 1
  }
})