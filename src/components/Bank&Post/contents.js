import React, { useEffect, useState } from "react";
import lifeInsurance from "../image/LifeInsurance.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@com/ui/button";
import axios from "axios";

const BankContentForm = () => {
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
        const response = await axios.get(`/api/life-insurances`, {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        });
        setLifeInsuranceData(response?.data?.data?.LifeInsurances);
      } catch (error) {
        console.error("Error fetching life insurance data", error);
      }
    };
    const fetchDataMotorinsurance = async () => {
      const getitem = localStorage.getItem("user");
      const user = JSON.parse(getitem);

      try {
        const response = await axios.get(`/api/motor-insurances`, {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        });
        setMotorInsuranceData(response?.data?.data?.OtherInsurance);
      } catch (error) {
        console.error("Error fetching life insurance data", error);
      }
    };
    const fetchDataOtherinsurance = async () => {
      const getitem = localStorage.getItem("user");
      const user = JSON.parse(getitem);

      try {
        const response = await axios.get(`/api/other-insurances`, {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        });
        setOtherInsuranceData(response?.data?.data?.MotorInsurances);
      } catch (error) {
        console.error("Error fetching life insurance data", error);
      }
    };
    const fetchDataGeneralinsurance = async () => {
      const getitem = localStorage.getItem("user");
      const user = JSON.parse(getitem);

      try {
        const response = await axios.get(`/api/general-insurances`, {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        });
        setOtherInsuranceData(response?.data?.data?.MotorInsurances);
      } catch (error) {
        console.error("Error fetching life insurance data", error);
      }
    };
    const fetchDataHealthinsurance = async () => {
      const getitem = localStorage.getItem("user");
      const user = JSON.parse(getitem);

      try {
        const response = await axios.get(`/api/health-insurances`, {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        });
        setHealthInsuranceData(response?.data?.data?.HealthInsurances);
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
        <h1 className="text-2xl font-bold">Bank & Post Form</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the form to add a new Bank & Post Form.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <div
          onClick={() => navigate("/bankaccount")}
          className=" flex cursor-pointer items-center gap-8 bg-gray-100 p-4 rounded-lg"
        >
          <img src={lifeInsurance} className="w-6 ml-2" />
          <div className="flex  items-center gap-2 justify-center">
            <h1 className="text-xl font-bold">Bank Account</h1>
            {HealthInsurance?.length > 0 && (
              <div className="flex items-center gap-2 bg-green-200 p-2 rounded-[50px] ml-2 pl-4 pr-4">
                <p className="text-green-500 self-center dark:text-green-800 ">
                  {HealthInsurance?.length && HealthInsurance?.length} Bank Accouns
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          onClick={() => navigate("/fix-deposit")}
          className=" flex cursor-pointer items-center gap-8 bg-gray-100 p-4 rounded-lg"
        >
          <img src={lifeInsurance} className="w-6 ml-2" />
          <div className="flex  items-center gap-2 justify-center">
            <h1 className="text-xl font-bold">Fix Deposit</h1>
            {HealthInsurance?.length > 0 && (
              <div className="flex items-center gap-2 bg-green-200 p-2 rounded-[50px] ml-2 pl-4 pr-4">
                <p className="text-green-500 self-center dark:text-green-800 ">
                  {HealthInsurance?.length && HealthInsurance?.length} Fix Deposits
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          onMouseDown={() => navigate("/bank-locker")}
          className=" cursor-pointer flex items-center gap-8 bg-gray-100 p-4 rounded-lg"
        >
          <img src={lifeInsurance} className="w-6 ml-2" />
          <div className="flex  items-center gap-2 justify-center">
            <h1 className="text-xl font-bold">Bank Locker</h1>
            {lifeInsuranceData && lifeInsuranceData?.length > 0 && (
              <div className="flex items-center gap-2 bg-green-200 p-2 rounded-[50px] ml-2 pl-4 pr-4">
                <p className="text-green-500 self-center dark:text-green-800 ">
                  {lifeInsuranceData?.length} Bank Lockers
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          onMouseDown={() => navigate("/Scheme")}
          className="flex cursor-pointer items-center gap-8 bg-gray-100 p-4 rounded-lg"
        >
          <img src={lifeInsurance} className="w-6 ml-2" />
          <div className="flex  items-center gap-2 justify-center">
            <h1 className="text-xl font-bold">Post Saving Scheme</h1>
            {GeneralInsurance && GeneralInsurance?.length > 0 && (
              <div className="flex items-center gap-2 bg-green-200 p-2 rounded-[50px] ml-2 pl-4 pr-4">
                <p className="text-green-500 self-center dark:text-green-800 ">
                  {GeneralInsurance && GeneralInsurance?.length} Post Saving Schemes
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          onClick={() => navigate("/other-deposits")}
          className=" flex cursor-pointer items-center gap-8 bg-gray-100 p-4 rounded-lg"
        >
          <img src={lifeInsurance} className="w-6 ml-2" />
          <div className="flex  items-center gap-2 justify-center">
            <h1 className="text-xl font-bold">Other Deposit</h1>
            {otherInsuranceData && otherInsuranceData?.length > 0 && (
              <div className="flex items-center gap-2 bg-green-200 p-2 rounded-[50px] ml-2 pl-4 pr-4">
                <p className="text-green-500 self-center dark:text-green-800 ">
                  {otherInsuranceData && otherInsuranceData?.length} Other Deposits
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankContentForm;
