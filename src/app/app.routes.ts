import { Routes } from "@angular/router";
import { PersonComponent } from "./person/person.component";
import { ParentComponent } from "./components/parent/parent.component";
import { StaffComponent } from "./components/staff/staff.component";

import { TableComponent } from "./components/table-component/table-component.component";

export const routes: Routes = [
  { path: "table/:dataSet", component: TableComponent },
  { path: "person/student/:studentId", component: PersonComponent },
  { path: "person/parent/:parentId", component: ParentComponent },
  { path: "person/staff/:staffId", component: StaffComponent },

  { path: "", redirectTo: "/table/ParentInvalidAddress1", pathMatch: "full" },

  { path: "**", redirectTo: "/table/ParentInvalidAddress1" },
];
