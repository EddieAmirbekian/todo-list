import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Todo} from "../../models/todo.model";
import {Store} from "@ngrx/store";
import {addTodo, loadTodos, markTodo, removeTodo} from "../../store/todo/todo.actions";
import {debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap, takeUntil} from "rxjs";
import {selectAllTodos, selectTodosByUserId} from "../../store/todo/todo.selectors";
import {AppState} from "../../store/app.state";
import {FormControl, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {selectCurrentUser} from "../../store/user/user.selectors";
import {userLogOut, userNavigate} from "../../store/user/user.actions";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly displayedColumns = ['content', 'createDate', 'mark', 'remove'];

  dataSource: MatTableDataSource<Todo> | null = null;
  noData: MatTableDataSource<Todo> = new MatTableDataSource<Todo>([{} as Todo]);
  addTodoControl: FormControl<string | null> = new FormControl<string>('', [Validators.required]);
  searchTodoControl: FormControl<string | null> = new FormControl<string>('');
  user$: Observable<User | null> = this.store.select(selectCurrentUser);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  private destroySubject$: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
    this.store.dispatch(userNavigate());

    this.searchTodoControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroySubject$)
      )
      .subscribe((value: string | null) => {
        if (this.dataSource) {
          if (value && value.length) {
            this.dataSource.filterPredicate = (todo: Todo, filter: string) => todo.content.startsWith(filter);
            this.dataSource.filter = value;
          } else {
            this.dataSource.filter = '';
          }
        }
      })
  }

  ngAfterViewInit(): void {
    this.user$.pipe(
      switchMap((user: User | null) => {
        if (user) {
          return this.store.select(selectTodosByUserId(user.id))
        }
        return of([]);
      }),
      takeUntil(this.destroySubject$)
    ).subscribe((todos: Todo[]) => {
      this.dataSource = new MatTableDataSource<Todo>(todos);
      this.dataSource.sort = this.sort!;
      this.dataSource.paginator = this.paginator!;
    });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  onSort(sortState: Sort) {
    if (this.dataSource) {
      if (sortState.active === 'content') {
        this.dataSource.data = this.dataSource.data.sort((a, b) => a.content.localeCompare(b.content));
      } else if (sortState.active === 'createDate') {
        this.dataSource.data = this.dataSource.data.sort((a, b) => a.createDate - b.createDate);
      }
    }
  }

  addTodo(): void {
    if (!this.addTodoControl.invalid) {
      this.store.dispatch(addTodo({content: this.addTodoControl.value!, userId: this.router.url.substring(1)}));
    }
  }

  markTodo(todo: Todo): void {
    this.store.dispatch(markTodo({id: todo.id}));
  }

  removeTodo(todo: Todo): void {
    this.store.dispatch(removeTodo({id: todo.id}));
  }

  logout(): void {
    this.store.dispatch(userLogOut());
    this.store.dispatch(userNavigate());
  }
}
