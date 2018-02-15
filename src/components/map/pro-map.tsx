import { Component, Element, Prop } from '@stencil/core';

declare var google: any;

@Component({
  tag: 'pro-map',
  styleUrl: 'pro-map.css',
})
export class ProMap {

  @Element() el: HTMLElement;

  @Prop() lat: number;
  @Prop() long: number;
  @Prop() zoom: number;
  @Prop() apikey: string;

  componentWillLoad() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apikey}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      this.parseStyles('height: 600px;width: 600px;');
      this.initMap();
    };
  }

  parseStyles(styleProp: string) {
    const individualStyle = styleProp.split(';');
    individualStyle.map(style => {
      if (style !== '') {
        const key = style.split(':')[0];
        const value = style.split(':')[1];
        this.el.style[key] = value;
      }
    });
  }

  initMap() {
    new google.maps.Map(this.el, {
      center: {lat: this.lat, lng: this.long},
      zoom: this.zoom
    });
  }
}
