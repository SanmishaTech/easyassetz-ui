import { useState, useEffect } from "react";
import Loginpage from "@/Pages/Login/LoginPage";
import Personalpage from "@/Pages/personaldetailpage/Personalpage";
import { Routes, Route } from "react-router-dom";
import ForgetPassword from "./components/Forgetpassword/ForgetPassword";
import ForgetPasswordEmail from "./components/Forgetpassword/ForgetPasswordEmail";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
function App() {
  const User = localStorage.getItem("user");
  const user = JSON.parse(User);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [window.location.pathname]);

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
        <Route path="/vehicle" element={<Personalpage />} />
        <Route path="/vehicle/add" element={<Personalpage />} />
        <Route path="/vehicle/edit" element={<Personalpage />} />
        <Route path="/huf" element={<Personalpage />} />
        <Route path="/huf/add" element={<Personalpage />} />
        <Route path="/huf/edit" element={<Personalpage />} />
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
        <Route path="/mutualfunds" element={<Personalpage />} />
        <Route path="/mutualfunds/add" element={<Personalpage />} />
        <Route path="/mutualfunds/edit" element={<Personalpage />} />
        <Route path="/debentures" element={<Personalpage />} />
        <Route path="/debentures/add" element={<Personalpage />} />
        <Route path="/debentures/edit" element={<Personalpage />} />
        <Route path="/bond" element={<Personalpage />} />
        <Route path="/bond/add" element={<Personalpage />} />
        <Route path="/bond/edit" element={<Personalpage />} />
        <Route path="/esop" element={<Personalpage />} />
        <Route path="/esop/add" element={<Personalpage />} />
        <Route path="/esop/edit" element={<Personalpage />} />
        <Route path="/commercialproperty" element={<Personalpage />} />
        <Route path="/commercialproperty/add" element={<Personalpage />} />
        <Route path="/commercialproperty/edit" element={<Personalpage />} />
        <Route path="/demataccounts" element={<Personalpage />} />
        <Route path="/demataccounts/add" element={<Personalpage />} />
        <Route path="/demataccounts/edit" element={<Personalpage />} />
        <Route path="/digitalassets" element={<Personalpage />} />
        <Route path="/digitalassets/add" element={<Personalpage />} />
        <Route path="/digitalassets/edit" element={<Personalpage />} />
        <Route path="/wealth-account" element={<Personalpage />} />
        <Route path="/wealth-account/add" element={<Personalpage />} />
        <Route path="/wealth-account/edit" element={<Personalpage />} />
        <Route path="/broking-account" element={<Personalpage />} />
        <Route path="/broking-account/add" element={<Personalpage />} />
        <Route path="/broking-account/edit" element={<Personalpage />} />
        <Route path="/aif" element={<Personalpage />} />
        <Route path="/aif/add" element={<Personalpage />} />
        <Route path="/aif/edit" element={<Personalpage />} />
        <Route path="/pms" element={<Personalpage />} />
        <Route path="/pms/add" element={<Personalpage />} />
        <Route path="/pms/edit" element={<Personalpage />} />
        <Route path="/ofa" element={<Personalpage />} />
        <Route path="/ofa/add" element={<Personalpage />} />
        <Route path="/ofa/edit" element={<Personalpage />} />
        <Route path="/digital-asset" element={<Personalpage />} />
        <Route path="/otherassets" element={<Personalpage />} />
        <Route path="/recoverable" element={<Personalpage />} />
        <Route path="/recoverable/add" element={<Personalpage />} />
        <Route path="/recoverable/edit" element={<Personalpage />} />
        <Route path="/other-asset" element={<Personalpage />} />
        <Route path="/other-asset/add" element={<Personalpage />} />
        <Route path="/other-asset/edit" element={<Personalpage />} />
        <Route path="/jwellery" element={<Personalpage />} />
        <Route path="/jwellery/add" element={<Personalpage />} />
        <Route path="/jwellery/edit" element={<Personalpage />} />
        <Route path="/assetdistribution" element={<Personalpage />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/assetallocation" element={<Personalpage />} />
        <Route path="/summery" element={<Personalpage />} />
        <Route path="/forgetpasswordEmail" element={<ForgetPasswordEmail />} />
        <Route path="/other-deposits" element={<Personalpage />} />
        <Route path="/other-deposits/add" element={<Personalpage />} />
        <Route path="/other-deposits/edit" element={<Personalpage />} />
        <Route path="/generatewill" element={<Personalpage />} />
      </Routes>
    </div>
  );
}

export default App;
