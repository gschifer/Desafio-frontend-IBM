import { UiService } from './../../../services/ui.service';
import { AuthService } from './../../../services/auth.service';
import { AuthData } from './../../../models/authData';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
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

    login() {
        this.authService.login(this.authData);
    }

    ngOnDestroy(): void {
        if (this.awaitingChangesOnTheLoadingState) {
            this.awaitingChangesOnTheLoadingState?.unsubscribe();
        }
    }


}
