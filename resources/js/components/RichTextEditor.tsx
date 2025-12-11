import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Quote,
    Undo,
    Redo,
    Code,
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
}

export default function RichTextEditor({
    value,
    onChange,
    placeholder = 'Start typing...',
    error,
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4',
            },
        },
    });

    // Update editor content when value changes externally
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) {
        return null;
    }

    const MenuButton = ({
        onClick,
        isActive,
        icon: Icon,
        title,
    }: {
        onClick: () => void;
        isActive?: boolean;
        icon: typeof Bold;
        title: string;
    }) => (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={`p-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 text-blue-600' : 'text-gray-700'
            }`}
        >
            <Icon className="w-4 h-4" />
        </button>
    );

    return (
        <div className="border border-gray-300 rounded-md overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    icon={Bold}
                    title="Bold"
                />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    icon={Italic}
                    title="Italic"
                />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    isActive={editor.isActive('code')}
                    icon={Code}
                    title="Code"
                />
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                    icon={Heading2}
                    title="Heading"
                />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    icon={List}
                    title="Bullet List"
                />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    icon={ListOrdered}
                    title="Numbered List"
                />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    icon={Quote}
                    title="Quote"
                />
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <MenuButton
                    onClick={() => editor.chain().focus().undo().run()}
                    icon={Undo}
                    title="Undo"
                />
                <MenuButton
                    onClick={() => editor.chain().focus().redo().run()}
                    icon={Redo}
                    title="Redo"
                />
            </div>

            {/* Editor */}
            <EditorContent editor={editor} className="bg-white" />

            {/* Error Message */}
            {error && <p className="px-4 py-2 text-sm text-red-600 bg-red-50">{error}</p>}
        </div>
    );
}
