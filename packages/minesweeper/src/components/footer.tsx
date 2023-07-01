import React from 'react'
import { useDarkMode } from 'usehooks-ts'
import { Icon } from '@iconify/react'

export default function Footer () {
  const { isDarkMode, toggle, enable, disable } = useDarkMode()

  const modeSwitch = () => {
    toggle()
    document.documentElement.classList.toggle('dark', !isDarkMode)
  }

  return (
    <nav className="text-3xl mt-6 inline-flex gap-2">
      <button className="icon-btn" onClick={modeSwitch}>{ !isDarkMode ? <Icon icon='ph:sun'/> : <Icon icon='ph:moon'/> }</button>

      <a className="icon-btn" href="https://github.com/prall1024/react-mould" target="_blank" rel="noreferrer"><Icon icon="mdi:github"/></a>
    </nav>
  )
}
