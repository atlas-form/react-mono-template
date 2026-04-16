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
import type {
  TableBodyProps as CoreTableBodyProps,
  TableCaptionProps as CoreTableCaptionProps,
  TableCellProps as CoreTableCellProps,
  TableHeadProps as CoreTableHeadProps,
  TableHeaderProps as CoreTableHeaderProps,
  TableProps as CoreTableProps,
  TableRowProps as CoreTableRowProps,
} from "@workspace/ui-core/components/table"

export type TableProps = CoreTableProps

export type TableHeaderProps = CoreTableHeaderProps

export type TableBodyProps = CoreTableBodyProps

export type TableFooterProps = React.ComponentProps<typeof CoreTableFooter>

export type TableRowProps = CoreTableRowProps

export type TableHeadProps = CoreTableHeadProps

export type TableCellProps = CoreTableCellProps

export type TableCaptionProps = CoreTableCaptionProps

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
