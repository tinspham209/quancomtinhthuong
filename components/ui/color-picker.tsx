import { useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';

export const ColorPicker = ({
  label = '',
  value,
  disableAlpha = true,
  onChange,
}: {
  label?: string;
  value: string;
  disableAlpha?: boolean;
  onChange: (value: string) => void;
}) => {
  const [state, setState] = useState({
    displayColorPicker: false,
  });

  const handleClick = () => {
    setState({ ...state, displayColorPicker: !state.displayColorPicker });
  };

  const handleClose = () => {
    setState({ ...state, displayColorPicker: false });
  };

  const handleChange = (color: ColorResult) => {
    onChange(color.hex);
  };

  return (
    <div>
      <p>{label}</p>
      <div
        className={
          'p-2 bg-white rounded-1 shadow-1 inline-block cursor-pointer border-2 border-gray-300 my-1'
        }
        onClick={handleClick}
      >
        <div
          className={'w-20 h-4 rounded-2 border-gray-400 border-2'}
          style={{
            background: value,
          }}
        />
      </div>
      {state.displayColorPicker ? (
        <div className={'absolute z-2 '}>
          <div className={'fixed top-0 right-0 bottom-0 left-0'} onClick={handleClose} />
          <SketchPicker
            color={value}
            onChange={handleChange}
            width={'250'}
            disableAlpha={disableAlpha}
            className="w-[300px] text-black"
          />
        </div>
      ) : null}
    </div>
  );
};
