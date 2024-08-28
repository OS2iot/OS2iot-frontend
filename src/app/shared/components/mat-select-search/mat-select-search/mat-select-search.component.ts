import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatOption } from "@angular/material/core";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { MatSelect } from "@angular/material/select";

@Component({
  selector: "app-mat-select-search",
  templateUrl: "./mat-select-search.component.html",
  styleUrls: ["./mat-select-search.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatSelectSearchComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Custom search/filter dropdown for select. This is not supported by Angular as of yet.
 *
 * @see https://github.com/angular/components/issues/5697#issuecomment-493628695
 */
export class MatSelectSearchComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  /** Label of the search placeholder */
  @Input() placeholderLabel = "Søg efter ...";

  /** Label to be shown when no entries are found. Set to null if no message should be shown. */
  @Input() noEntriesFoundLabel = "Ingen elementer blev fundet";

  /** Reference to the search input field */
  @ViewChild("searchSelectInput", { static: false, read: ElementRef })
  searchSelectInput: ElementRef<HTMLInputElement>;

  /** Current search value */
  get value(): string {
    return this._value;
  }
  private _value: string;

  onChange: Function = (_: any) => {};
  onTouched: Function = (_: any) => {};

  /** Reference to the MatSelect options */
  public _options: QueryList<MatOption>;

  /** Previously selected values when using <mat-select [multiple]="true">*/
  private previousSelectedValues: any[];

  /** Whether the backdrop class has been set */
  private overlayClassSet = false;

  /** Event that emits when the current value changes */
  private change = new EventEmitter<string>();

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(@Inject(MatSelect) public matSelect: MatSelect, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    // set custom panel class
    const panelClass = "mat-select-search-panel";
    if (this.matSelect.panelClass) {
      if (Array.isArray(this.matSelect.panelClass)) {
        this.matSelect.panelClass.push(panelClass);
      } else if (typeof this.matSelect.panelClass === "string") {
        this.matSelect.panelClass = [this.matSelect.panelClass, panelClass];
      } else if (typeof this.matSelect.panelClass === "object") {
        this.matSelect.panelClass[panelClass] = true;
      }
    } else {
      this.matSelect.panelClass = panelClass;
    }

    // when the select dropdown panel is opened or closed
    this.matSelect.openedChange.pipe(takeUntil(this._onDestroy)).subscribe(opened => {
      if (opened) {
        // focus the search field when opening
        this._focus();
      } else {
        // clear it when closing
        this._reset();
      }
    });

    // set the first item active after the options changed
    this.matSelect.openedChange
      .pipe(take(1))
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this._options = this.matSelect.options;
        this._options.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => {
          const keyManager = this.matSelect._keyManager;
          if (keyManager && this.matSelect.panelOpen) {
            // avoid "expression has been changed" error
            setTimeout(() => {
              keyManager.setFirstItemActive();
            });
          }
        });
      });

    // detect changes when the input changes
    this.change.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });

    this.initMultipleHandling();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngAfterViewInit() {
    this.setOverlayClass();
    this.HACK_setPlaceholder();
  }

  /**
   * Handles the key down event with MatSelect.
   * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
   * @param {KeyboardEvent} event
   * @private
   */
  _handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      // do not propagate spaces to MatSelect, as this would select the currently active option
      event.stopPropagation();
    }
  }

  writeValue(value: string) {
    const valueChanged = value !== this._value;
    if (valueChanged) {
      this._value = value;
      this.change.emit(value);
    }
  }

  onInputChange(value) {
    const valueChanged = value !== this._value;
    if (valueChanged) {
      this._value = value;
      this.onChange(value);
      this.change.emit(value);
    }
  }

  onBlur(value: string) {
    this.writeValue(value);
    this.onTouched();
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  /**
   * Focuses the search input field
   * @private
   */
  public _focus() {
    if (!this.searchSelectInput) {
      return;
    }
    // save and restore scrollTop of panel, since it will be reset by focus()
    // note: this is hacky
    const panel = this.matSelect.panel.nativeElement;
    const scrollTop = panel.scrollTop;

    // focus
    this.searchSelectInput.nativeElement.focus();

    panel.scrollTop = scrollTop;
  }

  /**
   * Resets the current search value
   * @param {boolean} focus whether to focus after resetting
   * @private
   */
  public _reset(focus?: boolean) {
    if (!this.searchSelectInput) {
      return;
    }
    this.searchSelectInput.nativeElement.value = "";
    this.onInputChange("");
    if (focus) {
      this._focus();
    }
  }

  /**
   * Sets the overlay class  to correct offsetY
   * so that the selected option is at the position of the select box when opening
   *
   * @see https://github.com/bithost-gmbh/ngx-mat-select-search/issues/208#issue-563076204
   */
  private setOverlayClass() {
    if (this.overlayClassSet) {
      return;
    }

    const overlayClass = "cdk-overlay-pane-select-search";

    this.matSelect.openedChange.pipe(takeUntil(this._onDestroy)).subscribe((opened: boolean) => {
      if (opened && this.searchSelectInput) {
        // note: this is hacky, but currently there is no better way to do this
        let element: HTMLElement | undefined = this.searchSelectInput.nativeElement?.parentElement;
        let overlayElement: HTMLElement;

        while (element) {
          if (element.classList.contains("cdk-overlay-pane")) {
            overlayElement = element;
            break;
          }
          element = element.parentElement;
        }

        if (overlayElement) {
          overlayElement.classList.add(overlayClass);
        }
      }
    });

    this.overlayClassSet = true;
  }

  /**
   * Depending on the component, placeholder will sometimes be missing or set to empty string.
   * It happens on /edit-permission but not on /multicast-edit
   */
  private HACK_setPlaceholder() {
    const element = this.searchSelectInput?.nativeElement;

    if (element && element.placeholder !== this.placeholderLabel) {
      element.placeholder = this.placeholderLabel;
    }
  }

  /**
   * Initializes handling <mat-select [multiple]="true">
   * Note: to improve this code, mat-select should be extended to allow disabling resetting the selection while filtering.
   */
  private initMultipleHandling() {
    // if <mat-select [multiple]="true">
    // store previously selected values and restore them when they are deselected
    // because the option is not available while we are currently filtering
    this.matSelect.valueChange.pipe(takeUntil(this._onDestroy)).subscribe(values => {
      if (this.matSelect.multiple) {
        let restoreSelectedValues = false;
        if (
          this._value &&
          this._value.length &&
          this.previousSelectedValues &&
          Array.isArray(this.previousSelectedValues)
        ) {
          if (!values || !Array.isArray(values)) {
            values = [];
          }
          const optionValues = this.matSelect.options.map(option => option.value);
          this.previousSelectedValues.forEach(previousValue => {
            if (values.indexOf(previousValue) === -1 && optionValues.indexOf(previousValue) === -1) {
              // if a value that was selected before is deselected and not found in the options, it was deselected
              // due to the filtering, so we restore it.
              values.push(previousValue);
              restoreSelectedValues = true;
            }
          });
        }

        if (restoreSelectedValues) {
          this.matSelect._onChange(values);
        }

        this.previousSelectedValues = values;
      }
    });
  }
}
