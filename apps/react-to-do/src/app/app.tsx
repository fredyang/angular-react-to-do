import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TodoApp } from './todo/TodoApp';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-center">
        <TodoApp />
      </main>
    </QueryClientProvider>
  );
}

export default App;
