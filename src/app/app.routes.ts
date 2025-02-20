import { Routes } from "@angular/router";
import { PersonComponent } from "./person/person.component";
import { TableComponent } from "./components/table-component/table-component.component";

export const routes: Routes = [
  { path: "table/:dataSet", component: TableComponent },
  { path: "person/student/:studentId", component: PersonComponent },

  { path: "", redirectTo: "/table/InvalidAddress", pathMatch: "full" },

  { path: "**", redirectTo: "/table/InvalidAddress" },
];
