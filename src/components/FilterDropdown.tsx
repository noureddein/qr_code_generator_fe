import { FILTER_LABEL } from "@src/constants";
import { QRCodeTypes } from "@src/types.d";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Dropdown } from "flowbite-react/components/Dropdown";

export const isValidFilterKey = (key: any): key is QRCodeTypes => {
	return Object.values(QRCodeTypes).includes(key);
};

const FilterDropdown = () => {
	const navigate = useNavigate({ from: "/my-codes" });
	const search = useSearch({ from: "/_wrapper/_authenticated/my-codes" });

	const filterKey: QRCodeTypes | "all" = isValidFilterKey(search?.type)
		? search?.type
		: "all";

	const filterLabel = FILTER_LABEL[filterKey];

	const handleSort = async (value: QRCodeTypes) => {
		if (isValidFilterKey(value)) {
			await navigate({
				search: (old) => ({
					...old,
					...(value && { type: value }),
				}),
				replace: true,
				params: true,
			});
		} else {
			await navigate({
				search: (old) => ({
					...old,
					type: "",
				}),
				replace: true,
				params: true,
			});
		}
	};
	return (
		<Dropdown label={filterLabel} color="gray">
			{Object.entries(FILTER_LABEL).map(([key, label]) => (
				<Dropdown.Item
					key={label}
					onClick={() => handleSort(key as QRCodeTypes)}
				>
					{label}
				</Dropdown.Item>
			))}
		</Dropdown>
	);
};

export default FilterDropdown;
