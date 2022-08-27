import Link from 'next/link'

const Details = ({ country }) => {
  return (
    <div>
      <Link href="/">
        <a>Back</a>
      </Link>

      <div>
        <img src={country.flags.png} alt={``} />
        <div>
          <h1>{country.name}</h1>
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
  }
}

export default Details
