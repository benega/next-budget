import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import '../core/client/assets/globals.css'
import { store } from '../core/client/data/store'
import { fetchCategories } from '../features/category/client/data/categories-slice'

store.dispatch(fetchCategories())

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="bg-blue-50">
        <Head>
          <title>Next Budget</title>
          <meta name="description" content="Next Budget App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </div>
    </Provider>
  )
}
