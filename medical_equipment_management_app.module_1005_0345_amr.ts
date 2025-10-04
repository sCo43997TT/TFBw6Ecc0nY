// 代码生成时间: 2025-10-05 03:45:33
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MedicalEquipmentService } from './services/medical-equipment.service';
import { EquipmentListComponent } from './components/equipment-list/equipment-list.component';
import { EquipmentDetailComponent } from './components/equipment-detail/equipment-detail.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    EquipmentListComponent,
    EquipmentDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    MedicalEquipmentService
  ],
  bootstrap: [EquipmentListComponent]
})
export class MedicalEquipmentManagementAppModule {
}

/*
 * Medical Equipment Service
 * Provides services for managing medical equipment data.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface MedicalEquipment {
  id: number;
  name: string;
  type: string;
  serialNumber: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedicalEquipmentService {
  private apiUrl = 'api/equipment'; // URL to web api

  constructor(private http: HttpClient) { }

  getEquipments(): Observable<MedicalEquipment[]> {
    return this.http.get<MedicalEquipment[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getEquipment(id: number): Observable<MedicalEquipment> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<MedicalEquipment>(url)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}

/*
 * Equipment List Component
 * Displays a list of medical equipment.
 */

import { Component, OnInit } from '@angular/core';
import { MedicalEquipment } from '../services/medical-equipment.service';
import { MedicalEquipmentService } from '../services/medical-equipment.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
  equipments: MedicalEquipment[] = [];
  errorMessage: string = '';

  constructor(private equipmentService: MedicalEquipmentService) { }

  ngOnInit() {
    this.loadAllEquipments();
  }

  loadAllEquipments(): void {
    this.equipmentService.getEquipments().subscribe({
      next: (equipments) => {
        this.equipments = equipments;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
}

/*
 * Equipment Detail Component
 * Displays detailed information about a specific piece of medical equipment.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicalEquipmentService } from '../services/medical-equipment.service';
import { MedicalEquipment } from '../services/medical-equipment.service';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {
  equipment: MedicalEquipment | undefined;

  constructor(
    private route: ActivatedRoute,
    private equipmentService: MedicalEquipmentService
  ) { }

  ngOnInit() {
    this.getEquipment();
  }

  getEquipment(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (id) {
      this.equipmentService.getEquipment(id).subscribe({
        next: (equipment) => {
          this.equipment = equipment;
        },
        error: (error) => {
          console.error('There was an error getting the equipment details', error);
        }
      });
    }
  }
}

/*
 * App Routing Module
 * Configures routing for the medical equipment management application.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipmentListComponent } from './components/equipment-list/equipment-list.component';
import { EquipmentDetailComponent } from './components/equipment-detail/equipment-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/equipments', pathMatch: 'full' },
  { path: 'equipments', component: EquipmentListComponent },
  { path: 'equipment/:id', component: EquipmentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }