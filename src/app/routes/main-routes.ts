import { CartComponent } from "../screens/cart/cart.component";
import { LoginComponent } from "../screens/login/login.component";
import { MainComponent } from "../screens/main/main.component";
import { OrderDetailComponent } from "../screens/order-detail/order-detail.component";
import { RegisterComponent } from "../screens/register/register.component";
import { UserGuard } from "../services/user-guard";

export const mainRoutes = [
    { 
        path: '', 
        component: MainComponent,
        pathMatch: 'full'
      },
      {
        path: 'login',
        component : LoginComponent
      },
      {
        path: 'register',
        component : RegisterComponent
      },
      {
        path: 'cart',
        component : CartComponent,
        canActivate : [UserGuard],
      },
      {
        path: 'order-detail',
        component : OrderDetailComponent
      }
]