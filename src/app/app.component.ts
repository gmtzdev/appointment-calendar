import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private environmentInjector = inject(EnvironmentInjector);
  private themeService = this.environmentInjector.get(ThemeService);

  title = 'dental-app';

  ngOnInit(): void {
    this.themeService.initTheme();
  }
}
