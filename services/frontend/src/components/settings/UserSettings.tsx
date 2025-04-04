import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface UserSettingsProps {
  imageUrl?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export function UserSettings({
  imageUrl,
  firstname,
  lastname,
  email,
  password,
}: UserSettingsProps) {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex w-3/4 justify-between items-start gap-4">
          <div className="flex flex-col gap-2 items-center">
            <Label htmlFor="avatar">Profile Photo</Label>
            <Avatar id="avatar">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstname">First Name</Label>
            <Input className="w-auto" name="firstname" id="firstname" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastname">Last Name</Label>
            <Input className="w-auto" name="lastname" id="lastname" />
          </div>
        </div>
        <div className="flex w-3/4 justify-between items-start gap-4 mt-10">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input className="w-auto" name="email" id="email" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input className="w-auto" name="password" id="password" />
          </div>
        </div>
      </div>
    </>
  );
}
