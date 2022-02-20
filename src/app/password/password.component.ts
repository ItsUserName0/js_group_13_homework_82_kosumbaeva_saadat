import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.sass']
})
export class PasswordComponent implements OnInit {
  chars = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '<', '0', 'E'];

  constructor() { }

  ngOnInit(): void {
  }

  onKeyClick(char: string) {
    console.log(char);
  }
}
