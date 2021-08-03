import { DragonService } from './../../services/dragon.service';
import { Component, OnInit } from '@angular/core';
import { Dragon } from 'src/app/models/dragon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
    newDragon: Dragon = {
        name: "",
        type: "",
        histories: "",
        createdAt: new Date()
    }
    constructor(
        private service: DragonService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        console.log(this.newDragon)
        this.newDragon.id = this.route.snapshot.paramMap.get("id")!;
        this.getDragonById(this.newDragon.id);
    }


    getDragonById(id: any): void {
        this.service.getById(id).subscribe((response) => {
            this.newDragon = response;
        }), (erro: any) => {
            console.log(erro)
            this.service.message("Error when searching for the dragon");
            this.router.navigate([""]);
        };
    }

    updateDragon(): void {
        console.log(this.newDragon)
        this.service.update(this.newDragon).subscribe((response) => {
            this.service.message('Dragon was updated!');
            this.router.navigate([""]);
        }), (erro: any) => {
            this.service.message("Error when updating the dragon");
            this.router.navigate([""]);
        };
    }

    cancel(): void {
        this.router.navigate([""]);
    }

}
