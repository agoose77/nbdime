// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

'use strict';

import type { Widget } from '@lumino/widgets';

/* import type {
  Widget
} from '@lumino/widgets'; */

import {
  CodeMirrorEditorFactory,
  CodeMirrorEditor,
} from '@jupyterlab/codemirror';

import type { EditorView } from '@codemirror/view';
import type { Text } from '@codemirror/state';
import { YFile } from '@jupyter/ydoc';
export
class EditorWidget extends CodeEditorWrapper {
  /**
   * Store all editor instances for operations that
   * need to loop over all instances.
   */
  /* Commented line : version before proposed changes for JupyterLab 4.0 migration*/
/*constructor(options?: CodeMirrorEditor.IOptions | undefined) {*/
constructor(value?: string, options?: CodeMirrorEditor.IOptions) {
    /*if (options && options.readOnly) {
      // Prevent readonly editor from trapping tabs
      options.extraKeys = {Tab: false, 'Shift-Tab': false};
    }*/
    const sharedModel = new YFile();
    if (value) {
      sharedModel.source = value
    }
    super({
      model: new CodeEditor.Model({sharedModel}),
      factory: function() {
        let factory = new CodeMirrorEditorFactory(/*options*/);
        return factory.newInlineEditor.bind(factory);
      })(),
    });

    this.staticLoaded = false;
    //EditorWidget.editors.push(this.cm);
  }
 //public static editors: EditorView[] = [];

  get cm(): EditorView {
    return (this.editor as CodeMirrorEditor).editor;
  }

  get doc(): Text {
    return (this.editor as CodeMirrorEditor).doc;
  }

    readonly editor: CodeMirrorEditor;


  /**  FIX ME
   * A message handler invoked on an `'resize'` message.
   */
  /* protected onResize(msg: Widget.ResizeMessage): void {
    if (!this.staticLoaded) {
      if (msg.width < 0 || msg.height < 0) {
        this.cm.setSize(null, null);
      } else {
        super.onResize(msg);
      }
      if (this.editor.getOption('readOnly') && document.contains(this.node)) {
        this.staticLoaded = true;
      }
    }
  } */

  staticLoaded: boolean;
}
