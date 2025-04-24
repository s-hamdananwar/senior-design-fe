import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class LoadParentService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}
  // variable will be named isValid
  loadData(id: number): Observable<any[]> {
    if (!id) {
      return throwError(() => new Error("id cannot be null or undefined"));
    }
    // might need to drop $status depending on how backend is set up.
    const url = `${this.apiUrl}/Parent/${id}`;
    return this.http.get<any[]>(url);
  }

  updateData(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/Parent/${id}`;
    return this.http.put<any>(url, data);
  }
}
