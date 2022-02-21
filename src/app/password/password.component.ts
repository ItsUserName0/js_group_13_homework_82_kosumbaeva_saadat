import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { addChar, enter, removeChar } from '../shared/password.action';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.sass']
})
export class PasswordComponent implements OnInit, OnDestroy {
  chars = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '<', '0', 'E'];
  state!: Observable<{ isCorrect: boolean, password: string }>;
  stateChangeSubscription!: Subscription;
  currentState!: { isCorrect: boolean, password: string };
  enterIsClicked = false;

  constructor(private store: Store<{ password: { isCorrect: boolean, password: string } }>) {
    this.state = store.select('password');
  }

  ngOnInit(): void {
    this.stateChangeSubscription = this.state.subscribe(state => {
      this.currentState = state;
    });
  }

  getContent() {
    if (this.currentState.password) {
      let password = '';
      for (let i = 0; i < this.currentState.password.length; i++) {
        password += '*';
      }
      return password;
    } else if (this.enterIsClicked) {
      if (!this.currentState.isCorrect) {
        return 'Access Denied!';
      } else {
        return 'Access Granted!';
      }
    } else {
      return '';
    }
  }

  getClass() {
    if (!this.enterIsClicked) return {};
    else {
      if (this.currentState.isCorrect) {
        return {'green': true};
      } else {
        return {'red': true};
      }
    }
  }

  onKeyClick(char: string) {
    if (char === '<') {
      this.store.dispatch(removeChar());
    } else if (char === 'E') {
      this.enterIsClicked = true;
      this.store.dispatch(enter());
    } else {
      this.enterIsClicked = false;
      this.store.dispatch((addChar({char: char})));
    }
  }

  ngOnDestroy(): void {
    this.stateChangeSubscription.unsubscribe();
  }
}
