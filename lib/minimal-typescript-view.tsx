import * as React from 'react';

export interface MinimalTypescriptViewProps {
  message: string,
};

export default class MinimalTypescriptView extends React.Component<MinimalTypescriptViewProps> {
  render() {
    return (
      <div className="minimal-typescript-view">
        <h1>Hey, Look</h1>
        <p>{this.props.message}</p>
      </div>
    );
  }
}
