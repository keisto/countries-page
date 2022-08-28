import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Home from '../pages/index'

const allCountries = [
  {
    name: 'Belgium',
    alpha3Code: 'BEL',
    capital: 'Brussels',
    region: 'Europe',
    population: 11555997,
    flags: { png: 'https://flagcdn.com/w320/be.png' },
  },
  {
    name: 'Austria',
    alpha3Code: 'AUT',
    capital: 'Vienna',
    region: 'Europe',
    population: 8917205,
    flags: { png: 'https://flagcdn.com/w320/at.png' },
  },
  {
    name: 'Guam',
    alpha3Code: 'ALA',
    capital: 'Hagåtña',
    region: 'Oceania',
    population: 168783,
    flags: { png: 'https://flagcdn.com/w320/gu.png' },
  },
]

beforeEach(() => {
  render(<Home countries={allCountries} />)
})

describe('Home', () => {
  it('renders a list of countries', () => {
    expect(screen.getByText('Belgium')).toBeInTheDocument()
    expect(screen.getByText('Austria')).toBeInTheDocument()
    expect(screen.getByText('Guam')).toBeInTheDocument()
    expect(screen.queryByText('United States of America')).toBeNull()
  })

  it('can filter by region dropdown', async () => {
    const searchInput = screen.getByPlaceholderText('Search for a country...')

    await userEvent.type(searchInput, 'Be')
    expect(screen.getByText('Belgium')).toBeInTheDocument()
    expect(screen.queryByText('Guam')).toBeNull()
    expect(screen.queryByText('Austria')).toBeNull()
  })

  it('can filter by search input', async () => {
    const regionOption = screen.getByRole('option', { name: 'Oceania' })

    await userEvent.click(regionOption)

    expect(screen.getByText('Guam')).toBeInTheDocument()
    expect(screen.queryByText('Belgium')).toBeNull()
    expect(screen.queryByText('Austria')).toBeNull()
  })
})
