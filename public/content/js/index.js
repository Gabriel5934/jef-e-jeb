// Media Breakpoints
const TABLET_768 = window.matchMedia("(max-width: 768px)")

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


