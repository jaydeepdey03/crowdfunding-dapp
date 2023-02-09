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
        <div className="linear-gradient h-screen">
            <Navbar />
            <DisplayCampaign title={"Your Campaign"} campaign={campaigns} loading={isLoading} />
        </div>
    )
}

export default Profile
