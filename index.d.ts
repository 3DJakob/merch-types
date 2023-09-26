export interface UserRecord {
  name: string
  email: string
  id?: string
  country: string
  postalcode: string
  city: string
  address: string
  role: string
  phone: string
  iban: string
  cart?: VariantList
}

export interface VariantList {
  [variantID: number]: number
}

interface Variant {
  id: number
  title: string
  price: string
  sku: string
}

interface VariantWithQuantity extends Variant {
  quantity: number
}

export interface ProductWithQuantity extends Product {
  variants: VariantWithQuantity[]
}

export interface Product {
  id: number
  title: string
  vendor: string
  variants: Variant[]
  images: Array<{
    id: number
    src: string
  }>
}

export interface ShopifyOrder {
  id: number
  name: string
  currency: string
  current_subtotal_price: string
  line_items: Array<{
    variant_id: number
    title: string
    quantity: number
  }>
}

export type OrderStatus = 'waiting' | 'shipping' | 'rejected' | 'fulfilled' | 'canceled' | 'received'

export interface Order<FirebaseTimestamp> {
  addsOwnTrackingInfo: boolean
  createdAt: FirebaseTimestamp
  id: string
  products: ProductWithQuantity[]
  paymentAt: string | null
  reference: string
  status: OrderStatus
  statusMessage: string
  trackingID: string
  trackingLink: string
  placedBy: string
}

export const variantListToProducts: (products: Product[], variantList?: VariantList) => ProductWithQuantity[]