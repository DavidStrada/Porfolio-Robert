import Siema from 'siema'

const mySiema = new Siema({
  perPage: {
    768: 2,
    1140: 3
  }
})
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')

prev.addEventListener('click', () => mySiema.prev())
next.addEventListener('click', () => mySiema.next())
