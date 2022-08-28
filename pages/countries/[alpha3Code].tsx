import Link from 'next/link'
import Image from 'next/image'
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DescriptionList from '../../components/descriptionList'

const Details = ({ country, borders }) => {
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

  const bordersDescriptionList = [
    {
      term: 'Border Countries',
      details:
        borders.length > 0 ? (
          <ul className="flex flex-wrap mx-2 -mt-2 mobile:-mx-1.5 mobile:mt-2">
            {borders.map((borderCountry, i) => (
              <li key={i}>
                <Link href={`/countries/${borderCountry.alpha3Code}`} passHref>
                  <a
                    className={
                      'py-1.5 min-w-[100px] px-3 flex justify-center' +
                      ' bg-white dark:bg-dark-blue shadow-lg rounded-md m-1.5'
                    }
                  >
                    {borderCountry.name}
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
    <div className="text-lg py-16 mobile:py-12">
      <Link href="/">
        <a
          className={
            'py-2 px-8 inline-flex items-center justify-center space-x-2' +
            ' bg-white dark:bg-dark-blue rounded-md shadow-lg'
          }
        >
          {/*<FontAwesomeIcon icon={faArrowLeft} fixedWidth />*/}
          <span>Back</span>
        </a>
      </Link>

      <div className="mt-20 mobile:mt-12 grid grid-cols-[5fr,_1fr,_5fr] mobile:grid-cols-1">
        <div>
          <Image
            src={country.flags.png}
            alt={`${country.name} flag`}
            className="shadow-2xl"
            layout="responsive"
            width={560}
            height={400}
          />
        </div>
        <div className="w-full mt-12 col-start-3 mobile:col-start-1">
          <h2 className="text-3xl mobile:text-xl font-extra-bold">
            {country.name}
          </h2>
          <div className="flex justify-between mt-8 space-x-4 mobile:flex-col mobile:space-y-12 mobile:space-x-0">
            <DescriptionList items={descriptionList} />
            <DescriptionList items={secondaryDescriptionList} />
          </div>

          <DescriptionList items={bordersDescriptionList} className="mt-12" />
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const countryCode = context.params['alpha3Code']
  const res = await fetch('https://restcountries.com/v2/all')
  const countries = await res.json()

  const country = countries.find(
    (country) => country.alpha3Code === countryCode
  )
  const borders =
    countries.filter((c) => country.borders?.includes(c.alpha3Code)) || []

  return {
    props: {
      country,
      borders,
    },
  }
}

export async function getStaticPaths() {
  const res = await fetch('https://restcountries.com/v2/all')
  const countries = await res.json()
  const paths = countries.map(({ alpha3Code }) => ({ params: { alpha3Code } }))

  return {
    paths,
    fallback: false,
  }
}

export default Details
