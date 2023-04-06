import '../styles/globals.css'
import type { AppProps } from 'next/app'

import NavBar from '../components/navbar';


export default function App({ Component, pageProps }: AppProps) {
  return (
      <div className={'h-screen w-full flex items-stretch flex-col xl:flex-row xl:pt-[2.5vh] '}>
        <div className={'flex xl:h-auto w-full xl:w-[7%] '}>
            <NavBar />
        </div>
          <div className={'flex h-[93.5%] xl:h-full w-full xl:w-[93%]'}>
              <Component {...pageProps} />
          </div>
      </div>
  )
}
