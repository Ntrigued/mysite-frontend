import '../styles/globals.css'
import type { AppProps } from 'next/app'

import NavBar from '../components/navbar';


export default function App({ Component, pageProps }: AppProps) {
  return (
      <div className={'h-screen w-screen flex ' +
          'items-stretch flex-col xl:flex-row'}>
        <NavBar />
        <Component {...pageProps} />
      </div>
  )
}
