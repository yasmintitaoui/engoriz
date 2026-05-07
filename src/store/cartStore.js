import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, size, color = null, fit = 'Regular') =>
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.id === product.id &&
              item.size === size &&
              item.color === color &&
              item.fit === fit
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id &&
                item.size === size &&
                item.color === color &&
                item.fit === fit
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isOpen: true,
            }
          }

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                size,
                color,
                fit,
                quantity: 1,
                image: product.images.front,
              },
            ],
            isOpen: true,
          }
        }),

      increaseQuantity: (id, size, color = null, fit = 'Regular') =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id &&
            item.size === size &&
            item.color === color &&
            item.fit === fit
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseQuantity: (id, size, color = null, fit = 'Regular') =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id &&
              item.size === size &&
              item.color === color &&
              item.fit === fit
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      removeItem: (id, size, color = null, fit = 'Regular') =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.id === id &&
                item.size === size &&
                item.color === color &&
                item.fit === fit
              )
          ),
        })),

      clearCart: () => set({ items: [] }),

      getItemCount: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: 'engoriz-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)