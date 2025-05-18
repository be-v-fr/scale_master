# Scalion

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.1.
Scalion displays musical scales on the fretboard of a string instrument.
By default, it contains a database of both scales (with corresponding modes) and instruments (with corresponding tunings).
But scales and tunings are entirely customizable as well, including local saving and loading of custom content,
and automatic search algorithms to check if identical or similar content already exists in the database.
Any given scale/fretboard configuration can be exported as a PNG or TXT file.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
The product owner's address information has not been uploaded to this repository, which may lead to errors. To run the server, you need to create a `secrets.ts`
file in the project base folder containing code with the following structure:

```
import { Address } from "./src/interfaces/address";

export const LEGAL: { address: Address } = {
    address: {
        name: 'myName',
        street: 'myStreet',
        city: 'myCity',
        country: 'myCountry',
        contact: {
            phone: 'myPhone',
            email: {
                name: 'myEmailName',
                provider: 'myEmailProvider'
            }
        }
    },
};
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Build documentation

Run `npm run compodoc:build` to build the documentation.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
