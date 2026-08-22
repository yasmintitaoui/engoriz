import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const normalizeItem = (item) => {
  if (!item || typeof item !== 'object') return null

  const quantity = Math.max(1, Number(item.quantity) || 1)
  const price = Number(item.price) || 0

  return {
    id: item.id ?? 'unknown',
    name: item.name || 'Product',
    slug: item.slug || '',
    price,
    size: item.size || '',
    color: item.color || null,
    fit: item.fit || 'Regular',
    quantity,
    image: item.image || '/favicon.ico',
  }
}

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
          const safeProduct = product || {}
          const nextItem = {
            id: safeProduct.id ?? 'unknown',
            name: safeProduct.name || 'Product',
            slug: safeProduct.slug || '',
            price: Number(safeProduct.price) || 0,
            size,
            color,
            fit,
            quantity: 1,
            image: safeProduct.images?.front || safeProduct.image || '/favicon.ico',
          }

          const existingItem = state.items.find(
            (item) =>
              item.id === nextItem.id &&
              item.size === nextItem.size &&
              item.color === nextItem.color &&
              item.fit === nextItem.fit
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === nextItem.id &&
                item.size === nextItem.size &&
                item.color === nextItem.color &&
                item.fit === nextItem.fit
                  ? { ...item, quantity: Math.max(1, (Number(item.quantity) || 1) + 1) }
                  : item
              ),
              isOpen: true,
            }
          }

          return {
            items: [...state.items, nextItem],
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
              ? { ...normalizeItem(item), quantity: Math.max(1, (Number(item.quantity) || 1) + 1) }
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
                ? { ...normalizeItem(item), quantity: Math.max(0, (Number(item.quantity) || 1) - 1) }
                : item
            )
            .filter((item) => (Number(item.quantity) || 0) > 0),
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

      getItemCount: () => get().items.reduce((total, item) => total + (Number(item.quantity) || 0), 0),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
          0
        ),

      getDiscount: () => {
        const itemCount = get().items.reduce(
          (total, item) => total + (Number(item.quantity) || 0),
          0
        )

        const subtotal = get().getTotalPrice()

        return itemCount >= 5 ? subtotal * 0.2 : 0
      },

      getFinalPrice: () => {
        const subtotal = get().getTotalPrice()
        const discount = get().getDiscount()

        return subtotal - discount
      },
    }),
    {
      name: 'engoriz-cart',
      partialize: (state) => ({ items: (state.items || []).map(normalizeItem).filter(Boolean) }),
      onRehydrateStorage: () => (state) => {
        if (!state) return
        state.items = (state.items || []).map(normalizeItem).filter(Boolean)
      },
    }
  )
)