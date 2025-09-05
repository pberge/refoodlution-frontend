import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from './../services/auth.service';
import { pwdMatchValidator } from './../validators/pwdMatch.validator';
import { Restaurant } from './../classes/restaurant';
import { User } from './../classes/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import * as c from './../../assets/countries.json'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, private translocoService: TranslocoService) { }
  user: User = new User();
  restaurant: Restaurant = new Restaurant();

  restSubmited = false;
  isLoading = false;

  promoStatus = 'hidden';
  promoMessage = '';

  errorMessage = '';

  registerForm: FormGroup;

  restaurantForm: FormGroup;

  hash = '';

  pas =  1;

  countries: any = c.countries
  
  ngOnInit() {
    this.pas = 1;

    console.log("PAISOS", this.countries)
    

    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      pwdConfirm: new FormControl('', Validators.required )
      // pwdConfirm: new FormControl('', Validators.required )
    }, { validators:  pwdMatchValidator });

    this.restaurantForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      address: new FormControl('', [
        Validators.required
      ]),
      city: new FormControl('', [
        Validators.required
      ]),
      zipCode: new FormControl('', [
        Validators.required
      ]),
      country: new FormControl('', [
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.required
      ]),
      type: new FormControl(null, [
        Validators.required
      ]),
      promo: new FormControl(''),
      company: new FormControl('', [
        Validators.required
      ]),
      companyId: new FormControl('', [
        Validators.required
      ]),
      companyAddress: new FormControl('', [
        Validators.required
      ]),
      subscriptionPlan: new FormControl(null, [
        Validators.required
      ]),
    });

    this.route.url.subscribe(params => {
      if (params[1] !== undefined && params[1].path !== undefined) {
        this.hash = params[1].path;
        //this.authService.saveConfirmationHash(this.hash).subscribe(params => {
          this.router.navigate(['dashboard']);
        //})
      }
    });
  }

  // Getters User
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get pwdConfirm() { return this.registerForm.get('pwdConfirm'); }

  // Getters Restautant
  get name() { return this.restaurantForm.get('name'); }
  get address() { return this.restaurantForm.get('address'); }
  get city() { return this.restaurantForm.get('city'); }
  get zipCode() { return this.restaurantForm.get('zipCode'); }
  get country() { return this.restaurantForm.get('country'); }
  get phone() { return this.restaurantForm.get('phone'); }
  get type() { return this.restaurantForm.get('type'); }
  get promo() { return this.restaurantForm.get('promo'); }
  get company() { return this.restaurantForm.get('company'); }
  get companyId() { return this.restaurantForm.get('companyId'); }
  get companyAddress() { return this.restaurantForm.get('companyAddress'); }
  get susbcriptionPlan() { return this.restaurantForm.get('susbcriptionPlan'); }

  onNextClick() {

    switch (this.pas) {
      case 3:
        // Anar al dashboard
        this.router.navigate(['dashboard']);
        break;

      case 2:
        // Registrar i si ok, pas++
        this.validateForm(this.restaurantForm);
        this.restSubmited = true;
        if (this.restaurantForm.valid) {
          this.isLoading = true;
          this.authService.register(this.registerForm.value, this.restaurantForm.value).subscribe( result => {
              this.authService.updateToken(result.token);
              this.errorMessage = '';
              this.pas++;
              this.isLoading = false;

              //ENVIAR MAIL CONFIRMACIÓ I ALTA CLIENT
              this.authService.sendNewRegisterEmail(this.registerForm.get('email').value, this.restaurantForm.get('name').value).subscribe(result =>{
                //Enviar email
                this.authService.sendConfirmationEmail(this.registerForm.get('email').value).subscribe(result =>{
                  console.log("result", result)
                  
                }, error => {
                  console.log("Error", error)
                  this.isLoading = false;
                  this.errorMessage = this.translocoService.translate('error.userCreation');
                })
              }, error => {
                console.log("Error", error)
                this.isLoading = false;
                this.errorMessage = this.translocoService.translate('error.userCreation');
              })
            },
            error => {
              // Missatge error
              this.isLoading = false;
              this.errorMessage = this.translocoService.translate('error.userCreation');
            }
          );
        }
        break;

      case 1:
        // Ho marquem tot com a tocat per fer la validació.
        this.validateForm(this.registerForm);
        if (this.registerForm.valid) {
          this.authService.userExists(this.registerForm.value.email).subscribe((result) => {
            if (result['status'] === 'ok') {
              this.errorMessage = '';
              this.pas++;
            } else {
              this.errorMessage = this.translocoService.translate('error.userExists');
            }
          });
        }
        break;

      default:
        this.pas++;
    }
  }

  onPreviousClick() {
    if (this.pas > 1) {
      this.pas--;
    } else {
      this.router.navigate(['login']);
    }
  }

  validateForm(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  onPromoBlur() {
    if (this.promo.value.length > 0) {
      this.authService.promoActive(this.promo.value).subscribe((result) => {
        if (result.status === 'ko') {
          this.promoMessage = this.translocoService.translate('login.koPromo');
          this.promoStatus = 'danger';
        } else {
          this.promoStatus = 'success';
          this.promoMessage = this.translocoService.translate('login.okPromo');
        }
      })
    } else {
      this.promoStatus = 'hidden';
    }
  }
}
