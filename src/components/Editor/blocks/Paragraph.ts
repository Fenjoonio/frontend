import EditorJSParagraph from "@editorjs/paragraph";

export default class Paragraph extends EditorJSParagraph {
  render() {
    const block = super.render();

    block.style.fontSize = "18px";
    block.style.lineHeight = "1.6";

    return block;
  }
}
