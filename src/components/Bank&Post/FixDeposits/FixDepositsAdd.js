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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import { RadioGroup, RadioGroupItem } from "@com/ui/radio-group";

const schema = z.object({
  bankName: z.string().nonempty({ message: "Bank/Post Name is required" }),
  ppfAccountNumber: z
    .string()
    .nonempty({ message: "PPF Account Number is required" }),
  branch: z.string().optional(),
  holdingNature: z
    .string()
    .nonempty({ message: "Nature of Holding is required" }),
  jointHolderName: z.string().optional(),
  additionalDetails: z.string().optional(),
  pointOfContactName: z
    .string()
    .nonempty({ message: "Point of Contact Name is required" }),
  pointOfContactMobile: z
    .string()
    .nonempty({ message: "Point of Contact Mobile is required" }),
  pointOfContactEmail: z
    .string()
    .email({ message: "Invalid Email" })
    .nonempty({ message: "Point of Contact Email is required" }),
});
const FocusableSelectTrigger = forwardRef((props, ref) => (
  <SelectTrigger ref={ref} {...props} />
));

FocusableSelectTrigger.displayName = "FocusableSelectTrigger";


const BankAccountForm = () => {
  const navigate = useNavigate();
  const getitem = localStorage.getItem("user");
  const user = JSON.parse(getitem);
  const queryClient = useQueryClient();
  const [showJointHolderName, setShowJointHolderName] = useState(false);
  const [showOtherAccountType, setShowOtherAccountType] = useState(false);
  const [nomineeDetails, setNomineeDetails] = useState([]);
  const [nomineeError, setNomineeError] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      bankName: "",
      ppfAccountNumber: "",
      branch: "",
      holdingNature: "",
      jointHolderName: "",
      additionalDetails: "",
      pointOfContactName: "",
      pointOfContactMobile: "",
      pointOfContactEmail: "",
    },
  });

  const ppfMutate = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`/api/ppf`, data, {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      });
      return response.data.data.PPF;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("PpfData");
      toast.success("PPF details added successfully!");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Error submitting PPF details:", error);
      toast.error("Failed to submit PPF details");
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    ppfMutate.mutate(data);
  };

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-2xl font-bold">Bank Account Details</CardTitle>
              <CardDescription>
                Fill out the form to add new Bank Account Details.
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
              <Label htmlFor="bankName">Bank Name</Label>
              <Controller
                name="bankName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="bankName"
                    placeholder="Enter Bank Name"
                    {...field}
                    className={errors.bankName ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.bankName && (
                <span className="text-red-500">{errors.bankName.message}</span>
              )}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <Controller
                  name="accountType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="accountType"
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setShowOtherAccountType(value === "other");
                      }}
                      className={errors.accountType ? "border-red-500" : ""}
                    >
                      <FocusableSelectTrigger>
                        <SelectValue placeholder="Select Account Type" />
                      </FocusableSelectTrigger>
                      <SelectContent>
                        <SelectItem value="saving">Saving</SelectItem>
                        <SelectItem value="current">Current</SelectItem>
                        <SelectItem value="recurring">Recurring</SelectItem>
                        <SelectItem value="nri">NRI</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {showOtherAccountType && (
                  <Controller
                    name="otheraccountType"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Specify Account Type"
                        className="mt-2"
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    )}
                  />
                )}
                {errors.accountType && (
                  <span className="text-red-500">
                    {errors.accountType.message}
                  </span>
                )}
              </div>
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

            <div className="space-y-2">
              <Label htmlFor="branchName">Branch Name</Label>
              <Controller
                name="branchName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="branchName"
                    placeholder="Enter Branch Name"
                    {...field}
                    className={errors.branchName ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.branchName && (
                <span className="text-red-500">{errors.branchName.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    id="city"
                    placeholder="Enter City"
                    {...field}
                    className={errors.city ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.city && (
                <span className="text-red-500">{errors.city.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="holdingNature">Nature of Holding</Label>
              <Controller
                name="holdingNature"
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
              {errors.holdingNature && (
                <span className="text-red-500">
                  {errors.holdingNature.message}
                </span>
              )}
            </div>

            {showJointHolderName && (
              <div className="space-y-2">
                <Label htmlFor="jointHolderName">Joint Holder Name</Label>
                <Controller
                  name="jointHolderName"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="jointHolderName"
                      value={field.value}
                      onValueChange={field.onChange}
                      className={errors.jointHolderName ? "border-red-500" : ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Joint Holder Name" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="family_member_1">
                          Family Member 1
                        </SelectItem>
                        <SelectItem value="family_member_2">
                          Family Member 2
                        </SelectItem>
                        <SelectItem value="other_contact_1">
                          Other Contact 1
                        </SelectItem>
                        <SelectItem value="other_contact_2">
                          Other Contact 2
                        </SelectItem>
                        {/* Add more options as needed */}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.jointHolderName && (
                  <span className="text-red-500">
                    {errors.jointHolderName.message}
                  </span>
                )}
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

            <div className="space-y-2">
              <Label htmlFor="pointOfContactName">Point of Contact Name</Label>
              <Controller
                name="pointOfContactName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="pointOfContactName"
                    placeholder="Enter Point of Contact Name"
                    {...field}
                    className={
                      errors.pointOfContactName ? "border-red-500" : ""
                    }
                  />
                )}
              />
              {errors.pointOfContactName && (
                <span className="text-red-500">
                  {errors.pointOfContactName.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pointOfContactMobile">
                Point of Contact Mobile
              </Label>
              <Controller
                name="pointOfContactMobile"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    id="pointOfContactMobile"
                    type="tel"
                    placeholder="Enter Point of Contact Mobile"
                    defaultCountry="in"
                    inputStyle={{ minWidth: "15.5rem" }}
                    {...field}
                    className={
                      errors.pointOfContactMobile ? "border-red-500" : ""
                    }
                  />
                )}
              />
              {errors.pointOfContactMobile && (
                <span className="text-red-500">
                  {errors.pointOfContactMobile.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pointOfContactEmail">
                Point of Contact Email
              </Label>
              <Controller
                name="pointOfContactEmail"
                control={control}
                render={({ field }) => (
                  <Input
                    id="pointOfContactEmail"
                    placeholder="Enter Point of Contact Email"
                    {...field}
                    className={
                      errors.pointOfContactEmail ? "border-red-500" : ""
                    }
                  />
                )}
              />
              {errors.pointOfContactEmail && (
                <span className="text-red-500">
                  {errors.pointOfContactEmail.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUpload">Image Upload</Label>
              <Controller
                name="imageUpload"
                control={control}
                render={({ field }) => (
                  <Input
                    type="file"
                    id="imageUpload"
                    {...field}
                    className={errors.imageUpload ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.imageUpload && (
                <span className="text-red-500">
                  {errors.imageUpload.message}
                </span>
              )}
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

export default BankAccountForm;