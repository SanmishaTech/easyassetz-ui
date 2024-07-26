import React, { useState, forwardRef, useEffect } from "react";
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
import { Textarea } from "@com/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import Addnominee from "@/components/Nominee/addNominee";
import { RadioGroup, RadioGroupItem } from "@com/ui/radio-group";
import cross from "@/components/image/close.png";
// import Datepicker from "../../Beneficiarydetails/Datepicker";

const schema = z.object({
  depository: z.string().nonempty({ message: "Depository is required" }),
  depositoryName: z
    .string()
    .nonempty({ message: "Depository Name is required" }),
  depositoryId: z.string().optional(),
  accountNumber: z.string().nonempty({ message: "Account Number is required" }),
  // certificateNumber: z.any().optional(),
  // distinguishNoFrom: z.any().optional(),
  // distinguishNoTo: z.any().optional(),
  // faceValue: z.any().optional(),
  // myStatus: z.string().nonempty({ message: "My Status is required" }),
  natureOfHolding: z
    .string()
    .nonempty({ message: "Nature of Holding is required" }),
  jointHolderName: z.string().optional(),
  jointHolderPan: z.string().optional(),
  // documentAvailability: z
  //   .string()
  //   .nonempty({ message: "Document Availability is required" }),
  additionalDetails: z.string().optional(),
  // typeOfInvestment: z
  //   .string()
  //   .nonempty({ message: "Type of Investment is required" }),
  name: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().optional(),
});

const FocusableSelectTrigger = forwardRef((props, ref) => (
  <SelectTrigger ref={ref} {...props} />
));

FocusableSelectTrigger.displayName = "FocusableSelectTrigger";

