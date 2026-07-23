import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-landing',
  imports: [MatCardModule,
    MatIconModule,
     Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

}
