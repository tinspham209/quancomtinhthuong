"use client";

import React from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
	disabled?: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
}

const UPLOAD_PRESET_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const ImageUpload: React.FC<ImageUploadProps> = ({
	onChange,
	onRemove,
	value,
	disabled,
}) => {
	const [isMounted, setIsMounted] = React.useState(false);
	React.useLayoutEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	const onUpload = (result: any) => {
		onChange(result.info.secure_url);
	};

	return (
		<div>
			<div className="mb-4 flex items-center gap-4">
				{value.map((url) => (
					<div
						className="relative w-[200px] rounded-md overflow-hidden"
						key={url}
					>
						<div className="z-10 absolute top-2 right-2">
							<Button
								type="button"
								onClick={() => {
									onRemove(url);
								}}
								variant={"destructive"}
								size={"sm"}
							>
								<Trash className="h-4 w-4" />
							</Button>
						</div>
						<Image fill className="object-cover" alt="Image" src={url} />
					</div>
				))}
			</div>
			<CldUploadWidget onUpload={onUpload} uploadPreset={UPLOAD_PRESET_KEY}>
				{({ open }) => {
					const onClick = () => {
						open();
					};

					return (
						<Button
							type="button"
							disabled={disabled}
							variant={"secondary"}
							onClick={onClick}
						>
							<ImagePlus className="h-4 w-4 mr-2" />
							Upload an image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export { ImageUpload };
