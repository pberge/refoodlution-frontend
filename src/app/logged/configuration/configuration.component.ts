import { UserService } from './../../services/user.service';
import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestaurantService } from './../../services/restaurant.service';
import { faUpload, faSave, faTimesCircle, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './../../services/auth.service';
import { MenuService } from './../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/classes/restaurant';
import * as c from './../../../assets/countries.json'

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(private menuService: MenuService, private authService: AuthService, private restaurantService: RestaurantService,
    private translocoService: TranslocoService, private router: Router, private userService: UserService) { }

  restName = '';
  oldPwd = '';
  newPwd = '';
  img: any;
  restId = 0;
  faUpload = faUpload;
  faSave = faSave;
  faCheck = faCheck;
  faCross = faTimesCircle;
  faTrash = faTrash;

  imageUploading = false;

  isSaving = false;
  restSubmited = false;
  isSuccess = false;
  isDeleting = false;

  deleteModal = false;

  result = { message: '', status: 'hidden' };

  selectedFile: File;

  restaurantForm: FormGroup;
  restaurant: Restaurant = new Restaurant();
  restaurants = [];
  paymentDataAlert = false;
  paymentDataDays = '0'

  paymentDataAlertTitle = "config.alertTitle"
  paymentDataAlertDescription = "config.alertDescription1"

  countries: any = c.countries

  ngOnInit() {
    this.paymentDataAlert =  sessionStorage.getItem('PaymentDataAlert') == '1'
    this.paymentDataDays =  sessionStorage.getItem('PaymentDataDays')

    if(parseInt(this.paymentDataDays) > 14) {
      this.paymentDataAlertDescription = "config.paymentDataAlertDescriptionMas14"
    }

    this.restaurantForm = new FormGroup({
      name: new FormControl(this.restaurant.name, [
        Validators.required
      ]),
      address: new FormControl(this.restaurant.address, [
        Validators.required
      ]),
      city: new FormControl(this.restaurant.city, [
        Validators.required
      ]),
      zipCode: new FormControl(this.restaurant.zipCode, [
        Validators.required
      ]),
      country: new FormControl(this.restaurant.country, [
        Validators.required
      ]),
      phone: new FormControl(this.restaurant.phone),
      type: new FormControl(this.restaurant.type, [
        Validators.required
      ]),
      companyName: new FormControl(this.restaurant.companyName),
      nif: new FormControl(this.restaurant.nif),
      companyAddress: new FormControl(this.restaurant.companyAddress)
    });

    this.restaurantService.getRestaurant().subscribe(restaurant => {
      this.restaurant = restaurant;

      if(!this.restaurant.paymentType) this.restaurant.paymentType = 0

      this.restaurantForm.patchValue(this.restaurant);
      this.downloadHeader();
    });

    // recuperem el total de rest. Si > 1 mostrarem el boto d'eliminar.
    this.restaurantService.getRestaurants().subscribe(rest => this.restaurants = rest);

  }

  get name() { return this.restaurantForm.get('name'); }
  get address() { return this.restaurantForm.get('address'); }
  get city() { return this.restaurantForm.get('city'); }
  get zipCode() { return this.restaurantForm.get('zipCode'); }
  get country() { return this.restaurantForm.get('country'); }
  get phone() { return this.restaurantForm.get('phone'); }
  get type() { return this.restaurantForm.get('type'); }
  get companyName() { return this.restaurantForm.get('companyName'); }
  get nif() { return this.restaurantForm.get('nif'); }
  get companyAddress() { return this.restaurantForm.get('companyAddress'); }

  getHeader() {
    if (this.img !== undefined) {
      return this.img;
    }
  }

  downloadHeader() {
    this.menuService.menuHeader(this.restaurant.id).subscribe(result => {
      this.createImageFromBlob(result);
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.img = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onSaveClick() {
    this.restSubmited = true;
    if (this.restaurantForm.valid) {
      this.isSaving = true;
      this.restaurantService.updateRestaurant(this.restaurantForm.value).subscribe(result => {
        this.isSaving = false;
        this.restaurant.name = this.restaurantForm.get('name').value;
        this.restaurantService.emitChange(this.restaurant);
        this.result.message = this.translocoService.translate('result.saved');
        this.result.status = 'success';
        setTimeout(() => this.result.status = 'hidden', 2000);
      },
        error => {
          this.isSaving = false;
          this.result.message = this.translocoService.translate('error.unsaved');
          this.result.status = 'danger';
        });
      // this.restaurantService.updatePassword(this.oldPwd, this.newPwd).subscribe(() => this.isSaving = false);
    } else {
      this.result.message = this.translocoService.translate('error.requiredFields');
      this.result.status = 'danger';
    }
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.imageUploading = true;
    this.restaurantService.uploadHeader(this.selectedFile).subscribe(() => {
      this.downloadHeader();
      this.imageUploading = false;
      this.result.message = this.translocoService.translate('result.imageUploaded');
      this.result.status = 'success';
      setTimeout(() => this.result.status = 'hidden', 2000);
    },
      (error) => {
        this.imageUploading = false;
        this.result.message = this.translocoService.translate('error.imageSize');
        this.result.status = 'danger';
        setTimeout(() => this.result.status = 'hidden', 2000);
      });
  }

  onDeleteHeader() {
    this.restaurantService.deleteHeaderImage().subscribe((result) => {
      this.downloadHeader();
      this.result.message = this.translocoService.translate('result.imageReseted');
      this.result.status = 'success';
      setTimeout(() => this.result.status = 'hidden', 2000);
    },
      (error) => {
        this.result.message = this.translocoService.translate('error.imageReset');
        this.result.status = 'danger';
        setTimeout(() => this.result.status = 'hidden', 2000);
      }
    );
  }

  onDeleteConfirm() {
    this.isDeleting = true;
    this.restaurantService.deleteRestaurant(this.authService.getIdRestaurant()).subscribe((result) => {
      if (result.token !== undefined) {
        this.authService.updateToken(result.token);
      }

      this.result.message = this.translocoService.translate('result.restDeleted');
      this.result.status = 'success';
      this.isDeleting = false;
      this.deleteModal = false;
      this.restaurantService.emitChange(result.restaurant);
      setTimeout(() => this.router.navigate(['dashboard']), 2000);
    }, (error) => {
      this.result.message = this.translocoService.translate('error.restDelete');
      this.result.status = 'danger';
    });
  }

  onDeleteRestaurantClick() {
    this.deleteModal = true;
  }

  onLangUpdate(lang) {
    this.userService.setUserLang(lang).subscribe();
  }


  isSubscriptionActive() {
    if (this.restaurant.subscriptionEnd === 0) {
      return 2;
    } else {
      return this.restaurant.subscriptionEnd > (Date.now() / 1000);
    }
  }

  getSubscriptionText() {
    switch (this.isSubscriptionActive()){
      case false:
        return this.translocoService.translate('general.inactive');
      case true:
        return this.translocoService.translate('general.active');
      case 2:
        return this.translocoService.translate('general.pending');
    }
  }

  onManageSubscriptionClick() {
    console.log("RESTAURANT", this.restaurant)
    if (this.restaurant.paymentType === 0) {
      this.router.navigate(['configuration/subscription']);
    } else {
      this.router.navigate(['configuration/submanage']);
    }
  }

}
