type currency = 'SEK' | 'EUR'

export interface UserRecord {
  address: string
  cart?: VariantList
  city: string
  country: string
  currency: currency
  email: string
  facebookLink: string
  iban: string
  id?: string
  name: string
  phone: string
  postalcode: string
  role: string
}

export type VariantList = Array<string> // List of unique variant ids

interface BaseVariant {
  id: number
  price: string
  sku: string
  title: string
}

// The type given by Shopify
export interface BaseProduct {
  id: number
  images: Array<{
    id: number
    src: string
  }>
  title: string
  variants: BaseVariant[]
  vendor: string
  sku: string
  tags: string
}

// We remove this old price to avoid confusion as it is not stated what price it is
export interface Variant extends Omit<BaseVariant, 'price'> {
  shopifyPrice: number // The price shown on Shopify ie merchsweden.se
  stockxPrice?: number // The price shown on StockX
  storePrice: number // The priced shown on this site
}

export interface UniqueVariant extends Variant {
  preOrderID: number // The id of the preOrder that caused this variant to be created
  preOrderIndex: number // The index of the variant in the preOrder. I.e if two of the same variant was ordered the first would have index 0 and the second 1
  uniqueID: string // The unique id of the variant `${variantID}-${preOrderID}-${preOrderIndex}`
}

// The type stored in firebase as an extended version of BaseProduct with prices
export interface Product extends Omit<BaseProduct, 'variants'> {
  variants: Variant[]
}

export interface ProductWithUniqueVariants extends Omit<BaseProduct, 'variants'> {
  variants: UniqueVariant[]
}

export interface ShopifyOrder {
  currency: string
  current_subtotal_price: string
  id: number
  line_items: Array<{
    variant_id: number
    title: string
    quantity: number
  }>
  name: string
}

export interface StockxPrice {
  price: number
  sku: string
}

export type OrderStatus = 'waiting' | 'shipping' | 'rejected' | 'fulfilled' | 'canceled' | 'received'

export interface Order<FirebaseTimestamp> {
  addsOwnTrackingInfo: boolean
  conversionRate: number
  createdAt: FirebaseTimestamp
  currency: currency
  id: string
  paymentAt: string | null
  placedBy: string
  products: ProductWithUniqueVariants[] // The variants are unique. We track what variant comes from what pre-order there we need duplicate variants instead of quantity prop
  reference: string
  shopifyPurchaseOrderLink?: string
  status: OrderStatus
  statusMessage: string
  trackingID: string
  trackingLink: string
}

export const variantListToProducts: (products: ProductWithUniqueVariants[], variantList?: VariantList) => ProductWithUniqueVariants[]

export interface PricingModel {
  additional: number
  multiplier: number
  conversionEuro: number
}
