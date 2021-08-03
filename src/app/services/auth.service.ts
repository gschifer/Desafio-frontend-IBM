import { UiService } from './ui.service';
import { DragonService } from './dragon.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthData } from '../models/authData';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private authGuardService: AuthGuard, 
        private router: Router, 
        private afAuth: AngularFireAuth, 
        private dragonService: DragonService,
        private uiService: UiService) { }


    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uiService.loadingStateChanged.next(false);
                this.dragonService.message("User created succesfully!")
                this.router.navigate(["/login"])
            }).catch(error => {
                this.uiService.loadingStateChanged.next(false);
                this.dragonService.errorMessage(error.message)
            })
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.authGuardService.setAuthenticationToTrue();
                this.dragonService.message("User logged succesfully!")
                this.router.navigate([""])
                this.uiService.loadingStateChanged.next(false);

            }).catch(error => {
                this.uiService.loadingStateChanged.next(false)
                this.dragonService.errorMessage(error.message);
            })
    }

    logout() {
        this.afAuth.signOut();
        this.dragonService.message("You've signout!")
        this.authGuardService.setAuthenticationToFalse();
        this.router.navigate(["/login"])
    }

}
