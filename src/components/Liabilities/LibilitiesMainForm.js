import React, { useEffect, useState } from "react";
import lifeInsurance from "../image/LifeInsurance.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@com/ui/button";
import axios from "axios";

const LibilitiesMainForm = () => {
  const [lifeInsuranceData, setLifeInsuranceData] = useState([]);
  const [motorInsuranceData, setMotorInsuranceData] = useState([]);
  const [otherInsuranceData, setOtherInsuranceData] = useState([]);
  const [GeneralInsurance, setGeneralInsuranceData] = useState([]);
  const [HealthInsurance, setHealthInsuranceData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataLifeinsurance = async () => {
      const getitem = localStorage.getItem("user");
      const user = JSON.parse(getitem);

      try {
        const response = await axios.get(`/api/home-loans`, {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        });
        setLifeInsuranceData(response?.data?.data?.HomeLoan);
      } catch (error) {
        console.error("Error fetching life insurance data", error);
      }
    };
    const fetchDataMotorinsurance = async () => {
      const getitem = localStorage.getItem("user");
      const user = JSON.parse(getitem);

      try {
        const response = await axios.get(`/api/personal-loans`, {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        });
        setMotorInsuranceData(response?.data?.data?.PersonalLoan);
      } catch (error) {
        console.error("Error fetching life insurance data", error);
      }
    };
    const fetchDataOtherinsurance = async () => {
      const getitem = localStorage.getItem("user");
      const user = JSON.parse(getitem);

      try {
        const response = await axios.get(`/api/vehicle-loans`, {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        });
        setOtherInsuranceData(response?.data?.data?.VehicleLoan);
      } catch (error) {
        console.error("Error fetching life insurance data", error);
      }
    };
    const fetchDataGeneralinsurance = async () => {
      const getitem = localStorage.getItem("user");
      const user = JSON.parse(getitem);

      try {
        const response = await axios.get(`/api/other-loans`, {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        });
        setGeneralInsuranceData(response?.data?.data?.OtherLoan);
      } catch (error) {
        console.error("Error fetching life insurance data", error);
      }
    };
    const fetchDataHealthinsurance = async () => {
      const getitem = localStorage.getItem("user");
      const user = JSON.parse(getitem);

      try {
        const response = await axios.get(`/api/litigations`, {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        });
        setHealthInsuranceData(response?.data?.data?.Litigation);
      } catch (error) {
        console.error("Error fetching life insurance data", error);
      }
    };
    fetchDataGeneralinsurance();
    fetchDataHealthinsurance();
    fetchDataOtherinsurance();
    fetchDataLifeinsurance();
    fetchDataMotorinsurance();
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Libilities Main Form</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the form to add a new Libilities.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <div
          onClick={() => navigate("/homeloans")}
          className=" flex cursor-pointer items-center gap-8 bg-gray-100 p-4 rounded-lg"
        >
          <img src={lifeInsurance} className="w-6 ml-2" />
          <div className="flex  items-center gap-2 justify-center">
            <h1 className="text-xl font-bold">Home Loans</h1>
            {lifeInsuranceData?.length > 0 && (
              <div className="flex items-center gap-2 bg-green-200 p-2 rounded-[50px] ml-2 pl-4 pr-4">
                <p className="text-green-500 self-center dark:text-green-800 ">
                  {lifeInsuranceData?.length && lifeInsuranceData?.length} Loans
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          onClick={() => navigate("/personalloan")}
          className=" flex cursor-pointer items-center gap-8 bg-gray-100 p-4 rounded-lg"
        >
          <img src={lifeInsurance} className="w-6 ml-2" />
          <div className="flex  items-center gap-2 justify-center">
            <h1 className="text-xl font-bold">Personal Loans</h1>
            {motorInsuranceData?.length > 0 && (
              <div className="flex items-center gap-2 bg-green-200 p-2 rounded-[50px] ml-2 pl-4 pr-4">
                <p className="text-green-500 self-center dark:text-green-800 ">
                  {motorInsuranceData?.length && motorInsuranceData?.length}{" "}
                  Loans
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          onMouseDown={() => navigate("/vehicleloan")}
          className=" cursor-pointer flex items-center gap-8 bg-gray-100 p-4 rounded-lg"
        >
          <img src={lifeInsurance} className="w-6 ml-2" />
          <div className="flex  items-center gap-2 justify-center">
            <h1 className="text-xl font-bold">Vehicle Loans</h1>
            {otherInsuranceData && otherInsuranceData?.length > 0 && (
              <div className="flex items-center gap-2 bg-green-200 p-2 rounded-[50px] ml-2 pl-4 pr-4">
                <p className="text-green-500 self-center dark:text-green-800 ">
                  {otherInsuranceData?.length} Vehicle Loans
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          onMouseDown={() => navigate("/otherloan")}
          className="flex cursor-pointer items-center gap-8 bg-gray-100 p-4 rounded-lg"
        >
          <img src={lifeInsurance} className="w-6 ml-2" />
          <div className="flex  items-center gap-2 justify-center">
            <h1 className="text-xl font-bold">Other Loans</h1>
            {GeneralInsurance && GeneralInsurance?.length > 0 && (
              <div className="flex items-center gap-2 bg-green-200 p-2 rounded-[50px] ml-2 pl-4 pr-4">
                <p className="text-green-500 self-center dark:text-green-800 ">
                  {GeneralInsurance && GeneralInsurance?.length} Other Loans
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          onClick={() => navigate("/litigation")}
          className=" flex cursor-pointer items-center gap-8 bg-gray-100 p-4 rounded-lg"
        >
          <img src={lifeInsurance} className="w-6 ml-2" />
          <div className="flex  items-center gap-2 justify-center">
            <h1 className="text-xl font-bold">Litigation</h1>
            {HealthInsurance && HealthInsurance?.length > 0 && (
              <div className="flex items-center gap-2 bg-green-200 p-2 rounded-[50px] ml-2 pl-4 pr-4">
                <p className="text-green-500 self-center dark:text-green-800 ">
                  {HealthInsurance && HealthInsurance?.length} Litigation
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibilitiesMainForm;
