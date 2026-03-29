import type { ComponentProps } from "react"
import {
  Table as HeadlessTable,
  TableBody as HeadlessTableBody,
  TableCaption as HeadlessTableCaption,
  TableCell as HeadlessTableCell,
  TableFooter as HeadlessTableFooter,
  TableHead as HeadlessTableHead,
  TableHeader as HeadlessTableHeader,
  TableRow as HeadlessTableRow,
} from "@workspace/ui-core/components/table"

export type TableProps = ComponentProps<typeof HeadlessTable>
export type TableHeaderProps = ComponentProps<typeof HeadlessTableHeader>
export type TableBodyProps = ComponentProps<typeof HeadlessTableBody>
export type TableFooterProps = ComponentProps<typeof HeadlessTableFooter>
export type TableRowProps = ComponentProps<typeof HeadlessTableRow>
export type TableHeadProps = ComponentProps<typeof HeadlessTableHead>
export type TableCellProps = ComponentProps<typeof HeadlessTableCell>
export type TableCaptionProps = ComponentProps<typeof HeadlessTableCaption>

export function Table(props: TableProps) {
  return <HeadlessTable {...props} />
}

export function TableHeader(props: TableHeaderProps) {
  return <HeadlessTableHeader {...props} />
}

export function TableBody(props: TableBodyProps) {
  return <HeadlessTableBody {...props} />
}

export function TableFooter(props: TableFooterProps) {
  return <HeadlessTableFooter {...props} />
}

export function TableRow(props: TableRowProps) {
  return <HeadlessTableRow {...props} />
}

export function TableHead(props: TableHeadProps) {
  return <HeadlessTableHead {...props} />
}

export function TableCell(props: TableCellProps) {
  return <HeadlessTableCell {...props} />
}

export function TableCaption(props: TableCaptionProps) {
  return <HeadlessTableCaption {...props} />
}
