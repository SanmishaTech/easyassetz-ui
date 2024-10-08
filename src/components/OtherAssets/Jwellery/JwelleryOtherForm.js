import React, { useEffect, useState, forwardRef } from "react";
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
import { Autocompeleteadd } from "../../Reuseablecomponent/Autocompeleteadd";

// import Datepicker from "../../Beneficiarydetails/Datepicker";
import { RadioGroup, RadioGroupItem } from "@com/ui/radio-group";

const FocusableSelectTrigger = forwardRef((props, ref) => (
  <SelectTrigger ref={ref} {...props} />
));

const schema = z.object({
  jewelleryType: z.string().optional(),
  otherJewellery: z.string().optional(),
  metal: z.string().optional(),
  otherMetal: z.string().optional(),
  preciousStone: z.string().optional(),
  otherPreciousStone: z.string().optional(),
  weightPerJewellery: z.string().optional(),
  quantity: z.string().optional(),
  additionalInformation: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  mobile: z.string().optional(),
  type: z.any().optional(),
  jewelleryImages: z.any().optional(),
});

const JewelleryOtherForm = () => {
  const navigate = useNavigate();
  const getitem = localStorage.getItem("user");
  const user = JSON.parse(getitem);
  const queryClient = useQueryClient();
  const [fourWheelerStatus, setfourWheelerStatus] = useState(false);
  const [showOtherMetalType, setShowOtherMetalType] = useState(false);
  const [OtherJwelleryType, setOtherJwelleryType] = useState(false);
  const [OthermetalSelected, setOthermetalSelected] = useState(false);
  const [OtherPreciousStoneSelected, setOtherPreciousStoneSelected] =
    useState(false);

  const [values, setValues] = useState([]);
  const [takeinput, setTakeinput] = useState();
  const [inputvaluearray, setInputvaluearray] = useState({});
  const frameworks = {
    jewelleryType: [
      { value: "necklace", label: "Necklace" },
      { value: "earrings", label: "Earrings" },
      { value: "bracelet", label: "Bracelet" },
      { value: "bangles", label: "Bangles" },
      { value: "cuffLinks", label: "Cuff Links" },
      { value: "chain", label: "Chain" },
      { value: "ring", label: "Ring" },
    ],
    metal: [
      { value: "gold", label: "Gold" },
      { value: "silver", label: "Silver" },
      { value: "copper", label: "Copper" },
      { value: "whiteGold", label: "White Gold" },
      { value: "diamond", label: "Diamond" },
    ],
    preciousStone: [
      { value: "diamond", label: "Diamond" },
      { value: "ruby", label: "Ruby" },
      { value: "saffron", label: "Safron" },
    ],
  };
  useEffect(() => {
    console.log("Values:", values?.value);
    if (takeinput !== values?.value) {
      setValues(takeinput);

      setValue("jewelleryType", takeinput);
      setValue("metal", takeinput);
      setValue("preciousStone", takeinput);
    }
  }, [takeinput]);
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      jewelleryType: "",
      otherJewellery: "",
      metal: "",
      otherMetal: "",
      preciousStone: "",
      otherPreciousStone: "",
      weightPerJewellery: "",
      quantity: "",
      additionalInformation: "",
      name: "",
      email: "",
      mobile: "",
      type: "jewellery",
    },
  });

  const loanMutate = useMutation({
    mutationFn: async (data) => {
      const Formdata = new FormData();
      Formdata.append("jewelleryImages", data.jewelleryImages);

      for (const [key, value] of Object.entries(data)) {
        Formdata.append(key, value);
      }
      const response = await axios.post(`/api/other-assets`, Formdata, {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      });

      return response.data.data.Jewellery;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("LoanData");
      toast.success("Jewellery added successfully!");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Error submitting loan:", error);
      toast.error("Failed to submit loan");
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    // Disable the submit button
    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = true;

    try {
      data.type = "jewellery";

      if (data.jewelleryType === "other") {
        data.jewelleryType = data.otherJewellery;
      }
      if (data.preciousStone === "other") {
        data.preciousStone = data.otherPreciousStone;
      }
      if (data.metal === "other") {
        data.metal = data.otherMetal;
      }

      // Mutate asynchronously and handle submission
      await loanMutate.mutateAsync(data);
    } catch (error) {
      toast.error("Failed to add beneficiary");
      console.error("Error adding beneficiary:", error);
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
                <CardTitle className="text-2xl font-bold">Jewellery</CardTitle>
                <CardDescription>
                  Fill out the form to add a new Jewellery.
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jewelleryType">Type of Jewellery</Label>
                <Controller
                  name="jewelleryType"
                  control={control}
                  render={({ field }) => (
                    // <Select
                    //   id="jewelleryType"
                    //   placeholder="Enter Type of Jewellery"
                    //   {...field}
                    //   onValueChange={(value) => {
                    //     field.onChange(value);
                    //     setOtherJwelleryType(value === "other");
                    //   }}
                    //   className={errors.jewelleryType ? "border-red-500" : ""}
                    // >
                    //   <FocusableSelectTrigger>
                    //     <SelectValue placeholder="Type of Jewellery" />
                    //   </FocusableSelectTrigger>
                    //   <SelectContent>
                    //     <SelectItem value="necklace">Necklace</SelectItem>
                    //     <SelectItem value="earrings">Earrings</SelectItem>
                    //     <SelectItem value="bracelet">Bracelet</SelectItem>
                    //     <SelectItem value="bangles">Bangles</SelectItem>
                    //     <SelectItem value="cuffLinks">Cuff Links</SelectItem>
                    //     <SelectItem value="chain">Chain</SelectItem>
                    //     <SelectItem value="ring">Ring</SelectItem>
                    //     <SelectItem value="other">Other</SelectItem>
                    //   </SelectContent>
                    // </Select>
                    <Autocompeleteadd
                      options={frameworks.jewelleryType}
                      placeholder="Select Jewellery Type..."
                      emptyMessage="No Jewellery Type Found."
                      value={values}
                      array={inputvaluearray}
                      setarray={setInputvaluearray}
                      variable="jewelleryType"
                      onValueChange={(value) => {
                        setValues(value);
                        console.log(value);
                        setValue("jewelleryType", value?.value);
                      }}
                    />
                  )}
                />
                {/* {OtherJwelleryType && (
                  <div className="space-y-2">
                    <Controller
                      name="otherJewellery"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="otherJewellery"
                          placeholder="Enter Other Jewellery"
                          {...field}
                          className={
                            errors.otherJewellery ? "border-red-500" : ""
                          }
                        />
                      )}
                    />
                    {errors.otherJewellery && (
                      <span className="text-red-500">
                        {errors.otherJewellery.message}
                      </span>
                    )}
                  </div>
                )} */}
                {errors.jewelleryType && (
                  <span className="text-red-500">
                    {errors.jewelleryType.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="metal">Metal</Label>
                <Controller
                  name="metal"
                  control={control}
                  render={({ field }) => (
                    // <Select
                    //   id="metal"
                    //   placeholder="Enter Metal"
                    //   {...field}
                    //   onValueChange={(value) => {
                    //     field.onChange(value);
                    //     setOthermetalSelected(value === "other");
                    //   }}
                    //   className={errors.metal ? "border-red-500" : ""}
                    // >
                    //   <FocusableSelectTrigger>
                    //     <SelectValue placeholder="Select Metal Type" />
                    //   </FocusableSelectTrigger>
                    //   <SelectContent>
                    //     <SelectItem value="gold">Gold</SelectItem>
                    //     <SelectItem value="silver">Silver</SelectItem>
                    //     <SelectItem value="copper">Copper</SelectItem>
                    //     <SelectItem value="whiteGold">White Gold</SelectItem>
                    //     <SelectItem value="diamond">Diamond</SelectItem>
                    //     <SelectItem value="other">Other</SelectItem>
                    //   </SelectContent>
                    // </Select>
                    <Autocompeleteadd
                      options={frameworks.metal}
                      placeholder="Select Metal Type..."
                      emptyMessage="No Metal Type Found."
                      value={values}
                      array={inputvaluearray}
                      setarray={setInputvaluearray}
                      variable="metal"
                      onValueChange={(value) => {
                        setValues(value);
                        console.log(value);
                        setValue("metal", value?.value);
                      }}
                    />
                  )}
                />
                {/* {OthermetalSelected && (
                  <div className="space-y-2">
                    <Controller
                      name="otherMetal"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="otherMetal"
                          placeholder="Enter Other Metal"
                          {...field}
                          className={errors.otherMetal ? "border-red-500" : ""}
                        />
                      )}
                    />
                    {errors.otherMetal && (
                      <span className="text-red-500">
                        {errors.otherMetal.message}
                      </span>
                    )}
                  </div>
                )} */}
                {errors.metal && (
                  <span className="text-red-500">{errors.metal.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preciousStone">Precious Stone</Label>
                <Controller
                  name="preciousStone"
                  control={control}
                  render={({ field }) => (
                    // <Select
                    //   id="preciousStone"
                    //   {...field}
                    //   onValueChange={(value) => {
                    //     field.onChange(value);
                    //     setOtherPreciousStoneSelected(value === "other");
                    //   }}
                    //   className={errors.preciousStone ? "border-red-500" : ""}
                    // >
                    //   <FocusableSelectTrigger>
                    //     <SelectValue placeholder="Select Precious Stone" />
                    //   </FocusableSelectTrigger>
                    //   <SelectContent>
                    //     <SelectItem value="diamond">Diamond</SelectItem>
                    //     <SelectItem value="ruby">Ruby</SelectItem>
                    //     <SelectItem value="saffron">Safron</SelectItem>
                    //     <SelectItem value="other">Other</SelectItem>
                    //   </SelectContent>
                    // </Select>
                    <Autocompeleteadd
                      options={frameworks.preciousStone}
                      placeholder="Select Precious Stone..."
                      emptyMessage="No Precious Stone Found."
                      value={values}
                      array={inputvaluearray}
                      setarray={setInputvaluearray}
                      variable="preciousStone"
                      onValueChange={(value) => {
                        setValues(value);
                        console.log(value);
                        setValue("preciousStone", value?.value);
                      }}
                    />
                  )}
                />
                {/* {OtherPreciousStoneSelected && (
                  <div className="space-y-2">
                    <Label htmlFor="otherPreciousStone">
                      Other Precious Stone
                    </Label>
                    <Controller
                      name="otherPreciousStone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="otherPreciousStone"
                          placeholder="Enter Other Precious Stone"
                          {...field}
                          className={
                            errors.otherPreciousStone ? "border-red-500" : ""
                          }
                        />
                      )}
                    />
                    {errors.otherPreciousStone && (
                      <span className="text-red-500">
                        {errors.otherPreciousStone.message}
                      </span>
                    )}
                  </div>
                )} */}
                {errors.preciousStone && (
                  <span className="text-red-500">
                    {errors.preciousStone.message}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weightPerJewellery">Weight Per Jewellery</Label>
              <Controller
                name="weightPerJewellery"
                control={control}
                render={({ field }) => (
                  <Input
                    id="weightPerJewellery"
                    placeholder="Enter Weight Per Jewellery"
                    {...field}
                    className={
                      errors.weightPerJewellery ? "border-red-500" : ""
                    }
                  />
                )}
              />
              {errors.weightPerJewellery && (
                <span className="text-red-500">
                  {errors.weightPerJewellery.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <Input
                    id="quantity"
                    placeholder="Enter Quantity"
                    {...field}
                    className={errors.quantity ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.quantity && (
                <span className="text-red-500">{errors.quantity.message}</span>
              )}
            </div>
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
            <div className="col-span-full">
              <h1>Point Of Contact</h1>
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
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Controller
                name="mobile"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    id="mobile"
                    type="tel"
                    placeholder="Enter Mobile Number"
                    defaultCountry="in"
                    inputStyle={{ minWidth: "15.5rem" }}
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.mobile && (
                <span className="text-red-500">{errors.mobile.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label>Upload File</Label>
              <Controller
                name="jewelleryImages"
                control={control}
                render={({ field }) => (
                  <Input
                    id="file"
                    type="file"
                    onChange={(event) => {
                      field.onChange(
                        event.target.files && event.target.files[0]
                      );
                    }}
                    className={errors.file ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.file && (
                <span className="text-red-500">{errors.file.message}</span>
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

export default JewelleryOtherForm;
