import { Component, Event, EventEmitter, EventListenerEnable, Listen, Method, Prop, Watch } from '@stencil/core';

export interface Coord {
  x: number;
  y: number;
}

export interface PtrCallback {
  (ev: Event, pos?: Coord): boolean;
}

@Component({
  tag: 'pro-pointerevents',
})
export class PointerEvents {

  private lastTouch = 0;

  @Prop({ context: 'enableListener' }) enableListener: EventListenerEnable;

  @Prop() attachTo: any = 'child';
  @Prop() autoBlockAll = false;
  @Prop() passive = true;

  @Prop() onStart: PtrCallback;
  @Prop() onMove: PtrCallback;
  @Prop() onEnd: PtrCallback;

  @Event() ptrStart: EventEmitter;
  @Event() ptrMove: EventEmitter;
  @Event() ptrEnd: EventEmitter;

  @Prop() disabled = false;
  @Watch('disabled')
  protected disabledChanged(isDisabled: boolean) {
    this.enableListener(this, 'touchstart', !isDisabled, this.attachTo, this.passive);
    this.enableListener(this, 'mousedown', !isDisabled, this.attachTo, this.passive);
    if (isDisabled) {
      this.enable(false);
    }
  }


  /////////// TOUCH EVENTS
  componentDidLoad() {
    this.disabledChanged(this.disabled);
  }

  @Listen('touchstart', { passive: true, enabled: false })
  onTouchStart(ev: TouchEvent) {
    this.lastTouch = now(ev);
    const coord = touchCoord(ev);
    if (this.pointerDown(ev, coord)) {
      this.enableMouse(false);
      this.enableTouch(true);
    } else {
      this.enable(false);
    }
  }

  @Listen('touchmove', { passive: true, enabled: false })
  onTouchMove(ev: TouchEvent) {
    this.lastTouch = now(ev);

    const coord = touchCoord(ev);
    this.pointerMove(ev, coord);
  }

  @Listen('touchcancel', { passive: true, enabled: false })
  @Listen('touchend', { passive: true, enabled: false })
  onTouchEnd(ev: TouchEvent) {
    this.lastTouch = now(ev);

    const coord = touchCoord(ev);
    this.pointerUp(ev, coord);
    this.enableTouch(false);
  }


  /////////// MOUSE EVENTS
  @Listen('mousedown', { passive: true, enabled: false })
  onMouseDown(ev: MouseEvent) {
    const timeStamp = now(ev);

    if (this.lastTouch === 0 || (this.lastTouch + MOUSE_WAIT < timeStamp)) {
      const coord = mouseCoord(ev);

      if (this.pointerDown(ev, coord)) {
        this.enableMouse(true);
        this.enableTouch(false);
      } else {
        this.enable(false);
      }
    }
  }

  @Listen('document:mousemove', { passive: true, enabled: false })
  onMoveMove(ev: MouseEvent) {
    const timeStamp = now(ev);
    if (this.lastTouch === 0 || (this.lastTouch + MOUSE_WAIT < timeStamp)) {
      const coord = mouseCoord(ev);
      this.pointerMove(ev, coord);
    }
  }

  @Listen('document:mouseup', { passive: true, enabled: false })
  onMouseUp(ev: MouseEvent) {
    const timeStamp = now(ev);

    if (this.lastTouch === 0 || (this.lastTouch + MOUSE_WAIT < timeStamp)) {
      const coord = mouseCoord(ev);
      this.pointerUp(ev, coord);
      this.enableMouse(false);
    }
  }

  @Method()
  stop() {
    this.enable(false);
  }

  private pointerDown(ev: Event, pos: Coord): boolean {
    if (this.onEnd) {
      return this.onStart(ev, pos);
    } else {
      this.ptrStart.emit({
        event: ev,
        pos: pos
      });
    }
    return true;
  }

  private pointerMove(ev: Event, pos: Coord) {
    if (this.onMove) {
      this.onMove(ev, pos);
    } else {
      this.ptrMove.emit({
        event: ev,
        pos: pos
      });
    }
  }

  private pointerUp(ev: Event, pos: Coord) {
    if (this.onEnd) {
      this.onEnd(ev, pos);
    } else {
      this.ptrEnd.emit({
        event: ev,
        pos: pos
      });
    }
  }

  private enableMouse(shouldEnable: boolean) {
    this.enableListener(this, 'document:mousemove', shouldEnable, undefined, this.passive);
    this.enableListener(this, 'document:mouseup', shouldEnable, undefined, this.passive);
  }

  private enableTouch(shouldEnable: boolean) {
    this.enableListener(this, 'touchmove', shouldEnable, this.attachTo, this.passive);
    this.enableListener(this, 'touchcancel', shouldEnable, this.attachTo, this.passive);
    this.enableListener(this, 'touchend', shouldEnable, this.attachTo, this.passive);
  }

  private enable(shouldEnable: boolean) {
    this.enableMouse(shouldEnable);
    this.enableTouch(shouldEnable);
  }

  render() {
    return (
      <slot/>
    );
  }
}

const MOUSE_WAIT = 2500;

function mouseCoord(ev: MouseEvent): Coord {
  return {
    x: ev.pageX,
    y: ev.pageY
  };
}

function touchCoord(ev: TouchEvent): Coord {
  const changedTouches = ev.changedTouches;
  if (changedTouches && changedTouches.length > 0) {
    const t = changedTouches[0];
    return {
      x: t.clientX,
      y: t.clientY
    };
  }
  return {x: 0, y: 0};
}

function now(ev: UIEvent) {
  return ev.timeStamp || Date.now();
}
