import NoteCard from "@/components/notes/NoteCard";

const dummyNotes = [
  { id: "1", title: "Postgres Notes", summary: "Learn about pgvector", tags: ["db", "postgres"] },
  { id: "2", title: "Next.js Tips", summary: "Server-side rendering, ISR", tags: ["frontend", "nextjs"] },
];

export default function NotesPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dummyNotes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
