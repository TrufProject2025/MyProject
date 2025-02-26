import {
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceTsComponent } from '../auth-service.ts/auth-service.ts.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewChecked {
  @ViewChild('container', { static: false }) container!: ElementRef;
  @ViewChild('registerBtn', { static: false }) registerBtn!: ElementRef;
  @ViewChild('loginBtn', { static: false }) loginBtn!: ElementRef;
  @ViewChild('toast', { static: false }) toast!: ElementRef;

  email: string = '';
  password: string = '';
  username: string = '';
  registerEmail: string = '';
  registerPassword: string = '';

  constructor(
    public router: Router,
    private authService: AuthServiceTsComponent
  ) {}

  showToast(message: string, type: string) {
    const toastEl = this.toast.nativeElement;
    toastEl.classList.add(type);
    toastEl.textContent = message;
    toastEl.style.display = 'block';
    setTimeout(() => {
      toastEl.style.display = 'none';
      toastEl.classList.remove(type);
    }, 3000);
  }

  validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  onLogin() {
    if (!this.email || !this.password) {
      this.showToast('Please enter both email and password.', 'error');
      return;
    }
  
    this.authService.signIn(this.email, this.password).subscribe({
      next: (response) => {
        this.showToast('Login successful', 'success');
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.showToast(error.error.message, 'error');
      }
    });
  }
  
  onRegister() {
    if (!this.username || !this.registerEmail || !this.registerPassword) {
      let missingFields = [];
      if (!this.username) missingFields.push('Username');
      if (!this.registerEmail) missingFields.push('Email');
      if (!this.registerPassword) missingFields.push('Password');
      this.showToast(`Please enter: ${missingFields.join(', ')}`, 'error');
      return;
    }
  
    if (!this.validateEmail(this.registerEmail)) {
      this.showToast('Invalid email format.', 'error');
      return;
    }
  
    this.authService.signUp(this.username, this.registerEmail, this.registerPassword).subscribe({
      next: (response) => {
        this.showToast('Registration successful', 'success');
        this.username = '';
        this.registerEmail = '';
        this.registerPassword = '';
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.showToast(error.error.message, 'error');
      }
    });
  }
  

  ngAfterViewChecked() {
    if (this.registerBtn && this.loginBtn) {
      this.registerBtn.nativeElement.removeEventListener(
        'click',
        this.onRegisterClick
      );
      this.loginBtn.nativeElement.removeEventListener(
        'click',
        this.onLoginClick
      );

      this.registerBtn.nativeElement.addEventListener(
        'click',
        this.onRegisterClick
      );
      this.loginBtn.nativeElement.addEventListener('click', this.onLoginClick);
    }
  }

  onRegisterClick = () => {
    this.container.nativeElement.classList.add('active');
  };

  onLoginClick = () => {
    this.container.nativeElement.classList.remove('active');
  };
}
