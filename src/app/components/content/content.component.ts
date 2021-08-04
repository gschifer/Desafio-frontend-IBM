import { UiService } from './../../services/ui.service';
import { DragonService } from './../../services/dragon.service';
import { Dragon } from './../../models/dragon';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

    dragons: Dragon[] = [];
    isLoading = true;
    private awaitingChangesOnTheLoadingState: Subscription | undefined;


    constructor(
        private service: DragonService,
        private uiService: UiService) { }

    ngOnInit(): void {
        this.awaitingChangesOnTheLoadingState = this.uiService.loadingStateChanged.subscribe(
            isLoading => (this.isLoading = isLoading)
        );
        this.getAll();
    }

    getAll(): void {
        this.service.getAll().subscribe((response) => {
            this.dragons = response;
            console.log(this.isLoading);
            this.uiService.loadingStateChanged.next(false);
        }, error => {
            this.service.errorMessage("Error when fetching dragons, please try again later.")
        })
    }

    delete(id: any): void {
        this.service.delete(id).subscribe((response) => {
            this.service.message("Dragon deleted.");
            this.dragons = this.dragons.filter(dragon => dragon.id !== id);
        })
    }

    ngOnDestroy(): void {
        if (this.awaitingChangesOnTheLoadingState) {
            this.awaitingChangesOnTheLoadingState?.unsubscribe();
        }
    }

}
