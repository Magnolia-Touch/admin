import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountsDetailComponent } from './components/accounts-detail/accounts-detail.component';
import { MemorialsComponent } from './components/memorials/memorials.component';
import { MemorialDetailComponent } from './components/memorial-detail/memorial-detail.component';
import { FlowerComponent } from './components/flower/flower.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'accounts', component: AccountsComponent },
            { path: 'account/:id', component: AccountsDetailComponent },
            { path: 'memorials', component: MemorialsComponent },
            { path: 'memorial/:id', component: MemorialDetailComponent },
            { path: 'flowers', component: FlowerComponent },
            { path: 'profile', component: ProfileComponent }
        ]
    }
];
