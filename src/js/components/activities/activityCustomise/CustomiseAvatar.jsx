import React, {Component, PropTypes} from 'react';
import {Playing, ConfirmCustomAvatar} from '../.';
import {interact} from 'interactjs';
import {avatars as avatarsSettings, languages as allLanguages} from '../../../globals';

class CustomiseAvatar extends Component {

  state = {
    avatar: {
      head: ``,
      earLeft: ``,
      earRight: ``,
      nose: ``,
      mouth: ``,
      eyeLeft: ``,
      eyeRight: ``,
      body: ``,
      armLeft: ``,
      armRight: ``,
      pants: ``,
      tongue: ``,
      teeth: ``,
      legLeft: ``,
      legRight: ``,
      feetLeft: ``,
      feetRight: ``
    }
  }

  componentDidMount() {
    this.enableDrag();
  }

  enableDrag() {
    interact(`.draggable`)
      .draggable({
        inertia: true,
        restrict: {
          endOnly: true,
          elementRect: {top: 0, left: 0, bottom: 1, right: 1}
        },
        autoScroll: true,
        onmove: e => {
          this.dragMoveListener(e);
          console.log(`move`);
        },
        onend: e => this.dragEndListener(e)
      });

    interact(`.dropzone`)
      .dropzone({
        accept: `.draggable`,
        overlap: .25,
        ondrop: e => this.onDropHandler(e),
        ondropactivate: event => {
          event.target.classList.add(`drop-active`);
        },
        ondropdeactivate: event => event.target.classList.remove(`drop-active`),
        ondragenter: event => {
          const draggableElement = event.relatedTarget;
          const dropzoneElement = event.target;

          // toon visueel dat, als je loslaat, het element correct gedropt zal worden
          // (kan bij zowel element dat je vast hebt als waarin je gaat droppen)
          dropzoneElement.classList.add(`drop-target`);
          draggableElement.classList.add(`can-drop`);
        },
        ondragleave: event => {
          // verwijder visuele ding van hierboven
          event.target.classList.remove(`drop-target`);
          event.relatedTarget.classList.remove(`can-drop`);
        }
      });
  }

  onDropHandler(e) {
    const el = e.relatedTarget;
    const target = e.target;

    target.style.fill = el.getAttribute(`data-selectedColor`);

    const hiddenEl = document.querySelector(`.${target.classList[0]}`);
    hiddenEl.style.fill = el.getAttribute(`data-selectedColor`);

    for (let i = 0;i < hiddenEl.childNodes.length;i ++) {
      hiddenEl.childNodes[i].style.fill = el.getAttribute(`data-selectedColor`);
    }

    //console.log(target.classList[0], el.getAttribute(`data-selectedColor`));
    //console.log(`dropped -> set in state`);

    const {avatar} = this.state;
    for (const key in avatar) {
      if (key === target.classList[0]) {
        avatar[key] = el.getAttribute(`data-selectedColor`);
      }
    }

    this.setState({avatar});

  }

  dragEndListener(e) {
    this.revertBack(e);
  }

  revertBack(event) {
    const target = event.target;
    target.style.transform = `translate(0px, 0px)`;
    target.style.transition = `transform .5s`;

    target.setAttribute(`data-x`, 0);
    target.setAttribute(`data-y`, 0);
  }

  dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute(`data-x`)) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute(`data-y`)) || 0) + event.dy;

    //console.log(x, y);

    // translate the element
    target.style.transform = `translate(${x}px, ${y}px)`;

    if (target.style.transition) target.style.removeProperty(`transition`);

    // update the position attributes
    target.setAttribute(`data-x`, x);
    target.setAttribute(`data-y`, y);
  }

  renderAvatar(type) {

    const {player} = this.props;
    const {avatar} = player;

    //2 different objects to make drag&drop work nicely so check type here
    const avatarType = type ? `interactable` : `nonInteractable`;

    const found = avatarsSettings.find(setting => setting.image === avatar);
    const {image, colors} = found;

    if (image === `pig`) {
      return (
        <svg width='384px' height='485px' viewBox='0 0 384 485' className={`customAvatar ${avatarType}`}>
          <path className='legLeft dropzone' style={{fill: colors.main}} d='M159.8,477.1L159.8,477.1c-6.6,0-11.9-5.4-11.9-11.9v-58.2c0-6.6,5.4-11.9,11.9-11.9h0c6.6,0,11.9,5.4,11.9,11.9v58.2C171.7,471.7,166.3,477.1,159.8,477.1z' />
          <path className='legRight dropzone' style={{fill: colors.main}} d='M212.3,477.1L212.3,477.1c-6.6,0-11.9-5.4-11.9-11.9v-58.2c0-6.6,5.4-11.9,11.9-11.9h0c6.6,0,11.9,5.4,11.9,11.9v58.2C224.3,471.7,218.9,477.1,212.3,477.1z' />

          <path className='pants dropzone' style={{fill: colors.accent}} d='M133,316.3c6,25.8,27.5,44.8,53.2,44.8s47.2-19.1,53.2-44.8C187.5,348.5,133.1,316.4,133,316.3z' />

          <path className='body dropzone' style={{fill: colors.main}} d='M227.2,262.2c2-5.5,3.1-11.4,3.1-17.7c0-26.4-19.8-47.8-44.1-47.8s-44.1,21.4-44.1,47.8c0,6.2,1.1,12.2,3.1,17.7c-8.6,10.5-13.9,24.3-13.9,39.5c0,5,0.6,9.9,1.7,14.6c0.2,0.1,54.5,32.2,106.4,0c1.1-4.7,1.7-9.6,1.7-14.6C241,286.5,235.8,272.7,227.2,262.2z' />

          <path className='armLeft dropzone' style={{fill: colors.main}} d='M98.3,210.8L98.3,210.8c-4.6-4.6-12.2-4.6-16.9,0L16,276.3c-1.5-2.6-4.2-4.3-7.4-4.3c-4.7,0-8.5,3.8-8.5,8.5c0,3.2,1.7,5.9,4.3,7.4l-0.9,0.9c-4.6,4.6-4.6,12.2,0,16.9h0c4.6,4.6,12.2,4.6,16.9,0l78-78C103,223,103,215.4,98.3,210.8z' />
          <path className='armRight dropzone' style={{fill: colors.main}} d='M380.8,288.8l-4-4c3.1-1.3,5.2-4.3,5.2-7.8c0-4.7-3.8-8.5-8.5-8.5c-3.5,0-6.6,2.2-7.8,5.2l-63-63c-4.6-4.6-12.2-4.6-16.9,0h0c-4.6,4.6-4.6,12.2,0,16.9l78,78c4.6,4.6,12.2,4.6,16.9,0l0,0C385.4,301,385.4,293.4,380.8,288.8z' />

          <path className='feetLeft dropzone' style={{fill: colors.main}} d='M159.7,461.5c-13.3,0-24.1,10.8-24.2,24.1h48.3C183.8,472.3,173,461.5,159.7,461.5z' />
          <path className='feetRight dropzone' style={{fill: colors.main}} d='M212.8,461.5c-13.3,0-24.1,10.8-24.2,24.1H237C236.9,472.3,226.1,461.5,212.8,461.5z' />

          <path className='bellybutton dropzone' style={{fill: `none`, stroke: colors.mainDark, strokeLinecap: `round`, strokeLinejoin: `round`}} d='M186.2,303.4c0,0-3.7,6.5,0,5.8c3.7-0.8,2.5-2.9,2.5-2.9' />

          <ellipse className='nipple dropzone' style={{fill: colors.mainDark}} cx='218.6' cy='252.1' rx='4.2' ry='2.1' />
          <ellipse className='nipple dropzone' style={{fill: colors.mainDark}} cx='157.6' cy='252.1' rx='4.2' ry='2.1' />

          <circle className='head dropzone' style={{fill: colors.main}} cx='191.2' cy='86.4' r='74.3' />

          <g className='earLeft ear dropzone'>
            <path style={{fill: colors.main}} d='M99.3,39c-5.6,14.6-23.2,45-8.6,50.6c14.6,5.6,55.8-15.6,61.4-30.2c5.6-14.6-1.6-31-16.2-36.6S104.9,24.4,99.3,39z' />
            <path style={{fill: colors.mainDark}} d='M107.3,46.3c-3.6,9.3-14.8,28.7-5.5,32.2c9.3,3.6,35.5-10,39.1-19.2s-1-19.7-10.3-23.3S110.9,37.1,107.3,46.3z' />
          </g>

          <g className='earRight ear dropzone'>
            <path style={{fill: colors.main}} d='M285.2,39c5.6,14.6,23.2,45,8.6,50.6c-14.6,5.6-55.8-15.6-61.4-30.2s1.6-31,16.2-36.6C263.2,17.1,279.5,24.4,285.2,39z' />
            <path style={{fill: colors.mainDark}} d='M276.6,46.9c3.4,8.9,14.1,27.4,5.2,30.9c-8.9,3.4-34-9.5-37.5-18.4c-3.4-8.9,1-18.9,9.9-22.3S273.2,38,276.6,46.9z' />
          </g>

          <path className='mouth dropzone' style={{fill: colors.darkGrey}} d='M231.7,86.5v4.2v1.6c0,1.7-1.4,3.1-3.1,3.1h-2.4c-1.7,0-3.1-1.4-3.1-3.1v-1.6v-2.1c-1.8,0.4-3.7,0.7-5.5,1v5v1.6c0,1.7-1.4,3.1-3.1,3.1H212c-1.7,0-3.1-1.4-3.1-3.1v-1.6v-3.8c-4.6,0.5-9.1,0.7-13.4,0.8v4.6v1.6c0,1.7-1.4,3.1-3.1,3.1H190c-1.7,0-3.1-1.4-3.1-3.1v-1.6v-4.7c-4.1-0.2-8.1-0.5-11.8-1v4.1v1.6c0,1.7-1.4,3.1-3.1,3.1h-2.4c-1.7,0-3.1-1.4-3.1-3.1v-1.6v-5.4c-1.6-0.3-3.2-0.6-4.7-0.9v1.6v1.6c0,1.7-1.4,3.1-3.1,3.1h-2.4c-1.7,0-3.1-1.4-3.1-3.1v-1.6v-3.7c-3.1-0.8-5.8-1.7-8.1-2.5c-3.8-1.3-7.5,2.4-6.1,6.2c2.8,8.1,8.9,19.5,22,27.2c6.1-5,17.8-8.4,31.1-8.4c13.9,0,25.9,3.6,31.8,9c14.4-8.8,20.9-23,23.5-31.1c0.8-2.5-1.6-4.9-4.1-3.9C239.4,84.2,235.5,85.4,231.7,86.5z' />

          <path className='tongue dropzone' style={{fill: colors.mainDarker}} d='M160.9,117.2c7.5,4.4,17.2,7.5,29.9,8.1c14.1,0.7,24.8-2.6,33-7.5c-5.9-5.3-18-9-31.8-9C178.7,108.8,167,112.2,160.9,117.2z' />

          <g className='teeth dropzone'>
            <path style={{fill: colors.white}} d='M153.1,86.3v3.7v1.6c0,1.7,1.4,3.1,3.1,3.1h2.4c1.7,0,3.1-1.4,3.1-3.1v-1.6v-1.6C158.6,87.7,155.7,87,153.1,86.3z' />
            <path style={{fill: colors.white}} d='M166.5,89.3v5.4v1.6c0,1.7,1.4,3.1,3.1,3.1h2.4c1.7,0,3.1-1.4,3.1-3.1v-1.6v-4.1C172.1,90.2,169.2,89.8,166.5,89.3z' />
            <path style={{fill: colors.white}} d='M186.9,91.5v4.7v1.6c0,1.7,1.4,3.1,3.1,3.1h2.4c1.7,0,3.1-1.4,3.1-3.1v-1.6v-4.6C192.6,91.7,189.7,91.7,186.9,91.5z' />
            <path style={{fill: colors.white}} d='M208.9,90.8v3.8v1.6c0,1.7,1.4,3.1,3.1,3.1h2.4c1.7,0,3.1-1.4,3.1-3.1v-1.6v-5C214.6,90.1,211.7,90.5,208.9,90.8z' />
            <path style={{fill: colors.white}} d='M223.1,88.6v2.1v1.6c0,1.7,1.4,3.1,3.1,3.1h2.4c1.7,0,3.1-1.4,3.1-3.1v-1.6v-4.2C228.8,87.3,225.9,88,223.1,88.6z' />
          </g>

          <g className='eyeLeft eye dropzone'>
            <circle style={{fill: colors.white}} cx='163.7' cy='63.6' r='15.3' />
            <circle style={{fill: colors.darkGrey}} cx='163.3' cy='66' r='5.5' />
            <circle style={{fill: colors.white}} cx='166.5' cy='64' r='3.1' />
          </g>

          <g className='eyeRight eye dropzone'>
            <circle style={{fill: colors.white}} cx='219.5' cy='63.6' r='15.3' />
            <circle style={{fill: colors.darkGrey}} cx='219.9' cy='66' r='5.5' />
            <circle style={{fill: colors.white}} cx='223.8' cy='64' r='3.1' />
          </g>

          <g className='nose dropzone'>
            <path style={{fill: colors.mainDarker}} d='M207,94.6h-29.1c-6.7,0-12.2-5.5-12.2-12.2v-5.5c0-6.7,5.5-12.2,12.2-12.2H207c6.7,0,12.2,5.5,12.2,12.2v5.5C219.1,89.2,213.6,94.6,207,94.6z' />
            <path style={{fill: colors.darkGrey}} d='M205.8,86L205.8,86c-3.5,0-6.3-2.8-6.3-6.3v0c0-3.5,2.8-6.3,6.3-6.3h0c3.5,0,6.3,2.8,6.3,6.3v0C212,83.2,209.2,86,205.8,86z' />
            <path style={{fill: colors.darkGrey}} d='M179,86L179,86c-3.5,0-6.3-2.8-6.3-6.3v0c0-3.5,2.8-6.3,6.3-6.3h0c3.5,0,6.3,2.8,6.3,6.3v0C185.3,83.2,182.5,86,179,86z' />
          </g>

        </svg>
      );
    } else {
      return (
        <svg width='384px' height='485px' viewBox='0 0 384 485' className={`customAvatar ${avatarType}`}>

          <path className='legLeft dropzone' style={{fill: `#FB7936`}} d='M164.7,476.8L164.7,476.8c-6.6,0-11.9-5.4-11.9-11.9v-58.1c0-6.6,5.4-11.9,11.9-11.9h0c6.6,0,11.9,5.4,11.9,11.9v58.1C176.6,471.4,171.3,476.8,164.7,476.8z' />
          <path className='legRight dropzone' style={{fill: `#FB7936`}} d='M217.3,476.8L217.3,476.8c-6.6,0-11.9-5.4-11.9-11.9v-58.1c0-6.6,5.4-11.9,11.9-11.9h0c6.6,0,11.9,5.4,11.9,11.9v58.1C229.3,471.4,223.9,476.8,217.3,476.8z' />

          <path className='pants dropzone' style={{fill: `#FF5BED`}} d='M138,316.3c6,25.8,27.5,44.8,53.2,44.8s47.2-19.1,53.2-44.8C192.5,348.5,138.1,316.4,138,316.3z' />

          <path className='body dropzone' style={{fill: `#FB7936`}} d='M232.2,262.2c2-5.5,3.1-11.4,3.1-17.7c0-26.4-19.8-47.8-44.1-47.8s-44.1,21.4-44.1,47.8c0,6.2,1.1,12.2,3.1,17.7c-8.6,10.5-13.9,24.3-13.9,39.5c0,5,0.6,9.9,1.7,14.6c0.2,0.1,54.5,32.2,106.4,0c1.1-4.7,1.7-9.6,1.7-14.6C246,286.5,240.8,272.7,232.2,262.2z' />

          <path className='armLeft dropzone' style={{fill: `#FB7936`}} d='M98.3,210.8L98.3,210.8c-4.6-4.6-12.2-4.6-16.9,0L16,276.3c-1.5-2.6-4.2-4.3-7.4-4.3c-4.7,0-8.5,3.8-8.5,8.5c0,3.2,1.7,5.9,4.3,7.4l-0.9,0.9c-4.6,4.6-4.6,12.2,0,16.9h0c4.6,4.6,12.2,4.6,16.9,0l78-78C103,223,103,215.4,98.3,210.8z' />
          <path className='armRight dropzone' style={{fill: `#FB7936`}} d='M380.8,288.8l-4-4c3.1-1.3,5.2-4.3,5.2-7.8c0-4.7-3.8-8.5-8.5-8.5c-3.5,0-6.6,2.2-7.8,5.2l-63-63c-4.6-4.6-12.2-4.6-16.9,0h0c-4.6,4.6-4.6,12.2,0,16.9l78,78c4.6,4.6,12.2,4.6,16.9,0l0,0C385.4,301,385.4,293.4,380.8,288.8z' />

          <path className='feetLeft dropzone' style={{fill: `#FB7936`}} d='M164.7,461.7c-13.3,0-24.1,10.8-24.2,24.1h48.3C188.8,472.5,178,461.7,164.7,461.7z' />
          <path className='feetRight dropzone' style={{fill: `#FB7936`}} d='M217.8,461.7c-13.3,0-24.1,10.8-24.2,24.1H242C241.9,472.5,231.1,461.7,217.8,461.7z' />

          <path className='bellybutton dropzone' style={{fill: `none`, stroke: `#E55E23`, strokeLinecap: `round`, strokeLinejoin: `round`}} d='M191.2,303.4c0,0-3.7,6.5,0,5.8c3.7-0.8,2.5-2.9,2.5-2.9' />

          <ellipse className='nipple dropzone' style={{fill: `#E55E23`}} cx='162.6' cy='252.1' rx='4.2' ry='2.1' />
          <ellipse className='nipple dropzone' style={{fill: `#E55E23`}} cx='223.6' cy='252.1' rx='4.2' ry='2.1' />

          <g className='head dropzone'>
            <path style={{fill: `#58071E`}} d='M260.2,64l11.8-10.2C259.3,22.3,228.3,0,192.1,0c-47.6,0-86.2,38.6-86.2,86.2c0,2.7,10.5,6.6,10.7,9.3c0.3,2.9-9.7,4.6-9.1,7.4c7.8,39.7,42.7,69.6,84.6,69.6c47.6,0,86.2-38.6,86.2-86.2c0-7.7-1-15.1-2.9-22.2H260.2z' />
            <path style={{fill: `#FB7936`}} d='M140,86.2c0-28.8,23.4-52.2,52.2-52.2c10.3,0,19.9,3,28,8.1c14.6,9.3,24.2,25.5,24.2,44.1c0,28.8-23.4,52.2-52.2,52.2S140,115,140,86.2z' />
          </g>

          <g className='earLeft ear dropzone'>
            <circle style={{fill: `#FB7936`}} cx='142' cy='56' r='11' />
            <circle style={{fill: `#E55E23`}} cx='142' cy='56' r='6' />
          </g>

          <g className='earRight ear dropzone'>
            <circle style={{fill: `#FB7936`}} cx='241' cy='56' r='11' />
            <circle style={{fill: `#E55E23`}} cx='241' cy='56' r='6' />
          </g>

          <g className='mouth dropzone'>
            <path style={{fill: `#F4A04D`}} d='M205.9,124.7h-28.2c-4.9,0-8.8-4-8.8-8.8v-12.7c0-4.9,4-8.8,8.8-8.8h28.2c4.9,0,8.8,4,8.8,8.8v12.7C214.7,120.7,210.7,124.7,205.9,124.7z' />
            <path style={{fill: `#282828`}} d='M205,105.5v1.4v0.5c0,0.6-0.5,1.1-1.1,1.1h-0.8c-0.6,0-1.1-0.5-1.1-1.1v-0.5v-0.7c-0.6,0.1-1.2,0.2-1.8,0.3v1.7v0.5c0,0.6-0.5,1.1-1.1,1.1h-0.8c-0.6,0-1.1-0.5-1.1-1.1v-0.5V107c-1.5,0.2-3,0.2-4.5,0.3v1.5v0.5c0,0.6-0.5,1.1-1.1,1.1h-0.8c-0.6,0-1.1-0.5-1.1-1.1v-0.5v-1.6c-1.4-0.1-2.7-0.2-3.9-0.3v1.4v0.5c0,0.6-0.5,1.1-1.1,1.1h-0.8c-0.6,0-1.1-0.5-1.1-1.1v-0.5v-1.8c-0.5-0.1-1.1-0.2-1.6-0.3v0.5v0.5c0,0.6-0.5,1.1-1.1,1.1h-0.8c-0.6,0-1.1-0.5-1.1-1.1v-0.5v-1.2c-1-0.3-1.9-0.6-2.7-0.8c-1.3-0.4-2.5,0.8-2,2.1c0.9,2.7,3,6.5,7.4,9.1c2.1-1.7,5.9-2.8,10.4-2.8c4.6,0,8.7,1.2,10.6,3c4.8-2.9,7-7.7,7.9-10.4c0.3-0.8-0.5-1.6-1.4-1.3C207.5,104.7,206.3,105.2,205,105.5z' />
          </g>

          <path className='tongue dropzone' style={{fill: `#FF6C6C`}} d='M181.3,115.8c2.5,1.5,5.8,2.5,10,2.7c4.7,0.2,8.3-0.9,11-2.5c-2-1.8-6-3-10.6-3C187.3,113,183.4,114.1,181.3,115.8z' />

          <g className='teeth dropzone'>
            <path style={{fill: `#E2E2E2`}} d='M180.6,107.7h-0.8c-0.6,0-1.1-0.5-1.1-1.1v0.5c0,0.6,0.5,1.1,1.1,1.1h0.8c0.6,0,1.1-0.5,1.1-1.1v-0.5C181.6,107.2,181.1,107.7,180.6,107.7z' />
            <path style={{fill: `#FFFFFF`}} d='M179.8,107.7h0.8c0.6,0,1.1-0.5,1.1-1.1v-0.5c-1-0.2-2-0.5-2.9-0.7v1.2C178.7,107.2,179.2,107.7,179.8,107.7z' />
            <path style={{fill: `#E2E2E2`}} d='M185,109.3h-0.8c-0.6,0-1.1-0.5-1.1-1.1v0.5c0,0.6,0.5,1.1,1.1,1.1h0.8c0.6,0,1.1-0.5,1.1-1.1v-0.5C186.1,108.8,185.6,109.3,185,109.3z' />
            <path style={{fill: `#FFFFFF`}} d='M184.2,109.3h0.8c0.6,0,1.1-0.5,1.1-1.1v-1.4c-1-0.1-2-0.3-2.9-0.4v1.8C183.2,108.8,183.7,109.3,184.2,109.3z' />
            <path style={{fill: `#E2E2E2`}} d='M191.9,109.8h-0.8c-0.6,0-1.1-0.5-1.1-1.1v0.5c0,0.6,0.5,1.1,1.1,1.1h0.8c0.6,0,1.1-0.5,1.1-1.1v-0.5C192.9,109.3,192.4,109.8,191.9,109.8z' />
            <path style={{fill: `#FFFFFF`}} d='M191.1,109.8h0.8c0.6,0,1.1-0.5,1.1-1.1v-1.5c-1,0-2,0-2.9,0v1.6C190,109.3,190.5,109.8,191.1,109.8z' />
            <path style={{fill: `#E2E2E2`}} d='M199.2,109.3h-0.8c-0.6,0-1.1-0.5-1.1-1.1v0.5c0,0.6,0.5,1.1,1.1,1.1h0.8c0.6,0,1.1-0.5,1.1-1.1v-0.5C200.3,108.8,199.8,109.3,199.2,109.3z' />
            <path style={{fill: `#FFFFFF`}} d='M198.4,109.3h0.8c0.6,0,1.1-0.5,1.1-1.1v-1.7c-1,0.2-1.9,0.3-2.9,0.4v1.3C197.4,108.8,197.8,109.3,198.4,109.3z' />
            <path style={{fill: `#E2E2E2`}} d='M203.9,108h-0.8c-0.6,0-1.1-0.5-1.1-1.1v0.5c0,0.6,0.5,1.1,1.1,1.1h0.8c0.6,0,1.1-0.5,1.1-1.1v-0.5C205,107.5,204.5,108,203.9,108z' />
            <path style={{fill: `#FFFFFF`}} d='M203.1,108h0.8c0.6,0,1.1-0.5,1.1-1.1v-1.4c-1,0.3-1.9,0.5-2.9,0.7v0.7C202.1,107.5,202.6,108,203.1,108z' />
          </g>

          <circle className='cheeckLeft cheeck dropzone' style={{fill: `#E55E23`}} cx='164.2' cy='95.7' r='7' />
          <circle className='cheeckRight cheeck dropzone' style={{fill: `#E55E23`}} cx='220.3' cy='95.9' r='7' />

          <path className='nose dropzone' style={{fill: `#58071E`}} d='M202.1,92.9c0,3.9-5,10-11.1,10s-11.1-6.1-11.1-10s5-7,11.1-7S202.1,89,202.1,92.9z' />

          <g className='eyeLeft eye dropzone'>
            <circle style={{fill: `#E55E23`}} cx='177.5' cy='76.4' r='11.3' />
            <circle style={{fill: `#FFFFFF`}} cx='177.5' cy='76.4' r='8.4' />
            <circle style={{fill: `#282828`}} cx='177.3' cy='76.8' r='3' />
            <circle style={{fill: `#FFFFFF`}} cx='179' cy='75' r='1.7' />
          </g>

          <g className='eyeRight eye dropzone'>
            <circle style={{fill: `#E55E23`}} cx='204.5' cy='76.4' r='11.3' />
            <circle style={{fill: `#FFFFFF`}} cx='204.5' cy='76.4' r='8.4' />
            <circle style={{fill: `#282828`}} cx='204.3' cy='76.8' r='3' />
            <circle style={{fill: `#FFFFFF`}} cx='206' cy='75' r='1.7' />
          </g>

          <path className='brawLeft braw dropzone' style={{fill: `#58071E`}} d='M184.5,65.1h-18.4c-1.4,0-2.5-1.1-2.5-2.5V59c0-1.4,1.1-2.5,2.5-2.5h18.4c1.4,0,2.5,1.1,2.5,2.5v3.5C187,64,185.8,65.1,184.5,65.1z' />
          <path className='brawRight braw dropzone' style={{fill: `#58071E`}} d='M215.9,64.8h-18.4c-1.4,0-2.5-1.1-2.5-2.5v-3.5c0-1.4,1.1-2.5,2.5-2.5h18.4c1.4,0,2.5,1.1,2.5,2.5v3.5C218.4,63.6,217.3,64.8,215.9,64.8z' />

        </svg>
      );
    }
  }

  checkFlag(language) {
    const lang = allLanguages.all.find(l => l.name === language);

    let img = ``;
    if (lang.flag) img = lang.flag;
    else img = `global`;

    return <img src={`/assets/icons/flags/${img}.svg`} className='flag' />;
  }

  render() {
    const {avatar} = this.state;
    const {id, player, onCustomAvatarUpdate} = this.props;
    const {languages} = player;

    return (
      <section className='customiseAvatar fullPage'>

        <header className='header'>
          <h3 className='title'>Color your avatar !</h3>
          <div className='headerBg'></div>
        </header>

        <div className='main'>

          <div className='list'>
            <ul className='list-unstyled colorLanguagesList'>
              {languages.map((language, i) => {
                return (
                  <li key={i} className='language'>
                    <div className='languageText'>
                      {this.checkFlag(language.language)}
                      {language.language}
                    </div>
                    <div className='languageColor draggable' data-languageName={language.language} data-selectedColor={language.color} style={{backgroundColor: language.color}}></div>
                  </li>
                );
              })}
            </ul>

            <div className='avatarsWrap'>
              <div className='pedestal'><span className='hide'>Pedestal</span></div>

              <div className='avatars'>
                {this.renderAvatar(false)}
                {this.renderAvatar(true)}
              </div>
            </div>
          </div>

          <div className='footer'>
            <ConfirmCustomAvatar
              id={id}
              avatar={avatar}
              onCustomAvatarUpdate={onCustomAvatarUpdate}
            />

            <Playing player={player} />
          </div>
        </div>
      </section>
    );
  }

}

CustomiseAvatar.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  player: PropTypes.object,
  onCustomAvatarUpdate: PropTypes.func
};

export default CustomiseAvatar;
