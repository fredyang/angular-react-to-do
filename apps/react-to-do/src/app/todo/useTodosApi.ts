import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function useTodosApi() {
  const queryClient = useQueryClient();
  const { data: todos = [], isLoading } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch('/api/todos');
      return res.json();
    },
  });

  const addTodo = useMutation({
    mutationFn: async (text: string) => {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const toggleTodo = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/todos/${id}`, { method: 'PATCH' });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const deleteTodo = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  return {
    todos,
    isLoading,
    addTodo: addTodo.mutate,
    toggleTodo: toggleTodo.mutate,
    deleteTodo: deleteTodo.mutate,
  };
}
