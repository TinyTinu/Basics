Step 1: Install the required libraries:
ng add @angular/material
npm install ngx-sharebuttons ngx-clipboard

Step 2: Import the necessary modules in your Angular module:
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from 'ngx-clipboard';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    ClipboardModule,
    ShareButtonsModule,
    ShareIconsModule
  ],
  declarations: [AppComponent, ShareDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}


Step 3: Create a ShareDialogComponent to display the link preview and sharing options. Run the following command to generate the component:

ng generate component share-dialog

Update the template file (share-dialog.component.html) with the following code:


<h2 mat-dialog-title>Share Link Preview</h2>
<mat-dialog-content>
  <h3>{{ linkPreview.title }}</h3>
  <p>{{ linkPreview.description }}</p>
  <img [src]="linkPreview.image" alt="Link Preview" />
  <p>{{ linkPreview.url }}</p>
</mat-dialog-content>
<mat-dialog-actions align="end">
  <share-buttons [url]="linkPreview.url" [title]="linkPreview.title" [description]="linkPreview.description">
    <share-button class="share-button" icon="facebook"></share-button>
    <share-button class="share-button" icon="twitter"></share-button>
  </share-buttons>
  <button mat-button [ngxClipboard]="linkPreview.url" (click)="copyLink()">Copy Link</button>
  <button mat-button (click)="closeDialog()">Close</button>
</mat-dialog-actions>

Update the component class (share-dialog.component.ts) with the following code:

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})
export class ShareDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public linkPreview: any,
    private clipboardService: ClipboardService
  ) {}

  copyLink(): void {
    this.clipboardService.copyFromContent(this.linkPreview.url);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}



Step 4: In your main component, open the share dialog and pass the link preview data. Update the template file (app.component.html) with the following code:
<button mat-button (click)="openShareDialog()">
  Open Share Dialog
</button>


Update the component class (app.component.ts) with the following code

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  linkPreview = {
    title: 'My Link Preview',
    description: 'Check out this link preview!',
    image: 'https://example.com/image.jpg',
    url: 'https://example.com'
  };

  constructor(public dialog: MatDialog) {}

  openShareDialog(): void {
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: '400px',
      data: this.linkPreview
    });
  }
}

Step 5: Add CSS styles for the link preview and copy button. Update the CSS file (share-dialog.component.css) with the following code:
:host {
  display: block;
  width: 100%;
  padding: 24px;
}

img {
  max-width: 100%;
}

mat-dialog-actions {
  justify-content: flex-end;
  margin-top: 16px;
}

.share-button {
  margin-right: 8px;
}




Step 6: Run your Angular application, and when you click the "Open Share Dialog" button, the dialog box with the link preview, social sharing buttons, and copy button will appear. Clicking the social sharing buttons will allow you to share the link on respective platforms, and clicking the "Copy Link" button will copy the link URL to the clipboard.

Please note that you may need to customize the link preview data, sharing buttons, and styles according to your requirements.

Remember to import and configure the necessary modules in your Angular application to use Angular Material, Clipboard API, and ngx-sharebuttons effectively.



