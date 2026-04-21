import { Badge } from "@workspace/ui-components/stable/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui-components/stable/table"

const rows = [
  { id: "PO-1001", channel: "App", owner: "Lydia", status: "Pending", amount: "¥ 25,000" },
  { id: "PO-1002", channel: "Web", owner: "Mason", status: "Shipped", amount: "¥ 42,300" },
  { id: "PO-1003", channel: "Reseller", owner: "Iris", status: "Hold", amount: "¥ 12,800" },
]

export default function OrdersPage() {
  return (
    <Card>
      <CardHeader>
        <Badge variant="outline">Demo Data</Badge>
        <CardTitle>订单看板</CardTitle>
        <CardDescription>
          适合作为后续接入真实列表、筛选器和分页的入口页。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单号</TableHead>
              <TableHead>渠道</TableHead>
              <TableHead>负责人</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>金额</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.channel}</TableCell>
                <TableCell>{row.owner}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
