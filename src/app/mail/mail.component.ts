import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent {

  to: string;
  subject: string;
  message: string;

  constructor(private http: HttpClient) { }

  sendEmail() {
    const emailData = {
      subject: this.subject,
      text: this.message
    };

    const emailEndpoint = `http://localhost:9090/mail/send/${this.to}`;

    this.http.post<any>(emailEndpoint, emailData)
      .subscribe(() => {
        alert('Failed to send mail ');
      }, error => {
        console.error(error);
        alert('Mail sent successfully!');
      });
  }

}
