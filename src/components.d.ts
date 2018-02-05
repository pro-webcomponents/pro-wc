/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */


import {
  GLShader as ProGlshader
} from './components/glshader/glshader';

declare global {
  interface HTMLProGlshaderElement extends ProGlshader, HTMLElement {
  }
  var HTMLProGlshaderElement: {
    prototype: HTMLProGlshaderElement;
    new (): HTMLProGlshaderElement;
  };
  interface HTMLElementTagNameMap {
    "pro-glshader": HTMLProGlshaderElement;
  }
  interface ElementTagNameMap {
    "pro-glshader": HTMLProGlshaderElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "pro-glshader": JSXElements.ProGlshaderAttributes;
    }
  }
  namespace JSXElements {
    export interface ProGlshaderAttributes extends HTMLAttributes {
      frag?: string;
      media?: string;
      ready?: boolean;
      retina?: boolean;
      uniforms?: any;
      vert?: string;
    }
  }
}


import {
  Img as ProImg
} from './components/img/img';

declare global {
  interface HTMLProImgElement extends ProImg, HTMLElement {
  }
  var HTMLProImgElement: {
    prototype: HTMLProImgElement;
    new (): HTMLProImgElement;
  };
  interface HTMLElementTagNameMap {
    "pro-img": HTMLProImgElement;
  }
  interface ElementTagNameMap {
    "pro-img": HTMLProImgElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "pro-img": JSXElements.ProImgAttributes;
    }
  }
  namespace JSXElements {
    export interface ProImgAttributes extends HTMLAttributes {
      alt?: string;
      fit?: boolean;
      src?: string;
    }
  }
}


import {
  Payment as ProPayment
} from './components/payment/payment';

declare global {
  interface HTMLProPaymentElement extends ProPayment, HTMLElement {
  }
  var HTMLProPaymentElement: {
    prototype: HTMLProPaymentElement;
    new (): HTMLProPaymentElement;
  };
  interface HTMLElementTagNameMap {
    "pro-payment": HTMLProPaymentElement;
  }
  interface ElementTagNameMap {
    "pro-payment": HTMLProPaymentElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "pro-payment": JSXElements.ProPaymentAttributes;
    }
  }
  namespace JSXElements {
    export interface ProPaymentAttributes extends HTMLAttributes {
      details?: PaymentDetails;
      methodData?: PaymentMethodData[];
      options?: PaymentOptions;
    }
  }
}


import {
  Speech as ProSpeech
} from './components/speech/speech';

declare global {
  interface HTMLProSpeechElement extends ProSpeech, HTMLElement {
  }
  var HTMLProSpeechElement: {
    prototype: HTMLProSpeechElement;
    new (): HTMLProSpeechElement;
  };
  interface HTMLElementTagNameMap {
    "pro-speech": HTMLProSpeechElement;
  }
  interface ElementTagNameMap {
    "pro-speech": HTMLProSpeechElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "pro-speech": JSXElements.ProSpeechAttributes;
    }
  }
  namespace JSXElements {
    export interface ProSpeechAttributes extends HTMLAttributes {
      continuous?: boolean;
      enabled?: boolean;
      lang?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }
