import { Route, Routes } from "react-router-dom"
import CampaignDetails from "./page/CampaignDetails"
import CreateCampaign from "./page/CreateCampaign"
import Home from "./page/Home"
import Error from "./page/Error"
import Profile from "./page/Profile"


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreateCampaign />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
