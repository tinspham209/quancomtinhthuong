"use client";

import React from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui";

interface AlertModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
	isOpen,
	loading,
	onClose,
	onConfirm,
}) => {
	const [isMounted, setIsMounted] = React.useState(false);
	React.useLayoutEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Modal
			title="Are you sure?"
			description="This account cannot be undone"
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="pt-6 space-x-2 flex items-center justify-end w-full">
				<Button disabled={loading} variant={"ghost"} onClick={onClose}>
					Cancel
				</Button>
				<Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
					Continue
				</Button>
			</div>
		</Modal>
	);
};

export default AlertModal;
