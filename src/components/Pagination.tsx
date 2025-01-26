import { Pagination as FBPagination } from "flowbite-react/components/Pagination";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useLayoutEffect } from "react";

interface PaginationProps {
	totalRecords: number;
}

const RECORDS_PER_PAGE = 5;

const Pagination = ({ totalRecords = 0 }: PaginationProps) => {
	const navigate = useNavigate({ from: "/my-codes" });
	const search = useSearch({ from: "/_wrapper/_authenticated/my-codes" });
	const currentPage =
		(search.page as number) > totalRecords
			? 1
			: ((search.page as number) ?? 1);

	const onPageChange = async (page: number) => {
		await navigate({
			search: (old) => ({
				...old,
				page,
			}),
		});
	};

	useLayoutEffect(() => {
		if ((search.page as number) > totalRecords) {
			navigate({
				search: (old) => ({
					...old,
					page: 1,
				}),
			});
		}
	}, [search.page]);

	const totalPages = Math.ceil(totalRecords / RECORDS_PER_PAGE);

	return (
		<div className="flex overflow-x-auto sm:justify-center">
			<FBPagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</div>
	);
};

export default Pagination;
