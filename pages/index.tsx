import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import CountryCard from '../components/countryCard'
import Menu from '../components/menu'

const Home = ({ countries }) => {
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const regions = countries
    .reduce((acc, country) => {
      if (acc.indexOf(country.region) > -1) {
        return acc
      }

      acc.push(country.region)
      return acc
    }, [])
    .sort()

  // Applies Filter by Region and Search Term
  const filteredCountries = countries
    .filter((country) => (filter ? country.region === filter : country))
    .filter((country) =>
      search
        ? country.name.toLowerCase().includes(search.toLowerCase())
        : country
    )

  return (
    <div className="py-14 mobile:py-8">
      <div className="flex justify-between mobile:flex-col mobile:space-y-12">
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
            className="text-lg absolute ml-10 pointer-events-none"
          />
          <input
            className="h-full w-full pl-20 bg-transparent dark:placeholder:text-very-light-gray focus:outline-none"
            type="search"
            value={search}
            placeholder="Search for a country..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Menu
          options={regions}
          placeholder="Filter By Region"
          onChangeCallback={(value) => setFilter(value)}
        />
      </div>

      <ul className="flex justify-between flex-wrap mt-14 -mx-8 gap-y-20 mobile:gap-y-12">
        {filteredCountries.map((country) => (
          <CountryCard key={country.name} country={country} />
        ))}
      </ul>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('https://restcountries.com/v2/all')
  const json = await res.json()

  return { countries: json }
}

export default Home
