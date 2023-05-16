import { Component, OnInit } from '@angular/core';
import {Employee} from './employee';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;
  constructor(private employeeService: EmployeeService){}
  ngOnInit()  {
    this.getEmployees();
  }
  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) =>{
        this.employees = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
  public anyadirEmpleado(addForm: NgForm): void{
    document.getElementById("empleados")?.click();
   
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public actualizarEmpleados(employee: Employee): void{
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) =>{
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public borrarEmpleados(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    
  }


  public onOpenModal(employee: Employee | null, mode: string): void{
    const container = document.getElementById("main-container");
    const button = document.createElement('button');
    button.type='button';
    button.style.display = 'none';
    button.setAttribute("data-bs-toggle", "modal");
    if (mode === 'anyadir'){
      console.log("hola");
      button.setAttribute("data-bs-target", "#anyadirEmpleadoModal");
      
      
    }
    if (mode === 'editar'){
      this.editEmployee = employee!;
      button.setAttribute("data-bs-target", "#editarEmpleadoModal");
     
    }
    if (mode === 'eliminar'){
      this.deleteEmployee = employee!;
      button.setAttribute("data-bs-target", "#EliminarEmpleadoModal");
    }
    console.log(container);
    container?.appendChild(button);
    button.click();
  }
}
