import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {
  

  constructor(
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    
  }

  goGame() {
    this.router.navigate(['/game'], {
      queryParams: {
        
      }
    });
  }
}