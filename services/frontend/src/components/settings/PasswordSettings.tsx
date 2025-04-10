"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function PasswordSettings() {
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const passwordError = passwordFields.newPassword !== passwordFields.confirmPassword;
  return (
    <div className="w-full px-4 md:w-4/5 lg:w-3/4 mt-6">
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
                  className={`w-full ${passwordError ? "border-red-500" : ""}`}
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  value={passwordFields.confirmPassword}
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match
                  </p>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
