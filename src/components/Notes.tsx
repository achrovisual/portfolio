import React, { useState } from "react";
import { Icon } from "@iconify/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { Note } from "../types/note";

interface NotesProps {
  notesData: Note[];
}

const Notes: React.FC<NotesProps> = ({ notesData }) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleBackClick = () => {
    setSelectedNote(null);
  };

  const renderTags = (tags: string[]) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className="bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs px-2 py-1 rounded-full font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  );

  if (selectedNote) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <button
          onClick={handleBackClick}
          className="mb-6 flex items-center text-sm font-semibold text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
        >
          <Icon icon="lucide:chevron-left" className="w-4 h-4 mr-1" />
          Back to Notes
        </button>
        <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold mb-2">{selectedNote.title}</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
            <time dateTime={selectedNote.date}>
              {new Date(selectedNote.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
          {renderTags(selectedNote.tags)}
          <div className="prose dark:prose-invert text-neutral-700 dark:text-neutral-300 mt-4">
            <ReactMarkdown
              children={selectedNote.content}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              className="markdown-content"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Notes</h2>
      {notesData.length > 0 ? (
        <div className="space-y-6">
          {notesData.map((note) => (
            <button
              key={note.id}
              onClick={() => handleNoteClick(note)}
              className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-2xl shadow-md transition-transform transform hover:scale-[1.01] hover:shadow-lg w-full text-left"
              aria-label={`Open note titled ${note.title}`}
            >
              <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                <time dateTime={note.date}>
                  {new Date(note.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </p>
              <p className="text-neutral-700 dark:text-neutral-300">
                {note.summary}
              </p>
              {renderTags(note.tags)}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral-500 mt-8">No notes found.</p>
      )}
    </div>
  );
};

export default Notes;
