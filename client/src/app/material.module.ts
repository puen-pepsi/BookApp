import { NgModule } from "@angular/core";
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    imports: [MatSliderModule,
        MatSnackBarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule
    ],
    exports: [MatSliderModule,
        MatSnackBarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule
    ]
})
export class MaterialModule { }