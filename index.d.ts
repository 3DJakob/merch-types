type currency = 'SEK' | 'EUR'

export interface UserRecord {
  address: string
  cart?: VariantList
  city: string
  country: string
  currency: currency
  email: string
  iban: string
  id?: string
  name: string
  phone: string
  postalcode: string
  role: string
}

export interface VariantList {
  [variantID: number]: number
}

interface BaseVariant {
  id: number
  price: string
  sku: string
  title: string
}

interface VariantWithQuantity extends Variant {
  quantity: number
}

export interface ProductWithQuantity extends Product {
  variants: VariantWithQuantity[]
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
}

// We remove this old price to avoid confusion as it is not stated what price it is
export interface Variant extends Omit<BaseVariant, 'price'> {
  shopifyPrice: number // The price shown on Shopify ie merchsweden.se
  stockxPrice?: number // The price shown on StockX
  storePrice: number // The priced shown on this site
}

// The type stored in firebase as an extended version of BaseProduct with prices
export interface Product extends Omit<BaseProduct, 'variants'> {
  variants: Variant[]
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
  products: ProductWithQuantity[]
  reference: string
  shopifyPurchaseOrderLink?: string
  status: OrderStatus
  statusMessage: string
  trackingID: string
  trackingLink: string
}

export const variantListToProducts: (products: Product[], variantList?: VariantList) => ProductWithQuantity[]

export interface PricingModel {
  additional: number
  multiplier: number
}
