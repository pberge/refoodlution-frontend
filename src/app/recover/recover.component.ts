import { inject } from '@angular/core/testing';
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) { }

  email = '';
  isLoading = false;
  result = { message: '', status: 'hidden' };
  faCheck = faCheck;
  faCross = faTimesCircle;
  hash = '';
  password = '';
  inputError = false;

  ngOnInit(): void {
    this.route.url.subscribe(params => {
      if (params[1] !== undefined && params[1].path !== undefined) {
        this.hash = params[1].path;
      }
    });
  }

  onVolverClick() {
    this.router.navigate(['login']);
  }

  onEnviarClick() {
    if (this.email.length > 8) {
      this.isLoading = true;
      this.authService.sendRecover(this.email).subscribe(result => {
        this.result.message = '¡Correo enviado! Consulte su bandeja de entrada.';
        this.result.status = 'success';
        this.isLoading = false;
      },
        error => {
          if (error.error.message === 'inexistant_user') {
            this.result.message = 'No hay ningún usuario asociado a este correo.';
          } else {
            this.result.message = 'Ha habido un error al enviar el correo.<br>Pruébelo de nuevo más tarde o contacte con nostoros en <a href="mailto:clientes@refoodlution.com">clientes@refoodlution.com</a>.';
          }

          this.result.status = 'danger';
          this.isLoading = false;
        }
      );
    } else {
      this.inputError = true;
    }
  }

  onPasswordClick() {
    if (this.password.length > 7) {
      this.isLoading = true;
      this.authService.updateRecover(this.hash, this.password).subscribe(result => {
        this.result.message = 'Contraseña actualizada correctamente.';
        this.result.status = 'success';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['login']), 2000);

      }, error => {
        this.result.message = 'No se ha podido reestablecer la contraseña.<br> Si ha pasado más de 1h desde que se pidió el cambio, hay que repetir el proceso.<br>Si el problema persiste escríbenos a <a href="mailto:clientes@refoodlution.com">clientes@refoodlution.com</a>.';
        this.result.status = 'danger';
        this.isLoading = false;
      });
    } else {
      this.inputError = true;
      this.result.message = 'La contraseña debe contener por lo menos 8 caracteres.';
      this.result.status = 'danger';
    }
  }
}
