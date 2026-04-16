import type { SupportedLanguage } from "./index"

export interface DataTableCopy {
  emptyText: string
  errorText: string
  loadingText: string
  refreshLabel: string
  resetLabel: string
  totalLabel: string
  sortAscendingLabel: string
  sortDescendingLabel: string
  clearSortLabel: string
  bulkDeleteLabel: (count: number) => string
  bulkUpdateLabel: (count: number) => string
  bulkUpdateTitle: string
  bulkUpdateDescription: (count: number) => string
  bulkUpdateFieldLabel: string
  bulkUpdateValueLabel: string
  bulkUpdateCancelLabel: string
  bulkUpdateApplyLabel: string
}

const DATA_TABLE_COPY: Record<SupportedLanguage, DataTableCopy> = {
  en: {
    emptyText: "No data available.",
    errorText: "Failed to load data.",
    loadingText: "Loading data...",
    refreshLabel: "Refresh data",
    resetLabel: "Reset filters",
    totalLabel: "Total",
    sortAscendingLabel: "Sort ascending",
    sortDescendingLabel: "Sort descending",
    clearSortLabel: "Clear sort",
    bulkDeleteLabel: (count: number) => `Delete Selected (${count})`,
    bulkUpdateLabel: (count: number) => `Bulk Update (${count})`,
    bulkUpdateTitle: "Bulk Update",
    bulkUpdateDescription: (count: number) =>
      `Apply the same value to ${count} selected row(s).`,
    bulkUpdateFieldLabel: "Field",
    bulkUpdateValueLabel: "Value",
    bulkUpdateCancelLabel: "Cancel",
    bulkUpdateApplyLabel: "Apply",
  },
  zhCN: {
    emptyText: "暂无数据",
    errorText: "数据加载失败",
    loadingText: "正在加载数据...",
    refreshLabel: "刷新数据",
    resetLabel: "重置筛选",
    totalLabel: "总数",
    sortAscendingLabel: "升序排序",
    sortDescendingLabel: "降序排序",
    clearSortLabel: "清除排序",
    bulkDeleteLabel: (count: number) => `删除已选 (${count})`,
    bulkUpdateLabel: (count: number) => `批量修改 (${count})`,
    bulkUpdateTitle: "批量修改",
    bulkUpdateDescription: (count: number) =>
      `对 ${count} 条已选数据应用相同的值。`,
    bulkUpdateFieldLabel: "字段",
    bulkUpdateValueLabel: "值",
    bulkUpdateCancelLabel: "取消",
    bulkUpdateApplyLabel: "应用",
  },
}

export function getDataTableCopy(language: SupportedLanguage) {
  return DATA_TABLE_COPY[language]
}
