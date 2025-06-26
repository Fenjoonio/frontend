import EditorJSHeader from "@editorjs/header";

type HeadingTag = "H1" | "H2" | "H3" | "H4" | "H5" | "H6";

export default class Header extends EditorJSHeader {
  private getHeaderFontSize(tag: HeadingTag) {
    const options = {
      H1: "24px",
      H2: "22px",
      H3: "20px",
      H4: "18px",
      H5: "16px",
      H6: "14px",
    };

    return options[tag] || "18px";
  }

  render() {
    const block = super.render();

    block.style.fontSize = this.getHeaderFontSize(super.currentLevel.tag as HeadingTag);
    block.style.fontWeight = "bold";
    block.style.lineHeight = "1.6";

    return block;
  }
}
