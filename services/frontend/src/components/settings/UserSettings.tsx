"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface UserSettingsProps {
  imageUrl?: string;
  firstname: string;
  lastname: string;
  email: string;
}

export function UserSettings({
  imageUrl,
  firstname,
  lastname,
  email,
}: UserSettingsProps) {
  const initialState = {
    firstname,
    lastname,
    email,
    imageUrl,
  };

  const [details, setDetails] = useState(initialState);
  const [disable, setDisabled] = useState(true);

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

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full px-4 md:w-4/5 lg:w-3/4 flex flex-col md:flex-row gap-6 md:justify-between items-center md:items-start">
          <div className="flex flex-col gap-2 items-center">
            <Label htmlFor="avatar">Profile Photo</Label>
            <Avatar id="avatar" className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" />
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
              onChange={handleDetailsChange}
            />
          </div>

          <div className="flex flex-col gap-2 w-full mt-4 md:mt-0">
            <Label htmlFor="password">Password</Label>
            <Input
              className="w-full"
              name="password"
              id="password"
              type="password"
            />
          </div>
        </div>
        <div className="w-3/4 flex justify-end m-5">
          <Button disabled={disable}>Save</Button>
        </div>
      </div>
    </>
  );
}
