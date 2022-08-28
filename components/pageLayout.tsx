import Head from 'next/head'

import NavBar from './navBar'

// export const ThemeContext = createContext()

const PageLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Where in the world?</title>
      </Head>

      <NavBar />
      <main className="max-w-[1440px] mx-auto px-20 mobile:px-8">
        {children}
      </main>
    </>
  )
}

export default PageLayout
