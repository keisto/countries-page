import Link from 'next/link'
import DescriptionList from './descriptionList'

const CountryCard = ({ country }) => {
  const descriptionList = [
    {
      term: 'Population',
      details: country.population,
    },
    {
      term: 'Region',
      details: country.region,
    },
    {
      term: 'Capital',
      details: country.capital,
    },
  ]

  return (
    <Link href={`/countries/${country.alpha3Code}`}>
      <li
        className={
          'w-[264px] h-[340px] mx-8 mobile:mx-auto bg-dark-blue shadow-lg rounded-md overflow-hidden cursor-pointer' +
          ' hover:scale-105 hover:shadow-2xl transform transition-all duration-300'
        }
      >
        <a>
          <img
            src={country.flags.svg}
            alt={`${country.name} flag`}
            className="h-[152px] w-full object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-extra-bold">{country.name}</h2>
            <DescriptionList
              items={descriptionList}
              className="mt-6 space-y-0.5"
            />
          </div>
        </a>
      </li>
    </Link>
  )
}

export default CountryCard
