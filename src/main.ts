import 'prosemirror-view/style/prosemirror.css'

import { DOMParser } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'


const view = new EditorView(document.querySelector('#editor'), {
  state: EditorState.create({
    doc: DOMParser.fromSchema(schema).parse(
      document.querySelector('#content')!,
    ),
    plugins: [
      new Plugin({
        props: {
          markViews: {
            code: () => {
              const dom = document.createElement('span')
              dom.style.border = '1px solid blue'
              dom.style.padding = '5px';
              dom.style.margin = '5px';

              const contentDOM = document.createElement('span')
              contentDOM.style.display = 'none';

              dom.append(contentDOM)

              return {dom, contentDOM}
            }
          }
        }
      })
    ],
  }),
})

window.view = view

declare global {
  interface Window {
    view?: EditorView
  }
}
