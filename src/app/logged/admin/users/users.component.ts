import { RestaurantService } from '../../../services/restaurant.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { faEnvelope, faCog  } from '@fortawesome/free-solid-svg-icons';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-adminusers',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  restName = '';
  faMail = faEnvelope;
  faCog = faCog;
  users: any[];
  searchText: String;
  usersTable: any[]

  constructor(private authService: AuthService,private userService: UserService, private restaurantService: RestaurantService,
              private translocoService: TranslocoService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      console.log("USERS", users)
      this.users = users
      this.usersTable = users.map(u => {
        u.created_at = this.getDateFormat(new Date(u.created_at)); 
        u.emailConfirmed = u.emailConfirmed == 1 ? "Sí" : "No"
        return u
      });
      console.log(this.usersTable)
    });
  }

  vistaPrevia() {
    const restId = this.authService.getIdRestaurant();
    if ([554,555,556,557,558].includes(restId)) {
      window.open('/selector/' + restId, '_blank');
    } else {
      window.open('/preview/' + restId, '_blank');
    }
  }

  getRestName() {
    return this.restaurantService.get().name;
  }

  showSearchResults() {
    this.usersTable = this.users.filter(u => u.email.includes(this.searchText) || u.id == this.searchText)
  }

  changeUserStatus(user) {
    console.log("CHANGE", user)
    
  }

  getDateFormat(date) {
    var a = new Date(date * 1000);
    //var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = a.getMonth().toString();
    var day = a.getDate().toString();

    if(month.length == 1) month = "0" + month
    if(day.length == 1) day = "0" + day

    return day + "/" + month + "/" + year
  }
}
