const excludedListingSlugs = new Set(['lost-in-the-desert', 'world-savers'])

export function isProductVisibleInListings(product) {
  return !excludedListingSlugs.has(product.slug)
}