import { useEffect, useState } from "react"
import Navbar from "../Components/Navbar"
import useGlobalState from "../Hooks/useGlobalState"
// import { useRouter } from "next/router"}

const Main = () => {
    // const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [campaign, setCampaign] = useState([])
    const { address, getCampaign, ChainId, useNetwork, useNetworkMismatch, Web3Button, contract } = useGlobalState()

    const isMismatched = useNetworkMismatch()
    const [, switchNetwork] = useNetwork()


    const fetchCampaign = async () => {
        setLoading(true)
        const data = await getCampaign()
        setCampaign(data)
        setLoading(false)
    }

    useEffect(() => {
        if (contract) fetchCampaign()
        console.log(campaign)
    }, [address, contract])
    return (
        <>
            {isMismatched ? (
                <div className="flex justify-center items-center h-screen">
                    <Web3Button
                        accentColor="#8c6dfd"
                        contractAddress="0x34f094660AA1b00aDfb1658a7B871C42291B0FA1"
                        action={() => {
                            switchNetwork(ChainId.Mumbai)
                        }}
                    >
                    </Web3Button>
                </div>
            ) : (
                <Navbar />
            )}
        </>
    )
}

export default Main
