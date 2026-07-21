import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing',
  imports: [MatCardModule,
    MatIconModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

}
