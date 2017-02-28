import animatedScrollTo from 'animated-scrollto'

let $NavBarLinks = document.querySelector('.NavBar-links')
let $hamburgerIcon = document.querySelector('.HamburgerIcon')
let event = document.createEvent('HTMLEvents')

event.initEvent('click', true, false)

$NavBarLinks.addEventListener('click', (evt) => {
  // evt.preventDefault()
  if (evt.target && evt.target.nodeName === 'A') {
    // console.log(document.querySelector(`${evt.target.hash}`).offsetTop)
    // Cache elements to avoid query them more than once
    animatedScrollTo(
        document.body, // element to scroll with (most of times you want to scroll with whole <body>)
        document.querySelector(`${evt.target.hash}`).offsetTop, // target scrollY (0 means top of the page)
        800, // duration in ms
        function () { // callback function that runs after the animation (optional)
          console.log('done!')
          // $hamburgerIcon.dispatchEvent('click')
          $hamburgerIcon.dispatchEvent(event)
        }
    )
  }
  // console.log('clicked', evt)
})
