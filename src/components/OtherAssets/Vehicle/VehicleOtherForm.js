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
// import { PhoneInput } from "react-international-phone";
import Datepicker from "../../Beneficiarydetails/Datepicker";
import { RadioGroup, RadioGroupItem } from "@com/ui/radio-group";
import { Autocompeleteadd } from "../../Reuseablecomponent/Autocompeleteadd";

const FocusableSelectTrigger = forwardRef((props, ref) => (
  <SelectTrigger ref={ref} {...props} />
));

const schema = z.object({
  vehicleType: z.any().optional(),
  otherVehicleType: z.any().optional(),
  fourWheeler: z.any().optional(),
  otherFourWheeler: z.string().optional(),
  company: z.string().nonempty({ message: "Company Name is required" }),
  model: z.string().nonempty({ message: "Model is required" }),
  registrationNumber: z.any().optional(),
  yearOfManufacture: z.any().optional(),
  location: z.any().optional(),
  yearOfExpiry: z.any().optional(),
});

const RecoverableOtherForm = () => {
  const navigate = useNavigate();
  const getitem = localStorage.getItem("user");
  const user = JSON.parse(getitem);
  const queryClient = useQueryClient();
  const [fourWheelerStatus, setfourWheelerStatus] = useState(false);
  const [showOtherMetalType, setShowOtherMetalType] = useState(false);
  const [showVehicleType, setShowVehicleType] = useState(false);
  const [values, setValues] = useState([]);
  const [takeinput, setTakeinput] = useState();
  const [inputvaluearray, setInputvaluearray] = useState({});
  const frameworks = {
    vehicleType: [
      { value: "twowheeler", label: "Two Wheeler" },
      { value: "threewheeler", label: "Three Wheeler" },
      { value: "fourwheeler", label: "Four Wheeler" },
      { value: "tractor", label: "Tractor" },
      { value: "bulldozer", label: "Bulldozer" },
      { value: "crane", label: "Crane" },
    ],
  };

  useEffect(() => {
    console.log("Values:", values?.value);
    if (takeinput !== values?.value) {
      setValues(takeinput);

      setValue("vehicleType", takeinput);
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
      vehicleType: "",
      fourWheeler: "",
      company: "",
      model: "",
      registrationNumber: "",
      yearOfManufacture: "",
      location: "",
    },
  });

  const loanMutate = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`/api/other-assets`, data, {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      });
      return response.data.data.Recoverable;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("LoanData");
      toast.success("Vehicle added successfully!");
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
      // Process the form data
      if (data.yearOfExpiry) {
        const date = new Date(data.yearOfExpiry);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();
        const newdate = `${month}/${day}/${year}`;
        data.yearOfExpiry = newdate;
      }
      if (data.yearOfManufacture) {
        const date = new Date(data.yearOfManufacture);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();
        const newdate = `${month}/${day}/${year}`;
        data.yearOfManufacture = newdate;
      }
      if (data.vehicleType === "other") {
        data.vehicleType = data.otherVehicleType;
      }
      if (data.fourWheeler === "other") {
        data.fourWheeler = data.otherFourWheeler;
      }
      data.type = "vehicle";

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
                <CardTitle className="text-2xl font-bold">Vehicle</CardTitle>
                <CardDescription>
                  Fill out the form to add a new Vehicle.
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
                <Label htmlFor="vehicleType">Vehicle Type</Label>
                <Controller
                  name="vehicleType"
                  control={control}
                  render={({ field }) => (
                    // <Select
                    //   id="vehicleType"
                    //   value={field.value}
                    //   onValueChange={(value) => {
                    //     field.onChange(value);
                    //     setShowOtherMetalType(value === "other");
                    //     setShowVehicleType(value === "fourwheeler");
                    //   }}
                    //   className={errors.vehicleType ? "border-red-500" : ""}
                    // >
                    //   <FocusableSelectTrigger>
                    //     <SelectValue placeholder="Select Vehicle Type" />
                    //   </FocusableSelectTrigger>
                    //   <SelectContent>
                    //     <SelectItem value="twowheeler">Two Wheeler</SelectItem>
                    //     <SelectItem value="threewheeler">
                    //       Three Wheeler
                    //     </SelectItem>
                    //     <SelectItem value="fourwheeler">
                    //       Four Wheeler
                    //     </SelectItem>
                    //     <SelectItem value="tractor">Tractor</SelectItem>
                    //     <SelectItem value="bulldozer">Bulldozer</SelectItem>
                    //     <SelectItem value="crane">Crane</SelectItem>

                    //     <SelectItem value="other">Other</SelectItem>
                    //   </SelectContent>
                    // </Select>
                    <Autocompeleteadd
                      options={frameworks?.vehicleType}
                      placeholder="Select Vehicle Type..."
                      emptyMessage="No Vehicle Type Found."
                      value={values}
                      array={inputvaluearray}
                      setarray={setInputvaluearray}
                      variable="vehicleType"
                      onValueChange={(value) => {
                        setValues(value);
                        console.log(value);
                        setValue("vehicleType", value?.value);
                      }}
                    />
                  )}
                />
                {/* {showOtherMetalType && (
                  <Controller
                    name="otherVehicleType"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Specify Vehicle Type"
                        className="mt-2"
                      />
                    )}
                  />
                )} */}
                {errors.vehicleType && (
                  <span className="text-red-500">
                    {errors.vehicleType.message}
                  </span>
                )}
              </div>
              {showVehicleType && (
                <div className="space-y-2">
                  <Label htmlFor="fourWheeler">Four Wheeler</Label>
                  <Controller
                    name="fourWheeler"
                    // defaultValues="Cash"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="fourWheeler"
                        placeholder="Enter Four Wheeler"
                        {...field}
                        className={errors.fourWheeler ? "border-red-500" : ""}
                      />
                    )}
                  />
                  {fourWheelerStatus && (
                    <Controller
                      name="otherFourWheeler"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Specify Vehicle Type"
                          className="mt-2"
                        />
                      )}
                    />
                  )}
                  {errors.fourWheeler && (
                    <span className="text-red-500">
                      {errors.fourWheeler.message}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Make</Label>
              <Label style={{ color: "red" }}>*</Label>
              <Controller
                name="company"
                control={control}
                render={({ field }) => (
                  <Input
                    id="company"
                    placeholder="Enter Company"
                    {...field}
                    className={errors.company ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.company && (
                <span className="text-red-500">{errors.company.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Label style={{ color: "red" }}>*</Label>
              <Controller
                name="model"
                defaultValues="Cash"
                control={control}
                render={({ field }) => (
                  <Input
                    id="model"
                    placeholder="Enter Model"
                    {...field}
                    className={errors.model ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.model && (
                <span className="text-red-500">{errors.model.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">
                Registration/Vehicle Number
              </Label>
              <Controller
                name="registrationNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    id="registrationNumber"
                    placeholder="Enter Four Wheeler"
                    {...field}
                    className={
                      errors.registrationNumber ? "border-red-500" : ""
                    }
                  />
                )}
              />
              {errors.registrationNumber && (
                <span className="text-red-500">
                  {errors.registrationNumber.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearOfManufacture">Year Of Registration</Label>
              <Controller
                name="yearOfManufacture"
                control={control}
                render={({ field }) => (
                  <Datepicker value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.yearOfManufacture && (
                <span className="text-red-500">
                  {errors.yearOfManufacture.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearOfExpiry">Year Of Expiry</Label>
              <Controller
                name="yearOfExpiry"
                control={control}
                render={({ field }) => (
                  <Datepicker value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.yearOfExpiry && (
                <span className="text-red-500">
                  {errors.yearOfExpiry.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Input
                    id="location"
                    placeholder="Enter Location"
                    {...field}
                    className={errors.location ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.location && (
                <span className="text-red-500">{errors.location.message}</span>
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

export default RecoverableOtherForm;
