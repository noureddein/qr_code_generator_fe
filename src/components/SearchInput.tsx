import { useNavigate, useSearch } from "@tanstack/react-router";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const SearchInput = () => {
	const search = useSearch({ from: "/_wrapper/_authenticated/my-codes" });
	const navigate = useNavigate({ from: "/my-codes" });
	const [searchQuery, setSearchQuery] = useState(search.query ?? "");
	const [debouncedQuery] = useDebounce(searchQuery, 500);

	useEffect(() => {
		if (debouncedQuery || debouncedQuery === "") {
			navigate({
				search: (old) => ({
					...old,
					query: debouncedQuery,
				}),
				replace: true,
				params: true,
			});
		}
	}, [debouncedQuery]);

	const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearchQuery(value);
	};

	return (
		<div className="relative ">
			<div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
				<svg
					className="w-4 h-4 text-gray-500"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
					/>
				</svg>
			</div>
			<input
				type="text"
				id="search"
				className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full ps-10 p-2.5 bg-white"
				placeholder="Search qr code name..."
				onChange={(e) => handleSearch(e)}
				value={searchQuery}
			/>
		</div>
	);
};

export default SearchInput;
