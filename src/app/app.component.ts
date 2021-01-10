import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
const closeL = style({
  transform: 'rotateY(-90deg)'
});
const closeR = style({
  transform: 'rotateY(90deg)'
});
const open = style({
  transform: 'rotateY(0deg)'
});
const duration = 0.35;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('swap', [
      state('open', open),
      state('closeR', closeR),
      state('closeL', closeL),
      transition('open => closeR', [animate(`${duration / 2}s`)]),
      transition('open => closeL', [animate(`${duration / 2}s`)]),
      transition('closeR => open', [
        // animate('0s',  keyvisible),
        animate(`${duration}s`, keyframes([
          closeR,
          closeR,
          open,
        ]))
      ]),
      transition('closeL => open', [
        // animate('0s', key visible),
        animate(`${duration}s`, keyframes([
          closeL,
          closeL,
          open
        ]))
      ])
    ]),
    trigger('coverage', [
      state('dark', style({
        opacity: 0.8
      })),
      state('light', style({
        opacity: 0.1
      })),
      transition('* => *', [
        animate(duration + 's')
      ])
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewInit {

  swap = [undefined, false, false, false];
  nextSwap: number = 0;

  @ViewChildren('stage', { read: ElementRef })
  stage: QueryList<ElementRef<HTMLElement>> | undefined;

  menus = [
    ['Aktuelles', 'Wer sind Wir', 'Leitbild', 'Geschichte', 'Was wir Glauben', 'Anfahrt', 'Youtube', 'Facebook'],
    ['Gottesdienst', 'Jugend', 'Studenten', 'Hauskreis', 'Bibelkreis', 'Pfadfinder', 'Senioren', 'Bibeltelefon'],
  ]

  events = [
    {
      title: 'Hauskreis',
      date: 'Mo. 11.01.2021 18:30 - 20:00'
    },
    {
      title: 'Studentischer Hauskreis',
      date: 'Mi. 13.01.2021 18:30 - 20:00'
    },
    {
      title: 'Kurzgottesdienst',
      date: 'Sa. 16.01.2021 09:30 - 10:30'
    },
  ]

  ngOnInit(): void {
  }

  next() {
    if (this.nextSwap > 0) {
      this.swap[this.nextSwap] = true;
    } else {
      this.nextSwap = 0;
    }
  }

  mouseEnter(n: number) {
    if (this.swap[1] || this.swap[2] || this.swap[3] || this.nextSwap === -1) {
      this.nextSwap = n;
      // this.swap = 0;
      return
    }
    this.swap[n] = true;
  }

  mouseLeave(n: number) {
    this.swap[n] = false;
    this.nextSwap = -1;
  }

  ngAfterViewInit(): void {
    if (!this.stage) {
      return;
    }
    this.stage.forEach(x => {
      x.nativeElement.style.perspective = x.nativeElement.clientWidth + 'px';
    });
    // if (!this.editor) {
    //   console.log('editor ViewChild undefined!');
    //   return;
    // }
    // const editor = monaco.editor.create(this.editor.nativeElement, {
    //   value: "{\n}",
    //   language: "javascript",

    //   lineNumbers: "on",
    //   roundedSelection: false,
    //   scrollBeyondLastLine: true,
    //   readOnly: false,
    //   theme: "vs-dark",
    // });

  }

}
