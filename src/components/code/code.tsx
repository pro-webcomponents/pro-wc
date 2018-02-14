import { Component, Element, Prop, Watch } from '@stencil/core';
import highlight from 'highlight.js';

@Component({
  tag: 'pro-code',
  styleUrl: 'code.scss',
  shadow: true
})
export class Code {

  private codeEl: HTMLElement|undefined;

  @Element() el: HTMLElement;

  @Prop() lang: string;
  @Prop() code: string;

  @Watch('code')
  codeChanged(code: string|null) {
    if(code) {
      let html: string;
      if(this.lang) {
        html = highlight.highlight(this.lang, code).value;
      } else {
        html = highlight.highlightAuto(code).value;
      }
      if(this.codeEl) {
        this.codeEl.innerHTML = html;
      }
    }
  }

  componentDidLoad() {
    const code = (this.code) ? this.code : this.el.textContent;
    // this.el.textContent = '';
    this.codeChanged(code);
  }

  render() {
    return (
      <pre>
        <code ref={(el) => this.codeEl = el} class='hljs' />
      </pre>
    );
  }
}
