import Link from 'next/link'
import { useEffect, useState } from 'react'

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

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      {/*  Searchbar TODO extract to component */}
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setFilter(e.target.value)}>
          <option selected disabled>
            Filter By Region
          </option>
          <option value="All">All</option>
          {regions.map((region) => (
            <option value={region}>{region}</option>
          ))}
        </select>
      </div>

      {/* TODO: MAKE CARD and style*/}
      <ul className="counties">
        {countries
          .filter((country) => {
            if (!filter || filter === 'All') return country
            return country.region === filter
          })
          .filter((country) => {
            if (!search) return country
            return country.name.toLowerCase().includes(search.toLowerCase())
          })
          .map((country) => {
            return (
              <Link href={`/countries/${country.alpha3Code}`}>
                <li key={country.name} className="card">
                  <a>
                    <img src={country.flags.png} alt={`${country.name} flag`} />
                    <div className="card-body">
                      <h2>{country.name}</h2>
                      <p>
                        <strong>Population:</strong> {country.population}
                      </p>
                      <p>
                        <strong>Region:</strong> {country.region}
                      </p>
                      <p>
                        <strong>Capital:</strong> {country.capital}
                      </p>
                    </div>
                  </a>
                </li>
              </Link>
            )
          })}
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
