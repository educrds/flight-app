import { Component } from "@angular/core";
import { BannerComponent } from "../banner/banner.component";
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: "flg-toolbar",
  standalone: true,
  imports: [BannerComponent, ToolbarModule],
  templateUrl: "./toolbar.component.html",
  styleUrl: "./toolbar.component.scss",
})
export class ToolbarComponent {}
