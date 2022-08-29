import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon as faMoonOn } from '@fortawesome/free-solid-svg-icons'
import { faMoon as faMoonOff } from '@fortawesome/free-regular-svg-icons'

import useTheme from '../hooks/useTheme'

const NavBar = () => {
  const { theme, toggleTheme } = useTheme()
  const icon = theme === 'dark' ? faMoonOn : faMoonOff

  return (
    <nav className="bg-white dark:bg-dark-blue shadow-md">
      <div className="max-w-desktop mx-auto h-[80px] px-20 mobile:px-8 flex items-center justify-between">
        <Link href="/">
          <a className="py-3 hover:opacity-75 transform hover:scale-95 transition-all duration-300">
            <h1 className="text-2xl mobile:text-xl font-extra-bold">
              Where in the world?
            </h1>
          </a>
        </Link>
        <button
          onClick={toggleTheme}
          className={
            'flex items-center gap-2.5 py-3 text-lg mobile:text-base underline-offset-4' +
            ' decoration-wavy decoration-2 decoration-[cyan] dark:decoration-[magenta] ' +
            ' hover:underline'
          }
        >
          <FontAwesomeIcon icon={icon} className="-rotate-[30deg]" />
          Dark Mode
        </button>
      </div>
    </nav>
  )
}

export default NavBar
