import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { EmailService } from '../email.service';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule for ngModel

@Component({
  selector: 'app-contact-me',
  standalone: true,
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.css',
  imports: [CommonModule, FormsModule], // ✅ Add required modules here
})
export class ContactMeComponent {
  fname: string = '';
  lname: string = '';
  email: string = '';
  message: string = '';

  toastMessage: string = '';
  toastClass: string = '';
  toastTitle: string = '';

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private emailService: EmailService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onSubmit() {
    if (!this.fname || !this.lname || !this.email || !this.message) {
      this.showToast('Please fill in all fields!', 'bg-warning', 'Warning');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.showToast('Please enter a valid email address!', 'bg-danger', 'Invalid Email');
      return;
    }

    const emailData = {
      name: `${this.fname} ${this.lname}`,
      email: this.email,
      message: this.message
    };

    this.emailService.sendEmail(emailData).subscribe(
      (response) => {
        console.log('Email sent successfully!', response);
        this.showToast('Email sent successfully!', 'bg-success', 'Success');
        this.resetForm();
      },
      (error) => {
        console.log('Error sending email:', error);
        this.showToast('Failed to send email!', 'bg-danger', 'Error');
      }
    );
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showToast(message: string, bgClass: string, title: string) {
    if (!this.isBrowser) return;

    this.toastMessage = message;
    this.toastClass = `toast align-items-center text-white ${bgClass} border-0`;
    this.toastTitle = title;

    setTimeout(() => {
      this.toastMessage = '';
    }, 4000);
  }

  resetForm() {
    this.fname = '';
    this.lname = '';
    this.email = '';
    this.message = '';
  }
}
