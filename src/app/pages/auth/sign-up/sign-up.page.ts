import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSVc: UtilsService
  ) {}

  ngOnInit() {
    this.confirmPasswordValidator();
  }

  confirmPasswordValidator() {
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      CustomValidators.matchValues(this.form.controls.password),
    ]);

    this.form.controls.confirmPassword.updateValueAndValidity();
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.utilSVc.presentLoading({ message: 'Registrando...' });
      this.firebaseSvc.signUp(this.form.value as User).then(
        async (res) => {
          await this.firebaseSvc.updateUser({
            displayName: this.form.value.name,
          });

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
