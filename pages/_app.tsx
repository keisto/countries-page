// import '@fortawesome/fontawesome-svg-core/styles.css'
// import { config } from '@fortawesome/fontawesome-svg-core'

import '../styles/global.css'
import PageLayout from '../components/pageLayout'

// config.autoAddCss = false

const MyApp = ({ Component, pageProps }) => {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
}

export default MyApp
