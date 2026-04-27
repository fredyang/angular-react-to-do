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

  private add = injectMutation(() => ({
    mutationFn: (todo: Todo) => lastValueFrom(this.http.post<Todo>('/api/todos', todo)),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  }));

  addTodo = (text: string) => {
    return this.add.mutate({ text } as Todo);
  };

  private toggle = injectMutation(() => ({
    mutationFn: (id: string) => lastValueFrom(this.http.patch<Todo>(`/api/todos/${id}`, {})),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  }));

  toggleTodo = (id: string) => {
    return this.toggle.mutate(id);
  };

  private delete = injectMutation(() => ({
    mutationFn: (id: string) => lastValueFrom(this.http.delete<Todo>(`/api/todos/${id}`)),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  }));

  deleteTodo = (id: string) => {
    return this.delete.mutate(id);
  };
}
