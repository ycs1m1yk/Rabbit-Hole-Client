import {
  Dispatch, RefObject, SetStateAction, useEffect, useState,
} from 'react';

/*
  SelectBox 클릭 여부에 따라 Active 상태 처리하는 Hook
  - SelectBox 클릭 시 true
  - 그 외 공간 클릭 시 false
 */
const useSelect = <T extends HTMLElement>(
  selectBox: RefObject<T>,
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [clickSelectedBox, setClickSelectedBox] = useState(false);

  useEffect(() => {
    const handleSelect = (e: MouseEvent) => {
      if (!e.target) return;

      if (!selectBox.current?.contains(e.target as HTMLElement)) {
        setClickSelectedBox(false);
      }
    };
    document.addEventListener('click', handleSelect);
    return () => document.removeEventListener('click', handleSelect);
  }, [selectBox]);
  return [clickSelectedBox, setClickSelectedBox];
};

export default useSelect;
