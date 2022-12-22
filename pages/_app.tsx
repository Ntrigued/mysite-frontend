import '../styles/globals.css'
import type { AppProps } from 'next/app'

import NavBar from '../components/navbar';


export default function App({ Component, pageProps }: AppProps) {
  return (
      <div className={'h-screen flex flex-1 items-stretch flex-col lg:flex-row'}>
        <NavBar />
        <Component {...pageProps} />
      </div>
  )
}
