import {TodoService} from "./todo.service";
import {Todo} from "../models/todo.model";

describe('Todo service', () => {
  let todoService: TodoService;

  beforeEach(() => {
    todoService = new TodoService();

    // creating mock localstorage
    let store = {} as Record<string, string>;
    const mockLocalStorage = {
      getItem: (key: string): string | null => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should get empty array on first call', (done) => {
    todoService.getTodos().then((todos: Todo[]) => {
      expect(todos).toEqual([]);
      done();
    });
  });

  it('should set/get todos', (done) => {
    const todos = [
      {id: '1', userId: '1', content: 'Todo #1', marked: false, createDate: new Date().getMilliseconds()},
      {id: '2', userId: '1', content: 'Todo #2', marked: false, createDate: new Date().getMilliseconds()},
    ];
    todoService.saveTodos(todos);
    todoService.getTodos().then((res) => {
      expect(res).toEqual(todos);
      done();
    })
  });
});
