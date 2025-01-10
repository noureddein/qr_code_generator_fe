import React from "react";
import { twMerge } from "tailwind-merge";

const Container = ({
	className,
	children,
}: {
	children?: React.ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={twMerge(
				" container mx-auto px-10 py-4 md:px-20 lg:px-40",
				className
			)}
		>
			{children}
		</div>
	);
};

export default Container;
