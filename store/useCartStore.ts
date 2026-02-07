import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the shape of a Cart Item
export type CartItem = {
    id: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
};

type CartState = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, qty: number) => void;
    clearCart: () => void;
    total: () => number;
};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (newItem) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === newItem.id);

                if (existingItem) {
                    // If item exists, increase quantity
                    const updatedItems = currentItems.map((item) =>
                        item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                    set({ items: updatedItems });
                } else {
                    // If new, add to array
                    set({ items: [...currentItems, { ...newItem, quantity: 1 }] });
                }
            },

            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) });
            },

            updateQuantity: (id, qty) => {
                if (qty < 1) return;
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, quantity: qty } : item
                    ),
                });
            },

            clearCart: () => set({ items: [] }),

            total: () => {
                return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'shopping-cart',
            storage: createJSONStorage(() => localStorage),
        }
    )
);