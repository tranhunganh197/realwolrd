import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'realworld';
  hideBtn: boolean = false;
  @HostListener('window:scroll', [])
  onScroll(): void {
    // if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //   console.log('2');
    // } else if (
    //   window.innerHeight + window.scrollY <
    //   document.body.offsetHeight
    // ) {
    //   console.log('1');
    // }
    if (window.innerHeight > window.scrollY) {
      this.hideBtn = false;
    } else {
      this.hideBtn = true;
    }
  }

  handleScroll() {
    window.scrollTo(0, 0);
  }
}
