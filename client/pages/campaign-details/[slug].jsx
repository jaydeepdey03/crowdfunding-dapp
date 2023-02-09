import { useState } from "react"
import Loader from "../../Components/Loader"
import { calculateBarPercentage, daysLeft } from "../../utils"
import { useRouter } from "next/router";
import CountBox from "../../Components/Countbox";
import useGlobalState from "../../Hooks/useGlobalState";
import { useEffect } from "react";

const CampaignPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const campaign = router.query;
    // console.log(campaign)
    const { donate, getDonations, contract, address, getUserCampaigns } = useGlobalState()
    const [amount, setAmount] = useState('')
    const [donators, setDonators] = useState([]);

    const fetchDonators = async () => {
        const data = await getDonations(campaign.id)
        setDonators(data)
    }

    useEffect(() => {
        if (contract) fetchDonators();
    }, [contract, address])

    const remainingDays = daysLeft(campaign.deadline)



    return (
        <div>
            
        </div >
    )
}

export default CampaignPage
