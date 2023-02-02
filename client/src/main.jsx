import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </ThirdwebProvider>
)
