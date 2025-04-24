import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NavItem } from "../models/nav-item.model";
import { environment } from "../../environments/environment";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  // Will be updated with the current URL from NavigationEnd events
  private currentUrl: string = "";

  constructor(private http: HttpClient, private router: Router) {
    // Subscribe to router events so that currentUrl is always updated after navigation completes.
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
        console.log("Updated current URL:", this.currentUrl);
      });
  }

  getData(): Observable<NavItem[]> {
    // Use the stored currentUrl if available; if not, fall back to router.url.
    const urlToCheck = this.currentUrl || this.router.url;
    console.log("Using URL to determine endpoint:", urlToCheck);

    let apiUrl: string;

    if (urlToCheck.startsWith("/person/student/")) {
      apiUrl = `${environment.apiUrl}/General/GetStudentNames`;
      console.log("PERSON");
    } else if (urlToCheck.startsWith("/person/parent/")) {
      apiUrl = `${environment.apiUrl}/General/GetParentNames`;
      console.log("Parent");
    } else if (urlToCheck.startsWith("/person/staff/")) {
      apiUrl = `${environment.apiUrl}/General/GetStaffNames`;
      console.log("Staff");
    } else {
      // Fallback or default endpoint
      apiUrl = `${environment.apiUrl}/General/GetTableNames`;
    }

    console.log("Calling API at:", apiUrl);
    return this.http.get<NavItem[]>(apiUrl);
  }
}
