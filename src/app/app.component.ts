import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BannerComponent } from "./shared/components/banner/banner.component";
import { SearchFormComponent } from "./features/search-form/search-form.component";
import { ToolbarComponent } from "./shared/components/toolbar/toolbar.component";
import { PrimeNGConfig } from 'primeng/api';
import { FlightListComponent } from "./features/flight-list/flight-list.component";

@Component({
  selector: "flg-root",
  standalone: true,
  imports: [CommonModule, ToolbarComponent, BannerComponent, SearchFormComponent, FlightListComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "flight-app";

  constructor(private _config: PrimeNGConfig) {}

  ngOnInit(): void {
    this._config.setTranslation({
      accept: 'Sim',
      reject: 'Não',
      dayNames: [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
      ],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
      monthNamesShort: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
      dateFormat: 'dd/mm/yy'
    });
  }
}
