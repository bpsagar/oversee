import React from 'react'
import { render } from 'react-dom'

import Screen from './components/Screen'

render(
  <Screen />,
  document.getElementById('screen')
)

document.body.addEventListener('click', () => {
  var element = document.body
  var requestMethod = (
    element.requestFullScreen ||
    element.webkitRequestFullScreen ||
    element.mozRequestFullScreen ||
    element.msRequestFullScreen
  )
  requestMethod.call(element);
})
