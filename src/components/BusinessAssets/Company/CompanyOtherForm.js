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

const schema = z.object({
  companyName: z.string().nonempty({ message: "Company Name is required" }),
  companyAddress: z.string().optional(),
  otherRegistrationNumber: z.string().optional(),
  firmsRegistrationNumber: z
    .string()
    .min(2, { message: " Company Registration is required" }),

  myStatus: z.string().optional(),
  holdingType: z.string().optional(),
  jointHolderName: z.string().optional(),
  jointHolderPan: z.string().optional(),
  // documentAvailability: z
  //   .string()
  //   .nonempty({ message: "Document Availability is required" }),
  additionalInformation: z.string().optional(),
  typeOfInvestment: z.string().optional(),
  name: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().optional(),
  shareCertificateFile: z.any().optional(),
  partershipDeedFile: z.any().optional(),
  jvAgreementFile: z.any().optional(),
  loanDepositeReceipt: z.any().optional(),
  promisoryNote: z.any().optional(),
});

const FocusableSelectTrigger = forwardRef((props, ref) => (
  <SelectTrigger ref={ref} {...props} />
));

FocusableSelectTrigger.displayName = "FocusableSelectTrigger";

const CompanyForm = () => {
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
  const [showOtherCompanyName, setshowOtherCompanyName] = useState(false);
  const [selectedNommie, setSelectedNommie] = useState([]);
  const [nomineeerror, setNomineeError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [displaynominie, setDisplaynominie] = useState([]);
  const [showOtherRegistrationNumber, setShowOtherRegistrationNumber] =
    useState(false);
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firmName: "",
      registrationAddress: "",
      registrationNumber: "",
      additionalInformation: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const lifeInsuranceMutate = useMutation({
    mutationFn: async (data) => {
      const Formdata = new FormData();
      Formdata.append("shareCertificateFile", data.shareCertificateFile);
      Formdata.append("partershipDeedFile", data.partershipDeedFile);
      Formdata.append("jvAgreementFile", data.jvAgreementFile);
      Formdata.append("loanDepositeReceipt", data.loanDepositeReceipt);
      Formdata.append("promisoryNote", data.promisoryNote);

      for (const [key, value] of Object.entries(data)) {
        Formdata.append(key, value);
      }
      const response = await axios.post(`/api/business-assets`, Formdata, {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      });

      return response.data.data.PartnershipFirm;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("LifeInsuranceData");
      toast.success("Company added successfully!");
      navigate("/company");
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

  const onSubmit = async (data) => {
    // Disable the submit button
    const submitButton = document.getElementById("submitButton");
    console.log(submitButton);
    submitButton.disabled = true;
    try {
      console.log(data);
      console.log("Number:", data.firmsRegistrationNumber);
      data.firmsRegistrationNumberType = data.firmsRegistrationNumber;
      data.firmsRegistrationNumber = data.otherRegistrationNumber;

      // if (selectedNommie.length < 1) {
      //   toast.error("Please select atleast one nominee");
      //   setNomineeError(true);
      //   return;
      // }
      if (data.typeOfInvestment === "other") {
        data.typeOfInvestment = data.specifyInvestment;
      }
      if (selectedNommie.length > 0) {
        data.nominees = selectedNommie;
      }
      data.type = "company";
      // data.name = name;
      // data.email = email;
      // data.mobile = phone;
      if (data) {
        data.firmName = data.otherFirmName;
      }

      await lifeInsuranceMutate.mutateAsync(data);
    } catch (error) {
      console.error("Error submitting profile:", error);
      toast.error("Failed to submit profile");
    } finally {
      // Re-enable the submit button after submission attempt
      submitButton.disabled = false;
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Company Details
                </CardTitle>
                <CardDescription>
                  Fill out the form to add a new Company.
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form
            className="space-y-6 flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Label style={{ color: "red" }}>*</Label>
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="companyName"
                    placeholder="Enter Company Name"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={errors.companyName ? "border-red-500" : ""}
                  />
                )}
              />

              {errors.companyName && (
                <span className="text-red-500">
                  {errors.companyName.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Controller
                name="companyAddress"
                control={control}
                render={({ field }) => (
                  <Input
                    id="companyAddress"
                    placeholder="Enter Company Address"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={errors.companyAddress ? "border-red-500" : ""}
                  />
                )}
              />
              {showOtherArticleDetails && (
                <Controller
                  name="othercompanyAddress"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Specify Company Address"
                      className="mt-2"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  )}
                />
              )}
              {errors.companyAddress && (
                <span className="text-red-500">
                  {errors.companyAddress.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firmsRegistrationNumber">
                  Registration Number
                </Label>
                <Label style={{ color: "red" }}>*</Label>
                <Controller
                  name="firmsRegistrationNumber"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="firmsRegistrationNumber"
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setShowOtherRegistrationNumber(value);
                      }}
                      className={
                        errors.firmsRegistrationNumber ? "border-red-500" : ""
                      }
                    >
                      <FocusableSelectTrigger>
                        <SelectValue placeholder="Select  Registration Number" />
                      </FocusableSelectTrigger>
                      <SelectContent>
                        <SelectItem value="CIN">CIN</SelectItem>
                        <SelectItem value="PAN">PAN</SelectItem>
                        <SelectItem value="FIRM NO">FIRM NO</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {showOtherRegistrationNumber && (
                  <Controller
                    name="otherRegistrationNumber"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="otherRegistrationNumber"
                        value={field.value?.toUpperCase() || ""}
                        onChange={field.onChange}
                        className={
                          errors.firmsRegistrationNumber
                            ? "border-red-500 mt-2"
                            : "mt-2"
                        }
                        placeholder="Specify Registration Number"
                      />
                    )}
                  />
                )}
                {errors.firmsRegistrationNumber && (
                  <span className="text-red-500">
                    {errors.firmsRegistrationNumber.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="myStatus">My Status</Label>
                <Controller
                  name="myStatus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="myStatus"
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setShowOthermyStatus(value === "other");
                      }}
                      className={errors.myStatus ? "border-red-500" : ""}
                    >
                      <FocusableSelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </FocusableSelectTrigger>
                      <SelectContent>
                        <SelectItem value="shareholder">Shareholder</SelectItem>
                        <SelectItem value="partnerBO">Partner BO</SelectItem>
                        <SelectItem value="nominee">Nominee</SelectItem>
                        <SelectItem value="lender">Lender</SelectItem>
                        <SelectItem value="depositor">Depositor</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {/* {showOtherMyStatus && (
                  <Controller
                    name="otherMyStatus"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Specify My Status"
                        className="mt-2"
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    )}
                  />
                )} */}
                {errors.myStatus && (
                  <span className="text-red-500">
                    {errors.myStatus.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="space-y-2">
                <Label>Type of Investment</Label>
                <Controller
                  name="typeOfInvestment"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="typeOfInvestment"
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      className={
                        errors.typeOfInvestment ? "border-red-500" : ""
                      }
                    >
                      <FocusableSelectTrigger>
                        <SelectValue placeholder="Select Type of Investment" />
                      </FocusableSelectTrigger>
                      <SelectContent>
                        <SelectItem value="shares">Shares</SelectItem>
                        <SelectItem value="profit">Profit </SelectItem>
                        <SelectItem value="loan">Loan </SelectItem>
                        <SelectItem value="deposit">Deposit </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {showOthertypeOfInvestment && (
                  <Controller
                    name="otherTypeOfInvestment"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Specify Type of Investment"
                        className="mt-2"
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    )}
                  />
                )}
              </div>
            </div>

            <div className="space-y-4 flex flex-col">
              <Label className="text-lg font-bold">Holding Type</Label>
              <Controller
                name="holdingType"
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
              {errors.holdingType && (
                <span className="text-red-500">
                  {errors.holdingType.message}
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
                  <Controller
                    name="jointHolderPan"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="jointHolderPan"
                        placeholder="Enter Joint Holder PAN"
                        {...field}
                        value={field.value?.toUpperCase() || ""}
                        className={
                          errors.jointHolderPan ? "border-red-500" : ""
                        }
                      />
                    )}
                  ></Controller>
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
              <Addnominee
                setSelectedNommie={setSelectedNommie}
                selectedNommie={selectedNommie}
                displaynominie={displaynominie}
                setDisplaynominie={setDisplaynominie}
              />{" "}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="additionalInformation">
                  Additional Information
                </Label>
                <Controller
                  name="additionalInformation"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="additionalInformation"
                      placeholder="Enter Additional Information"
                      {...field}
                      value={field.value || ""}
                      onChange={field.onChange}
                      className={
                        errors.additionalInformation ? "border-red-500" : ""
                      }
                    />
                  )}
                />
                {errors.additionalInformation && (
                  <span className="text-red-500">
                    {errors.additionalInformation.message}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="additionalInformation">Point Of Contact</Label>
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
                          value={field.value}
                          onChange={field.onChange}
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
                    <Label htmlFor="phone">Mobile</Label>
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
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {errors.mobile && (
                      <span className="text-red-500">
                        {errors.mobile.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shareCertificateFile">Share Certificate</Label>
              <Controller
                name="shareCertificateFile"
                control={control}
                render={({ field }) => (
                  <Input
                    id="shareCertificateFile"
                    placeholder="Full Name - Name as per Adhar"
                    type="file"
                    onChange={(event) => {
                      field.onChange(
                        event.target.files && event.target.files[0]
                      );
                      console.log("sadsA", event.target.files);
                    }}
                    className={
                      errors.shareCertificateFile ? "border-red-500" : ""
                    }
                  />
                )}
              />
              {errors.shareCertificateFile && (
                <span className="text-red-500">
                  {errors.shareCertificateFile.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="partershipDeedFile">Partnership Deed</Label>
              <Controller
                name="partershipDeedFile"
                control={control}
                render={({ field }) => (
                  <Input
                    id="partershipDeedFile"
                    placeholder="Full Name - Name as per Adhar"
                    type="file"
                    onChange={(event) => {
                      field.onChange(
                        event.target.files && event.target.files[0]
                      );
                      console.log("sadsA", event.target.files);
                    }}
                    className={
                      errors.partershipDeedFile ? "border-red-500" : ""
                    }
                  />
                )}
              />
              {errors.partershipDeedFile && (
                <span className="text-red-500">
                  {errors.partershipDeedFile.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="jvAgreementFile">JV Agreement</Label>
              <Controller
                name="jvAgreementFile"
                control={control}
                render={({ field }) => (
                  <Input
                    id="jvAgreementFile"
                    placeholder="Full Name - Name as per Adhar"
                    type="file"
                    onChange={(event) => {
                      field.onChange(
                        event.target.files && event.target.files[0]
                      );
                      console.log("sadsA", event.target.files);
                    }}
                    className={errors.jvAgreementFile ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.jvAgreementFile && (
                <span className="text-red-500">
                  {errors.jvAgreementFile.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanDepositeReceipt">Loan Deposite Receipt</Label>
              <Controller
                name="loanDepositeReceipt"
                control={control}
                render={({ field }) => (
                  <Input
                    id="loanDepositeReceipt"
                    placeholder="Full Name - Name as per Adhar"
                    type="file"
                    onChange={(event) => {
                      field.onChange(
                        event.target.files && event.target.files[0]
                      );
                      console.log("sadsA", event.target.files);
                    }}
                    className={
                      errors.loanDepositeReceipt ? "border-red-500" : ""
                    }
                  />
                )}
              />
              {errors.loanDepositeReceipt && (
                <span className="text-red-500">
                  {errors.loanDepositeReceipt.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="promisoryNote">Promisory Note</Label>
              <Controller
                name="promisoryNote"
                control={control}
                render={({ field }) => (
                  <Input
                    id="promisoryNote"
                    placeholder="Full Name - Name as per Adhar"
                    type="file"
                    onChange={(event) => {
                      field.onChange(
                        event.target.files && event.target.files[0]
                      );
                      console.log("sadsA", event.target.files);
                    }}
                    className={errors.promisoryNote ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.promisoryNote && (
                <span className="text-red-500">
                  {errors.promisoryNote.message}
                </span>
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

export default CompanyForm;
