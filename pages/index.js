import React from 'react';
import Layout from 'components/Layout';
import ButtonNext from 'components/ButtonNext';
import Vector2 from 'libs/Vector2';
import chroma from 'chroma-js';
import { TimelineLite } from 'gsap';
import { widthContainer } from 'styles/variables.scss';
import s from './index.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.layoutRef = React.createRef();
    this.canvasRef = React.createRef();
    this.titleRef = React.createRef();
    this.textRef = React.createRef();
    this.buttonRef = React.createRef();

    this.entryAnimation = new TimelineLite({ paused: true });

    this.handleMousemove = null;
    this.handleMouseout = null;
    this.handleResize = null;

    this.initCanvasAnimation = null;
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;

    function getPaddingRight() {
      return canvas.offsetWidth - parseInt(widthContainer, 10) > 0
        ? ((canvas.offsetWidth - parseInt(widthContainer, 10)) / 2) + 80
        : 80;
    }

    function getPaddingLeft() {
      return canvas.offsetWidth / 2;
    }

    const options = {
      padding: {
        top: 160,
        right: getPaddingRight(),
        bottom: 200,
        left: getPaddingLeft(),
      },
      size: 12,
      step: 20,
      threshold: 200,
      repulsion: 0.1,
      rectsCount: 10,
    };

    let points;
    let rects;
    let ctx;
    let osCanvas;
    let osCtx;
    let mouse;
    let userMouse;
    let center;
    let hover;

    Vector2.prototype.repel = function (start, from, base, ex) {
      this.x
        += ((Math.cos(from.angleTo(this))
        * ((base ** ex) / this.distanceTo(from)))
        + (start.x - this.x)) * options.repulsion;
      this.y
        += ((Math.sin(from.angleTo(this))
        * ((base ** ex) / this.distanceTo(from)))
        + (start.y - this.y)) * options.repulsion;
    };

    function mouseHandler(e) {
      hover = e.type === 'mousemove';

      userMouse.x = e.clientX;
      userMouse.y = e.clientY - canvas.getBoundingClientRect().top;
    }

    function createGrid() {
      points = [];

      const hPadding = options.padding.right + options.padding.left;
      const vPadding = options.padding.top + options.padding.bottom;
      const endX = canvas.width - hPadding;
      const endY = canvas.height - vPadding;
      const xPoints = endX / options.step;
      const yPoints = endY / options.step;

      function update() {
        this.position.repel(this.startPosition, mouse, options.threshold, 1.8);
      }

      for (let i = 0; i <= xPoints; i += 1) {
        for (let j = 0; j <= yPoints; j += 1) {
          points.push({
            size: options.size,
            value: Math.round(Math.random()),
            position: new Vector2(Math.random() * canvas.width, Math.random() * canvas.height),
            startPosition: new Vector2(
              options.padding.left + (i * options.step),
              options.padding.top + (j * options.step),
            ),
            update,
          });
        }
      }

      const colors = chroma.scale(['#4f8aaa', '#ae9670']).colors(points.length);

      for (let i = 0; i < points.length; i += 1) {
        points[i].color = colors[i];
      }
    }

    function createRects() {
      rects = [];

      for (let i = 0; i <= options.rectsCount; i += 1) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);

        rects.push({
          x: x - (options.size / 2),
          y: y - (options.size / 2),
          color: `rgba(79, 138, 170, ${Math.random()})`,
        });
      }
    }

    function draw() {
      if (!hover) mouse.lerp(center, 0.015);
      else mouse.lerp(userMouse, 0.15);

      const gradient = osCtx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#f9fcfe');
      gradient.addColorStop(1, '#e0eaf8');

      osCtx.fillStyle = gradient;
      osCtx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < rects.length; i += 1) {
        const r = rects[i];

        osCtx.fillStyle = r.color;
        osCtx.fillRect(r.x, r.y, options.size, options.size);
      }

      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        p.update();

        osCtx.font = `bold ${options.size}px/${options.size}px Roboto`;
        osCtx.fillStyle = p.color;
        osCtx.fillText(
          p.value,
          p.position.x - osCtx.measureText(p.value).width / 2,
          p.position.y + p.size / 2,
        );
      }

      ctx.drawImage(osCanvas, 0, 0);
    }

    function loop() {
      draw();
      window.requestAnimationFrame(loop);
    }

    const resize = () => {
      options.padding.right = getPaddingRight();
      options.padding.left = getPaddingLeft();

      osCanvas.width = this.canvasRef.current.offsetWidth;
      osCanvas.height = this.canvasRef.current.offsetHeight;

      canvas.width = osCanvas.width;
      canvas.height = osCanvas.height;

      center = new Vector2(
        options.padding.left + (canvas.width - options.padding.right - options.padding.left) / 2,
        options.padding.top + (canvas.height - options.padding.top - options.padding.bottom) / 2,
      );

      mouse = new Vector2(center.x, center.y);
      userMouse = new Vector2(center.x, center.y);

      createRects();
      createGrid();
    };

    const init = () => {
      osCanvas = document.createElement('canvas');

      ctx = canvas.getContext('2d');
      osCtx = osCanvas.getContext('2d');

      hover = false;

      resize();
      createRects();
      createGrid();
      loop();
    };

    window.requestAnimationFrame = (() => window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function (callback) {
          window.setTimeout(callback, 1000 / 60);
        })();

    this.handleMousemove = mouseHandler;
    this.handleMouseout = mouseHandler;
    this.handleResize = resize;

    this.initCanvasAnimation = init;

    this.fillEntryAnimation().play();
  }

  componentWillUnmount() {
    window.removeEventListener(this.handleMousemove);
    window.removeEventListener(this.handleMouseout);
    window.removeEventListener(this.handleResize);
  }

  fillEntryAnimation = () => this.entryAnimation
    .add(this.layoutRef.current.entryAnimation.play())
    .add(this.layoutRef.current.headerEntryAnimation.play(), '-=2')
    .to(this.titleRef.current, 0.4, { opacity: 1, transform: 'translate(0) scale(1)' }, '-=1.5')
    .to(this.textRef.current, 0.4, { opacity: 1, transform: 'translate(0) scale(1)' }, '-=1.3')
    .to(this.buttonRef.current, 0.4, { opacity: 1, visibility: 'visible', transform: 'translate(0) scale(1)' }, '-=1.1')
    .add(() => {
      this.initCanvasAnimation();

      window.onmousemove = this.handleMousemove;
      window.onmouseout = this.handleMouseout;
      window.onresize = this.handleResize;
    }, '-=0.9')
    .to(this.canvasRef.current, 0.8, { opacity: 1 }, '-=0.9');

  render() {
    return (
      <Layout ref={this.layoutRef}>
        <div className={s.root}>
          <canvas className={s.canvas} ref={this.canvasRef} />
          <div className={s.container}>
            <div className={s.content}>
              <h2 className={s.title} ref={this.titleRef}>
                Artificial intelligence
                <span>for financial markets</span>
              </h2>
              <p className={s.text} ref={this.textRef}>
                Harnessing the power of machine learning
                to develop an automated and data-driven
                investment management firm.
              </p>
              <div className={s.button} ref={this.buttonRef}>
                <ButtonNext>Discover how</ButtonNext>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
