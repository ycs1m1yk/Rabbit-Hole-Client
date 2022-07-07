import React, { useState } from 'react';
import SelectBox from '../components/selectBox';

export default function Home() {
  const selectItem: string[] = ['1', '2', '3', '4', '5', '6'];
  const [selectedOption, SetSelectedOption] = useState('');

  // API 요청 테스트
  const BASE_URL = 'https://yts.mx/api/v2/list_movies.json?page_number=';
  const handleSelectedOptionClick = async (pageNum) => {
    const response = await fetch(`${BASE_URL}${pageNum}`);
    const { data: { movies } } = await response.json();

    console.log(`Request API URL : ${BASE_URL}${pageNum}`, movies);
  };

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
