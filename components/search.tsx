import { memo } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Search = ({ term, onChangeCallback }) => {
  return (
    <div
      className={
        'relative w-[480px] mobile:w-full h-14 rounded-md flex items-center' +
        ' bg-white dark:bg-dark-blue shadow-lg border-2 border-transparent overflow-hidden' +
        ' hover:bg-very-light-gray hover:shadow-sm hover:border-white' +
        ' dark:hover:border-dark-blue dark:hover:bg-very-dark-blue' +
        ' focus-within:bg-very-light-gray dark:focus-within:bg-very-dark-blue focus-within:shadow-sm' +
        ' focus-within:outline outline-2 outline-[dodgerblue]' +
        ' duration-300 transition-colors'
      }
    >
      <FontAwesomeIcon
        icon={faSearch}
        className="text-lg absolute ml-9 pointer-events-none"
      />
      <input
        className="h-full w-full pl-20 pr-8 bg-transparent dark:placeholder:text-very-light-gray focus:outline-none"
        type="search"
        value={term}
        placeholder="Search for a country..."
        onChange={(e) => onChangeCallback(e.target.value)}
      />
    </div>
  )
}

export default memo(Search)
