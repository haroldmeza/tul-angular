import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './screens/login/login.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './routes/app-routing-module';
import { RegisterComponent } from './screens/register/register.component';
import { MainComponent } from './screens/main/main.component';
import { ngZorro } from './modules/ng-zorro';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { HeaderComponent } from './components/header/header.component';
import { StoreModule } from '@ngrx/store';

import * as firebase from 'firebase';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './store/reducers';
import { LoadingComponent } from './components/loading/loading.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/product.effect';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './screens/cart/cart.component';
import { OrderDetailComponent } from './screens/order-detail/order-detail.component';


registerLocaleData(es);

firebase.default.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    LoginFormComponent,
    RegisterFormComponent,
    HeaderComponent,
    LoadingComponent,
    ProductComponent,
    CartComponent,
    OrderDetailComponent
  ],
  imports: [
    ...ngZorro,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
  bootstrap: [AppComponent]
})
export class AppModule { }
