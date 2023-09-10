import { DeleteStore, UpdateStore } from "@/components/sheet";
import { Button, Sheet, SheetTrigger } from "@/components/ui";
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
				{store?.ruleDescription && (
					<p className="text-xl text-muted-foreground">
						Rule: {store.ruleDescription}
					</p>
				)}
			</div>
			<div className="flex flex-row gap-2">
				<div>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant={"destructive"}>
								<Trash className="mr-2 h-4 w-4" />
								Delete store
							</Button>
						</SheetTrigger>
						<DeleteStore store={store} />
					</Sheet>
				</div>
				<div>
					<Sheet>
						<SheetTrigger asChild>
							<Button>
								<Pen className="mr-2 h-4 w-4" />
								Edit store
							</Button>
						</SheetTrigger>
						<UpdateStore store={store} />
					</Sheet>
				</div>
			</div>
		</div>
	);
};

export default StoreHeader;
