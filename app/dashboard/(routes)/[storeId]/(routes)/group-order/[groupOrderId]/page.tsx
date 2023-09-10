"use client";
import { useParams } from "next/navigation";
import React from "react";

interface Props {}

const GroupOrderDetail: React.FC<Props> = ({}) => {
	const params = useParams();
	return <div className="p-4">Group Order Detail: {params.groupOrderId}</div>;
};

export default GroupOrderDetail;
