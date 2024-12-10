import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { NavItem } from "../models/nav-item.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = `${environment.apiUrl}/General/GetTableNames`;

  constructor(private http: HttpClient) {}

  getData(): Observable<NavItem[]> {
    // Create HTTP headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Add headers to the request
    return this.http.get<NavItem[]>(this.apiUrl, { headers });
  }
}
