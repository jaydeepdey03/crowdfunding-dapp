import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2'
import FormField from "../Components/FormField";
import CustomButton from "../Components/CustomButton";
import Loader from "../Components/Loader";
import useGlobalState from "../Hooks/useGlobalState";
import { checkIfImage } from "../utils";
import './CreateCampaign.css'


const CreateCampaign = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { createCampaign } = useGlobalState();
    const [form, setForm] = useState({
        name: '',
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: ''
    });

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        checkIfImage(form.image, async (exists) => {
            if (exists) {
                setIsLoading(true)
                await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) })
                setIsLoading(false);
                navigate('/')
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Provide valid image URL',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                setForm({ ...form, image: '' });
            }
        })
    }

    return (
        <>
            <div className="campaign-bg flex-col flex place-item-center">
                <div onClick={() => navigate(-1)} className={`w-[52px] h-[52px] rounded-full cursor-pointer ml-6 mt-6 plus-linear-gradient flex items-center justify-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="p-3 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </div>
                {isLoading && <Loader />}
                <div className="flex flex-col place-items-center h-full w-full p-10">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-7 flex flex-col space-y-6 justify-center">
                        {/* create a centered button with the text */}
                        <h1 className="text-2xl text-white inline-block m-auto text-center px-5 py-3 rounded-xl w-[40%] font-bold font-epilogue campaign-bg">
                            Create Campaign
                        </h1>
                        <FormField
                            labelName="Campaign Title *"
                            placeholder="Write a title"
                            inputType="text"
                            value={form.title}
                            handleChange={(e) => handleFormFieldChange('title', e)}
                        />
                        <FormField
                            labelName="Your Name *"
                            placeholder="John Doe"
                            inputType="text"
                            value={form.name}
                            handleChange={(e) => handleFormFieldChange('name', e)}
                        />
                        <FormField
                            labelName="Story *"
                            placeholder="Write your story"
                            isTextArea
                            value={form.description}
                            handleChange={(e) => handleFormFieldChange('description', e)}
                        />
                        <div className="flex flex-wrap gap-[40px]">
                            <FormField
                                labelName="Goal *"
                                placeholder="ETH 0.50"
                                inputType="text"
                                value={form.target}
                                handleChange={(e) => handleFormFieldChange('target', e)}
                            />
                            <FormField
                                labelName="End Date *"
                                placeholder="End Date"
                                inputType="date"
                                value={form.deadline}
                                handleChange={(e) => handleFormFieldChange('deadline', e)}
                            />
                        </div>
                        <FormField
                            labelName="Campaign image *"
                            placeholder="Place image URL of your campaign"
                            inputType="url"
                            value={form.image}
                            handleChange={(e) => handleFormFieldChange('image', e)}
                        />
                        <div className="flex justify-center items-center mt-[40px]">
                            <CustomButton
                                btnType="submit"
                                title="Submit new campaign"
                                styles="bg-[#1dc071]"
                            />

                        </div>
                        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfdbb] h-[120px] rounded-[10px] mt-5">
                            <img src={`assets/money.svg`} alt="money" className="w-[40px] h-[40px] object-contain" />
                            <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateCampaign
