import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-google-auth',
  standalone: false,
  templateUrl: './google-auth.component.html',
  styleUrl: './google-auth.component.scss'
})
export class GoogleAuthComponent {
  route = inject(ActivatedRoute)
  router = inject(Router)

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const accessToken = params['access_token'];
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }

      const user = {
        id: +params['user[id]'] || null,
        firstName: params['user[first_name]'] || '',
        lastName: params['user[last_name]'] || '',
        email: params['user[email]'] || '',
        phoneNumber: params['user[phone_number]']?.trim() || '',
      };

      if (user.id && user.email) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      this.router.navigate(['/app']);
    });
  }
}
