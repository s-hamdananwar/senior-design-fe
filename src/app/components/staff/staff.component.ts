import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { LoadStaffService } from "../../services/load-staff.service";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Subscription } from "rxjs";
import { validateData } from "../../services/validate-data.service"; // adjust the path if needed
import { validateDateData } from "../../services/validate-date.service"; // adjust the path if needed

@Component({
  selector: "app-staff",
  templateUrl: "./staff.component.html",
  styleUrls: ["./staff.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class StaffComponent implements OnInit {
  personForm!: FormGroup;
  routeSub!: Subscription;
  Id!: number;
  submissionMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private loadStaffService: LoadStaffService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const idParam = params.get("staffId");
      if (idParam) {
        this.Id = +idParam;
        this.personForm.reset();
        this.personForm.patchValue({ Id: this.Id });
        this.loadStaffService.loadData(this.Id).subscribe({
          next: (data: any) => {
            this.personForm.patchValue(data);
            this.submissionMessage = "";

            console.log(data);
            this.personForm.markAllAsTouched();
          },
          error: (err) => {
            console.error("Error loading student data:", err);
          },
        });
      }
    });
  }

  validateDataValidator(dataSetName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        control.value === null ||
        control.value === undefined ||
        control.value === ""
      ) {
        return null;
      }

      let result: true | string;
      const dateDataSetNames = [
        "InvalidDates",
        "StudentMissingBirthdate",
        "StudentMissingEnrollDates",
        "enrollDate",
        "withdrawDate",
        "graduationDate",
        "birthDate",
        "startDate",
        "baptismDate",
        "communionDate",
        "reconciliationDate",
        "confirmationDate",
        "barmitzvahDate",
      ];

      if (dateDataSetNames.includes(dataSetName)) {
        result = validateDateData(control.value);
      } else {
        result = validateData(control.value, dataSetName);
      }
      return result === true ? null : { validateDataError: result };
    };
  }

  private isControlRequired(control: AbstractControl): boolean {
    if (!control.validator) {
      return false;
    }
    const validatorResult = control.validator({
      value: null,
    } as AbstractControl);
    return validatorResult ? "required" in validatorResult : false;
  }

  initializeForm(): void {
    this.personForm = this.fb.group({
      isValid: [""],
      Id: [""],
      active: [""],
      address: [
        "",
        [Validators.required, this.validateDataValidator("address")],
      ],
      bachelorDegree: ["", this.validateDataValidator("bachelorDegree")],
      bachelorDegree2: ["", this.validateDataValidator("bachelorDegree2")],
      bachelorSchool: ["", this.validateDataValidator("bachelorSchool")],
      bachelorSchool2: ["", this.validateDataValidator("bachelorSchool2")],
      bachelorYear: ["", this.validateDataValidator("bachelorYear")],
      bachelorYear2: ["", this.validateDataValidator("bachelorYear2")],
      birthCity: [""],
      birthCountry: [""],
      birthDate: [
        "",
        [Validators.required, this.validateDataValidator("birthDate")],
      ],
      birthState: [""],
      bloodType: [""],
      cellPhone: [
        "",
        [Validators.required, this.validateDataValidator("cellPhone")],
      ],
      church: [""],
      citizenship: [""],
      city: ["", [Validators.required, this.validateDataValidator("city")]],
      denomination: [""],
      dentistAddress: [""],
      dentistName: [""],
      dentistPhone: [""],
      department: [
        "",
        [Validators.required, this.validateDataValidator("department")],
      ],
      districtuser: [""],
      doctorAddress: [""],
      doctorHospital: [""],
      doctorName: [""],
      doctorPhone: [""],
      elem: [""],
      email: ["", [Validators.required, this.validateDataValidator("email")]],
      email2: ["", this.validateDataValidator("email2")],
      endDate: [""],
      ethnicity: [""],
      experienceSchool: [""],
      experiencetotal: [""],
      faculty: [""],
      familyName: [
        "",
        [Validators.required, this.validateDataValidator("familyName")],
      ],
      firstName: [
        "",
        [Validators.required, this.validateDataValidator("firstName")],
      ],
      fullTime: [""],
      gender: ["", [Validators.required, this.validateDataValidator("gender")]],
      highSchool: [""],
      homePhone: [
        "",
        [Validators.required, this.validateDataValidator("homePhone")],
      ],
      hs: [""],
      insuranceCompany: [""],
      insuranceGroup: [""],
      insurancePolicy: [""],
      jobcategory: [""],
      lastName: [
        "",
        [Validators.required, this.validateDataValidator("lastName")],
      ],
      legacyPersonId: [""],
      maritalStatus: [
        "",
        [Validators.required, this.validateDataValidator("maritalStatus")],
      ],
      masterDegree: [""],
      masterDegree2: [""],
      masterSchool: [""],
      masterSchool2: [""],
      masterYear: [""],
      masterYear2: [""],
      middleName: [
        "",
        [Validators.required, this.validateDataValidator("middleName")],
      ],
      ms: [""],
      nickName: [""],
      note: [""],
      occupation: [
        "",
        [Validators.required, this.validateDataValidator("occupation")],
      ],
      permissiontoTreat: [""],
      phddegree: [""],
      phddegree2: [""],
      phdschool: [""],
      phdschool2: [""],
      phdyear: [""],
      phdyear2: [""],
      primarylanguage: ["", [this.validateDataValidator("primarylanguage")]],
      ps: [""],
      room: [""],
      salutation: [""],
      schoolCode: ["", [this.validateDataValidator("schoolCode")]],
      ssn: ["", [Validators.required, this.validateDataValidator("ssn")]],
      staff1: [""],
      startDate: [
        "",
        [Validators.required, this.validateDataValidator("startDate")],
      ],
      state: ["", [Validators.required, this.validateDataValidator("state")]],
      substitute: [""],
      username: [""],
      workPhone: ["", [this.validateDataValidator("workPhone")]],
      workPhoneExtension: [""],
      zip: ["", [Validators.required, this.validateDataValidator("zip")]],
    });
  }

  onSubmit(): void {
    this.personForm.markAllAsTouched();

    let allRequiredValid = true;
    Object.keys(this.personForm.controls).forEach((key) => {
      const control = this.personForm.get(key);
      if (control && this.isControlRequired(control)) {
        if (!control.valid) {
          allRequiredValid = false;
        }
      }
    });

    if (allRequiredValid) {
      this.personForm.get("isValid")?.setValue(true);
    } else {
      this.personForm.get("isValid")?.setValue(false);
    }
    console.log("Form submitted:", this.personForm.value);

    // Use the studentId already set in ngOnInit
    this.loadStaffService.updateData(this.Id, this.personForm.value).subscribe({
      next: (response) => {
        console.log("Staff updated successfully:", response);
        const isValidated = this.personForm.get("isValid")?.value;
        this.submissionMessage = isValidated
          ? "You have successfully updated and validated this parent."
          : "You have updated this parent's info but they are not fully validated.";
      },
      error: (err) => {
        console.error("Error updating student data:", err);
        // Optionally, handle the error (e.g., show an error message to the user)
      },
    });
  }
}
