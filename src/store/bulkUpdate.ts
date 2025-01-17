import { create } from "zustand";

interface StoreState {
	ids: string[];
	totalSelected: number;
	onSelect: (id: string) => void;
	resetBulkUpdate: () => void;
	selectAll: (allIds: string[]) => void;
}

const useBulkUpdate = create<StoreState>((set) => ({
	ids: [],
	totalSelected: 0,
	onSelect: (id) =>
		set((state) => {
			if (state.ids.includes(id)) {
				const updatedIds = state.ids.filter((i) => i !== id);
				return {
					ids: updatedIds,
					totalSelected: updatedIds.length,
				};
			}

			const updatedIds = [...state.ids, id];
			return {
				ids: updatedIds,
				totalSelected: updatedIds.length,
			};
		}),
	resetBulkUpdate: () => set(() => ({ ids: [], totalSelected: 0 })),

	selectAll: (allIds: string[]) =>
		set((state) => {
			return {
				...state,
				ids: allIds,
				totalSelected: allIds.length,
			};
		}),
}));

export default useBulkUpdate;
