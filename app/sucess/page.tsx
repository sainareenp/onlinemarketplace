"use client";
import React from "react";

const SuccessPage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
			<p className="text-lg text-gray-700">Thank you for your purchase.</p>
		</div>
	);
};

export default SuccessPage;
