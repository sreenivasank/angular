import {List} from 'angular2/src/facade/collection';
import {CONST} from 'angular2/src/facade/lang';
import {Locals} from './parser/locals';
import {BindingRecord} from './binding_record';
import {DirectiveRecord} from './directive_record';

/**
 * Interface used by Angular to control the change detection strategy for an application.
 *
 * Angular implements the following change detection strategies by default:
 *
 * - {@link DynamicChangeDetection}: slower, but does not require `eval()`.
 * - {@link JitChangeDetection}: faster, but requires `eval()`.
 *
 * In JavaScript, you should always use `JitChangeDetection`, unless you are in an environment that
 *has
 * [CSP](https://developer.mozilla.org/en-US/docs/Web/Security/CSP), such as a Chrome Extension.
 *
 * In Dart, use `DynamicChangeDetection` during development. The Angular transformer generates an
 *analog to the
 * `JitChangeDetection` strategy at compile time.
 *
 *
 * See: {@link DynamicChangeDetection}, {@link JitChangeDetection},
 * {@link PreGeneratedChangeDetection}
 *
 * # Example
 * ```javascript
 * bootstrap(MyApp, [bind(ChangeDetection).toClass(DynamicChangeDetection)]);
 * ```
 * @exportedAs angular2/change_detection
 */
@CONST()
export class ChangeDetection {
  createProtoChangeDetector(definition: ChangeDetectorDefinition): ProtoChangeDetector {
    return null;
  }
}

export interface ChangeDispatcher {
  notifyOnBinding(bindingRecord: BindingRecord, value: any): void;
  notifyOnAllChangesDone(): void;
}

export interface ChangeDetector {
  parent: ChangeDetector;
  mode: string;

  addChild(cd: ChangeDetector): void;
  addShadowDomChild(cd: ChangeDetector): void;
  removeChild(cd: ChangeDetector): void;
  removeShadowDomChild(cd: ChangeDetector): void;
  remove(): void;
  hydrate(context: any, locals: Locals, directives: any, pipeRegistry: any): void;
  dehydrate(): void;
  markPathToRootAsCheckOnce(): void;

  detectChanges(): void;
  checkNoChanges(): void;
}

export interface ProtoChangeDetector { instantiate(dispatcher: any): ChangeDetector; }

export class ChangeDetectorDefinition {
  constructor(public id: string, public strategy: string, public variableNames: List<string>,
              public bindingRecords: List<BindingRecord>,
              public directiveRecords: List<DirectiveRecord>) {}
}
