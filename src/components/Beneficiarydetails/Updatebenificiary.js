import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@com/ui/card";
import { Label } from "@com/ui/label";
import { Input } from "@com/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@com/ui/select";
import "react-international-phone/style.css";
import { Button } from "@com/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@com/ui/sheet";
import { ScrollArea } from "@com/ui/scroll-area";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import Datepicker from "./Datepicker";
import { PhoneInput } from "react-international-phone";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const beneficiarySchema = z
  .object({
    fullName: z.string().nonempty("Full Legal Name is required"),
    relationship: z.string().nonempty("Relationship is required"),
    specificRelationship: z.string().optional(),
    gender: z.string().nonempty("Gender is required"),
    dob: z.date().optional(),
    guardianName: z.string().optional(),
    guardianMobile: z.string().optional(),
    guardianEmail: z.string().optional(),
    guardianCity: z.string().optional(),
    guardianState: z.string().optional(),
    guardianDocument: z.string().optional(),
    guardianDocumentData: z.string().optional(),
    guardianReligion: z.string().optional(),
    guardianNationality: z.string().optional(),
    guardianAddress1: z.string().optional(),
    guardianAddress2: z.string().optional(),
    guardianPincode: z.string().optional(),
    guardianCountry: z.string().optional(),
    mobile: z.string().optional(),
    email: z.string().optional(),
    documentData: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    houseNo: z.string().optional(),
    address1: z.string().optional(),
    address2: z.string().optional(),
    pincode: z.string().optional(),
    country: z.string().optional(),
    religion: z.string().optional(),
    nationality: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.dob) {
        const age = Math.abs(
          new Date(Date.now() - new Date(data.dob).getTime()).getUTCFullYear() -
            1970
        );
        if (age < 18) {
          return !!(
            data.guardianName &&
            data.guardianMobile &&
            data.guardianEmail
          );
        }
      }
      return true;
    },
    {
      message: "Guardian fields are required for minors.",
      path: ["guardianName"], // this will highlight the guardianName field in case of error
    }
  );

