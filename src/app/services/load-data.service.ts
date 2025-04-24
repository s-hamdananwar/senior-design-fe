import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LoadDataService {
  private apiUrl = `${environment.apiUrl}`;
  isLoading: boolean = true; // Initially set to true

  constructor(private http: HttpClient) {}

  loadData(dataSetName: string | null, status: number): Observable<any[]> {
    console.log(status);
    if (!dataSetName) {
      return throwError(
        () => new Error("dataSetName cannot be null or undefined")
      );
    }
    if (!status) {
      status = 0;
    }
    const sanitizedName = dataSetName.replace(/(?<!s)s$/, "");
    console.log(sanitizedName);

    // Set isLoading to true before making the request
    this.isLoading = true;

    const url = `${this.apiUrl}/${sanitizedName}`;
    console.log("url", url);
    return this.http.get<any[]>(url).pipe(
      finalize(() => {
        this.isLoading = false; // Set isLoading to false once data is loaded
      })
    );
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

    // Send the data as a JSON string value
    const requestData = JSON.stringify(data);

    return this.http.put<any>(url, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
