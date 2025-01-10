import { createElement } from "react";
import { Fragment } from "react/jsx-runtime";

interface AccordionProps {
	id?: string;
	multiple?: boolean;
	children: React.ReactNode;
}

const Accordion = ({ id, children, multiple = false }: AccordionProps) => {
	return (
		<div id={id} data-accordion={multiple ? "open" : "collapse"}>
			{children}
		</div>
	);
};

export default Accordion;

interface ItemProps {
	isExpanded?: "true" | "false";
	bodyTargetKey: string;
	headerTargetKey: string;
	title?: string;
	children: React.ReactNode;
	icon: React.ForwardRefExoticComponent<
		Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
			title?: string;
			titleId?: string;
		} & React.RefAttributes<SVGSVGElement>
	>;
}

Accordion.Item = ({
	bodyTargetKey,
	headerTargetKey,
	children,
	isExpanded = "false",
	title = "",
	icon: Icon,
}: ItemProps) => {
	return (
		<Fragment>
			<h2 id={headerTargetKey}>
				<button
					type="button"
					className="flex items-center justify-between w-full gap-3 p-3 font-medium text-gray-500 bg-white border border-b border-gray-200 rtl:text-right rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
					data-accordion-target={`#${bodyTargetKey}`}
					aria-expanded={isExpanded}
				>
					<div className="flex gap-4">
						{createElement(Icon, {
							className: "size-6 text-gray-50-500",
						})}
						<span>{title}</span>
					</div>
					<svg
						data-accordion-icon
						className="w-3 h-3 rotate-180 shrink-0"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 10 6"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 5 5 1 1 5"
						/>
					</svg>
				</button>
			</h2>
			<div
				id={bodyTargetKey}
				className="hidden"
				aria-labelledby={headerTargetKey}
			>
				{children}
			</div>
		</Fragment>
	);
};
