import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { LoadStudentService } from "../services/load-student.service";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-person",
  templateUrl: "./person.component.html",
  styleUrls: ["./person.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class PersonComponent implements OnInit {
  personForm!: FormGroup;
  routeSub!: Subscription;
  studentId!: number;

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
        this.studentId = +idParam;
        this.personForm.reset();
        this.personForm.patchValue({ studentId: this.studentId });
        this.loadStudentService.loadData(this.studentId).subscribe({
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
  initializeForm(): void {
    this.personForm = this.fb.group({
      studentId: [""],
      schoolCode: [""], // Added
      familyName: [""], // Added
      familyNameSecond: [""], // Maybe add?
      legacyPersonId: [""], // Maybe add?
      schoolId: ["", Validators.required],
      firstName: ["", Validators.required],
      middleName: [""],
      lastName: ["", Validators.required],
      suffix: [""], // not added yet
      nickName: [""], // not added yet
      address1: ["", Validators.required],
      address2: [""], // add special drop down later?
      city: ["", Validators.required],
      state: ["", Validators.required],
      zip: [""],
      country: [""],
      homePhone: ["", Validators.required],
      cellPhone: ["", Validators.required],
      ssn: [""],
      status: [""],
      subStatus: [""],
      gradeLevel: ["", Validators.required], // Added
      enrollDate: ["", Validators.required], // Added
      withdrawDate: [""], // Added
      graduationDate: ["", Validators.required],
      gender: ["", Validators.required],
      birthDate: ["", Validators.required],
      email: ["", Validators.required], // Added
      email2: [""],
      ethnicity: [""],
      locker1: [""],
      combination1: [""],
      locker2: [""],
      combination2: [""],
      previousSchool: [""],
      previousSchoolAddress: [""],
      previousSchoolFromDate: [""],
      previousSchoolEndDate: [""],
      previousSchoolNote: [""],
      previousSchoolGradeCompleted: [""],
      classOf: [""],
      denomination: [""],
      church: [""],
      baptismChurch: [""],
      baptismDate: [""],
      baptismCity: [""],
      baptismState: [""],
      communionChurch: [""],
      communionDate: ["", Validators.required],
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
      primarylanguage: [""],
      note: [""],
      faepersonId: [""],
    });
  }
  onSubmit(): void {
    console.log("Form submitted:", this.personForm.value);
    // You can add your API call or other logic here.
  }
}
