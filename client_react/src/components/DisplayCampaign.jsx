import { useNavigate } from "react-router-dom"
import CampaignCard from "../page/CampaignCard"
import { daysLeft } from "../utils"

const DisplayCampaign = ({ title, campaign, loading, deadline }) => {
    const navigate = useNavigate()
    const handleNavigate = (campaign) => {
        navigate(`/campaign/${campaign.title}`, { state: campaign })
    }

    campaign.forEach(item=>console.log(daysLeft(item.deadline)))

    return (
        <div>
            <h1 className="font-epilogue font-semibold text-[18px] text-white text-center">{title}({campaign.length})</h1>
            <div className="p-10 sm:p-0 flex flex-wrap items-center justify-center mt-[20px] gap-[26px]">
                {loading && (
                    <img src={`assets/loader.svg`} alt="loader" className="w-[100px] h-screen lg:h-[100px] object-contain" />
                )}

                {!loading && campaign.length === 0 && (
                    <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183] h-screen">
                        You have not created any campigns yet
                    </p>
                )}

                {!loading && campaign.length > 0 && campaign.map((campaign) => (<CampaignCard
                    key={campaign.id}
                    {...campaign}
                    handleClick={() => handleNavigate(campaign)}
                />))}
            </div>
        </div>
    )
}

export default DisplayCampaign
