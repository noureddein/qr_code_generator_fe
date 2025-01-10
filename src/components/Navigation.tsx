// import { useAccessToken } from "@providers/AuthProvider";
import Container from "./Container";
import { Link } from "@tanstack/react-router";
import useAuth from "@store/authStore";

type Tap = { tabName: string; path: string };
const tabs: Tap[] = [
	{
		tabName: "url",
		path: "/",
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
		tabName: "phone",
		path: "/phone",
	},
	{
		tabName: "sms",
		path: "/sms",
	},
];

const Navigation = () => {
	// const { auth } = useAccessToken();
	const user = useAuth((s) => s.user);
	return (
		<div>
			<Container>
				{user && (
					<div className="px-2 pb-0">
						<div className="flex gap-4 text-gray-300">
							{tabs.map((tab, idx) => (
								<Tab key={idx} tab={tab} />
							))}
						</div>
					</div>
				)}
			</Container>
		</div>
	);
};

export default Navigation;
const Tab = ({ tab }: { tab: Tap }) => {
	return (
		<Link
			to={tab.path}
			activeProps={{
				className:
					"font-bold text-white text-white relative after:absolute after:inset-x-0 after:-bottom-3 after:h-[2px] after:bg-slate-200",
			}}
			className="uppercase text-sm cursor-pointer hover:text-white relative hover:after:absolute hover:after:inset-x-0 hover:after:-bottom-3 hover:after:h-[2px] hover:after:bg-slate-200"
		>
			{tab.tabName}
		</Link>
	);
};
