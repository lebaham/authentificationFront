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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserDetailResolverService } from './user-resolver/user-detail-resolver.service';

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
        component: EditUserComponent,
        canActivate: [AuthGuard],
        resolve: {
            user: UserDetailResolverService
          }
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
