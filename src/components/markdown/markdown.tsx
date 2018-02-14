import { Component, Element, Prop, Watch } from '@stencil/core';
//@ts-ignore
import snarkdown from 'snarkdown';

@Component({
  tag: 'pro-markdown',
  styleUrl: 'markdown.scss',
  shadow: true
})
export class Markdown {

  private contentEl: HTMLElement|undefined;

  @Element() el: HTMLElement;

  @Prop() content: string;

  @Watch('content')
  contentChanged(content: string|null) {
    if(content) {
      const html = snarkdown(content);
      if(this.contentEl) {
        this.contentEl.innerHTML = html;
      }
    }
  }

  componentDidLoad() {
    const content = (this.content) ? this.content : this.el.textContent;
    this.contentChanged(content);
  }

  render() {
    return (
      <div ref={(el) => this.contentEl = el}/>
    );
  }
}
