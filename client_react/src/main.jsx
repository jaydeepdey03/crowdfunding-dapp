import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import "./index.css";
import ContractcontextProvider from "./Context/Contractcontext";
import {ThirdwebProvider, ChainId} from "@thirdweb-dev/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      activeChain="mumbai"
      supportedWallets={[
        metamaskWallet({recommended: true}),
        coinbaseWallet(),
        walletConnect(),
        safeWallet({
          personalWallets: [
            metamaskWallet(),
            coinbaseWallet(),
            walletConnect(),
          ],
        }),
        rainbowWallet(),
        phantomWallet(),
      ]}
    >
      <BrowserRouter>
        <ContractcontextProvider>
          <App />
        </ContractcontextProvider>
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);
