import { Component, Element, Prop, State } from '@stencil/core';

@Component({
  tag: 'pro-lazy-video',
  styleUrl: 'lazy-video.scss'
})
export class LazyVideo {

  private io: IntersectionObserver | null = null;

  @Element() el: HTMLElement;

  @State() loadImageSrc: string | undefined = undefined;
  @State() loadVideoSrc: string | undefined = undefined;

  @Prop() preview: string;
  @Prop() type: string;
  @Prop() src: string;

  componentDidLoad() {
    this.addIntersectionObserver();
  }

  private addIntersectionObserver() {
    if (!this.src && !this.preview) {
      return;
    }
    if ('IntersectionObserver' in window) {
      this.removeIntersectionObserver();
      this.io = new IntersectionObserver((data) => {
        if (data[0].isIntersecting) {
          this.loadImageSrc = this.preview;
          this.removeIntersectionObserver();
        }
      });

      this.io.observe(this.el);
    } else {
      setTimeout(() => {
        this.loadImageSrc = this.preview;
      }, 300);
    }
  }

  private removeIntersectionObserver() {
    if (this.io) {
      this.io.disconnect();
      this.io = null;
    }
  }

  private loadVideo() {
    if (this.loadImageSrc) {
      this.loadVideoSrc = this.src;
      const element: HTMLVideoElement = document.getElementById('lazy-video') as HTMLVideoElement;
      element.load();
    }
  }

  render() {
    return (
      <video id='lazy-video' width='320' height='240' poster={this.loadImageSrc} controls
        onClick={() => this.loadVideo()}>
        <source src={this.loadVideoSrc} type={this.type} />
        Your browser does not support the video tag.
      </video>
    );
  }
}
