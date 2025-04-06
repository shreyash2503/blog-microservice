"use client";
import React, { useActionState, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { updateUser } from "@/actions/login-action";
import { useToast } from "@/hooks/use-toast";

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
  const [disable, setDisabled] = useState<boolean>(true);

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
      setDetails((prev) => ({
        ...prev,
        imageUrl,
      }));
      setDisabled(false);
    } else {
      toast({
        title: "Not a valid file type",
        description: "Please select a valid image file type!",
      });
    }
  };

  const [state, formAction] = useActionState(updateUser, { message: "" });

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
                type="file"
                ref={ref}
                onChange={handleProfilePhotoChange}
              />
              <input
                className="hidden"
                value={details.imageUrl}
                readOnly
                name="image-url"
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
            <Label htmlFor="password">Password</Label>
            <Input
              className="w-full"
              name="password"
              id="password"
              type="password"
              placeholder="••••••••"
              disabled
            />
          </div>
        </div>

        {/* <div className="w-full px-4 md:w-4/5 lg:w-3/4 mt-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="change-password">
            <AccordionTrigger className="text-sm font-medium border rounded-md p-2">
              Change Password
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 py-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    className="w-full"
                    name="currentPassword"
                    id="currentPassword"
                    type="password"
                    value={passwordFields.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    className="w-full"
                    name="newPassword"
                    id="newPassword"
                    type="password"
                    value={passwordFields.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    className={`w-full ${passwordError ? 'border-red-500' : ''}`}
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    value={passwordFields.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div> */}

        <div className="w-full px-4 md:w-4/5 lg:w-3/4 flex justify-end m-5">
          <Button disabled={disable} type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  );
}
