import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { faSave, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { RestaurantService } from './../../services/restaurant.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  constructor(private restaurantService: RestaurantService, private authService: AuthService, private router: Router,
              private translocoService: TranslocoService) { }

  isSaving = false;

  result = { message: '', status: 'hidden' };

  faSave = faSave;
  faCheck = faCheck;
  faCross = faTimesCircle;

  restaurantForm: FormGroup;
  ngOnInit(): void {
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
      phone: new FormControl(''),
      type: new FormControl('', [
        Validators.required
      ])
    });
  }

  get name() { return this.restaurantForm.get('name'); }
  get address() { return this.restaurantForm.get('address'); }
  get city() { return this.restaurantForm.get('city'); }
  get zipCode() { return this.restaurantForm.get('zipCode'); }
  get country() { return this.restaurantForm.get('country'); }
  get phone() { return this.restaurantForm.get('phone'); }
  get type() { return this.restaurantForm.get('type'); }

  onSaveClick() {
    if (this.restaurantForm.valid) {
      this.isSaving = true;
      this.restaurantService.addRestaurant(this.restaurantForm.value).subscribe(result => {
        this.isSaving = false;
        this.result.message = 'Restaurante añadido correctamente';
        this.result.status = 'success';

        this.authService.updateToken(result.token);
        this.restaurantService.emitChange(result.restaurant);

        setTimeout(() => this.router.navigate(['dashboard']), 2000);
      },
        error => {
          this.isSaving = false;
          this.result.message = this.translocoService.translate('error.restCreation');
          this.result.status = 'danger';
        });
      // this.restaurantService.updatePassword(this.oldPwd, this.newPwd).subscribe(() => this.isSaving = false);
    } else {
      this.result.message = this.translocoService.translate('error.requiredFields');
      this.result.status = 'danger';
    }
  }

}
