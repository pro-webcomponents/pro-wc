import { Component, Element, Prop, Method, Watch } from '@stencil/core';


@Component({
  tag: 'pro-map',
  styleUrl: 'pro-map.css',
})
export class ProMap {

  private GoogleMaps: any;
  map: any;

  @Element() el: HTMLElement;

  @Prop() center: any;
  @Prop() mapTypeId: 'roadmap'|'satellite'|'hybrid'|'terrain' = 'roadmap';
  @Prop() lat = -25.363;
  @Prop() lng = 131.044;
  @Prop() zoom = 4;
  @Prop() apikey: string = 'AIzaSyBcwp6219pSj_uq6jx-bofIiEqrqrBtaJk';

  @Prop() disableDefaultUI = true;
  @Prop() zoomControl: boolean;
  @Prop() mapTypeControl: boolean;
  @Prop() scaleControl: boolean;
  @Prop() streetViewControl: boolean;
  @Prop() rotateControl: boolean;
  @Prop() fullscreenControl: boolean;

  @Watch('center')
  @Watch('lat')
  @Watch('lng')
  updateCenter() {
    const center = this.center ? this.center : {lat: this.lat, lng: this.lng};
    this.map.setCenter(center);
  }

  @Watch('zoom')
  updateZoom() {
    this.map.setZoom(this.zoom);
  }

  @Watch('mapTypeId')
  updateMapTypeId() {
    this.map.setMapTypeId(this.mapTypeId);

  }

  componentWillLoad() {
    return getGoogleMaps(this.apikey).then(maps => this.GoogleMaps = maps);
  }

  componentDidLoad() {
    this.map = new this.GoogleMaps.Map(this.el, {
      center: {lat: this.lat, lng: this.lng},
      zoom: this.zoom,
      mapTypeId: this.mapTypeId,
      disableDefaultUI: this.disableDefaultUI,
      zoomControl: this.zoomControl,
      mapTypeControl: this.mapTypeControl,
      scaleControl: this.scaleControl,
      streetViewControl: this.streetViewControl,
      rotateControl: this.rotateControl,
      fullscreenControl: this.fullscreenControl,
    });
  }


  @Method()
  getMap() {
    return this.map;
  }
}

function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const google = win.google;
  if(google && google.maps) {
    return Promise.resolve(google.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const win = window as any;
      const google = win.google;
      if(google && google.maps) {
        resolve(google.maps);
      }else{
        reject('google maps not available');
      }
    };
  });
}
