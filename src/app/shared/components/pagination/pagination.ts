import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  currentPage = input<number>(1);
  pages = input<number>(0);
  getPagesList() {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  }
}
