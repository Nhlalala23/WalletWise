import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Footer } from "../footer/footer";
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [MatCardModule,
    MatIconModule,
     Footer,
    MatButtonModule,
  RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

}
