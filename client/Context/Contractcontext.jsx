import { createContext } from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";

// how to create a context

export const Context = createContext();

const ContractcontextProvider = ({ children }) => {
    const { contract } = useContract("0x34f094660AA1b00aDfb1658a7B871C42291B0FA1");
    const { mutateAsync: createCampaign, isLoading } = useContractWrite(contract, "createCampaign")

    const address = useAddress()
    const connect = useMetamask()

    const publishCampaign = async (form) => {
        try {

            const data = await createCampaign([
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ])
        } catch (err) {
            console.log(err)
        }
    }

    const getCampaign = async () => {
        try {
            const data = await contract.call('getCampaign')

            const fetchedCampaign = data.map((campaign, i) => (
                {
                    owner: campaign.owner,
                    title: campaign.title,
                    description: campaign.description,
                    target: ethers.utils.formatEther(campaign.target.toString()),
                    deadline: campaign.deadline.toNumber(),
                    amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                    image: campaign.image,
                    id: i
                }
            ))

            return fetchedCampaign
        } catch (err) {
            console.log(err)
        }
    }

    const getUserCampaigns = async () => {
        const allCampaign = await contract.call('getCampaign')
        const userCampaigns = allCampaign.filter(campaign => campaign.owner === address)
        return userCampaigns
    }

    const donate = async (id, amount) => {
        const data = await contract.call('donateToCampaign', id, { value: ethers.utils.parseEther(amount) })

        return data;
    }

    const getDonations = async (id) => {
        const data = await contract.call('getDonators', id)

        const parsedDonation = []

        for(let i= 0; i<data.length; i++){
            parsedDonation.push({
                donators: data[0][i].donators,
                donations: ethers.utils.formatEther(data[1][i].donations.toString())
            })
        }

        return parsedDonation

    }

    return (
        <Context.Provider value={{ contract, createCampaign: publishCampaign, connect, getDonations, donate, getUserCampaigns, getCampaign }}>
            {children}
        </Context.Provider>
    )
}


export default ContractcontextProvider