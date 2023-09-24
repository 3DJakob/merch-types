const variantListToProducts = (products, variantList) => {
  if (variantList == null) return []
  const productsWithQuantity = []

  // for each key in cart
  for (const variantID in variantList) {
    // check if already added product
    const addedProduct = productsWithQuantity.find((product) => product.variants.find((variant) => variant.id === parseInt(variantID)))
    if (addedProduct != null) {
      // add quantity to existing product variant
      addedProduct.variants.map(v => {
        if (v.id === parseInt(variantID)) {
          v.quantity += variantList[variantID]
        }
        return v
      })
      continue
    }

    // find the product with that variantID and append it
    const originalProduct = products.find((product) => product.variants.find((variant) => variant.id === parseInt(variantID)))
    if (originalProduct === undefined) {
      console.error(`Product with variant ID ${variantID} not found`)
      continue
    }
    const newVariants = [...originalProduct.variants]
    const productWithQuantity = {
      ...originalProduct,
      variants: newVariants.map((variant) => ({
        ...variant,
        quantity: variantList[variant.id]
      }))
    }
    productsWithQuantity.push(productWithQuantity)
  }

  return productsWithQuantity
}

module.exports = {
  variantListToProducts
}