import QRCodeDetails from "@components/QRCodeDetails";
import SearchInput from "@components/SearchInput";
import usePrivateServer from "@hooks/usePrivateServer";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import {
	QRCodeOptionsTypes,
	URLFormDataTypes,
	vCardFormDataTypes,
} from "@validation/qrCodeOptions";
import { AxiosError } from "axios";
import { z } from "zod";
import SortDropdown, { isValidSortKey } from "@components/SortDropdown";
import { Sort } from "@src/constants";
import QrCardLoader from "@components/loaders/QrCardLoader";
import FilterDropdown, { isValidFilterKey } from "@components/FilterDropdown";
import useBulkUpdate from "@store/bulkUpdate";
import BulkUpdateDropdown from "@components/BulkUpdateDropdown";
import Pagination from "@components/Pagination";
import { Badge } from "flowbite-react/components/Badge";
import { Tooltip } from "flowbite-react/components/Tooltip";

export const Route = createFileRoute("/_wrapper/_authenticated/my-codes")({
	component: RouteComponent,
	validateSearch: (search) =>
		z
			.object({
				query: z.string().optional(),
				sort: z.string().optional(),
				type: z.string().optional(),
				page: z.number().optional(),
			})
			.parse(search),
});

export interface ResponseRow {
	_id: string;
	userId: string;
	qrData: URLFormDataTypes | vCardFormDataTypes;
	qrDesign: QRCodeOptionsTypes;
	type: string;
	image: string;
	nanoId: string;
	publicLink: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
	scanCount: number;
}

interface Response {
	rows: ResponseRow[];
	count: number;
}

function RouteComponent() {
	const privateServer = usePrivateServer();
	const search = useSearch({ from: "/_wrapper/_authenticated/my-codes" });
	const totalSelected = useBulkUpdate((s) => s.totalSelected);
	const resetBulkUpdate = useBulkUpdate((s) => s.resetBulkUpdate);

	const { data, isPending, isError } = useQuery<
		Response,
		AxiosError,
		Response,
		[
			string,
			{
				q: string | undefined;
				sort: string | undefined;
				type: string | undefined;
				page: number | undefined;
			},
		]
	>({
		queryFn: async ({ signal, queryKey }) => {
			try {
				const URL = "/api/qr-codes";
				const search = queryKey[1];
				const result = await privateServer.get(URL, {
					signal,
					params: {
						q: search.q,
						sort: isValidSortKey(search.sort)
							? search.sort
							: Sort.LAST_CREATED,
						type: isValidFilterKey(search.type) ? search.type : "",
						page: search.page || 1,
					},
				});
				resetBulkUpdate();
				return result.data;
			} catch (error) {
				throw error;
			}
		},
		queryKey: [
			"get_many_qr_codes",
			{
				q: search.query,
				sort: search.sort,
				type: search.type,
				page: isNaN(search.page as number) ? 1 : search.page,
			},
		],
	});

	if (isError) {
		return <p>Something went wrong </p>;
	}
	const allIds = data?.rows.map((row) => row._id) || [];
	return (
		<>
			<div className="flex flex-row items-center justify-between gap-2 mb-5">
				<Tooltip content="Total QR Codes" placement="bottom">
					<Badge>{data?.count || 0}</Badge>
				</Tooltip>
				{totalSelected > 0 && (
					<div className="flex items-center gap-2 text-white">
						<BulkUpdateDropdown allIds={allIds} />
						<Badge color="gray" title="Total selected">
							{totalSelected}
						</Badge>
					</div>
				)}
				<div className="flex flex-col items-center justify-center gap-2 md:flex-row md:items-center md:justify-center md:ml-auto">
					<FilterDropdown />
					<SortDropdown />
					<SearchInput />
				</div>
			</div>

			<QrCardLoader cardsNum={4} isLoading={isPending}>
				<div className="flex flex-col gap-4">
					{allIds.length ? (
						data?.rows.map((row) => (
							<QRCodeDetails row={row} key={row._id} />
						))
					) : (
						<div className="text-lg font-medium text-white">
							No QR codes found, Create your first one
						</div>
					)}
					<Pagination totalRecords={data?.count || 0} />
				</div>
			</QrCardLoader>
		</>
	);
}
