import { DragonService } from './../../services/dragon.service';
import { Dragon } from './../../models/dragon';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    newDragon: Dragon = {
        name: "",
        type: "",
        histories: "",
        createdAt: new Date()
    }

    constructor(
        private router: Router,
        private service: DragonService) { }

    ngOnInit(): void {
    }

    createDragon(): void {
        console.log(this.newDragon);
        this.service.create(this.newDragon).subscribe(() => {
            this.service.message('Dragon was created!');
            this.router.navigate([""]);
        }), (erro: any) => {
            this.service.message("Error when creating the dragon");
            this.router.navigate([""]);
        };
    }

    cancel(): void {
        this.router.navigate([""]);
    }
}
