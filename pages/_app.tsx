import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil';
import '../extentions';
import Toast from '@/components/toast';

export default function App({ Component, pageProps }: AppProps) {
  return <RecoilRoot>
    <Component {...pageProps} />
    <div id='toast'>
      <Toast/>
    </div>
    <div id='popup'/>
  </RecoilRoot>
}
