import '../client/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../client/app/store'
import { fetchCategories } from '../client/features/category/categories-slice'
import React from 'react'
import Head from 'next/head'

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
