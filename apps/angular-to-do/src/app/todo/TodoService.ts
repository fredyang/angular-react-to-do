import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);
  private queryClient = inject(QueryClient);

  getTodos() {
    return injectQuery(() => ({
      queryKey: ['todos'],
      queryFn: () => {
        return lastValueFrom(this.http.get<Todo[]>('/api/todos'));
      },
    }));
  }

  private addMutate = injectMutation(() => ({
    mutationFn: (todo: Todo) => lastValueFrom(this.http.post<Todo>('/api/todos', todo)),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  }));

  addTodo = (text: string) => {
    return this.addMutate.mutate({ text } as Todo);
  };

  private toggleMutate = injectMutation(() => ({
    mutationFn: (id: string) => lastValueFrom(this.http.patch<Todo>(`/api/todos/${id}`, {})),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  }));

  toggleTodo = (id: string) => {
    return this.toggleMutate.mutate(id);
  };

  private deleteMutate = injectMutation(() => ({
    mutationFn: (id: string) => lastValueFrom(this.http.delete<Todo>(`/api/todos/${id}`)),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  }));

  deleteTodo = (id: string) => {
    return this.deleteMutate.mutate(id);
  };
}
