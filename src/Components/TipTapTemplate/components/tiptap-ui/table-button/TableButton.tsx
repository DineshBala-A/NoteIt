import { Button } from "@/components/tiptap-ui-primitive/button"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import type { Editor } from "@tiptap/react"

export function TableButton({
  editor,
  label,
  command,
}: {
  editor: Editor | null
  label: string
  command: (editor: Editor) => boolean
}) {
  const tiptapEditor = useTiptapEditor(editor)

  if (!tiptapEditor?.isEditable) return null

  const handleClick = () => {
    command(tiptapEditor)
  }

  return (
    <Button type="button" onClick={handleClick} className="cursor-pointer">
      {label}
    </Button>
  )
}
