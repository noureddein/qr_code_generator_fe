import { Link } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";

interface CustomLinkProps {
	path: string;
	tabName: string;
	className?: string;
}

const CustomLink = ({ path, tabName, className = "" }: CustomLinkProps) => {
	return (
		<Link
			to={path}
			activeProps={{
				className:
					"font-bold text-white relative after:absolute after:inset-x-0 after:-bottom-3 after:h-[2px] after:bg-white",
			}}
			className={twMerge(
				"text-gray-300 text-sm cursor-pointer hover:text-white relative hover:after:absolute hover:after:inset-x-0 hover:after:-bottom-3 hover:after:h-[2px] hover:after:bg-slate-200",
				className
			)}
		>
			{tabName}
		</Link>
	);
};

export default CustomLink;
