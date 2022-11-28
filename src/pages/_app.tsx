import '../client/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../client/app/store'
import { fetchCategories } from '../client/features/category/categories-slice'
import React from 'react'

store.dispatch(fetchCategories())

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
