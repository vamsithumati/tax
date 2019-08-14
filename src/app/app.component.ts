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
  netYearSalary = 0;
  title = 'tax';
  monthlyTakeHome = 0;
  EmployeePF = 0;
  EmployerPF = 0;
  VPF = 0;
  Gratiuty = 0;
  HRA = 0;
  rentPaid = 0;
  LIC = 0;
  HouseLoanInt = 0;
  others = 0;
  leftOver = 0;
  netMonthlywithoutDeductions = 0;
  proTax = 200;
  gYTax = 0; gMTax = 0;
  ynet = 0;
  ;
  ngOnInit() {
    this.CTCFunction();
  }
  CTCFunction() {
    this.VP = this.CTC * 0.15;
    this.netYearSalary = this.CTC - this.VP;
    this.netMonthlywithoutDeductions = this.netYearSalary / 12;
    this.basicPay = this.CTC * 0.45 / 12;
    this.EmployeePF = this.basicPay * 0.12;
    this.EmployerPF = this.basicPay * 0.12;
    this.Gratiuty = 0.0481 * this.basicPay;
    this.leftOver = this.netMonthlywithoutDeductions
      - this.EmployeePF
      - this.EmployerPF
      - this.Gratiuty
      - this.basicPay;
    this.HRA = 0.4 * this.basicPay;
    this.monthlyTakeHome = this.basicPay + this.leftOver;
    // this.taxCalc();
    this.ynet = this.monthlyTakeHome * 12;
    const D80 = ((this.EmployeePF * 12) + this.LIC);
    if (D80 < 150000) {
      this.ynet = this.ynet - 50000 - this.LIC;
    } else {
      this.ynet = this.ynet + (this.EmployeePF * 12) - 50000 - 150000;
    }
    this.ynet = this.ynet - this.rentPaid;

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
      this.gYTax = 12500 + 100000 + (this.ynet - 1000000) * 0.2;
      this.gMTax = this.gYTax / 12;
      this.monthlyTakeHome = this.monthlyTakeHome - this.gMTax;
    }

  }

  VPFunction() {

  }
  calc() {
    //this.netYearSalary = this.CTC - this.VP;
    //this.monthlyTakeHome = this.netYearSalary / 12;
  }
  taxCalc() {
    let ynet = this.monthlyTakeHome * 12;
    let yTax = 0;
    ynet = ynet - 50000;
    if (ynet <= 250000) {
      yTax = 0;
    }
    if (ynet > 250000 && ynet <= 500000) {
      yTax = 0;
    }
    if (ynet > 500000 && ynet < 1000000) {
      yTax = 12500 + (ynet - 500000) * 0.2;
    }
    if (ynet > 1000000) {
      yTax = 12500 + 100000 + (ynet - 1000000) * 0.2;
    }
    this.gYTax = yTax;
    this.gMTax = this.gYTax / 12;
    return this.gMTax;
  }
}
