import { Button } from "@/components/ui";
import { Store } from "@/queries/auth/types";
import { Pen, Trash } from "lucide-react";
import React from "react";

interface Props {
	store: Store | undefined;
}

const StoreHeader: React.FC<Props> = ({ store }) => {
	return (
		<div className="flex flex-col md:flex-row justify-between">
			<div className="flex flex-col">
				<h1 className="text-3xl font-bold leading-none tracking-tight">
					{store?.name || "Unknown"}
				</h1>
				{store?.description && (
					<p className="text-xl text-muted-foreground">{store.description}</p>
				)}
			</div>
			<div className="flex flex-row gap-2">
				<div>
					<Button variant={"destructive"}>
						<Trash className="mr-2 h-4 w-4" />
						Delete store
					</Button>
				</div>
				<div>
					<Button>
						<Pen className="mr-2 h-4 w-4" />
						Edit store
					</Button>
				</div>
			</div>
		</div>
	);
};

export default StoreHeader;
