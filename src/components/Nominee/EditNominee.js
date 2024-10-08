import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@com/ui/sheet";
import { Button } from "@com/ui/button";
import { Label } from "@com/ui/label";
import { Checkbox } from "@com/ui/checkbox";
import axios from "axios";
import cross from "@/components/image/close.png";
import { ScrollArea } from "../../shadcncomponents/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import BeneficiaryForm from "./BeneficiaryOpen";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const AddNominee = ({
  setSelectedNommie,
  selectedNommie,
  AllNominees,
  displaynominie,
  setDisplaynominie,
}) => {
  const getitem = localStorage.getItem("user");
  const user = JSON.parse(getitem);
  const [nominees, setNominees] = useState([]);
  const [selectedNominees, setSelectedNominees] = useState([]);
  const Navigate = useNavigate();
  const [benificiaryopen, setbenficiaryopen] = useState(false);
  useEffect(() => {
    if (AllNominees) {
      setDisplaynominie(AllNominees);
    }
  }, [AllNominees]);

  const getPersonalData = async () => {
    if (!user) return;
    const response = await axios.get(`/api/beneficiaries`, {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
    });
    console.log(response.data.data.Beneficiaries);
    setNominees({
      Beneficiaries: response?.data?.data?.Beneficiaries,
      Charities: response?.data?.data?.Charities,
    });
  };

  const {
    data: Benifyciary,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["benificiaryData"],
    queryFn: getPersonalData,

    onSuccess: (data) => {
      console.log("Data:", data);
    },
    onError: (error) => {
      console.error("Error submitting profile:", error);
      toast.error("Failed to submit profile", error.message);
    },
  });

  useEffect(() => {
    // Sync state with displaynominie when it changes
    const selectedIds = displaynominie.map((nominee) => nominee.id);
    setSelectedNominees(selectedIds);
  }, [displaynominie]);

  const handleCheckboxChange = (id, fullLegalName, charityName) => {
    setSelectedNominees((prevSelectedNominees) =>
      prevSelectedNominees.includes(id)
        ? prevSelectedNominees.filter((nomineeId) => nomineeId !== id)
        : [...prevSelectedNominees, id]
    );

    if (fullLegalName) {
      setDisplaynominie((prevDisplayNominees) =>
        prevDisplayNominees.some((nominee) => nominee.id === id)
          ? prevDisplayNominees.filter((nominee) => nominee.id !== id)
          : [...prevDisplayNominees, { id, fullLegalName }]
      );
    } else if (charityName) {
      setDisplaynominie((prevDisplayNominees) =>
        prevDisplayNominees.some((nominee) => nominee.id === id)
          ? prevDisplayNominees.filter((nominee) => nominee.id !== id)
          : [...prevDisplayNominees, { id, charityName }]
      );
    }
  };

  const handleSubmit = (e) => {
    setSelectedNommie(selectedNominees);
    console.log(selectedNominees);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <div className="cursor-pointer flex border border-input bg-background p-4 justify-between pl-2 pr-2 items-center rounded-lg">
            <h1 className="ml-2 font-bold">Add Nominee</h1>
          </div>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Nominee</SheetTitle>
            <SheetDescription>
              <p>Select nominee to add to your insurance policy</p>
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="flex flex-col y-visible rounded-md ">
            <div className="grid gap-4 py-4 overflow-y-auto">
              <div className="grid  py-4 ovwerflow-y-auto">
                <h2 className="font-bold">Beneficiaries</h2>
                {console.log(AllNominees)}
                {/* {displaynominie && displaynominie.length > 0 && (
                <div className="space-y-2">
                  <div className="grid gap-4 py-4">
                    {console.log(displaynominie)}
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
              )} */}
                {nominees.Beneficiaries?.map((nominee) => (
                  <div
                    key={nominee.id}
                    className="flex mb-4 space-y-2 border border-input p-4 justify-between pl-4 pr-4 items-center rounded-lg"
                  >
                    <Label htmlFor={`nominee-${nominee.id}`}>
                      {nominee.fullLegalName}
                    </Label>
                    <Checkbox
                      id={`nominee-${nominee.id}`}
                      checked={selectedNominees.includes(nominee.id)}
                      onCheckedChange={() =>
                        handleCheckboxChange(
                          nominee.id,
                          nominee.fullLegalName,
                          null
                        )
                      }
                    />
                  </div>
                ))}

                <h2 className="font-bold">Charities</h2>
                {nominees.Charities?.map((nominee) => (
                  <div
                    key={nominee.id}
                    className="flex space-y-2 border border-input p-4 justify-between pl-4 pr-4 items-center rounded-lg"
                  >
                    <Label htmlFor={`nominee-${nominee.id}`}>
                      {nominee.charityName}
                    </Label>
                    <Checkbox
                      id={`nominee-${nominee.id}`}
                      checked={selectedNominees.includes(nominee.id)}
                      onCheckedChange={() =>
                        handleCheckboxChange(
                          nominee.id,
                          nominee.fullLegalName,

                          nominee.charityName
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <SheetFooter>
              <BeneficiaryForm
                setbenficiaryopen={setbenficiaryopen}
                benificiaryopen={benificiaryopen}
              />
              <SheetClose asChild>
                <Button onClick={handleSubmit} type="submit">
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddNominee;
