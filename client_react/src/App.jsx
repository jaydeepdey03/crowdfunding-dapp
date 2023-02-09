import { Route, Routes } from "react-router-dom"
import CreateCampaign from "./page/CreateCampaign"
import Home from "./page/Home"


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/create" element={<CreateCampaign />} />
        {/* <Route path="/campaign/:id" element={<CampaignDetails />} /> */}
      </Routes>
    </div>
  )
}

export default App
