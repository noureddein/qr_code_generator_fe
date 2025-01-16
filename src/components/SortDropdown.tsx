import { Sort, SORT_LABEL } from "@src/constants";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Dropdown } from "flowbite-react/components/Dropdown";

export const isValidSortKey = (key: any): key is Sort => {
	return Object.values(Sort).includes(key);
};

const SortDropdown = () => {
	const navigate = useNavigate({ from: "/my-codes" });
	const search = useSearch({ from: "/_wrapper/_authenticated/my-codes" });

	const sortKey: Sort = isValidSortKey(search?.sort)
		? search?.sort
		: Sort.LAST_CREATED;

	const sortLabel = SORT_LABEL[sortKey];

	const handleSort = async (value: Sort) => {
		if (isValidSortKey(value)) {
			await navigate({
				search: (old) => ({
					...old,
					...(value && { sort: value }),
				}),
				replace: true,
				params: true,
			});
		} else {
			await navigate({
				search: (old) => ({
					...old,
					sort: "",
				}),
				replace: true,
				params: true,
			});
		}
	};

	return (
		<Dropdown label={sortLabel} color="gray">
			<Dropdown.Item onClick={() => handleSort(Sort.LAST_CREATED)}>
				Last Created
			</Dropdown.Item>
			<Dropdown.Item onClick={() => handleSort(Sort.NAME_ASC)}>
				Name (A-Z)
			</Dropdown.Item>
			<Dropdown.Item onClick={() => handleSort(Sort.NAME_DESC)}>
				Name (Z-A)
			</Dropdown.Item>
		</Dropdown>
	);
};

export default SortDropdown;
