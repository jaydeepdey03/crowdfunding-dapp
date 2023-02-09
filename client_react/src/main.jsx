import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import ContractcontextProvider from './Context/Contractcontext'
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
    <BrowserRouter>
      <ContractcontextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      </ContractcontextProvider>
    </BrowserRouter>
  </ThirdwebProvider>
)
