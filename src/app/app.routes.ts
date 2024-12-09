import { Routes } from "@angular/router";

import { TableComponent } from "./components/table-component/table-component.component";

export const routes: Routes = [
  { path: "table/:dataSet", component: TableComponent },

  // Add more routes here
];
