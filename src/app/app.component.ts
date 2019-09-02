import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  CTC = 1300000;
  VP = 0;
  basicPay = 0;
  UVP = true;
  UbasicPay = true;
  netYearSalary = 0;
  title = 'tax';
  monthlyTakeHome = 0;
  EmployeePF = 0;
  EmployerPF = 0;
  VPF = 0;
  Gratiuty = 0;
  HRA = 0;
  UEmployeePF = true;
  UEmployerPF = true;
  UVPF = true;
  UGratiuty = true;
  UHRA = true;
  rentPaid = 0;
  LIC = 0;
  HouseLoanInt = 0;
  others = 0;
  leftOver = 0;
  FC=0;
  netMonthlywithoutDeductions = 0;
  proTax = 200;
  gYTax = 0; gMTax = 0;
  ynet = 0;
  eligibleHRA: number;
  case1: number;
  case2: number;
  case3: number;
  D80: number;
  Uothers= true;
  MedicalInsurence = 0;
  SeniorCitizen = false;
  flag =0;
  ngOnInit() {
    this.SeniorCitizen = false;
    this.flag =0;
    this.CTCFunction();
  }
  checkFunction(){
    this.flag++;
    this.CTCFunction();
  }
  CTCFunction() {
    this.VP = this.UVP ? this.CTC * 0.15 : this.VP;
    this.netYearSalary = this.CTC - this.VP;
    this.netMonthlywithoutDeductions = this.netYearSalary / 12;
    this.basicPay = this.UbasicPay ? this.CTC * 0.45 / 12 : this.basicPay;
    this.EmployeePF = this.UEmployeePF ? this.basicPay * 0.12 : this.EmployeePF;
    this.EmployerPF = this.UEmployerPF ? this.basicPay * 0.12 : this.EmployerPF;
    this.Gratiuty = this.UGratiuty ? 0.048 * this.basicPay : this.Gratiuty;
    this.leftOver = this.netMonthlywithoutDeductions
      - this.EmployeePF
      - this.EmployerPF
      - this.Gratiuty
      - this.basicPay
      - this.others
      - this.FC
      - this.VPF;
    this.HRA = this.UHRA ? 0.4 * this.basicPay : this.HRA ;
    this.monthlyTakeHome = this.basicPay + this.leftOver + this.others;
    // this.taxCalc();
    this.ynet = this.monthlyTakeHome * 12;
    this.D80 = ((this.EmployeePF * 12) + this.LIC + (this.VPF*12));
    if (this.D80 < 150000) {
      this.ynet = this.ynet - 50000 - this.LIC - (this.VPF*12);
    } else {
      this.ynet = this.ynet + (this.EmployeePF * 12) - 50000 - 150000;
    }
    if(this.HouseLoanInt<200000){
      this.ynet = this.ynet-this.HouseLoanInt;
    }else{
      this.ynet = this.ynet-200000;
    }
    if(this.MedicalInsurence<=25000){
      this.ynet = this.ynet-this.MedicalInsurence;
    }else if(this.MedicalInsurence>25000){
      if(this.flag%2){
        if(this.MedicalInsurence<50000){
          this.ynet = this.ynet-this.MedicalInsurence;
        }else{
          this.ynet = this.ynet-50000;
        }
      }else{
        this.ynet = this.ynet-25000;
      }
    }
    this.case1 = this.HRA*12;
    this.case2 = (this.rentPaid*12)-(this.basicPay*12*0.1);

    this.case3 = this.basicPay*12*0.4;
    this.eligibleHRA = Math.min(this.case1,this.case2,this.case3)
     this.ynet = this.ynet - this.eligibleHRA;

    // this.ynet = this.ynet - 50000 - this.LIC;
    if (this.ynet <= 250000) {
      this.gYTax = 0;
      this.gMTax = this.gYTax / 12;
      this.monthlyTakeHome = this.monthlyTakeHome - this.gMTax;
    }
    if (this.ynet > 250000 && this.ynet <= 500000) {
      this.gYTax = 0;
      this.gMTax = this.gYTax / 12;
      this.monthlyTakeHome = this.monthlyTakeHome - this.gMTax;
    }
    if (this.ynet > 500000 && this.ynet < 1000000) {
      this.gYTax = 12500 + (this.ynet - 500000) * 0.2;
      this.gMTax = this.gYTax / 12;
      this.monthlyTakeHome = this.monthlyTakeHome - this.gMTax;
    }
    if (this.ynet > 1000000) {
      this.gYTax = 12500 + 100000 + (this.ynet - 1000000) * 0.3;
      this.gMTax = this.gYTax / 12;
      this.monthlyTakeHome = this.monthlyTakeHome - this.gMTax;
    }

  }

  reset() {
    this.UVP = true;
    this.UbasicPay = true;
    this.UEmployeePF = true;
    this.UEmployerPF = true;
    this.UVPF = true;
    this.UGratiuty = true;
    this.UHRA = true;
    this.CTCFunction();
  }
  VPFunction(vName) {
    this['U'+vName] = false;
    this.CTCFunction();
  }


}
