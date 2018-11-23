import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PmComponent } from './pm/pm.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { EditUserComponent } from './edit-user/edit-user/edit-user.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'home',
        canActivate: [AuthGuard],
        component: HomeComponent,
    },
    {
        path: 'user',
        canActivate: [AuthGuard],
        component: UserComponent
    },
    {
        path: 'pm',
        canActivate: [AuthGuard],
        component: PmComponent,
    },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        component: AdminComponent
    },
    {
        path: 'signup',
        canDeactivate: [CanDeactivateGuard],
        component: RegisterComponent
    },
    {
        path: 'edit-user/:id',
        canActivate: [AuthGuard],
        component: EditUserComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
