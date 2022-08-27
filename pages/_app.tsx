import '../styles/global.css'
import PageLayout from '../components/pageLayout'

const MyApp = ({ Component, pageProps }) => {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
}

export default MyApp
