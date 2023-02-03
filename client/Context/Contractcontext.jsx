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

    const publishCampaign = async() => {

    }

    return (
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    )
}


export default ContractcontextProvider