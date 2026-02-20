
import { create } from "zustand";

interface EditPlanState {
    /** ID de la sección activa. `null` = ningún dialog abierto. */
    activeSection: string | null;
    openSection: (sectionId: string) => void;
    closeSection: () => void;
}

export const useEditPlanStore = create<EditPlanState>()((set) => ({
    activeSection: null,
    openSection: (sectionId) => set({ activeSection: sectionId }),
    closeSection: () => set({ activeSection: null }),
}));