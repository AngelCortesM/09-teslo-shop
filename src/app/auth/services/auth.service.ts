import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { User } from '@auth/interfaces/user.interface';
import { environment } from '@environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _authStatus = signal<AuthStatus>('checking');
  private readonly _user = signal<User | null>(null);
  private readonly _token = signal<string | null>(null);
  private readonly http = inject(HttpClient);

  checkStatusResourse = rxResource({
    stream: () => this.checkStatus(),
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    if (this._user()) {
      return 'authenticated';
    }
    return 'not-authenticated';
  });

  user = computed<User | null>(() => this._user());
  token = computed(() => this._token());

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((resp) => {
          this._user.set(resp.user);
          this._authStatus.set('authenticated');
          this._token.set(resp.token);

          localStorage.setItem('token', resp.token);
        }),
        map(() => true),
        catchError((error: any) => {
          this._user.set(null);
          this._token.set(null);
          this._authStatus.set('not-authenticated');
          return of(false);
        })
      );
  }
  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return of(false);
    return this.http
      .get<AuthResponse>(`${baseUrl}/auth/chack-status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap((resp) => {
          this._user.set(resp.user);
          this._authStatus.set('authenticated');
          this._token.set(resp.token);

          localStorage.setItem('token', resp.token);
        }),
        map(() => true),
        catchError((error: any) => {
          this._user.set(null);
          this._token.set(null);
          this._authStatus.set('not-authenticated');
          return of(false);
        })
      );
  }
}
