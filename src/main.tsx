import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Flowbite } from "flowbite-react/components/Flowbite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { CustomFlowbiteTheme } from "flowbite-react";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const customTheme: CustomFlowbiteTheme = {
	tooltip: {
		target: "w-fit",
		animation: "transition-opacity",
		arrow: {
			base: "absolute z-10 h-2 w-2 rotate-45",
			style: {
				dark: "bg-gray-900 dark:bg-gray-700",
				light: "bg-white",
				auto: "bg-white dark:bg-gray-700",
			},
			placement: "-4px",
		},
		base: "absolute z-10 inline-block rounded-[3px] px-3 py-2 text-xs font-medium shadow-sm",
		hidden: "invisible opacity-0",
		style: {
			dark: "bg-gray-900 text-white dark:bg-gray-700",
			light: "border border-gray-200 bg-white text-gray-900",
			auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
		},
		content: "relative z-20",
	},
};

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Flowbite theme={{ theme: customTheme }}>
				<App />
			</Flowbite>
			<Toaster position="top-right" />
		</QueryClientProvider>
	</StrictMode>
);
