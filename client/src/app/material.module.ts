import { NgModule } from "@angular/core";
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
@NgModule({
    imports: [MatSliderModule,
        MatSnackBarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatListModule,
        MatInputModule,
        MatButtonToggleModule
    ],
    exports: [MatSliderModule,
        MatSnackBarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatListModule,
        MatInputModule,
        MatButtonToggleModule
    ]
})
export class MaterialModule { }