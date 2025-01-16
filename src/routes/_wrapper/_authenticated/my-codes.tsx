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

export const Route = createFileRoute("/_wrapper/_authenticated/my-codes")({
	component: RouteComponent,

	validateSearch: (search) =>
		z
			.object({
				query: z.string().optional(),
				sort: z.string().optional(),
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
}

function RouteComponent() {
	const privateServer = usePrivateServer();
	const search = useSearch({ from: "/_wrapper/_authenticated/my-codes" });

	const { data, isPending, isError } = useQuery<
		{ rows: ResponseRow[] },
		AxiosError,
		{ rows: ResponseRow[] },
		[string, { q: string | undefined; sort: string | undefined }]
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
					},
				});

				return result.data;
			} catch (error) {
				throw error;
			}
		},
		queryKey: ["get_many_qr_codes", { q: search.query, sort: search.sort }],
	});

	if (isError) {
		return <p>Something went wrong </p>;
	}

	return (
		<>
			<div className="flex flex-col justify-end gap-2 mb-5 md:flex-row">
				<SortDropdown />
				<SearchInput />
			</div>

			<QrCardLoader isLoading={isPending}>
				<div className="flex flex-col gap-4">
					{data?.rows.map((row) => (
						<QRCodeDetails row={row} key={row._id} />
					))}
				</div>
			</QrCardLoader>
		</>
	);
}
