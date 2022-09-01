const BASE_URL = 'https://630fa41436e6a2a04edef041.mockapi.io';

export const getTodos = async () => {
  const todos: Todo[] = await fetch(`${BASE_URL}/todos`)
    .then(response => response.json());

  return todos;
};

export const deleteTodo = async (todoId: number) => {
  const response = await fetch(`${BASE_URL}/todos/${todoId}`,
    { method: 'DELETE' });

  return response.json();
};
