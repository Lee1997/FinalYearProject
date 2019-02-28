import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion/accordion';
import { NavigationBarComponent } from './navigationBar/navigationBar';
@NgModule({
	declarations: [[AccordionComponent], [NavigationBarComponent]],
	imports: [],
	exports: [[AccordionComponent], [NavigationBarComponent]]
})
export class ComponentsModule {}
