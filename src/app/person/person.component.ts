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
import { LoadStudentService } from "../services/load-student.service";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Subscription } from "rxjs";
import { validateData } from "../services/validate-data.service"; // adjust the path if needed
import { validateDateData } from "../services/validate-date.service"; // adjust the path if needed
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-person",
  templateUrl: "./person.component.html",
  styleUrls: ["./person.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatTooltipModule, MatIconModule],
})
export class PersonComponent implements OnInit {
  personForm!: FormGroup;
  routeSub!: Subscription;
  Id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private loadStudentService: LoadStudentService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const idParam = params.get("studentId");
      if (idParam) {
        this.Id = +idParam;
        this.personForm.reset();
        this.personForm.patchValue({ Id: this.Id });
        this.loadStudentService.loadData(this.Id).subscribe({
          next: (data: any) => {
            this.personForm.patchValue(data);
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
      schoolCode: [""],
      familyName: [""], // Added
      familyNameSecond: [""], // Maybe add?
      legacyPersonId: [""], // Maybe add?
      schoolId: [""],
      firstName: [
        "",
        [Validators.required, this.validateDataValidator("firstName")],
      ],
      middleName: [
        "",
        [Validators.required, this.validateDataValidator("middleName")],
      ],
      lastName: [
        "",
        [Validators.required, this.validateDataValidator("lastName")],
      ],
      suffix: ["", [Validators.required, this.validateDataValidator("suffix")]], // not added yet
      nickName: [""], // not added yet
      address1: [
        "",
        [Validators.required, this.validateDataValidator("address1")],
      ],
      address2: ["", this.validateDataValidator("address2")], // add special drop down later?
      city: ["", [Validators.required, this.validateDataValidator("city")]],
      state: ["", [Validators.required, this.validateDataValidator("state")]],
      zip: ["", [Validators.required, this.validateDataValidator("zip")]],
      country: [
        "",
        [Validators.required, this.validateDataValidator("country")],
      ],
      homePhone: [
        "",
        [Validators.required, this.validateDataValidator("homePhone")],
      ],

      cellPhone: [
        "",
        [Validators.required, this.validateDataValidator("cellPhone")],
      ],
      ssn: ["", [Validators.required, this.validateDataValidator("ssn")]],
      status: ["", [Validators.required, this.validateDataValidator("status")]],
      subStatus: [""],
      gradeLevel: [
        "",
        [Validators.required, this.validateDataValidator("gradeLevel")],
      ], // Added
      enrollDate: [
        "",
        [Validators.required, this.validateDataValidator("enrollDate")],
      ], // Added
      withdrawDate: ["", this.validateDataValidator("withdrawDate")], // Added
      graduationDate: [
        "",
        [Validators.required, this.validateDataValidator("graduationDate")],
      ],
      gender: ["", [Validators.required, this.validateDataValidator("gender")]],
      birthDate: [
        "",
        [Validators.required, this.validateDataValidator("birthDate")],
      ],
      email: ["", [Validators.required, this.validateDataValidator("email")]],
      email2: ["", this.validateDataValidator("email2")], // need to make it not required but still validate and show errors
      ethnicity: [
        "",
        [Validators.required, this.validateDataValidator("ethnicity")],
      ],
      locker1: ["", [this.validateDataValidator("locker1")]],
      combination1: ["", [this.validateDataValidator("combination1")]], //added
      locker2: [""],
      combination2: [""],
      previousSchool: [""],
      previousSchoolAddress: [""],
      previousSchoolFromDate: [""],
      previousSchoolEndDate: [""],
      previousSchoolNote: [""],
      previousSchoolGradeCompleted: [""],
      classOf: ["", [this.validateDataValidator("classOf")]],
      denomination: [""],
      church: [""],
      baptismChurch: [""],
      baptismDate: [""],
      baptismCity: [""],
      baptismState: [""],
      communionChurch: [""],
      communionDate: [""],
      communionCity: [""],
      communionState: [""],
      confirmationChurch: [""],
      confirmationDate: [""],
      confirmationCity: [""],
      confirmationState: [""],
      reconciliationChurch: [""],
      reconciliationDate: [""],
      reconciliationCity: [""],
      reconciliationState: [""],
      barmitzvahChurch: [""],
      barmitzvahDate: [""],
      barmitzvahCity: [""],
      barmitzvahState: [""],
      citizenship: [""],
      doctor: [""],
      drPhone: [""],
      drAddress: [""],
      dentist: [""],
      dentistPhone: [""],
      dentistAddress: [""],
      hospital: [""],
      hospitalAddress: [""],
      bloodType: [""],
      driverLicense: [""],
      autoLicense: [""],
      make: [""],
      model: [""],
      permitNumber: [""],
      insuranceCompany: [""],
      insurancePolicy: [""],
      insuranceGroup: [""],
      birthCity: [""],
      birthState: [""],
      birthCountry: [""],
      withdrawReason: [""],
      publicSchoolDistrict: [""],
      publicSchoolCounty: [""],
      publicschoollocalschool: [""],
      publicschoolstate: [""],
      permissionToTreat: [""],
      reducedlunch: [""],
      username: [""],
      primarylanguage: ["", this.validateDataValidator("primarylanguage")], //added
      note: [""],
      faepersonId: [""],
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
    this.loadStudentService
      .updateData(this.Id, this.personForm.value)
      .subscribe({
        next: (response) => {
          console.log("Student updated successfully:", response);
          // Optionally, perform further actions here (e.g., navigate away or show a success message)
        },
        error: (err) => {
          console.error("Error updating student data:", err);
          // Optionally, handle the error (e.g., show an error message to the user)
        },
      });
  }
}
