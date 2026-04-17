import type { SupportedLanguage } from "./index"

export interface DataTableCopy {
  emptyText: string
  errorText: string
  loadingText: string
  refreshLabel: string
  resetLabel: string
  totalLabel: string
  insertLabel: string
  actionsLabel: string
  editLabel: string
  deleteLabel: string
  moreLabel: string
  cancelLabel: string
  saveLabel: string
  confirmDeleteLabel: string
  deleteDialogTitle: string
  deleteDialogDescription: string
  bulkDeleteDialogDescription: (count: number) => string
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
    insertLabel: "Insert",
    actionsLabel: "Actions",
    editLabel: "Edit",
    deleteLabel: "Delete",
    moreLabel: "More actions",
    cancelLabel: "Cancel",
    saveLabel: "Save",
    confirmDeleteLabel: "Delete",
    deleteDialogTitle: "Confirm deletion",
    deleteDialogDescription: "This action cannot be undone.",
    bulkDeleteDialogDescription: (count: number) =>
      `This action will delete ${count} selected row(s) and cannot be undone.`,
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
    insertLabel: "新增",
    actionsLabel: "操作",
    editLabel: "编辑",
    deleteLabel: "删除",
    moreLabel: "更多操作",
    cancelLabel: "取消",
    saveLabel: "保存",
    confirmDeleteLabel: "确认删除",
    deleteDialogTitle: "确认删除",
    deleteDialogDescription: "该操作无法撤销。",
    bulkDeleteDialogDescription: (count: number) =>
      `该操作会删除已选的 ${count} 条数据，且无法撤销。`,
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
