import type { Editor } from "@tiptap/react"
export const tableActions = [
    { label: "Insert Table", command: (editor : Editor) => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
    { label: "Add Column Before", command: (editor : Editor) => editor.chain().focus().addColumnBefore().run() },
    { label: "Add Column After", command: (editor : Editor) => editor.chain().focus().addColumnAfter().run() },
    { label: "Delete Column", command: (editor : Editor) => editor.chain().focus().deleteColumn().run() },
    { label: "Add Row Before", command: (editor : Editor) => editor.chain().focus().addRowBefore().run() },
    { label: "Add Row After", command: (editor : Editor) => editor.chain().focus().addRowAfter().run() },
    { label: "Delete Row", command: (editor : Editor) => editor.chain().focus().deleteRow().run() },
    { label: "Delete Table", command: (editor : Editor) => editor.chain().focus().deleteTable().run() },
    { label: "Merge Cells", command: (editor : Editor) => editor.chain().focus().mergeCells().run() },
    { label: "Split Cell", command: (editor : Editor) => editor.chain().focus().splitCell().run() },
    { label: "Toggle Header Column", command: (editor : Editor) => editor.chain().focus().toggleHeaderColumn().run() },
    { label: "Toggle Header Row", command: (editor : Editor) => editor.chain().focus().toggleHeaderRow().run() },
    { label: "Toggle Header Cell", command: (editor : Editor) => editor.chain().focus().toggleHeaderCell().run() },
    { label: "Merge or Split", command: (editor : Editor) => editor.chain().focus().mergeOrSplit().run() },
    { label: "Set Cell Attribute", command: (editor : Editor) => editor.chain().focus().setCellAttribute("colspan", 2).run() },
    { label: "Fix Tables", command: (editor : Editor) => editor.chain().focus().fixTables().run() },
    { label: "Next Cell", command: (editor : Editor) => editor.chain().focus().goToNextCell().run() },
    { label: "Previous Cell", command: (editor : Editor) => editor.chain().focus().goToPreviousCell().run() },
  ]
  