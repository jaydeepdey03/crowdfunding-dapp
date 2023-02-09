import { useRouter } from "next/router"
import CampaignCard from "./CampaignCard"

const DisplayCampaign = ({ campaign, loading }) => {
    const router = useRouter()
    const handleNavigate = (campaign) => {
        router.push({
            pathname: `/campaign-details/${campaign.title}`,
            query: campaign,
        }, `/campaign-details/${campaign.title}`);

        // router.push({
        //     pathname: `/campaign-details/${campaign.title}`,
        //     query: {campaign},
        //     `/campaign-details/${campaign.title}`,
        // })
    }
    return (
        <div>
            <h1 className="font-epilogue font-semibold text-[18px] text-white text-center">All Campaign({campaign.length})</h1>
            <div className="p-10 sm:p-0 flex flex-wrap items-center justify-center mt-[20px] gap-[26px]">
                {loading && (
                    <img src={`/assets/loader.svg`} alt="loader" className="w-[100px] h-[100px] object-contain" />
                )}

                {!loading && campaign.length === 0 && (
                    <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                        You have not created any campigns yet
                    </p>
                )}

                {!loading && campaign.length > 0 && campaign.map((campaign) => <CampaignCard
                    key={campaign.id}
                    {...campaign}
                    handleClick={() => handleNavigate(campaign)}
                />)}
            </div>
        </div>
    )
}

export default DisplayCampaign
