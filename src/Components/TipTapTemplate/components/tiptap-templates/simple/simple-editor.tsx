import * as React from "react"
import { EditorContent, EditorContext, useEditor } from "@tiptap/react"

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem } from "@tiptap/extension-task-item"
import { TaskList } from "@tiptap/extension-task-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Underline } from "@tiptap/extension-underline"

// --- Custom Extensions ---
import { Link } from "@/components/tiptap-extension/link-extension"
import { Selection } from "@/components/tiptap-extension/selection-extension"
import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension"

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Spacer } from "@/components/tiptap-ui-primitive/spacer"
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar"

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu"
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu"
import { NodeButton } from "@/components/tiptap-ui/node-button"

// --- Taptap Table UI ---
import Document from '@tiptap/extension-document'
import Gapcursor from '@tiptap/extension-gapcursor'
import Paragraph from '@tiptap/extension-paragraph'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Text from '@tiptap/extension-text'

import { TableToolbar } from "@/components/tiptap-ui/table-button/TableToolbar"
// import { tableActions } from "@/components/tiptap-ui/table-button/tableActions.ts"
// import { TableButton } from "@/components/tiptap-ui/table-button/TableButton"

import {
  HighlightPopover,
  HighlightContent,
  HighlighterButton,
} from "@/components/tiptap-ui/highlight-popover"
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover"
import { MarkButton } from "@/components/tiptap-ui/mark-button"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button"

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon"
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon"
import { LinkIcon } from "@/components/tiptap-icons/link-icon"

// --- Hooks ---
import { useMobile } from "@/hooks/use-mobile"
import { useWindowSize } from "@/hooks/use-window-size"

// --- Components ---
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle"

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss"

import content from "@/components/tiptap-templates/simple/data/content.json"

interface TableButtonProps {
  toggleTableControls: () => void;
  state: boolean
}

const TableControllerButton: React.FC<TableButtonProps> = ({ toggleTableControls, state }) => {
  return (
    <>
      <div className={`select-none font-light text-sm cursor-pointer hover:bg-stone-200 dark:hover:bg-zinc-700 p-[5px] rounded-md transition duration-300 ${state?'bg-stone-200 dark:bg-zinc-700':''}`} onClick={toggleTableControls}>Table Controls</div>
    </>
  );
};

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
  toggleTableControls,
  showTableController
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
  toggleTableControls : ()=>void
  showTableController: boolean
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        <NodeButton type="codeBlock" />
        <NodeButton type="blockquote" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <HighlightPopover />
        ) : (
          <HighlighterButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <ToolbarSeparator/>
      <TableControllerButton toggleTableControls={toggleTableControls} state={showTableController} />
      <Spacer />

      {isMobile && <ToolbarSeparator />}

      {/* <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup> */}
    </>
  )
}

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link"
  onBack: () => void
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? <HighlightContent /> : <LinkContent />}
  </>
)

export function SimpleEditor() {
  const isMobile = useMobile()
  const windowSize = useWindowSize()

  const [showTableController, setShowTableController] = React.useState<boolean>(false);

  const toggleTableControls = () => {
    setShowTableController(!showTableController);
  }

  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main")
  const [rect, setRect] = React.useState<
    Pick<DOMRect, "x" | "y" | "width" | "height">
  >({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const toolbarRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const updateRect = () => {
      setRect(document.body.getBoundingClientRect())
    }

    updateRect()

    const resizeObserver = new ResizeObserver(updateRect)
    resizeObserver.observe(document.body)

    window.addEventListener("scroll", updateRect)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("scroll", updateRect)
    }
  }, [])

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,

      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error:string) => console.error("Upload failed:", error),
      }),
      TrailingNode,
      Link.configure({ openOnClick: false }),

      Document,
      Paragraph,
      Text,
      Gapcursor,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content,
  })

  React.useEffect(() => {
    const checkCursorVisibility = () => {
      if (!editor || !toolbarRef.current) return

      const { state, view } = editor
      if (!view.hasFocus()) return

      const { from } = state.selection
      const cursorCoords = view.coordsAtPos(from)

      if (windowSize.height < rect.height) {
        if (cursorCoords && toolbarRef.current) {
          const toolbarHeight =
            toolbarRef.current.getBoundingClientRect().height
          const isEnoughSpace =
            windowSize.height - cursorCoords.top - toolbarHeight > 0

          // If not enough space, scroll until the cursor is the middle of the screen
          if (!isEnoughSpace) {
            const scrollY =
              cursorCoords.top - windowSize.height / 2 + toolbarHeight
            window.scrollTo({
              top: scrollY,
              behavior: "smooth",
            })
          }
        }
      }
    }

    checkCursorVisibility()
  }, [editor, rect.height, windowSize.height])

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main")
    }
  }, [isMobile, mobileView])

  return (
    <EditorContext.Provider value={{ editor }}>
      <Toolbar
        ref={toolbarRef}
        style={
          isMobile
            ? {
                bottom: `calc(100% - ${windowSize.height - rect.y}px)`,
              }
            : {}
        }
      >
        {mobileView === "main" ? (
          <MainToolbarContent
            onHighlighterClick={() => setMobileView("highlighter")}
            onLinkClick={() => setMobileView("link")}
            isMobile={isMobile}
            toggleTableControls = {toggleTableControls}
            showTableController = {showTableController}
          />
        ) : (
          <MobileToolbarContent
            type={mobileView === "highlighter" ? "highlighter" : "link"}
            onBack={() => setMobileView("main")}
          />
        )}
      </Toolbar>

      <div className="content-wrapper relative ">
        {/* TableToolbar */}
        <div
          className={`transition-all duration-300 ease-in-out transform sticky top-0 bg-zinc-50 z-40 dark:bg-zinc-800 p-3 rounded overflow-hidden ${
            showTableController
              ? 'opacity-100 scale-100 max-h-96 visible pointer-events-auto'
              : 'opacity-0 scale-95 max-h-0 invisible pointer-events-none'
          }`}
        >
          <TableToolbar editor={editor} />
        </div>

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </div>
    </EditorContext.Provider>
  )
}
