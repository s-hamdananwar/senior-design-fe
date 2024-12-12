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
  // variable will be named isValid
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
    // console.log(dataSetName);
    const sanitizedName = dataSetName.replace(/(?<!s)s$/, "");
    console.log(sanitizedName);
    // might need to drop $status depending on how backend is set up.
    const url = `${this.apiUrl}/${sanitizedName}/${status}`;
    // const url = `${this.apiUrl}/${sanitizedName}`;

    // console.log(url);

    // let params = new HttpParams();
    // params = params.set("isValid", status);
    // console.log(params);
    // if its taking it in as /1 or /0
    return this.http.get<any[]>(url);

    // if its taking it in as a paramater
    // return this.http.get<any[]>(url, { params });
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
