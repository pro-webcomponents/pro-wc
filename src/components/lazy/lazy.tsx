import { Component, Element, Prop, State } from '@stencil/core';

@Component({
  tag: 'pro-lazy',
  styleUrl: 'lazy.scss',
  shadow: true
})
export class Lazy {

  private io: IntersectionObserver | null = null;

  @Element() el: HTMLElement;

  @State() loaded = false;

  @Prop() component: string;
  @Prop() props: {[key: string]: any};

  componentDidLoad() {
    this.addIntersectionObserver();
  }

  private addIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.removeIntersectionObserver();
      this.io = new IntersectionObserver((data) => {
        // because there will only ever be one instance
        // of the element we are observing
        // we can just use data[0]
        if (data[0].isIntersecting) {
          this.loaded = true;
          this.removeIntersectionObserver();
        }
      });

      this.io.observe(this.el);
    } else {
      // fall back to setTimeout for Safari and IE
      this.loaded = true;
    }
  }

  private removeIntersectionObserver() {
    if (this.io) {
      this.io.disconnect();
      this.io = null;
    }
  }

  render() {
    if(this.loaded && this.component) {
      const Component = this.component;
      return <Component {...this.props}/>
    }
  }
}
