import { useProfileStore } from "@/hooks";
import { CreateOrderPayload, CreateOrderSchema } from "@/lib/validators/orders";
import { Dish } from "@/queries/dishes/types";
import { useCreateOrder } from "@/queries/orders";
import { OrderStatus } from "@/queries/orders/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "../../ui";

interface Props {
	groupOrderId: string;
	dish: Dish;
}
const noImageUrl =
	"https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg";

const CreateOrder: React.FC<Props> = ({ groupOrderId, dish }) => {
	const { profile } = useProfileStore();

	const form = useForm<CreateOrderPayload>({
		resolver: zodResolver(CreateOrderSchema),
		defaultValues: {
			status: OrderStatus.NOPE,
			userId: profile?.id,
			groupOrderId: groupOrderId,
			dishId: dish.id,
			amount: 1,
		},
	});

	const { createOrder, isLoading } = useCreateOrder({
		onSuccess(data) {
			toast.success(`Create order successfully.`);
			setTimeout(() => {
				window.location.reload();
			}, 500);
		},
		onError(error) {
			toast.error(error.message);
		},
	});

	const onSubmit = async (values: CreateOrderPayload) => {
		createOrder({
			status: values.status,
			userId: values.userId,
			groupOrderId: values.groupOrderId,
			dishId: values.dishId,
			amount: values.amount,
		});
	};

	const amount = form.watch("amount");

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Create Order</SheetTitle>
			</SheetHeader>

			<Card className="border-0 shadow-none">
				<CardHeader className="py-2 px-0">
					<CardTitle
						style={{
							height: 24,
							display: "-webkit-box",
							overflow: "hidden",
							lineHeight: "24px",
							WebkitBoxOrient: "vertical",
							WebkitLineClamp: 1,
						}}
					>
						{dish.name}
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="w-[100%] h-[300px] relative border-zinc-300 border border-solid rounded-lg">
						<Image
							unoptimized
							src={dish.imgUrl || noImageUrl}
							alt={`${dish.category}-${dish.name}`}
							fill
							priority
							style={{ objectFit: "cover", borderRadius: "7px" }}
						/>
					</div>
					<p className="text-xl font-semibold mt-2">
						{new Intl.NumberFormat().format(dish.price)}đ
					</p>
				</CardContent>
			</Card>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex gap-3 flex-col pt-8"
				>
					<FormField
						control={form.control}
						name="amount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Amount *</FormLabel>
								<FormControl>
									<Input placeholder="Amount" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<h1>Total: {new Intl.NumberFormat().format(dish.price * amount)}d</h1>
					<Button type="submit" disabled={isLoading}>
						Create
					</Button>
				</form>
			</Form>
		</SheetContent>
	);
};

export default CreateOrder;
