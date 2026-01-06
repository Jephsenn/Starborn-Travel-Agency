import { groq } from 'next-sanity'

// Get all active promotions
export const promotionsQuery = groq`*[_type == "promotion" && active == true] | order(_createdAt desc) {
  _id,
  title,
  description,
  category,
  discount,
  validUntil,
  terms,
  featured
}`

// Get featured promotions for banner
export const featuredPromotionsQuery = groq`*[_type == "promotion" && featured == true && active == true] | order(_createdAt desc) {
  _id,
  title,
  discount
}`

// Get promotions by category
export const promotionsByCategoryQuery = groq`*[_type == "promotion" && category == $category && active == true] | order(_createdAt desc) {
  _id,
  title,
  description,
  category,
  discount,
  validUntil,
  terms,
  featured
}`
