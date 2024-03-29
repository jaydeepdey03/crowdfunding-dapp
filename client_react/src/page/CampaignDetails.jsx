import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import CountBox from "../components/Countbox";
import CustomButton from "../components/CustomButton";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import useGlobalState from "../Hooks/useGlobalState";
import {calculateBarPercentage, daysLeft} from "../utils";
import "./CampaignDetails.css";

const CampaignDetails = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const {donate, getDonators, contract, address} = useGlobalState();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonators(state.id);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    try {
      setIsLoading(true);
      await donate(state.id, amount);
      setIsLoading(false);
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: `${err.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
      setIsLoading(false);
    }
  };
  console.log(
    typeof calculateBarPercentage(state.target, state.amountCollected)
  );
  return (
    <>
      <div className="h-[200%] overflow-x-hidden linear-gradient">
        <Navbar />
        {isLoading && <Loader />}

        <div className="w-full flex lg:flex-row flex-col gap-[30px] pr-10 pl-10">
          <div className="flex-1 flex-col">
            <img
              src={state.image}
              alt="campaign"
              className="object-contain rounded-xl w-full"
            />
            <div className="relative h-[5px] w-full bg-white rounded mt-2">
              <div
                className="absolute h-full bg-[#4acd8d]"
                style={{
                  width: `${calculateBarPercentage(
                    state.target,
                    state.amountCollected
                  )}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
          </div>

          <div className="flex md:w-[150px] lg:ml-16 lg:mr-16 lg:mb-24 w-full flex-wrap justify-around gap-[30px] rounded-[10px]">
            <CountBox
              title="Days Left"
              value={remainingDays < 0 ? "0" : remainingDays}
            />
            <CountBox
              title={`Raised of ${state.target}`}
              value={state.amountCollected}
            />
            <CountBox title="Total Backers" value={donators.length} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row m-10 justify-around rounded space-y-6 lg:space-y-0 h-full">
          <div className="flex space-y-6 flex-col bg-white p-5 rounded-xl creator text-white">
            <h4 className="font-epilogue font-semibold text-[18px] uppercase">
              Creator
            </h4>

            <div className="flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={`/assets/thirdweb.png`}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px]">
                  10 Campaigns
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-epilogue font-semibold text-[18px] uppercase">
                Story
              </h4>

              <div className="max-w-lg">
                <p className="font-epilogue font-normal text-[16px] leading-[26px] text-justify">
                  {state.description}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-epilogue font-semibold text-[18px] uppercase">
                Donators
              </h4>

              <div className="flex flex-col gap-4 w-full">
                {donators.length > 0 ? (
                  donators.map((item, index) => (
                    <div
                      key={`${item.donator}-${index}`}
                      className="flex space-x-4"
                    >
                      <p className="font-epilogue font-normal text-[16px] leading-[26px] truncate">
                        {index + 1}.
                        <span className="lg:inline-block font-semibold">
                          {item.donator}
                        </span>
                      </p>
                      <p className="font-epilogue font-normal text-[16px] leading-[26px] break-ll">
                        {item.donation}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="font-epilogue font-normal text-[16px] leading-[26px] text-justify">
                    No donators yet. Be the first one!
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col p-4 rounded-[10px] fund-box h-full lg:w-1/4">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-white">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-white rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-white">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              {calculateBarPercentage(state.target, state.amountCollected) >=
              "100" ? (
                <button className="font-epilogue font-semibold text-[15px] leading-[26px] text-white min-h-[40px] px-3 rounded-[10px] bg-slate-400 w-full">
                  Event Completed
                </button>
              ) : (
                <CustomButton
                  btnType="button"
                  title="Fund Campaign"
                  styles="w-full bg-[#8c6dfd]"
                  handleClick={handleDonate}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-[100vw]">
          <CustomButton
            btnType="button"
            title="Go back"
            styles="w-[10rem] mb-10 bg-[#8c6dfd]"
            handleClick={() => navigate(-1)}
          />
        </div>
      </div>
    </>
  );
};

export default CampaignDetails;
