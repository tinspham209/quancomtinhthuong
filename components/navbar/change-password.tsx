"use client";
import React from "react";
import { Button, Input, SheetContent, SheetHeader, SheetTitle } from "../ui";
import { toast } from "react-hot-toast";

interface Props {}

const ChangePassword: React.FC<Props> = ({}) => {
	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Change Password</SheetTitle>
			</SheetHeader>

			<div className="flex gap-3 flex-col pt-8">
				<Input placeholder="Current Password" />
				<Input placeholder="New Password" />
				<Button
					onClick={() => {
						toast.error("Đang làm má ui");
					}}
				>
					Change
				</Button>
			</div>
		</SheetContent>
	);
};

export default ChangePassword;