const Benificiaryform = ({
  benficiaryopen,
  setbenficiaryopen,
  beneficiaryId,
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(beneficiarySchema),
  });

  const [selectedDocument, setSelectedDocument] = useState("");
  const [dateCountryCode, setDateCountryCode] = useState("+91");
  const [relationship, setRelationship] = useState("");

  const watchDOB = watch("dob", null);

  const {
    data: beneficiaryData,
    isLoading,
    isError,
  } = useQuery(
    ["beneficiary", beneficiaryId],
    async () => {
      const { data } = await axios.get(`/api/beneficiary/${beneficiaryId}`);
      return data;
    },
    {
      enabled: !!beneficiaryId,
      onSuccess: (data) => {
        // Prefill the form with the fetched data
        for (const [key, value] of Object.entries(data)) {
          if (key === "dob") {
            setValue(key, new Date(value)); // Convert ISO string to Date object
          } else {
            setValue(key, value);
          }
        }
      },
    }
  );

  useEffect(() => {
    if (watchDOB) {
      const age = calculateAge(watchDOB);
      if (age >= 18) {
        clearGuardianFields();
      }
    }
  }, [watchDOB]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const clearGuardianFields = () => {
    setValue("guardianName", "");
    setValue("guardianMobile", "");
    setValue("guardianEmail", "");
    setValue("guardianCity", "");
    setValue("guardianState", "");
    setValue("guardianDocument", "");
    setValue("guardianDocumentData", "");
    setValue("guardianReligion", "");
    setValue("guardianNationality", "");
    setValue("guardianHouseNo", "");
    setValue("guardianAddress1", "");
    setValue("guardianAddress2", "");
    setValue("guardianPincode", "");
    setValue("guardianCountry", "");
  };

  const mutation = useMutation(
    async (data) => {
      const response = await axios.put(
        `/api/beneficiaries/${beneficiaryId}`,
        data
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["beneficiary", beneficiaryId]);
        alert("Beneficiary updated successfully!");
        setbenficiaryopen(false);
      },
      onError: (error) => {
        console.error("Error updating beneficiary:", error);
        alert("Failed to update beneficiary.");
      },
    }
  );

  const onSubmit = (data) => {
    console.log(data);
    data.dob = data.dob.toISOString(); // Convert Date object to ISO string
    mutation.mutate(data);
  };

  const isMinor = watchDOB ? calculateAge(watchDOB) < 18 : true;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading beneficiary data</div>;

  return (
    <div>
      <Sheet
        className="w-[800px]"
        open={benficiaryopen}
        onOpenChange={setbenficiaryopen}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Update Beneficiary</SheetTitle>
            <SheetDescription className="flex flex-col justify-center">
              <ScrollArea className="w-full h-[85vh] rounded-md">
                <form onSubmit={handleSubmit(onSubmit)} className="scrollable">
                  <Card className="w-full max-w-3xl">
                    <CardHeader>
                      <CardTitle>Beneficiary Form</CardTitle>
                      <CardDescription>
                        Please update the necessary details.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium">Basic Details</h3>
                        <div className="grid grid-cols-1 gap-6 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="full-name">Full Legal Name</Label>
                            <Input
                              id="full-name"
                              placeholder="Enter your full legal name"
                              {...register("fullName")}
                            />
                            {errors.fullName && (
                              <p className="text-red-500">
                                {errors.fullName.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="relationship">Relationship</Label>
                            <Controller
                              name="relationship"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  value={field.value}
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    setRelationship(value);
                                  }}
                                >
                                  <SelectTrigger
                                    id="relationship"
                                    aria-label="Relationship"
                                  >
                                    <SelectValue placeholder="Select relationship" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="self">Self</SelectItem>
                                    <SelectItem value="spouse">
                                      Spouse
                                    </SelectItem>
                                    <SelectItem value="child">Child</SelectItem>
                                    <SelectItem value="parent">
                                      Parent
                                    </SelectItem>
                                    <SelectItem value="sibling">
                                      Sibling
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            {errors.relationship && (
                              <p className="text-red-500">
                                {errors.relationship.message}
                              </p>
                            )}
                          </div>
                          {relationship === "other" && (
                            <div className="space-y-2">
                              <Label htmlFor="specific-relationship">
                                Specific Relationship
                              </Label>
                              <Input
                                id="specific-relationship"
                                placeholder="Enter specific relationship"
                                {...register("specificRelationship")}
                              />
                              {errors.specificRelationship && (
                                <p className="text-red-500">
                                  {errors.specificRelationship.message}
                                </p>
                              )}
                            </div>
                          )}
                          <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Controller
                              name="gender"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger
                                    id="gender"
                                    aria-label="Gender"
                                  >
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">
                                      Female
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            {errors.gender && (
                              <p className="text-red-500">
                                {errors.gender.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Controller
                              name="dob"
                              control={control}
                              render={({ field }) => (
                                <Datepicker
                                  selected={field.value}
                                  onChange={field.onChange}
                                  id="dob"
                                />
                              )}
                            />
                            {errors.dob && (
                              <p className="text-red-500">
                                {errors.dob.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Controller
                              name="mobile"
                              control={control}
                              render={({ field }) => (
                                <PhoneInput
                                  international
                                  countryCallingCodeEditable={false}
                                  defaultCountry={dateCountryCode}
                                  value={field.value}
                                  onChange={(value) => {
                                    field.onChange(value);
                                  }}
                                />
                              )}
                            />
                            {errors.mobile && (
                              <p className="text-red-500">
                                {errors.mobile.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              placeholder="Enter your email address"
                              {...register("email")}
                            />
                            {errors.email && (
                              <p className="text-red-500">
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="documentData">Document Data</Label>
                            <Input
                              id="documentData"
                              placeholder="Enter document data"
                              {...register("documentData")}
                            />
                            {errors.documentData && (
                              <p className="text-red-500">
                                {errors.documentData.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="houseNo">House Number</Label>
                            <Input
                              id="houseNo"
                              placeholder="Enter house number"
                              {...register("houseNo")}
                            />
                            {errors.houseNo && (
                              <p className="text-red-500">
                                {errors.houseNo.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address1">Address Line 1</Label>
                            <Input
                              id="address1"
                              placeholder="Enter address line 1"
                              {...register("address1")}
                            />
                            {errors.address1 && (
                              <p className="text-red-500">
                                {errors.address1.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address2">Address Line 2</Label>
                            <Input
                              id="address2"
                              placeholder="Enter address line 2"
                              {...register("address2")}
                            />
                            {errors.address2 && (
                              <p className="text-red-500">
                                {errors.address2.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pincode">Pincode</Label>
                            <Input
                              id="pincode"
                              placeholder="Enter pincode"
                              {...register("pincode")}
                            />
                            {errors.pincode && (
                              <p className="text-red-500">
                                {errors.pincode.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              placeholder="Enter country"
                              {...register("country")}
                            />
                            {errors.country && (
                              <p className="text-red-500">
                                {errors.country.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              placeholder="Enter city"
                              {...register("city")}
                            />
                            {errors.city && (
                              <p className="text-red-500">
                                {errors.city.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              placeholder="Enter state"
                              {...register("state")}
                            />
                            {errors.state && (
                              <p className="text-red-500">
                                {errors.state.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {isMinor && (
                        <div>
                          <h3 className="text-lg font-medium">
                            Guardian Details
                          </h3>
                          <div className="grid grid-cols-1 gap-6 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="guardian-name">
                                Guardian's Full Name
                              </Label>
                              <Input
                                id="guardian-name"
                                placeholder="Enter guardian's full name"
                                {...register("guardianName")}
                              />
                              {errors.guardianName && (
                                <p className="text-red-500">
                                  {errors.guardianName.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="guardian-mobile">
                                Guardian's Mobile Number
                              </Label>
                              <Controller
                                name="guardianMobile"
                                control={control}
                                render={({ field }) => (
                                  <PhoneInput
                                    international
                                    countryCallingCodeEditable={false}
                                    defaultCountry={dateCountryCode}
                                    value={field.value}
                                    onChange={(value) => {
                                      field.onChange(value);
                                    }}
                                  />
                                )}
                              />
                              {errors.guardianMobile && (
                                <p className="text-red-500">
                                  {errors.guardianMobile.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="guardian-email">
                                Guardian's Email Address
                              </Label>
                              <Input
                                id="guardian-email"
                                placeholder="Enter guardian's email address"
                                {...register("guardianEmail")}
                              />
                              {errors.guardianEmail && (
                                <p className="text-red-500">
                                  {errors.guardianEmail.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="guardian-document">
                                Guardian's Document
                              </Label>
                              <Input
                                id="guardian-document"
                                placeholder="Enter guardian's document"
                                {...register("guardianDocument")}
                              />
                              {errors.guardianDocument && (
                                <p className="text-red-500">
                                  {errors.guardianDocument.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="guardian-document-data">
                                Guardian's Document Data
                              </Label>
                              <Input
                                id="guardian-document-data"
                                placeholder="Enter guardian's document data"
                                {...register("guardianDocumentData")}
                              />
                              {errors.guardianDocumentData && (
                                <p className="text-red-500">
                                  {errors.guardianDocumentData.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="guardian-religion">
                                Guardian's Religion
                              </Label>
                              <Input
                                id="guardian-religion"
                                placeholder="Enter guardian's religion"
                                {...register("guardianReligion")}
                              />
                              {errors.guardianReligion && (
                                <p className="text-red-500">
                                  {errors.guardianReligion.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="guardian-nationality">
                                Guardian's Nationality
                              </Label>
                              <Input
                                id="guardian-nationality"
                                placeholder="Enter guardian's nationality"
                                {...register("guardianNationality")}
                              />
                              {errors.guardianNationality && (
                                <p className="text-red-500">
                                  {errors.guardianNationality.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="guardian-city">City</Label>
                              <Input
                                id="guardian-city"
                                placeholder="Enter guardian's city"
                                {...register("guardianCity")}
                              />
                              {errors.guardianCity && (
                                <p className="text-red-500">
                                  {errors.guardianCity.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="guardian-state">State</Label>
                              <Input
                                id="guardian-state"
                                placeholder="Enter guardian's state"
                                {...register("guardianState")}
                              />
                              {errors.guardianState && (
                                <p className="text-red-500">
                                  {errors.guardianState.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="guardian-house-no">
                                House Number
                              </Label>
                              <Input
                                id="guardian-house-no"
                                placeholder="Enter house number"
                                {...register("guardianHouseNo")}
                              />
                              {errors.guardianHouseNo && (
                                <p className="text-red-500">
                                  {errors.guardianHouseNo.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="guardian-address1">
                                Address Line 1
                              </Label>
                              <Input
                                id="guardian-address1"
                                placeholder="Enter address line 1"
                                {...register("guardianAddress1")}
                              />
                              {errors.guardianAddress1 && (
                                <p className="text-red-500">
                                  {errors.guardianAddress1.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="guardian-address2">
                                Address Line 2
                              </Label>
                              <Input
                                id="guardian-address2"
                                placeholder="Enter address line 2"
                                {...register("guardianAddress2")}
                              />
                              {errors.guardianAddress2 && (
                                <p className="text-red-500">
                                  {errors.guardianAddress2.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="guardian-pincode">Pincode</Label>
                              <Input
                                id="guardian-pincode"
                                placeholder="Enter pincode"
                                {...register("guardianPincode")}
                              />
                              {errors.guardianPincode && (
                                <p className="text-red-500">
                                  {errors.guardianPincode.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="guardian-country">Country</Label>
                              <Input
                                id="guardian-country"
                                placeholder="Enter country"
                                {...register("guardianCountry")}
                              />
                              {errors.guardianCountry && (
                                <p className="text-red-500">
                                  {errors.guardianCountry.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-4">
                      <Button type="submit">Submit</Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setbenficiaryopen(false)}
                      >
                        Cancel
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </ScrollArea>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Benificiaryform;