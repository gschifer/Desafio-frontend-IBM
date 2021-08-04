import { Dragon } from './../models/dragon';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DragonService {

  apiUrl = "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon";

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  create(newDragon: Dragon): Observable<Dragon> {
    return this.http.post<Dragon>(this.apiUrl, newDragon)
  }

  getAll(): Observable<Dragon[]> {
    return this.http.get<Dragon[]>(this.apiUrl);
  }

  getById(id: string): Observable<Dragon> {
    return this.http.get<Dragon>(`${this.apiUrl}/${id}`);
  }

  update(dragon: Dragon): Observable<Dragon> {
    return this.http.put<Dragon>(`${this.apiUrl}/${dragon.id}`, dragon)
  }

  delete(id: string): Observable<Dragon> {
    return this.http.delete<Dragon>(`${this.apiUrl}/${id}`);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, "OK", {
      verticalPosition: "top",
      duration: 4000,
    });
  }

  errorMessage(msg: String): void {
    this.snack.open(`${msg}`, "OK", {
      duration: 6000,
    });
  }


  // message function customizable
  // message(
  //   message: any,
  //   verticalPosition: any,
  //   action: any,
  //   horizontalPosition: any,
  //   duration: any) {

  //   this.snack.open(message, action, {
  //     horizontalPosition: horizontalPosition,
  //     verticalPosition: verticalPosition,
  //     duration: duration
  //   })
}
