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
        <Route path="/propritership" element={<Personalpage />} />
        <Route path="/propritership/add" element={<Personalpage />} />
        <Route path="/propritership/edit" element={<Personalpage />} />
        <Route path="/intellectualproperty" element={<Personalpage />} />
        <Route path="/intellectualproperty/add" element={<Personalpage />} />
        <Route path="/intellectualproperty/edit" element={<Personalpage />} />
        <Route path="/partnershipfirm" element={<Personalpage />} />
        <Route path="/partnershipfirm/add" element={<Personalpage />} />
        <Route path="/partnershipfirm/edit" element={<Personalpage />} />
        <Route path="/dashboard" element={<Personalpage />} />
        <Route path="/company" element={<Personalpage />} />
        <Route path="/company/add" element={<Personalpage />} />
        <Route path="/company/edit" element={<Personalpage />} />
        <Route path="/membership" element={<Personalpage />} />
        <Route path="/membership/add" element={<Personalpage />} />
        <Route path="/membership/edit" element={<Personalpage />} />
        <Route path="/other-assets" element={<Personalpage />} />
        <Route path="/vehicle" element={<Personalpage />} />
        <Route path="/vehicle/add" element={<Personalpage />} />
        <Route path="/vehicle/edit" element={<Personalpage />} />
        <Route path="/huf" element={<Personalpage />} />
        <Route path="/huf/add" element={<Personalpage />} />
        <Route path="/Digitalasset" element={<Personalpage />} />
        <Route path="/crypto" element={<Personalpage />} />
        <Route path="/crypto/add" element={<Personalpage />} />
        <Route path="/crypto/edit" element={<Personalpage />} />
        <Route path="/jewellery" element={<Personalpage />} />
        <Route path="/jewellery/add" element={<Personalpage />} />
        <Route path="/jewellery/edit" element={<Personalpage />} />
        <Route path="/artifacts" element={<Personalpage />} />
        <Route path="/artifacts/add" element={<Personalpage />} />
        <Route path="/artifacts/edit" element={<Personalpage />} />
        <Route path="/digital-assets" element={<Personalpage />} />
        <Route path="/digital-assets/add" element={<Personalpage />} />
        <Route path="/watch" element={<Personalpage />} />
        <Route path="/watch/add" element={<Personalpage />} />
        <Route path="/watch/edit" element={<Personalpage />} />
        <Route path="/bank" element={<Personalpage />} />
        <Route path="/bankAccount" element={<Personalpage />} />
        <Route path="/bankAccount/add" element={<Personalpage />} />
        <Route path="/bankAccount/edit" element={<Personalpage />} />
        <Route path="/other-assets" element={<Personalpage />} />
        <Route path="/liabilities" element={<Personalpage />} />
        <Route path="/homeloans" element={<Personalpage />} />
        <Route path="/homeloans/add" element={<Personalpage />} />
        <Route path="/homeloans/edit" element={<Personalpage />} />
        <Route path="/vehicleloan" element={<Personalpage />} />
        <Route path="/vehicleloan/add" element={<Personalpage />} />
        <Route path="/vehicleloan/edit" element={<Personalpage />} />
        <Route path="/litigation" element={<Personalpage />} />
        <Route path="/litigation/add" element={<Personalpage />} />
        <Route path="/litigation/edit" element={<Personalpage />} />
        <Route path="/personalloan" element={<Personalpage />} />
        <Route path="/personalloan/add" element={<Personalpage />} />
        <Route path="/personalloan/edit" element={<Personalpage />} />
        <Route path="/otherloan" element={<Personalpage />} />
        <Route path="/otherloan/add" element={<Personalpage />} />
        <Route path="/otherloan/edit" element={<Personalpage />} />
        <Route path="/ppf" element={<Personalpage />} />
        <Route path="/ppf/add" element={<Personalpage />} />
        <Route path="/ppf/edit" element={<Personalpage />} />
        <Route path="/providentfund" element={<Personalpage />} />
        <Route path="/providentfund/add" element={<Personalpage />} />
        <Route path="/providentfund/edit" element={<Personalpage />} />
        <Route path="/nps" element={<Personalpage />} />
        <Route path="/nps/add" element={<Personalpage />} />
        <Route path="/nps/edit" element={<Personalpage />} />
        <Route path="/gratuity" element={<Personalpage />} />
        <Route path="/gratuity/add" element={<Personalpage />} />
        <Route path="/gratuity/edit" element={<Personalpage />} />
        <Route path="/superannuation" element={<Personalpage />} />
        <Route path="/superannuation/add" element={<Personalpage />} />
        <Route path="/superannuation/edit" element={<Personalpage />} />
        <Route path="/retirementfund" element={<Personalpage />} />
        <Route path="/bankaccount" element={<Personalpage />} />
        <Route path="/bankaccount/add" element={<Personalpage />} />
        <Route path="/bankaccount/edit" element={<Personalpage />} />
        <Route path="/recoverable" element={<Personalpage />} />
        <Route path="/recoverable/add" element={<Personalpage />} />
        <Route path="/recoverable/edit" element={<Personalpage />} />
        <Route path="/other-asset" element={<Personalpage />} />
        <Route path="/other-asset/add" element={<Personalpage />} />
        <Route path="/other-asset/edit" element={<Personalpage />} />
        <Route path="/other-deposits" element={<Personalpage />} />
        <Route path="/other-deposits/add" element={<Personalpage />} />
        <Route path="/other-deposits/edit" element={<Personalpage />} />
        <Route path="/pss" element={<Personalpage />} />
        <Route path="/pss/add" element={<Personalpage />} />
        <Route path="/pss/edit" element={<Personalpage />} />
        <Route path="/psad" element={<Personalpage />} />
        <Route path="/psad/add" element={<Personalpage />} />
        <Route path="/psad/edit" element={<Personalpage />} />
        <Route path="/fixdeposit" element={<Personalpage />} />
        <Route path="/fixdeposit/add" element={<Personalpage />} />
        <Route path="/fixdeposit/edit" element={<Personalpage />} />
        <Route path="/banklocker" element={<Personalpage />} />
        <Route path="/banklocker/add" element={<Personalpage />} />
        <Route path="/banklocker/edit" element={<Personalpage />} />
        <Route path="/immovableassets" element={<Personalpage />} />
        <Route path="/financialassets" element={<Personalpage />} />
        <Route path="/share-details" element={<Personalpage />} />
        <Route path="/share-details/add" element={<Personalpage />} />
        <Route path="/land" element={<Personalpage />} />
        <Route path="/land/add" element={<Personalpage />} />
        <Route path="/land/edit" element={<Personalpage />} />
        <Route path="/share-details/edit" element={<Personalpage />} />
        <Route path="/residentialproperty" element={<Personalpage />} />
        <Route path="/residentialproperty/add" element={<Personalpage />} />
        <Route path="/residentialproperty/edit" element={<Personalpage />} />
        <Route path="/commercialproperty" element={<Personalpage />} />
        <Route path="/commercialproperty/add" element={<Personalpage />} />
        <Route path="/commercialproperty/edit" element={<Personalpage />} />
        <Route path="/digitalassets" element={<Personalpage />} />
        <Route path="/digitalassets/add" element={<Personalpage />} />
        <Route path="/digitalassets/edit" element={<Personalpage />} />
      </Routes>
    </div>
  );
}

export default App;
