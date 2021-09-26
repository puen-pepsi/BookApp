import { animate, style, transition, trigger, useAnimation } from "@angular/animations";

export let slideY = trigger('slidey', [
    transition(':enter', [
      style({ transform: 'translateY(-100%)' }),
      animate(800)
    ]),
  
    transition(':leave', 
      animate(800,style({transform: 'translateY(-100%)'}))
    )
  ]);
  export let slideX = trigger('slidex', [
    transition(':enter', [
      style({ transform: 'translateX(+50px)' }),
      animate(500)
    ]),
  
    transition(':leave', 
      animate(500,style({transform: 'translateX(+100%)'}))
    )
  ]);