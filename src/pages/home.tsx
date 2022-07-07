import React, { useState } from 'react';
import SelectBox from '../components/selectBox';

export default function Home() {
  const selectItem: string[] = ['Own Data', 'Home', 'Select', 'My Page'];
  const [selectedOption, SetSelectedOption] = useState('페이지 선택');

  const handleSelectedOptionClick = (e) => console.log(e);
  return (
    <>
      <div>Home</div>
      <SelectBox
        options={selectItem}
        defaultValue={selectedOption}
        setSelectedOption={SetSelectedOption}
        width={250}
        handleSelectOptionClick={handleSelectedOptionClick}
      />
    </>
  );
}
