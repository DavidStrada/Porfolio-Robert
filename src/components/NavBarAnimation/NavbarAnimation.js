let $hamburgerIcon = document.querySelector('.HamburgerIcon')
let $navBarToggler = document.querySelector('.NavBar-toggler')
let $navBar = document.querySelector('.NavBar')
let $navBarMain = document.querySelector('.NavBar-main')

$hamburgerIcon.addEventListener('click', (evt) => {
  evt.stopPropagation()
  toggleClass($hamburgerIcon, 'is-active', !hasClass($hamburgerIcon, 'is-active'))
  toggleClass($navBarToggler, 'is-active', !hasClass($navBarToggler, 'is-active'))
  toggleClass($navBarMain, 'is-active', !hasClass($navBarMain, 'is-active'))
  toggleClass($navBar, 'is-active', !hasClass($navBar, 'is-active'))
}, false)

function toggleClass (elm, className, expr) {
  (expr ? addClass : removeClass)(elm, className)
}

function addClass (elm, className) {
  if (!hasClass(elm, className)) {
    elm.className += ' ' + className
  }
}

function removeClass (elm, className) {
  if (hasClass(elm, className)) {
    elm.className = elm.className.replace(new RegExp('(^|\\s)' + className + '(\\s|$)'), ' ').replace(/\s$/, '')
  }
}

function hasClass (elm, className) {
  return (' ' + elm.className + ' ').indexOf(' ' + className + ' ') > -1
}
