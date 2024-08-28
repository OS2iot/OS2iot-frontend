import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [AuthComponent],
    imports: [CommonModule, FormsModule, SharedModule],
})
export class AuthModule {}
