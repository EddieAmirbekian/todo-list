import {UserService} from "./user.service";
import {UserState} from "../store/user/user.state";
import {userInitialState} from "../store/user/user.reducer";

describe('User service', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();

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

  it('should get initial state on first call', (done) => {
    userService.getUserState().then((state: UserState) => {
      expect(state).toEqual(userInitialState);
      done();
    });
  });

  it('should sign up when user doesn\'t exist', (done) => {
    userService.signUp({username: 'test', password: '123456'}).then((res) => {
      expect(res.username).toBeDefined();
      expect(res.password).toBeDefined();
      expect(res.username).toBe('test');
      expect(res.password).toBe('123456');
      done();
    });
  });

  it('should throw error during sign up if user exists', (done) => {
    localStorage.setItem('userStore', JSON.stringify({
      users: [{id: '1', username: 'test', password: '123456'}],
      currentUser: null,
      error: null
    }));
    userService.signUp({username: 'test', password: '123456'}).catch((res) => {
      expect(res).toEqual({error: 'Error: User already exists'});
      done();
    });
  });

  it('should sign in when user exists', (done) => {
    localStorage.setItem('userStore', JSON.stringify({
      users: [{id: '1', username: 'test', password: '123456'}],
      currentUser: null,
      error: null
    }));
    userService.signIn({username: 'test', password: '123456'}).then((res) => {
      expect(res.username).toBeDefined();
      expect(res.password).toBeDefined();
      expect(res.username).toBe('test');
      expect(res.password).toBe('123456');
      done();
    });
  });

  it('should throw error during sign in if user doesn\'t exist', (done) => {
    userService.signIn({username: 'test', password: '123456'}).catch((res) => {
      expect(res).toEqual({error: 'Error: User not found'});
      done();
    });
  });

  it('should throw error during sign in when wrong password was provided', (done) => {
    localStorage.setItem('userStore', JSON.stringify({
      users: [{id: '1', username: 'test', password: '123456'}],
      currentUser: null,
      error: null
    }));
    userService.signIn({username: 'test', password: '654321'}).catch((res) => {
      expect(res).toEqual({error: 'Error: Wrong password'});
      done();
    });
  });
});
