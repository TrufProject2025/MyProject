import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, TopBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {}