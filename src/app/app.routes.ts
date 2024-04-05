import { Routes } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: "",
        component: LayoutsComponent,
        //canActivateChild: [()=> inject(AuthService).isAuthenticated()],
        children: [
            {
                path: "",
                component: HomeComponent
            },
            {
                path: "category",
                component: CategoryComponent
            }
        ]
    },
    {
        path:"login",
        component:LoginComponent
    }
];
