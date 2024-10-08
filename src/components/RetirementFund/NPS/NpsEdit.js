import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@com/ui/card";
import { Label } from "@com/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@com/ui/select";
import { Button } from "@com/ui/button";
import { Input } from "@com/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import { useSelector } from "react-redux";
import { RadioGroup, RadioGroupItem } from "@com/ui/radio-group";
import Addnominee from "@/components/Nominee/EditNominee";
import cross from "@/components/image/close.png";

const schema = z.object({
  PRAN: z.string().nonempty({ message: "PRAN is required" }),
  natureOfHolding: z.any().optional(),
  jointHolderName: z.any().optional(),
  additionalDetails: z.any().optional(),
  name: z.any().optional(),
  email: z.any().optional(),
  mobile: z.any().optional(),
});
// .refine((data) => {
//   if (data.natureOfHolding === "joint") {
//     return !!data.jointHolderName;
//   }

//   return true;
// });

const NPSEditForm = ({}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const getitem = localStorage.getItem("user");
  const user = JSON.parse(getitem);
  const queryClient = useQueryClient();
  const [showJointHolderName, setShowJointHolderName] = useState(false);
  const [nomineeDetails, setNomineeDetails] = useState([]);
  const [nomineeError, setNomineeError] = useState(false);
  const { lifeInsuranceEditId } = useSelector((state) => state.counterSlice);
  const [displaynominie, setDisplaynominie] = useState([]);
  const [defaultValues, setDefaultValues] = useState(null);
  const [selectedNommie, setSelectedNommie] = useState([]);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState([]);
  const [displayFamilyMembers, setDisplayFamilyMembers] = useState([]);
  const [familymemberNominee, setfamilymemberNominee] = useState([]);
  const [displayfamilymemberNominee, setdisplayfamilymemberNominee] = useState(
    []
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      PRAN: "",
      natureOfHolding: "",
      jointHolderName: "",
      additionalDetails: "",
      name: "",
      mobile: "",
      email: "",
    },
  });

  const getPersonalData = async () => {
    if (!user) return;
    const response = await axios.get(`/api/nps/${lifeInsuranceEditId}`, {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
    });
    let data = response.data.data.NPS;
    console.log("Fetching Data:", data);
    setValue("PRAN", data.PRAN);
    setValue("natureOfHolding", data.natureOfHolding);
    setValue("jointHolderName", data.jointHolderName);
    setValue("additionalDetails", data.additionalDetails);
    setValue("name", data.name);
    setValue("mobile", data.mobile);
    setValue("email", data.email);
    setSelectedNommie(data.nominees?.map((nominee) => nominee.id));
    setSelectedFamilyMembers(data.jointHolders?.map((nominee) => nominee.id));
    setDisplayFamilyMembers(data.jointHolders?.map((nominee) => nominee));
    if (data.natureOfHolding === "joint") {
      setShowJointHolderName(true);
    }
    //   Assume nomineeDetails is an array of nominee objects
    setNomineeDetails(data.nomineeDetails || []);
    return response.data.data.NPS;
  };

  const {
    data: Benifyciary,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lifeInsuranceDataUpdate", lifeInsuranceEditId],
    queryFn: getPersonalData,
    onSuccess: (data) => {
      Object.keys(data).forEach((key) => {
        if (schema.shape[key]) {
          setValue(key, data[key]);
          console.error("Error fetching data:", error);
          toast.error("Failed to fetch data");
        } // .email({ message: "Invalid Email" })
      });
      if (data.natureOfHolding === "joint") {
        setShowJointHolderName(true);
      }
      // Assume nomineeDetails is an array of nominee objects
      setNomineeDetails(data.nomineeDetails || []);
    },
    onError: (error) => {
      console.error("Error fetching NPS data:", error);
      toast.error("Failed to fetch NPS data");
    },
  });

  const npsMutate = useMutation({
    mutationFn: async (data) => {
      const response = await axios.put(
        `/api/nps/${lifeInsuranceEditId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        }
      );
      return response.data.data.NPS;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("NPS");
      toast.success("NPS details updated successfully!");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Error updating NPS details:", error);
      toast.error("Failed to update NPS details");
    },
  });

  useEffect(() => {
    if (Benifyciary?.nominees) {
      setDisplaynominie(Benifyciary?.nominees);
    }
  }, [Benifyciary?.nominees]);

  const onSubmit = async (data) => {
    console.log(data);
    if (selectedNommie?.length > 0) {
      data.nominees = selectedNommie;
    }
    if (selectedFamilyMembers?.length > 0) {
      data.jointHolders = selectedFamilyMembers;
    }

    await npsMutate.mutateAsync(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading NPS data</div>;

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-2xl font-bold">
                Edit NPS Details
              </CardTitle>
              <CardDescription>
                Edit the form to update the NPS details.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form
            className="space-y-6 flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-2">
              <Label htmlFor="PRAN">
                Permanent Retirement Account Number (PRAN)
              </Label>
              <Label style={{ color: "red" }}>*</Label>
              <Controller
                name="PRAN"
                control={control}
                render={({ field }) => (
                  <Input
                    id="PRAN"
                    placeholder="Enter PRAN"
                    {...field}
                    className={errors.PRAN ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.PRAN && (
                <span className="text-red-500">{errors.PRAN.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="natureOfHolding">Nature of Holding</Label>
              <Controller
                name="natureOfHolding"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setShowJointHolderName(value === "joint");
                    }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center gap-2 text-center">
                      <RadioGroupItem id="single" value="single" />
                      <Label htmlFor="single">Single</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="joint" value="joint" />
                      <Label htmlFor="joint">Joint</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.natureOfHolding && (
                <span className="text-red-500">
                  {errors.natureOfHolding.message}
                </span>
              )}
            </div>

            {showJointHolderName && (
              <div className="space-y-2">
                <Label htmlFor="jointHolderName">Select/Add Joint Holder</Label>
                <>
                  {displayFamilyMembers && displayFamilyMembers?.length > 0 && (
                    <div className="space-y-2">
                      <div className="grid gap-4 py-4">
                        <Label className="text-lg font-bold">
                          Selected Nominees
                        </Label>
                        {displayFamilyMembers &&
                          displayFamilyMembers.map((nominee) => (
                            <div className="flex space-y-2 border border-input p-4 justify-between pl-4 pr-4 items-center rounded-lg">
                              <Label htmlFor={`nominee-${nominee?.id}`}>
                                {nominee?.fullLegalName || nominee?.charityName}
                              </Label>
                              <img
                                className="w-4 h-4 cursor-pointer"
                                onClick={() => {
                                  setDisplayFamilyMembers(
                                    displayFamilyMembers.filter(
                                      (item) => item.id !== nominee.id
                                    )
                                  );
                                  setSelectedFamilyMembers(
                                    selectedFamilyMembers.filter(
                                      (item) => item !== nominee.id
                                    )
                                  );
                                }}
                                src={cross}
                                alt=""
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="registered-phone">Add Family Members</Label>
                    <Addnominee
                      setSelectedNommie={setSelectedFamilyMembers}
                      selectedNommie={selectedFamilyMembers}
                      displaynominie={displayFamilyMembers}
                      setDisplaynominie={setDisplayFamilyMembers}
                    />{" "}
                  </div>
                </>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="additionalDetails">Additional Details</Label>
              <Controller
                name="additionalDetails"
                control={control}
                render={({ field }) => (
                  <Input
                    id="additionalDetails"
                    placeholder="Enter Additional Details"
                    {...field}
                    className={errors.additionalDetails ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.additionalDetails && (
                <span className="text-red-500">
                  {errors.additionalDetails.message}
                </span>
              )}
            </div>
            {displaynominie && displaynominie.length > 0 && (
              <div className="space-y-2">
                <div className="grid gap-4 py-4">
                  {console.log(displaynominie)}
                  <Label className="text-lg font-bold">Selected Nominees</Label>
                  {displaynominie &&
                    displaynominie.map((nominee) => (
                      <div className="flex space-y-2 border border-input p-4 justify-between pl-4 pr-4 items-center rounded-lg">
                        <Label htmlFor={`nominee-${nominee?.id}`}>
                          {nominee?.fullLegalName || nominee?.charityName}
                        </Label>
                        <img
                          className="w-4 h-4 cursor-pointer"
                          onClick={() => {
                            setDisplaynominie(
                              displaynominie.filter(
                                (item) => item.id !== nominee.id
                              )
                            );
                            setSelectedNommie(
                              selectedNommie.filter(
                                (item) => item !== nominee.id
                              )
                            );
                          }}
                          src={cross}
                          alt=""
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="registered-mobile">Add nominee</Label>
              {console.log(Benifyciary?.nominees)}
              <Addnominee
                setSelectedNommie={setSelectedNommie}
                AllNominees={Benifyciary?.nominees}
                selectedNommie={selectedNommie}
                displaynominie={displaynominie}
                setDisplaynominie={setDisplaynominie}
              />{" "}
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    id="name"
                    placeholder="Enter Name"
                    {...field}
                    className={errors.name ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Controller
                name="mobile"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    id="mobile"
                    type="tel"
                    placeholder="Enter Mobile"
                    defaultCountry="in"
                    inputStyle={{ minWidth: "15.5rem" }}
                    value={field.value || ""}
                    onChange={field.onChange}
                    className={errors.mobile ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.mobile && (
                <span className="text-red-500">{errors.mobile.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    placeholder="Enter Email"
                    {...field}
                    className={errors.email ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <CardFooter className="flex justify-end gap-2 mt-8">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.history.back();
                }}
              >
                Cancel
              </Button>
              <Button id="submitButton" type="submit">
                Submit
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NPSEditForm;
