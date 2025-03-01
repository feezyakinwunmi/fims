"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import EditorMenu from "./EditorMenu";

type EditorProps = {
  onChange: (content: string) => void;
  initialContent?: string;
};

export default function Editor({ onChange, initialContent }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] cursor-text rounded-md border p-5 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ",
      },
    },
    immediatelyRender: false,
  });
  return (
    <div>
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
