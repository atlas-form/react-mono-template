import type { ComponentProps } from "react"
import {
  Table as CoreTable,
  TableBody as CoreTableBody,
  TableCaption as CoreTableCaption,
  TableCell as CoreTableCell,
  TableFooter as CoreTableFooter,
  TableHead as CoreTableHead,
  TableHeader as CoreTableHeader,
  TableRow as CoreTableRow,
} from "@workspace/ui-core/components/table"

export type TableProps = ComponentProps<typeof CoreTable>
export type TableHeaderProps = ComponentProps<typeof CoreTableHeader>
export type TableBodyProps = ComponentProps<typeof CoreTableBody>
export type TableFooterProps = ComponentProps<typeof CoreTableFooter>
export type TableRowProps = ComponentProps<typeof CoreTableRow>
export type TableHeadProps = ComponentProps<typeof CoreTableHead>
export type TableCellProps = ComponentProps<typeof CoreTableCell>
export type TableCaptionProps = ComponentProps<typeof CoreTableCaption>

export function Table(props: TableProps) {
  return <CoreTable {...props} />
}

export function TableHeader(props: TableHeaderProps) {
  return <CoreTableHeader {...props} />
}

export function TableBody(props: TableBodyProps) {
  return <CoreTableBody {...props} />
}

export function TableFooter(props: TableFooterProps) {
  return <CoreTableFooter {...props} />
}

export function TableRow(props: TableRowProps) {
  return <CoreTableRow {...props} />
}

export function TableHead(props: TableHeadProps) {
  return <CoreTableHead {...props} />
}

export function TableCell(props: TableCellProps) {
  return <CoreTableCell {...props} />
}

export function TableCaption(props: TableCaptionProps) {
  return <CoreTableCaption {...props} />
}
