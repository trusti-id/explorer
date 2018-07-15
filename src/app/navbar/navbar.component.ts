import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ethRequest: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  processRequest() {
    const request: string = this.ethRequest.split('0x').join('');

    if (request.length === 40) {
      this.router.navigate(['/address', request]);
    } else if (request.length === 64) {
      if (/[0-9a-zA-Z]{64}?/.test(request)) {
        this.router.navigate(['/transaction', '0x' + request]);
      } else if (/[0-9]{1,7}?/.test(request)) {
        this.router.navigate(['/block', request]);
      }
    } else if (parseInt(request, 10) > 0) {
      this.router.navigate(['/block', request]);
    }
    alert('Don\'t know how to handle ' + request);
  }
}
