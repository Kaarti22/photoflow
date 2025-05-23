"use client";
import PasswordInput from "@/components/Auth/PasswordInput";
import LoadingButton from "@/components/Helper/LoadingButton";
import LeftSidebar from "@/components/Home/LeftSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { handleAuthRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import { setAuthUser } from "@/store/authSlice";
import { RootState } from "@/store/store";
import axios from "axios";
import { MenuIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";


const EditProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    user?.profilePicture || null
  );
  const [bio, setBio] = useState(user?.bio || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);



  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("bio", bio);

    if (fileInputRef.current?.files?.[0]) {
      formData.append("profilePicture", fileInputRef.current?.files?.[0]);
    }

    const updateProfileReq = async () => await axios.post(`${BASE_API_URL}/users/edit-profile`, formData, { withCredentials: true, });

    const result = await handleAuthRequest(updateProfileReq, setIsLoading);

    if (result) {
      dispatch(setAuthUser(result.data.data.user));
      toast.success(result.data.message);
    }
    else {
      console.log("Not updated")
    }
    // console.log([...formData.entries()]);

  };

  // const handleUpdateProfile = async () => {
  //   const formData = new FormData();
  //   formData.append("bio", bio);

  //   if (fileInputRef.current?.files?.[0]) {
  //     formData.append("profilePicture", fileInputRef.current.files[0]);
  //   }

  //   setIsLoading(true);

  //   try {
  //     const response = await axios.post(
  //       `${BASE_API_URL}/users/edit-profile`,
  //       formData,
  //       {
  //         withCredentials: true,
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     if (response.data?.data?.user) {
  //       dispatch(setAuthUser(response.data.data.user)); // Update Redux store
  //       setSelectedImage(response.data.data.user.profilePicture); // Set new image
  //       toast.success(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Profile update failed", error);
  //     toast.error("Failed to update profile");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      currentPassword,
      newPassword,
      newPasswordConfirm,
    };

    const updatePassReq = async () =>
      await axios.post(`${BASE_API_URL}/users/change-password`, data, {
        withCredentials: true,
      });
     
    const result = await handleAuthRequest(updatePassReq, setIsLoading);

    if (result) {
      dispatch(setAuthUser(result.data.data.user));
      toast.success(result.data.message);
    }
  };

  return (
    <div className="flex">
      <div className="w-[20%] hidden md:block border-r-2 h-screen fixed ">
        <LeftSidebar />
      </div>
      <div className="flex-1 md:ml-[20%] overerflow-y-auto">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <MenuIcon />
            </SheetTrigger>

            <SheetContent>
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
              <LeftSidebar />
            </SheetContent>
          </Sheet>
        </div>
        <div className="w-[80%] mx-auto">
          <div className="mt-16 pb-16 border-b-2">
            <div
              onClick={handleAvatarClick}
              className="flex items-center justify-center cursor-pointer"
            >
              <Avatar className="w-[10rem] h-[10rem]">
                <AvatarImage src={selectedImage || ""} />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div className="flex items-center justify-center">
              <LoadingButton
                isLoading={isLoading}
                size={"lg"}
                className="bg-blue-800 mt-4"
                onClick={handleUpdateProfile}
              >
                Change Photo
              </LoadingButton>
            </div>
          </div>
          <div className="mt-10 border-b-2 pb-10">
            <label htmlFor="bio" className="block text-lg font-bold mb-2">
              BIO
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full h-[7rem] bg-gray-200 outline-none p-6 rounded-md "
            ></textarea>

            <LoadingButton
              isLoading={isLoading}
              size={"lg"}
              className="mt-6"
              onClick={handleUpdateProfile}
            >
              Change Bio
            </LoadingButton>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mt-6">
              Change Password
            </h1>
            <form className="mt-8 mb-8" onSubmit={handlePasswordChange}>
              <div className="w-[90%] md:w-[80%] lg:w-[60%] ">
                <PasswordInput
                  name="currentpassword"
                  value={currentPassword}
                  label="Current Password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="w-[90%] md:w-[80%] lg:w-[60%] mt-4 mb-4 ">
                <PasswordInput
                  name="newpassword"
                  value={newPassword}
                  label="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="w-[90%] md:w-[80%] lg:w-[60%] ">
                <PasswordInput
                  name="confirmnewpassword"
                  value={newPasswordConfirm}
                  label="New Password Confirm"
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                />
              </div>
              <div className="mt-6">
                <LoadingButton
                  isLoading={isLoading}
                  type="submit"
                  className="bg-red-700"
                >
                  Change Password
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
