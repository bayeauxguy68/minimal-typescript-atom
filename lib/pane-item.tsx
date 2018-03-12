import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ViewModel} from 'atom';

export interface RootConstructor<P, C extends React.Component<P, any>> {
  new (props: P): C;
}

export class PaneItem<P, C extends React.Component<P, any>> implements ViewModel {
	element: HTMLDivElement;

  constructor(Root: RootConstructor<P, C>, props: P, private readonly uri: string) {
    this.element = document.createElement('div');
    ReactDOM.render(
      <Root {...props} />,
      this.element,
    );
  }

  serialize() {
    return {}
  }

  getElement() {
    return this.element;
  }

  getURI() {
    return this.uri;
  }

  getTitle() {
    return 'Minimal Typescript Example';
  }

  getIconName() {
    return 'octoface';
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.element);
  }
}

export default function createOpenerFor<P, C extends React.Component<P, any>>(uri: string, Root: RootConstructor<P, C>, props: P) {
  return function opener(u: string) {
    if (u === uri) {
      return new PaneItem(Root, props, uri);
    } else {
      return undefined;
    }
  }
}
