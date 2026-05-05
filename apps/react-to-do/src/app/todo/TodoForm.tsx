import { useState } from 'react';

export interface TodoFormProps {
  added: (text: string) => void;
}

export function TodoForm({ added }: TodoFormProps) {
  const [text, setText] = useState('');

  function handleSubmit(e: React.SubmitEvent): void {
    e.preventDefault();
    if (text.trim()) {
      added(text.trim());
      setText('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-6">
      <input
        className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
      />
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Add
      </button>
    </form>
  );
}
