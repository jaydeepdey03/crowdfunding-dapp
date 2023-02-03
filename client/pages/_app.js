import '../styles/globals.css'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import ContractcontextProvider from '../Context/Contractcontext'

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <ContractcontextProvider>
        <Component {...pageProps} />
      </ContractcontextProvider>
    </ThirdwebProvider>
  )
}
