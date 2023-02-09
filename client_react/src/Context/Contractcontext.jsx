import { createContext, useEffect, useState } from "react";
import { useAddress, useContract, useMetamask, useContractWrite, useNetworkMismatch, useNetwork, ChainId, Web3Button } from "@thirdweb-dev/react";
import { ethers } from "ethers";

// how to create a context

export const Context = createContext();

const ContractcontextProvider = ({ children }) => {
    const { contract } = useContract("0x34f094660AA1b00aDfb1658a7B871C42291B0FA1");
    const { mutateAsync: createCampaign, isLoading } = useContractWrite(contract, "createCampaign")

    const address = useAddress()
    const connect = useMetamask()
    const [loading, setLoading] = useState(false)

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
            const data = await contract.call('getCampaigns')

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
        const allCampaign = await getCampaign()
        const userCampaigns = allCampaign.filter(campaign => campaign.owner === address)
        return userCampaigns
    }

    const donate = async (id, amount) => {
        const data = await contract.call('donateToCampaign', id, { value: ethers.utils.parseEther(amount) })

        return data;
    }

    const getDonators = async (id) => {
        const donations = await contract.call('getDonators', id);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parsedDonations

    }

    window.ethereum.on('accountsChanged', function (accounts) {
        window.location.reload();
    })

    return (
        <Context.Provider value={{ contract, createCampaign: publishCampaign, connect, getDonators, donate, getUserCampaigns, getCampaign, useNetworkMismatch, useNetwork, ChainId, useAddress, Web3Button, loading }}>
            {children}
        </Context.Provider>
    )
}


export default ContractcontextProvider