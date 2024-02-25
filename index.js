const variantListToProducts = (products, variantList) => {
  if (variantList == null) return []

  const unqiueVariantIDs = Object.keys(variantList)
  const affectedProducts = products.filter(p => p.variants.map(v => v.uniqueID).some(id => unqiueVariantIDs.includes(id)))

  affectedProducts.map(p => {
    p.variants = p.variants.filter(v => unqiueVariantIDs.includes(v.uniqueID))
    return p
  })

  return affectedProducts
}

module.exports = {
  variantListToProducts
}