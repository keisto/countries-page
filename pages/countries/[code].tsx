import Link from 'next/link'
import DescriptionList from '../../components/descriptionList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Details = ({ country, countries }) => {
  const descriptionList = [
    {
      term: 'Native Name',
      details: country.nativeName,
    },
    {
      term: 'Population',
      details: country.population,
    },
    {
      term: 'Region',
      details: country.region,
    },
    {
      term: 'Sub Region',
      details: country.subregion,
    },
    {
      term: 'Capital',
      details: country.capital,
    },
  ]

  const secondaryDescriptionList = [
    {
      term: 'Top Level Domain',
      details: country.topLevelDomain?.join(', ') || 'N/A',
    },
    {
      term: 'Currencies',
      details:
        country.currencies
          ?.reduce((acc, lang) => [...acc, lang.name], [])
          .join(', ') || 'N/A',
    },
    {
      term: 'Languages',
      details:
        country.languages
          ?.reduce((acc, lang) => [...acc, lang.name], [])
          .join(', ') || 'N/A',
    },
  ]

  const borders = [
    {
      term: 'Border Countries',
      details: country.borders ? (
        <ul className="flex flex-wrap mx-2 -mt-2 mobile:-mx-1.5 mobile:mt-2">
          {country.borders.map((alpha3Code, i) => (
            <li>
              <Link href={`/countries/${alpha3Code}`} key={i}>
                <a
                  className={
                    'h-8 min-w-[100px] px-3 flex items-center justify-center' +
                    ' bg-white dark:bg-dark-blue shadow-lg rounded-md m-1.5'
                  }
                >
                  {countries.find((c) => c.alpha3Code === alpha3Code)?.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        'N/A'
      ),
    },
  ]

  return (
    <div className="text-lg py-20 mobile:py-12">
      <Link href="/">
        <a
          className={
            'block h-12 w-40 flex items-center justify-center space-x-2' +
            ' bg-white dark:bg-dark-blue rounded-md shadow-lg'
          }
        >
          <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
          <span>Back</span>
        </a>
      </Link>

      <div className="mt-20 mobile:mt-12 grid grid-cols-[5fr,_1fr,_5fr] mobile:grid-cols-1">
        <img
          src={country.flags.svg}
          alt={`${country.name} flag`}
          className="w-full shadow-2xl object-cover h-[400px] mobile:h-[220px]"
        />
        <div className="w-full self-center mobile:mt-12 col-start-3 mobile:col-start-1">
          <h1 className="text-3xl mobile:text-xl font-extra-bold">
            {country.name}
          </h1>
          <div className="flex justify-between mt-8 space-x-4 mobile:flex-col mobile:space-y-12 mobile:space-x-0">
            <DescriptionList items={descriptionList} />
            <DescriptionList items={secondaryDescriptionList} />
          </div>

          <DescriptionList items={borders} className="mt-12" />
        </div>
      </div>
    </div>
  )
}

Details.getInitialProps = async (ctx) => {
  const res = await fetch('https://restcountries.com/v2/all')
  const json = await res.json()

  return {
    country: json.find((country) => country.alpha3Code === ctx.query.code),
    countries: json,
  }
}

export default Details
