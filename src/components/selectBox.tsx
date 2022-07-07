import React, {
  Dispatch, KeyboardEvent, MouseEvent, SetStateAction, useRef,
} from 'react';
import styled from 'styled-components';
import useSelect from '../hooks/useSelect';

const Label = styled.label<{ width: number | string }>`
  position: relative;
  display: inline-block;
  width: ${({ width }) => (typeof width === 'string' ? width : `${width}px`)};

  margin: 100px;
`;

const Select = styled.select`
  padding: 1rem;
  width: 100%;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SelectItemContainer = styled.div`
  border: 1px solid black;
`;

const SelectItem = styled.option`
  height: 2rem;
  font-size: 2rem;
  cursor: pointer;
  border-bottom: 1px solid black;
  margin: 1rem;
`;

interface ISelectBoxProps {
  options: string[];
  defaultValue: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  width: string | number;
  handleSelectOptionClick: any;
}

function SelectBox({
  options,
  defaultValue,
  setSelectedOption,
  width,
  handleSelectOptionClick,
}: ISelectBoxProps) {
  const labelRef = useRef<HTMLLabelElement>(null);
  const [clickSelectedBox, setClickSelectedBox] = useSelect(labelRef); // 선택된 option이 있는지 여부 체크

  const handleOpenSelectBox = (e: MouseEvent) => {
    e.preventDefault();
    setClickSelectedBox(true);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!e.code) return;
    if (e.code === 'Enter' || e.code === 'Space') {
      setClickSelectedBox(true);
    }
  };

  const handleSelectBox = (e: any, option?: string) => {
    const optionValue = option || e.target.value;
    setSelectedOption(optionValue);

    setClickSelectedBox(false);
    handleSelectOptionClick(optionValue);
  };

  return (
    <Label
      tabIndex={0}
      role="group"
      width={width}
      ref={labelRef}
      onKeyDown={handleKeyDown}
      onMouseDown={handleOpenSelectBox}
    >
      <Select value={defaultValue} onChange={handleSelectBox}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      {clickSelectedBox && (
        <SelectItemContainer>
          {options.map((option) => (
            <SelectItem
              key={option}
              onClick={(e) => handleSelectBox(e, option)}
            >
              {option}
            </SelectItem>
          ))}
        </SelectItemContainer>
      )}
    </Label>
  );
}
export default SelectBox;
