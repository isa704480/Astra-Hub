import { create } from 'zustand';

interface SpaceStore {
  favorites: string[];
  earthWeightKg: string;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  setEarthWeightKg: (value: string) => void;
}

export const useSpaceStore = create<SpaceStore>((set, get) => ({
  favorites: ['earth', 'mars'],
  earthWeightKg: '70',
  toggleFavorite: (id: string) => {
    const favorites = get().favorites;
    const next = favorites.includes(id)
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];

    set({ favorites: next });
  },
  isFavorite: (id: string) => get().favorites.includes(id),
  setEarthWeightKg: (earthWeightKg: string) => set({ earthWeightKg }),
}));
