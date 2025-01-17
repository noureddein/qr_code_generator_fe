import { Status as StatusType } from "@src/constants";
import useBulkUpdate from "@store/bulkUpdate";
import { Tooltip } from "flowbite-react/components/Tooltip";
import { MdTabUnselected } from "react-icons/md";
import { PiSelectionAllDuotone } from "react-icons/pi";
import { ActiveIcon, DeactivateIcon, DeleteIcon } from "./Icons";
import ActivationModal from "./modals/ActivationModal";
import DeleteModal from "./modals/DeleteModal";

interface BulkUpdateDropdownProps {
	allIds: string[];
}

const BulkUpdateDropdown = ({ allIds }: BulkUpdateDropdownProps) => {
	const selectAll = useBulkUpdate((s) => s.selectAll);
	const resetBulkUpdate = useBulkUpdate((s) => s.resetBulkUpdate);

	const totalSelected = useBulkUpdate((s) => s.totalSelected);
	const selectedIds = useBulkUpdate((s) => s.ids);

	const isAllSelected = totalSelected === allIds.length;

	return (
		<>
			<ActivationModal
				ids={selectedIds}
				status={StatusType.ACTIVE}
				childrenButton={(onOpen) => (
					<Tooltip content="Activate" placement="bottom">
						<ActiveIcon onClick={onOpen} />
					</Tooltip>
				)}
			/>

			<ActivationModal
				ids={selectedIds}
				status={StatusType.IN_ACTIVE}
				childrenButton={(onOpen) => (
					<Tooltip content="Deactivate" placement="bottom">
						<DeactivateIcon onClick={onOpen} />
					</Tooltip>
				)}
			/>
			<DeleteModal
				id={selectedIds}
				childrenButton={(onOpen) => (
					<Tooltip content="Delete selected" placement="bottom">
						<DeleteIcon
							className="cursor-pointer size-6 hover:text-red-600"
							onClick={onOpen}
						/>
					</Tooltip>
				)}
			/>
			{isAllSelected ? (
				<Tooltip content="Unselect" placement="bottom">
					<MdTabUnselected
						onClick={() => resetBulkUpdate()}
						className="cursor-pointer size-6 hover:text-blue-400"
					/>
				</Tooltip>
			) : (
				<Tooltip content="Select all" placement="bottom">
					<PiSelectionAllDuotone
						onClick={() => selectAll(allIds)}
						className="cursor-pointer size-6 hover:text-blue-400"
					/>
				</Tooltip>
			)}
		</>
	);
};

export default BulkUpdateDropdown;
