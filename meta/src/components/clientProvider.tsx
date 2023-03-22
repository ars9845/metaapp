import { 
    createClient, configureChains, 
    mainnet, goerli  
  } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, goerli],
    [infuraProvider({ apiKey: '0002457bd5404ab3a48c9f35b76a4eb6' }), publicProvider()],
)  
window.Buffer = window.Buffer || require("buffer").Buffer;
   
// Set up client Provider
const clientProvider = createClient({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new WalletConnectConnector({
        chains,      
        options: {
            projectId: '0018915e8b4555922af90751e0354527',
            showQrModal: true,        
        },
        }),    
    ],
    provider,
    webSocketProvider,
}) 
export default clientProvider;
