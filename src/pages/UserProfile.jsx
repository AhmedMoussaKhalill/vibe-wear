import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const UserProfile = ({ userDetails, setUserDetails }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSelectChange = (value) => {
    if (userDetails) {
      setUserDetails({ ...userDetails, gender: value });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <Card className="mx-auto max-w-5xl pb-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="logo text-3xl font-bold">
              Account Info
            </CardTitle>

            <div className="gap-x-3 flex">
              <Button
                onClick={handleEditToggle}
                variant="outline"
                className="gap-x-2 rounded-lg"
              >
                {isEditing ? (
                  "Cancel"
                ) : (
                  <>
                    <Icons.edit className="size-5" /> Edit Profile
                  </>
                )}
              </Button>
              {isEditing && <Button className="rounded-lg">Save Changes</Button>}
            </div>
          </div>
          <CardDescription>
            View and manage your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-start">
          <div className="mt-3 flex w-full flex-row gap-10">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="size-36">
                <AvatarImage
                  src="/placeholder.svg?height=128&width=128"
                  alt={"Ahmed Moussa"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Badge className="rounded-full px-3.5">{userDetails?.role}</Badge>
            </div>
            <div className="flex w-full flex-col space-y-6">
              <div className="space-y-2">
                <h1 className="logo text-3xl font-bold">{userDetails?.name}</h1>
                <p>
                  My name is {userDetails?.name}, I'm a {userDetails?.gender}{" "}
                  and I'm a member here.
                </p>
              </div>
              <div className="grid w-full grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="" className="text-sm">
                    Your Name
                  </label>
                  <Input
                    value={userDetails?.name}
                    id="username"
                    className="h-10 rounded-lg"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="" className="text-sm">
                    Your Email
                  </label>
                  <Input
                    value={userDetails?.email}
                    id="username"
                    className="h-10 rounded-lg"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="" className="text-sm">
                    Your Gender
                  </label>
                  {/* <Input
                    value={userDetails?.gender}
                    id="username"
                    className="h-10 rounded-lg"
                  /> */}
                  <Select
                    onValueChange={handleSelectChange}
                    defaultValue={userDetails?.gender}
                    disabled={!isEditing}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="" className="text-sm">
                    Your Password
                  </label>
                  <Input
                    value={userDetails?.password}
                    type="password"
                    id="username"
                    className="h-10 rounded-lg"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
