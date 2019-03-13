import { Component, ViewChild, OnInit, Renderer, Input } from '@angular/core';

@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent implements OnInit {

  accordionExpanded = false;
  @ViewChild("cc") cardContent: any;
  @Input('title') title: string;
  @Input('startOpen') isOpen: string;

  icon: string = "arrow-forward";

  constructor(public renderer: Renderer) {
  }

  ngOnInit() {
    this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 0, padding 500ms");
    this.toggleAccordion();
    this.toggleAccordion();
    if(this.isOpen == "true"){
      this.toggleAccordion();
    }
  }

  toggleAccordion() {
    if (this.accordionExpanded) {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");

    } else {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "5000px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "13px 16px");
    }

    this.accordionExpanded = !this.accordionExpanded;
    this.icon = this.icon == "arrow-forward" ? "arrow-down" : "arrow-forward";
  }

}
