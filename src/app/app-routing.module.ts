import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPetComponent } from './components/add-pet/add-pet.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PetListComponent } from './components/pet-list/pet-list.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '',          component: LoginComponent},
  { path: 'register',  component: RegisterComponent},
  { path: 'add-pet',   component: AddPetComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'pet-lists', component: PetListComponent},
  { path: 'cart',      component: CartComponent},
  { path: 'checkout',  component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
