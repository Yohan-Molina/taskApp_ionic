import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSVc: UtilsService
  ) {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.utilSVc.presentLoading({ message: 'Autenticando...' });
      this.firebaseSvc.login(this.form.value as User).then(
        async (res) => {
          let user: User = {
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
          };

          this.utilSVc.setElementInLocalstorage('user', user);
          this.utilSVc.routerLink('/tabs/home');
          this.utilSVc.dismissLoading();

          this.utilSVc.presentToast({
            message: `Te damos la bienvenida ${user.name}`,
            duration: 1500,
            color: 'primary',
            icon: 'person-outline',
          });

          this.form.reset();
        },
        (error) => {
          this.utilSVc.dismissLoading();
          this.utilSVc.presentToast({
            message: error,
            duration: 1500,
            color: 'warning',
            icon: 'alert-circle-outline',
          });
        }
      );
    }
  }
}
