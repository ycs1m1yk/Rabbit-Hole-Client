import React, { useState } from 'react';
import SelectBox from '../components/selectBox';

export default function Home() {
  const selectItem: string[] = ['Own Data', 'Home', 'Select', 'My Page', 'My Page', 'My Page'];
  const [selectedOption, SetSelectedOption] = useState('');

  const handleSelectedOptionClick = (option) => console.log(option);
  return (
    <>
      <div>Home</div>
      <SelectBox
        options={selectItem}
        defaultValue="페이지 선택"
        selectedOption={selectedOption}
        setSelectedOption={SetSelectedOption}
        width={250}
        requestFunc={handleSelectedOptionClick}
      />
    </>
  );
}
