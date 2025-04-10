"use client";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { updateUser } from "@/actions/login-action";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import DatePicker from "../ui/date-picker";

interface UserSettingsProps {
  imageUrl?: string;
  firstname: string;
  lastname: string;
  email: string;
  dob: Date;
  gender: string;
}

export function UserSettings({
  imageUrl,
  firstname,
  lastname,
  email,
  dob,
  gender
}: UserSettingsProps) {
  const initialState = {
    firstname,
    lastname,
    email,
    imageUrl,
    dob,
    gender
  };

  const [details, setDetails] = useState(initialState);
  const [disable, setDisabled] = useState<boolean>(true);
  const [profileChange, setProfileChange] = useState(false);
  const [date, setDate] = useState<Date | undefined>(dob);

  const ref = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const handleInputTrigger = () => {
    ref.current?.click();
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (initialState[name as keyof typeof details] !== value) {
      setDisabled(false);
      setDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setDisabled(true);
      setDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files![0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
      setDetails((prev) => ({
        ...prev,
        imageUrl,
      }));
      setDisabled(false);
      setProfileChange(true);
    } else {
      toast({
        title: "Not a valid file type",
        description: "Please select a valid image file type!",
      });
    }
  };

  const handleOnDayClick = (d: Date) => {
    if (d === initialState.dob) {
      console.log()
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  const [state, formAction] = useActionState(
    updateUser.bind(null, initialState, profileChange),
    { message: "" }
  );

  useEffect(() => {
    if (state.message !== "") {
      toast({
        title: "User details updation message",
        description: state.message,
      });
      setDisabled(true);
    }
  }, [state.message, toast]);

  return (
    <>
      <form
        className="w-full flex flex-col items-center justify-center"
        action={formAction}
      >
        <div className="w-full px-4 md:w-4/5 lg:w-3/4 flex flex-col md:flex-row gap-6 md:justify-between items-center md:items-start">
          <div
            className="flex flex-col gap-2 items-center cursor-pointer"
            onClick={handleInputTrigger}
          >
            <Label htmlFor="avatar">Profile Photo</Label>
            <Avatar id="avatar" className="h-20 w-20">
              <AvatarImage
                src={
                  details.imageUrl
                    ? details.imageUrl
                    : "https://github.com/shadcn.png"
                }
              />
              <input
                className="hidden"
                name="imageUrl"
                type="file"
                ref={ref}
                onChange={handleProfilePhotoChange}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="w-full md:flex-1 flex flex-col gap-6 md:flex-row md:justify-between">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                className="w-full"
                name="firstname"
                id="firstname"
                value={details.firstname}
                onChange={handleDetailsChange}
              />
            </div>

            <div className="flex flex-col gap-2 w-full mt-4 md:mt-0">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                className="w-full"
                name="lastname"
                id="lastname"
                value={details.lastname}
                onChange={handleDetailsChange}
              />
            </div>
          </div>
        </div>

        <div className="w-full px-4 md:w-4/5 lg:w-3/4 flex flex-col md:flex-row gap-6 mt-8 md:justify-between">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="email">Email</Label>
            <Input
              className="w-full"
              name="email"
              id="email"
              value={details.email}
              readOnly
              disabled
            />
          </div>

          <div className="flex flex-col gap-2 w-full mt-4 md:mt-0">
            <Label htmlFor="dob">Date of Birth</Label>
            <DatePicker date={date} setDate={setDate} onDayClick={handleOnDayClick} />
            <input className="hidden" readOnly value={String(dob)} />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="gender">Gender</Label>
            <Input />


          </div>
        </div>

        <div className="w-full px-4 md:w-4/5 lg:w-3/4 flex justify-end m-5">
          <Button disabled={disable} type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  );
}
