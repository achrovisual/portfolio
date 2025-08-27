import React from "react";

interface Note {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
}

interface NotesProps {
  notesData: Note[];
}

const Notes: React.FC<NotesProps> = ({ notesData }) => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Notes</h2>
      {notesData.length > 0 ? (
        <div className="space-y-6">
          {notesData.map((note) => (
            <div
              key={note.id}
              className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-2xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                {new Date(note.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-neutral-700 dark:text-neutral-300">
                {note.summary}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral-500 mt-8">No notes found.</p>
      )}
    </div>
  );
};

export default Notes;
