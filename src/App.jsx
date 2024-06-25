import { useState } from "react";
import Loginpage from "@/Pages/Login/LoginPage";
import Personalpage from "@/Pages/personaldetailpage/Personalpage";
import { Routes, Route } from "react-router-dom";
import { Toaster, toast } from "sonner";
function App() {
  return (
    <div style={{ fontFamily: "Roboto" }}>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/personal" element={<Personalpage />} />
        <Route path="/benificiary" element={<Personalpage />} />
        <Route path="/insurance" element={<Personalpage />} />
        <Route path="/lifeinsurance" element={<Personalpage />} />
        <Route path="/lifeinsurance/add" element={<Personalpage />} />
        <Route path="/lifeinsurance/edit" element={<Personalpage />} />
        <Route path="/motorinsurance" element={<Personalpage />} />
        <Route path="/motorinsurance/add" element={<Personalpage />} />
        <Route path="/motorinsurance/edit" element={<Personalpage />} />
        <Route path="/otherinsurance" element={<Personalpage />} />
        <Route path="/otherinsurance/add" element={<Personalpage />} />
        <Route path="/otherinsurance/edit" element={<Personalpage />} />
        <Route path="/generalinsurance" element={<Personalpage />} />
        <Route path="/generalinsurance/add" element={<Personalpage />} />
        <Route path="/generalinsurance/edit" element={<Personalpage />} />
        <Route path="/healthinsurance" element={<Personalpage />} />
        <Route path="/healthinsurance/add" element={<Personalpage />} />
        <Route path="/healthinsurance/edit" element={<Personalpage />} />
        <Route path="/bullion" element={<Personalpage />} />
        <Route path="/bullion/add" element={<Personalpage />} />
        <Route path="/bullion/edit" element={<Personalpage />} />
        <Route path="/businessasset" element={<Personalpage />} />
        <Route path="/propritorship" element={<Personalpage />} />
        <Route path="/propritorship/add" element={<Personalpage />} />
        <Route path="/propritorship/edit" element={<Personalpage />} />
        <Route path="/intellectualproperty" element={<Personalpage />} />

        <Route path="/partnershipfirm" element={<Personalpage />} />
        <Route path="/partnershipfirm/add" element={<Personalpage />} />
        <Route path="/partnershipfirm/edit" element={<Personalpage />} />
      </Routes>
    </div>
  );
}

export default App;
