'use client';

import React from 'react';
import ReactJson from 'react-json-view';
interface Props {
  src: any;
}

const JsonView: React.FC<Props> = ({ src }) => {
  return (
    <div className="my-3">
      <ReactJson src={src || {}} />
    </div>
  );
};

export default JsonView;
