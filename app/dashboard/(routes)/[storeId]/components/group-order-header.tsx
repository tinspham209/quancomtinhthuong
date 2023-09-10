import { Button } from "@/components/ui";
import React from "react";

interface Props {}

const GroupOrderHeader: React.FC<Props> = ({}) => {
	return (
		<div className="my-4">
			<div className="flex flex-col md:flex-row justify-between">
				<h1 className="text-3xl font-bold leading-none tracking-tight">
					Group Orders
				</h1>
				<div className="mt-2 sm:mt-0">
					<Button>Create Group Order</Button>
				</div>
			</div>
		</div>
	);
};

export default GroupOrderHeader;
