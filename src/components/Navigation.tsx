import Container from "./Container";
import useAuth from "@store/authStore";
import CustomLink from "./CustomLink";

type Tap = { tabName: string; path: string };
const tabs: Tap[] = [
	{
		tabName: "url",
		path: "/url",
	},
	{
		tabName: "text",
		path: "/text",
	},
	{
		tabName: "email",
		path: "/email",
	},
	{
		tabName: "vcard",
		path: "/vcard",
	},
	{
		tabName: "pdf",
		path: "/pdf",
	},
	// {
	// 	tabName: "sms",
	// 	path: "/sms",
	// },
];

const Navigation = () => {
	const user = useAuth((s) => s.user);
	return (
		<div className="">
			<Container>
				<div>
					{user && (
						<div className="px-2 pb-0">
							<div className="flex flex-wrap gap-4 text-gray-300">
								{tabs.map((tab, idx) => (
									<CustomLink
										key={idx}
										path={tab.path}
										tabName={tab.tabName}
										className="uppercase"
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</Container>
		</div>
	);
};

export default Navigation;
