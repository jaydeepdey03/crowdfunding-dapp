import { useAddress } from "@thirdweb-dev/react"
import { useEffect, useState } from "react"
import CustomButton from "../components/CustomButton"
import DisplayCampaign from "../components/DisplayCampaign"
import Navbar from "../components/Navbar"
import useGlobalState from "../Hooks/useGlobalState"
import './Home.css'

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [campaign, setCampaign] = useState([])
    const { getCampaign, ChainId, useNetwork, useNetworkMismatch, Web3Button, contract, connect } = useGlobalState()

    const isMismatched = useNetworkMismatch()
    const [, switchNetwork] = useNetwork()
    const address = useAddress()

    const fetchCampaign = async () => {
        setLoading(true)
        const data = await getCampaign()
        setCampaign(data)
        setLoading(false)
    }

    useEffect(() => {
        if (contract) fetchCampaign()
    }, [address, contract])
    
    console.log(address)
    return (
        <>
            {address === undefined ? (
                <div className="flex linear-gradient h-screen justify-center items-center overflow-hidden">
                    <CustomButton
                        btnType="button"
                        title={'Connect'}
                        styles={'bg-[#8c6dfd] h-20 w-52 text-2xl'}
                        handleClick={connect}
                    />
                </div>) : isMismatched ? (
                    <div className="linear-gradient flex justify-center items-center h-screen">
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
                <>
                    <div className="linear-gradient h-full md:h-[200vh]">
                        <Navbar />
                        <DisplayCampaign title={"All Campaign"} campaign={campaign} loading={loading} />
                    </div>
                </>
            )}
        </>
    )
}

export default Home
