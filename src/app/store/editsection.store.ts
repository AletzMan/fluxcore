import { create } from "zustand";

interface EditSectionState {
    /** ID de la sección activa. `null` = ningún dialog abierto. */
    activeSection: string | null;
    openSection: (sectionId: string) => void;
    closeSection: () => void;
}

export const useEditSectionStore = create<EditSectionState>()((set) => ({
    activeSection: null,
    openSection: (sectionId) => set({ activeSection: sectionId }),
    closeSection: () => set({ activeSection: null }),
}));
