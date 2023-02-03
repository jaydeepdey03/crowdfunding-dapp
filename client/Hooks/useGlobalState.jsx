import { useContext } from "react"
import { Context } from "../Context/Contractcontext"

const useGlobalState = () => {
    return useContext(Context)
}


export default useGlobalState
