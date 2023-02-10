import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import DisplayCampaign from "../components/DisplayCampaign";
import Navbar from "../components/Navbar";
import useGlobalState from "../Hooks/useGlobalState";
import './Profile.css'

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    const { address, contract, getUserCampaigns } = useGlobalState()

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getUserCampaigns();
        setCampaigns(data);
        setIsLoading(false);
    }

    useEffect(() => {
        if (contract) fetchCampaigns();
    }, [address, contract]);
    return (
        <div className="linear-gradient h-full md:h-[200vh]">
            <Navbar />
            <div className="mb-7">
                <h1 className="text-white text-center text-xl font-bold">Your Wallet Address</h1>
                <p className="text-white text-center text-xl font-semibold sm:block hidden">{address}</p>
                <p className="text-white text-center text-xl font-semibold sm:hidden block">{address.slice(0,20) + '...' + address.slice(-4)}</p>
            </div>
            <DisplayCampaign title={"Your Campaign"} campaign={campaigns} loading={isLoading} />
        </div>
    )
}

export default Profile
