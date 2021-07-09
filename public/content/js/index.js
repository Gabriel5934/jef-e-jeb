// Media Breakpoints
const TABLET_768 = window.matchMedia("(max-width: 768px)")

// Regular expressions
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// GlideJS
let perViewVar = 4

if (TABLET_768.matches) {
  perViewVar =  3
}

new Glide('.glide', {
  perView: perViewVar,
  focusAt: 0,
  type: 'carousel',
  gap: 15,
}).mount()


