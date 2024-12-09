import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class LoadDataService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  loadData(dataSetName: string | null): Observable<any[]> {
    if (!dataSetName) {
      return throwError(
        () => new Error("dataSetName cannot be null or undefined")
      );
    }
    const sanitizedName = dataSetName.replace(/s$/, "");

    const url = `${this.apiUrl}/${sanitizedName}`;
    return this.http.get<any[]>(url);
  }
  updateData(
    dataSetName: string | null,
    id: number,
    data: any
  ): Observable<any> {
    if (!dataSetName) {
      return throwError(
        () => new Error("dataSetName cannot be null or undefined")
      );
    }
    const sanitizedName = dataSetName.replace(/s$/, "");

    const url = `${this.apiUrl}/${sanitizedName}/${id}`;
    return this.http.put<any>(url, data);
  }
}
