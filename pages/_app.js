import '@/styles/globals.css'
import { WeddingProvider } from '@/context/WeddingContext'
import SearchModal from '@/components/SearchModal'
import NotificationToast from '@/components/NotificationToast'
import GlobalConfetti from '@/components/GlobalConfetti'

export default function App({ Component, pageProps }) {
  return (
    <WeddingProvider>
      <GlobalConfetti />
      <Component {...pageProps} />
      <SearchModal />
      <NotificationToast />
    </WeddingProvider>
  )
}
