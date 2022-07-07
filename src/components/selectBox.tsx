import React, {
  Dispatch, MouseEvent, SetStateAction, useRef,
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
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  width: string | number;
  requestFunc: any;
}

/**
 * @param {string[]} options 설정하려는 select box의 option 배열
 * @param {string} defaultValue select box의 기본 값
 * @param {string} selectedOption 현재 선택한 option, 호출하는 컴포넌트에서 option 상태 관리
 * @param {string | number} width select box를 감싸고 있는 label의 넓이
 * @param {Dispatch<SetStateAction<string>>} setSelectedOption 선택한 option값으로 변경해주는 함수,
 * 호출하는 컴포넌트에서 option 상태 관리
 * @param {any} requestFunc 현재 선택한 option의 값을 인자로 요청하려는 함수
 */

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