const MutualFundOtherForm = () => {
  const navigate = useNavigate();
  const getitem = localStorage.getItem("user");
  const user = JSON.parse(getitem);
  const queryClient = useQueryClient();
  const [showOtherCompanyRegistration, setShowOtherCompanyRegistration] =
    useState(true);
  const [showOtherMyStatus, setShowOthermyStatus] = useState(false);
  const [showOtherArticleDetails, setShowOtherArticleDetails] = useState(false);
  const [showOthertypeOfInvestment, setShowOthertypeOfInvestment] =
    useState(false);
  const [showOtherPPFAccountNo, setShowOtherPPFAccountNo] = useState(false);
  // const [showOtherdepositoryName, setshowOtherdepositoryName] = useState(false);
  const [selectedNommie, setSelectedNommie] = useState([]);
  const [nomineeerror, setNomineeError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState(null);
  const [displaynominie, setDisplaynominie] = useState([]);
  const [showOtherRegistrationNumber, setShowOtherRegistrationNumber] =
    useState(false);
  const [showOtherType, setShowOtherType] = useState(false);
  const [otherFirmRegistrationNumber, setOtherFirmRegistrationNumber] =
    useState("");
  const [otherFirmName, setOtherFirmName] = useState("");
  const [showOtherJointHolderName, setShowOtherJointHolderName] =
    useState(false);

  const [showOtherJointName, setShowOtherJointName] = useState(false);
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      depository: "",
      depositoryName: "",
      depositoryId: "",
      accountNumber: "",
      // certificateNumber: "",
      // distinguishNoFrom: "",
      // distinguishNoTo: "",
      // faceValue: "",
      natureOfHolding: "",
      jointHolderName: "",
      jointHolderPan: "",
      additionalDetails: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const lifeInsuranceMutate = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`/api/demat-accounts`, data, {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      });

      return response.data.data.DematAccount;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("LifeInsuranceData");
      toast.success("Demat Account added successfully!");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Error submitting profile:", error);
      toast.error("Failed to submit profile");
    },
  });

  useEffect(() => {
    if (selectedNommie.length > 0) {
      setNomineeError(false);
    }
  }, [selectedNommie]);

  const onSubmit = (data) => {
    console.log(data);
    // const date = new Date(data.maturityDate);
    // const month = String(date.getMonth() + 1).padStart(2, "0");
    // const day = String(date.getDate()).padStart(2, "0");
    // const year = date.getFullYear();
    // const newdate = `${month}/${day}/${year}`;
    // data.maturityDate = newdate;

    // data.firmsRegistrationNumberType = showOtherCompanyRegistration;
    // if (selectedNommie.length < 1) {
    //   toast.error("Please select atleast one nominee");
    //   setNomineeError(true);
    //   return;
    // }
    if (selectedNommie.length > 0) {
      data.nominees = selectedNommie;
    }

    // if (data.type === "other") {
    //   data.type = data.otherType;
    // }
    // delete data.otherType;

    // data.type = "company";
    data.mobile = phone;
    // if (data) {
    //   data.firmName = data.otherFirmName;
    // }

    lifeInsuranceMutate.mutate(data);
  };

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-2xl font-bold">
                Demat Account Details
              </CardTitle>
              <CardDescription>
                Fill out the form to add a new Demat Account Details.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form
            className="space-y-6 flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-4 flex flex-col">
              <Label className="text-lg font-bold">Depository Type</Label>
              <Controller
                name="depository"
                defaultValues="NSDL"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    defaultValue="NSDL"
                    onValueChange={(value) => {
                      field.onChange(value);
                      // setShowOtherJointName(value === "joint");
                    }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center gap-2 text-center">
                      <RadioGroupItem id="NSDL" value="NSDL" />
                      <Label htmlFor="NSDL">NSDL</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="CDSL" value="CDSL" />
                      <Label htmlFor="CDSL">CDSL</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.depository && (
                <span className="text-red-500">
                  {errors.depository.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="depositoryName">Depository Name</Label>
              <Controller
                name="depositoryName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="depositoryName"
                    placeholder="Enter Depository Name"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={errors.depositoryName ? "border-red-500" : ""}
                  />
                )}
              />

              {errors.depositoryName && (
                <span className="text-red-500">
                  {errors.depositoryName.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="depositoryId">Depository ID</Label>
              <Controller
                name="depositoryId"
                control={control}
                render={({ field }) => (
                  <Input
                    id="depositoryId"
                    placeholder="Enter Depository ID"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={errors.depositoryId ? "border-red-500" : ""}
                  />
                )}
              />

              {errors.depositoryId && (
                <span className="text-red-500">
                  {errors.depositoryId.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Controller
                name="accountNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    id="accountNumber"
                    placeholder="Enter Account Number"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={errors.accountNumber ? "border-red-500" : ""}
                  />
                )}
              />

              {errors.accountNumber && (
                <span className="text-red-500">
                  {errors.accountNumber.message}
                </span>
              )}
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="certificateNumber">Certificate Number</Label>
              <Controller
                name="certificateNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    id="certificateNumber"
                    placeholder="Enter Certificate Number"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={errors.certificateNumber ? "border-red-500" : ""}
                  />
                )}
              />

              {errors.certificateNumber && (
                <span className="text-red-500">
                  {errors.certificateNumber.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="distinguishNoFrom">Distinguish Number From</Label>
              <Controller
                name="distinguishNoFrom"
                control={control}
                render={({ field }) => (
                  <Input
                    id="distinguishNoFrom"
                    placeholder="Enter Distinguish Number From"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={errors.distinguishNoFrom ? "border-red-500" : ""}
                  />
                )}
              />

              {errors.distinguishNoFrom && (
                <span className="text-red-500">
                  {errors.distinguishNoFrom.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="distinguishNoTo">Distinguish Number To</Label>
              <Controller
                name="distinguishNoTo"
                control={control}
                render={({ field }) => (
                  <Input
                    id="distinguishNoTo"
                    placeholder="Enter Distinguish Number To"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={errors.distinguishNoTo ? "border-red-500" : ""}
                  />
                )}
              />

              {errors.distinguishNoTo && (
                <span className="text-red-500">
                  {errors.distinguishNoTo.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="faceValue">Face Value</Label>
              <Controller
                name="faceValue"
                control={control}
                render={({ field }) => (
                  <Input
                    id="faceValue"
                    placeholder="Enter Face Value"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={errors.faceValue ? "border-red-500" : ""}
                  />
                )}
              />

              {errors.faceValue && (
                <span className="text-red-500">{errors.faceValue.message}</span>
              )}
            </div> */}

            {/* <div className="space-y-2">
              <Label htmlFor="maturityDate">Maturity Date</Label>
              <Controller
                name="maturityDate"
                control={control}
                render={({ field }) => (
                  <Datepicker
                    {...field}
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                  />
                )}
              />
              {errors.maturityDate && (
                <span className="text-red-500 mt-5">
                  {errors.maturityDate.message}
                </span>
              )}
            </div> */}

            <div className="space-y-4 flex flex-col">
              <Label className="text-lg font-bold">Holding Type</Label>
              <Controller
                name="natureOfHolding"
                defaultValues="single"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    defaultValue="single"
                    onValueChange={(value) => {
                      field.onChange(value);
                      setShowOtherJointName(value === "joint");
                    }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center gap-2 text-center">
                      <RadioGroupItem id="single" value="single" />
                      <Label htmlFor="single">Single</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="joint" value="joint" />
                      <Label htmlFor="joint">Joint Name</Label>
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

            {showOtherJointName && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jointHolderName">Joint Holder Name</Label>
                  <Input
                    id="jointHolderName"
                    placeholder="Enter Joint Holder Name"
                    {...register("jointHolderName")}
                    className={errors.jointHolderName ? "border-red-500" : ""}
                  />
                  {errors.jointHolderName && (
                    <span className="text-red-500">
                      {errors.jointHolderName.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jointHolderPan">Joint Holder PAN</Label>
                  <Input
                    id="jointHolderPan"
                    placeholder="Enter Joint Holder PAN"
                    {...register("jointHolderPan")}
                    className={errors.jointHolderPan ? "border-red-500" : ""}
                  />
                  {errors.jointHolderPan && (
                    <span className="text-red-500">
                      {errors.jointHolderPan.message}
                    </span>
                  )}
                </div>
              </div>
            )}
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
                                (item) => item.id !== nominee.id
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
              <Label htmlFor="registered-phone">Add nominee</Label>
              <Addnominee
                setSelectedNommie={setSelectedNommie}
                selectedNommie={selectedNommie}
                displaynominie={displaynominie}
                setDisplaynominie={setDisplaynominie}
              />{" "}
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalDetails">Additional Information</Label>
              <Controller
                name="additionalDetails"
                control={control}
                render={({ field }) => (
                  <Input
                    id="additionalDetails"
                    placeholder="Enter Additional Information"
                    {...field}
                    value={field.value || ""}
                    onChange={field.onChange}
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
            <div className="w-full grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="additionalDetails">Point Of Contact</Label>
                <div className="mt-2  flex item-center  gap-2 justify-between">
                  <div className="w-[40%] space-y-2 item-center">
                    <Label htmlFor="name">Name</Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="name"
                          placeholder="Enter Name"
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          className={errors.name ? "border-red-500" : ""}
                        />
                      )}
                    />
                    {errors.name && (
                      <span className="text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="w-[40%] space-y-2">
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
                      <span className="text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="w-[40%] space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Controller
                      name="mobile"
                      control={control}
                      render={({ field }) => (
                        <PhoneInput
                          id="mobile"
                          type="tel"
                          placeholder="Enter mobile number"
                          defaultCountry="in"
                          inputStyle={{ minWidth: "15.5rem" }}
                          value={field.value}
                          onChange={(value) => {
                            console.log(value);
                            setValue("mobile", value);
                            setPhone(value);
                          }}
                        />
                      )}
                    />
                    {errors.phone && (
                      <span className="text-red-500">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <CardFooter className="flex justify-end gap-2 mt-8">
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MutualFundOtherForm;