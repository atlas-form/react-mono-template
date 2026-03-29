import {
  Pagination as CorePagination,
  PaginationContent as CorePaginationContent,
  PaginationItem as CorePaginationItem,
  PaginationLink as CorePaginationLink,
  PaginationNext as CorePaginationNext,
  PaginationPrevious as CorePaginationPrevious,
} from "@workspace/ui-core/components/pagination"

export interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const safeTotalPages = Math.max(1, totalPages)
  const safePage = Math.min(Math.max(1, page), safeTotalPages)

  return (
    <CorePagination>
      <CorePaginationContent>
        <CorePaginationItem>
          <CorePaginationPrevious
            href="#"
            onClick={(event) => {
              event.preventDefault()
              onPageChange(Math.max(1, safePage - 1))
            }}
          />
        </CorePaginationItem>

        {Array.from({ length: safeTotalPages }, (_, index) => index + 1).map(
          (pageIndex) => (
            <CorePaginationItem key={pageIndex}>
              <CorePaginationLink
                href="#"
                isActive={pageIndex === safePage}
                onClick={(event) => {
                  event.preventDefault()
                  onPageChange(pageIndex)
                }}
              >
                {pageIndex}
              </CorePaginationLink>
            </CorePaginationItem>
          )
        )}

        <CorePaginationItem>
          <CorePaginationNext
            href="#"
            onClick={(event) => {
              event.preventDefault()
              onPageChange(Math.min(safeTotalPages, safePage + 1))
            }}
          />
        </CorePaginationItem>
      </CorePaginationContent>
    </CorePagination>
  )
}
