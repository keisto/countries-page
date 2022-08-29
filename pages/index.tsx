import { useState, useCallback, useMemo } from 'react'

import Filter from '../components/filter'
import Search from '../components/search'
import CountryCard from '../components/countryCard'

// Applies Filter by Region and Search Term - Memoized
const filteredCountries = (allCountries, filter, search) =>
  allCountries
    .filter((country) => (filter ? country.region === filter : country))
    .filter((country) =>
      search
        ? country.name.toLowerCase().includes(search.toLowerCase())
        : country
    )

const Home = ({ allCountries }) => {
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')

  const countries = useMemo(
    () => filteredCountries(allCountries, filter, search),
    [allCountries, filter, search]
  )

  const getRegions = useCallback(
    () =>
      allCountries
        .reduce((acc, country) => {
          if (acc.indexOf(country.region) > -1) {
            return acc
          }

          acc.push(country.region)
          return acc
        }, [])
        .sort(),
    [allCountries]
  )

  return (
    <div className="py-14 mobile:py-8">
      <div className="flex justify-between mobile:flex-col mobile:space-y-12">
        <Search term={search} onChangeCallback={(value) => setSearch(value)} />

        <Filter
          options={getRegions()}
          placeholder="Filter By Region"
          onChangeCallback={(value) => setFilter(value)}
        />
      </div>

      <ul className="flex justify-between flex-wrap mt-14 -mx-8 gap-y-20 mobile:gap-y-12">
        {countries.map((country) => (
          <CountryCard key={country.name} country={country} />
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://restcountries.com/v2/all')
  const allCountries = await res.json()

  return { props: { allCountries } }
}

export default Home
