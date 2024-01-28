## Youtube

- `https://www.youtube.com/watch?v=KGnSJ7mZc8k`

## Librerias

### Firebase

- Se crea un proyecto en firebase y se copia las propiedades y se pegan en `environments`
- `npm i @angular/fire firebase`
- Importamos en app.module.ts `import { AngularFireModule } from '@angular/fire/compat';`
- imports: `[AngularFireModule.initializeApp(environment.firebaseConfig)]`
  Nota: Lo importamos para conectarnos con la database en firebase,
  es decir, accedemos a la key que nos da firebase
