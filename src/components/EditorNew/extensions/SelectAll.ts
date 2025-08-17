import { Extension } from '@tiptap/core'
import { TextSelection } from '@tiptap/pm/state'

const SelectAll = Extension.create({
  name: "selectAll",

  addKeyboardShortcuts() {
    return {
      "Mod-a": () => {
        const { state, view } = this.editor;
        const { doc } = state;
        const selection = TextSelection.create(doc, 0, doc.content.size);
        const transaction = state.tr.setSelection(selection);
        view.dispatch(transaction);
        return true;
      },
    };
  },
});

export default SelectAll;
