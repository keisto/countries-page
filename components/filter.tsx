import { memo, useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faTimes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'

import { classNames } from '../lib/utils'

const Filter = ({
  options,
  onChangeCallback,
  placeholder = 'Select a filter',
}) => {
  const [selected, setSelected] = useState()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const updateSelected = (menuOption) => {
    setSelected(menuOption)
    setOpen(false)
    onChangeCallback(menuOption)
  }

  const handleMouseClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseClick)

    return () => {
      window.removeEventListener('mousedown', handleMouseClick)
    }
  }, [])

  return (
    <div ref={ref} className="relative w-[200px]">
      {selected && (
        <button
          onClick={() => updateSelected(null)}
          className={
            'absolute right-0 mt-1.5 mr-8 p-3' +
            ' hover:text-[red] hover:scale-125 ' +
            ' transform transition-all duration-300'
          }
        >
          <FontAwesomeIcon icon={faTimes} fixedWidth />
        </button>
      )}
      <button
        className={
          'flex items-center h-14 w-full pl-6 pr-3' +
          ' bg-white dark:bg-dark-blue rounded-md shadow-lg border-2 border-transparent' +
          ' hover:bg-very-light-gray dark:hover:bg-very-dark-blue hover:shadow-sm' +
          ' hover:border-white dark:hover:border-dark-blue' +
          ' focus-within:bg-very-light-gray dark:focus-within:bg-very-dark-blue focus-within:shadow-sm' +
          ' focus-within:border-white dark:focus-within:border-dark-blue' +
          ' focus-within:outline outline-2 outline-[dodgerblue]' +
          ' transition-colors duration-300 '
        }
        onClick={() => setOpen(!open)}
      >
        <span className="flex-grow text-left">
          {selected ? selected : placeholder}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="pointer-events-none"
          fixedWidth
        />
      </button>
      <ul
        className={classNames(
          open ? 'block' : 'hidden',
          'absolute z-10 w-full h-44 mt-1.5 py-2' +
            ' bg-white dark:bg-dark-blue shadow-lg rounded-md overflow-y-scroll'
        )}
        role="listbox"
      >
        {options.map((menuOption, i) => (
          <li
            key={i}
            onClick={() => updateSelected(menuOption)}
            role="option"
            className={
              'w-full h-10 px-6 flex items-center border-y-2 border-transparent cursor-pointer' +
              ' hover:border-very-light-gray dark:hover:border-very-dark-blue hover:underline hover:font-bold'
            }
          >
            <span className="flex-grow">{menuOption}</span>
            {menuOption === selected && <FontAwesomeIcon icon={faCheck} />}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(Filter)
