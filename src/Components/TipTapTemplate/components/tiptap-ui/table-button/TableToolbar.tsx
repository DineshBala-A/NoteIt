import { tableActions } from "./tableActions"
import { TableButton } from "./TableButton"
import { Editor } from "@tiptap/react"

export function TableToolbar({ editor }: { editor: Editor | null }) {
  return (
  <div className="h-40 overflow-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {tableActions.map((action:any) => (
        <TableButton
          key={action.label}
          editor={editor}
          label={action.label}
          command={action.command}
        />
      ))}
    </div>
  </div>
  )
}
