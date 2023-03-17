import { 
  WagmiConfig, createClient, configureChains, 
  mainnet, goerli  
} from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect' 
import { WalletConnectLegacyConnector } from '@wagmi/core/connectors/walletConnectLegacy'
import Connectors from './views/connectors/Connectors'

import "./app.scss"

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli],
  [infuraProvider({ apiKey: '0002457bd5404ab3a48c9f35b76a4eb6' }), publicProvider()],
)

window.Buffer = window.Buffer || require("buffer").Buffer;
 
// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    // new WalletConnectConnector({
    //   chains,      
    //   options: {
    //     projectId: '0018915e8b4555922af90751e0354527',
    //     showQrModal: true,        
    //   },
    // }), 
    new WalletConnectLegacyConnector({
      chains,      
      options: {        
        qrcode: true,        
      },
    }),    
  ],
  provider,
  webSocketProvider,
})

const connector = new WalletConnectLegacyConnector({
  chains: [mainnet, goerli],
  options: {
    qrcode: true,
  },
})
 
// Pass client to React Context Provider
function App() {
  return (
    <WagmiConfig client={client}>
      <Connectors />
    </WagmiConfig>
  )
}

export default App;
