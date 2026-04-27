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

  todos = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => {
      return lastValueFrom(this.http.get<Todo[]>('/api/todos'));
    },
  }));

  addTodo = injectMutation(() => ({
    mutationFn: (text: string) =>
      lastValueFrom(this.http.post<Todo>('/api/todos', { text } as Todo)),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  })).mutate;

  toggleTodo = injectMutation(() => ({
    mutationFn: (id: string) => lastValueFrom(this.http.patch<Todo>(`/api/todos/${id}`, {})),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  })).mutate;

  deleteTodo = injectMutation(() => ({
    mutationFn: (id: string) => lastValueFrom(this.http.delete<Todo>(`/api/todos/${id}`)),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  })).mutate;
}
