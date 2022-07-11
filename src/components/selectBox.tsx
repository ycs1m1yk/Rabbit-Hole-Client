import React, {
  Dispatch, MouseEvent, SetStateAction, useRef,
} from 'react';
import styled from 'styled-components';
import useSelect from '@hooks/useSelect';

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
  border: none;
  border-bottom: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  font-size: 2rem;
`;

const SelectItemContainer = styled.div`
  margin-top: 0.5rem;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.25);
`;

const SelectItem = styled.option`
  height: 2.5rem;
  font-size: 2rem;
  cursor: pointer;
  border-bottom: 1px solid black;
  padding: 0rem 1rem;
  :not(:last-child) {
    margin: 1rem 0rem;
  }
  :hover {
    color: ${(props) => props.theme.palette.eliceViolet}
  }
`;

interface ISelectBoxProps {
  options: string[];
  defaultValue: string;
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  width: string | number;
  requestFunc: any;
}

function SelectBox({
  options,
  defaultValue,
  selectedOption,
  setSelectedOption,
  width,
  requestFunc,
}: ISelectBoxProps) {
  const labelRef = useRef<HTMLLabelElement>(null);
  const [clickSelectedBox, setClickSelectedBox] = useSelect(labelRef); // SelectBox가 클릭됐는지 여부 체크
  // const selectRef = useRef<HTMLSelectElement>(null);

  // SelectBox 클릭 이벤트 핸들러
  const handleOpenSelectBox = (e: MouseEvent) => {
    e.preventDefault();
    setClickSelectedBox(true);
  };

  // requestFunc로 넘어온 API 요청 등을 여기서 처리
  const handleSelectItemClick = (e: any) => {
    const optionValue = e.target.value; // 선택한 option

    setSelectedOption(optionValue); // 선택된 Option Value 설정
    setClickSelectedBox(false); // Option 선택하면 Select Box 닫기

    requestFunc(optionValue); // 선택된 Option을 인자로 요청 함수 실행
  };

  return (
    <Label
      width={width}
      ref={labelRef}
      onMouseDown={handleOpenSelectBox}
    >
      <Select value={selectedOption} onChange={handleSelectItemClick}>
        <option>{defaultValue}</option>
        {options.map((option, i) => (
          <option key={String(i) + option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      {clickSelectedBox && (
        <SelectItemContainer>
          {options.map((option, i) => (
            <SelectItem
              key={String(i) + option}
              onClick={handleSelectItemClick}
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
