import type { ReactNode } from "react"
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

export interface TableProps {
  children: ReactNode
}

export interface TableHeaderProps {
  children: ReactNode
}

export interface TableBodyProps {
  children: ReactNode
}

export interface TableFooterProps {
  children: ReactNode
}

export interface TableRowProps {
  children: ReactNode
}

export interface TableHeadProps {
  children: ReactNode
}

export interface TableCellProps {
  children: ReactNode
}

export interface TableCaptionProps {
  children: ReactNode
}

export function Table({ children }: TableProps) {
  return <CoreTable>{children}</CoreTable>
}

export function TableHeader({ children }: TableHeaderProps) {
  return <CoreTableHeader>{children}</CoreTableHeader>
}

export function TableBody({ children }: TableBodyProps) {
  return <CoreTableBody>{children}</CoreTableBody>
}

export function TableFooter({ children }: TableFooterProps) {
  return <CoreTableFooter>{children}</CoreTableFooter>
}

export function TableRow({ children }: TableRowProps) {
  return <CoreTableRow>{children}</CoreTableRow>
}

export function TableHead({ children }: TableHeadProps) {
  return <CoreTableHead>{children}</CoreTableHead>
}

export function TableCell({ children }: TableCellProps) {
  return <CoreTableCell>{children}</CoreTableCell>
}

export function TableCaption({ children }: TableCaptionProps) {
  return <CoreTableCaption>{children}</CoreTableCaption>
}
