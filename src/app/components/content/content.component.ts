import { DragonService } from './../../services/dragon.service';
import { Dragon } from './../../models/dragon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  dragons : Dragon[] = [];

  constructor(private service: DragonService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.service.getAll().subscribe((response) => {
      console.log(response);
      
      this.dragons = response;
   })
  }

  delete(id: any): void {
    this.service.delete(id).subscribe((response) => {
      this.service.message( "Dragon deleted.");
      this.dragons = this.dragons.filter( associado => associado.id !== id);
    })
  }


  

}
