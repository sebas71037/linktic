import { Component } from '@angular/core';
import { SocketService } from './services/socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-app';

  mode: string = 'dark';

  constructor(
    private socketService: SocketService
  ) {}

  async onActivate(event: any) {
    this.socketService.init();
  }

  public changeModeColor(): void {
    this.mode = this.mode == 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-bs-theme', this.mode);
  }
}
