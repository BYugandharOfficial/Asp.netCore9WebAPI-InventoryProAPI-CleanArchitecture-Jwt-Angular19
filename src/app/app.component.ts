import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule] ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InventoryPro';
  
}
