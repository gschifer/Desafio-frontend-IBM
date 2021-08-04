import { UiService } from './../../../services/ui.service';
import { Subscription } from 'rxjs';
import { AuthData } from './../../../models/authData';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    hide = true;
    isLoading = false;
    private awaitingChangesOnTheLoadingState: Subscription | undefined;

    authData: AuthData = {
        email: "",
        password: ""
    };

    constructor(
        private authService: AuthService,
        private uiService: UiService) { }

    ngOnInit(): void {
        this.awaitingChangesOnTheLoadingState = this.uiService.loadingStateChanged.subscribe(
            isLoading => (this.isLoading = isLoading)
        );
    }

    registerUser() {
        this.authService.registerUser(this.authData);
    }

    ngOndestroy(): void {
        if (this.awaitingChangesOnTheLoadingState) {
            this.awaitingChangesOnTheLoadingState?.unsubscribe();
        }
    }

}
