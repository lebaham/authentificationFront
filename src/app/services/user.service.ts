import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/api/test/user';
  private pmUrl = 'http://localhost:8080/api/test/pm';
  private adminUrl = 'http://localhost:8080/api/test/admin';
  private allUsersUrl = 'http://localhost:8080/api/user/users';
  private deleteUserUrl = 'http://localhost:8080/api/user/delete';
  private updateUserUrl = 'http://localhost:8080/api/user/update';
  private getUserUrl =  'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }

  allUsers(): Observable<User[]> {
    return  this.http.get<User[]>(this.allUsersUrl, httpOptions);
  }

  deleteUser(id: number) {
    return this.http.delete(this.deleteUserUrl + '/' + id);
  }
   
  getUser(id: number): Observable<User>{
    return this.http.get<User>(this.getUserUrl + '/' + id);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.updateUserUrl + '/' + user.id, user);
  }

}
