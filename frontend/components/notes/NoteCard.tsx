import Link from "next/link";

interface Note {
  id: string;
  title: string;
  summary: string;
  tags: string[];
}

export default function NoteCard({ note }: { note: Note }) {
  return (
    <Link
      href={`/dashboard/notes/${note.id}`}
      className="p-4 bg-white rounded shadow hover:shadow-lg transition"
    >
      <h2 className="font-bold text-lg">{note.title}</h2>
      <p className="text-gray-600">{note.summary}</p>
      <div className="flex gap-2 mt-2">
        {note.tags.map((tag) => (
          <span key={tag} className="text-xs bg-gray-200 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
