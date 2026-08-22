/**
 * Sort order. -1 is descending, 1 is ascending
 */
export type SortOrder = 'asc' | 'desc'
export interface WishlistFilter {
  username: string
  theme: string
  title: string
  order: SortOrder
  orderBy: 'name' | 'created' | 'updated' | 'event_date'
  page: number
}

/**
 * Generic metadata field for paginated responses
 * The documentation for this is a bit lacking, but it seems to be the same as the SimplePaginatorMetaKeys interface except the types are all numbers instead of strings. This is likely because the SimplePaginatorMetaKeys interface is used for query builders, while this interface is used for responses.
 */
export type InertiaPaginationMeta = {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string | null
  previousPageUrl: string | null
}
