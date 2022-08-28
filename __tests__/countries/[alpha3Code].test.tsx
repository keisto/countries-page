import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Details from '../../pages/countries/[alpha3Code]'

const country = {
  name: 'Belgium',
  nativeName: 'België',
  topLevelDomain: ['.be'],
  alpha3Code: 'BEL',
  capital: 'Brussels',
  subregion: 'Western Europe',
  region: 'Europe',
  population: 11555997,
  borders: ['FRA', 'DEU', 'LUX', 'NLD'],
  flags: {
    png: 'https://flagcdn.com/w320/be.png',
  },
  currencies: [{ code: 'EUR', name: 'Euro', symbol: '€' }],
  languages: [
    {
      name: 'Dutch',
    },
    {
      name: 'French',
    },
    {
      name: 'German',
    },
  ],
}

const borders = [
  {
    name: 'France',
    alpha3Code: 'FRA',
  },
  {
    name: 'Germany',
    alpha3Code: 'DEU',
  },
  {
    name: 'Luxembourg',
    alpha3Code: 'LUX',
  },
  {
    name: 'Netherlands',
    alpha3Code: 'NLD',
  },
]

beforeEach(() => {
  render(<Details country={country} borders={borders} />)
})

describe('Details', () => {
  it('shows country details', () => {
    expect(screen.getByText('België')).toBeInTheDocument()
    expect(screen.getByText('11555997')).toBeInTheDocument()
    expect(screen.getByText('Europe')).toBeInTheDocument()
    expect(screen.getByText('Western Europe')).toBeInTheDocument()
    expect(screen.getByText('Brussels')).toBeInTheDocument()
  })

  it('formats languages to string', () => {
    expect(screen.getByText('Dutch, French, German')).toBeInTheDocument()
  })

  it('formats currencies to string', () => {
    expect(screen.getByText('Euro')).toBeInTheDocument()
  })

  it('formats topLevelDomain to to string', () => {
    expect(screen.getByText('.be')).toBeInTheDocument()
  })

  it('has links to border countries', () => {
    expect(screen.getByRole('link', { name: 'France' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Germany' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Luxembourg' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Netherlands' })
    ).toBeInTheDocument()
  })
})
