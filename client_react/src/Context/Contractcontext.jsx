import {createContext, useEffect, useState} from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useNetworkMismatch,
  useNetwork,
  ChainId,
  Web3Button,
} from "@thirdweb-dev/react";
import {ethers} from "ethers";
import {useNavigate} from "react-router-dom";
import {contractAbi} from "../constants";

// how to create a context

export const Context = createContext();

const ContractcontextProvider = ({children}) => {
  const {contract} = useContract(
    "0xb17E2Ed609EA86E3D1128A097a2AF0D373cc5104",
    contractAbi
  );
  const {mutateAsync: createCampaign, isLoading: publishLoading} =
    useContractWrite(contract, "createCampaign");
  const {mutateAsync: donateToCampaign, isLoading} = useContractWrite(
    contract,
    "donateToCampaign"
  );

  const navigate = useNavigate();
  const address = useAddress();
  const connect = useMetamask();
  const [loading, setLoading] = useState(false);

  const publishCampaign = async (form) => {
    try {
      await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      if (!publishLoading) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCampaign = async () => {
    try {
      const data = await contract.call("getCampaigns");

      const fetchedCampaign = data.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        image: campaign.image,
        id: i,
      }));

      return fetchedCampaign;
    } catch (err) {
      console.log(err);
    }
  };

  const getUserCampaigns = async () => {
    const allCampaign = await getCampaign();
    const userCampaigns = allCampaign.filter(
      (campaign) => campaign.owner === address
    );
    return userCampaigns;
  };

  const donate = async (id, amount) => {
    try {
      await donateToCampaign({
        args: [id],
        overrides: {
          value: ethers.utils.parseUnits(amount, 18),
        },
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getDonators = async (id) => {
    const donations = await contract.call("getDonators", [id]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  // useEffect(()=> {
  //     // account change reload
  //     window.ethereum.on('accountsChanged', function (accounts) {
  //         navigate('/')

  //     }
  //     )
  // }, [address])

  return (
    <Context.Provider
      value={{
        contract,
        createCampaign: publishCampaign,
        connect,
        getDonators,
        donate,
        getUserCampaigns,
        getCampaign,
        useNetworkMismatch,
        useNetwork,
        ChainId,
        useAddress,
        Web3Button,
        loading,
        address,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContractcontextProvider;
