import { ReactNode } from 'react';
import getChildComponent from '../../../utils/getChildComponent';
import SelectTrigger from './SelectTrigger';
import SelectOption from '../atoms/SelectOption';
import SelectOptionWrapper from '../atoms/SelectOptionWrapper';
import { css } from '@emotion/react';

interface Props {
  children: ReactNode;
}

function SelectWrapperMain({ children }: Props) {
  const selectTrigger = getChildComponent(children, SelectTrigger);
  const selectOptionWrapper = getChildComponent(children, SelectOptionWrapper);

  return (
    <div
      css={css({
        position: 'relative',
      })}
    >
      {selectTrigger}
      {selectOptionWrapper}
    </div>
  );
}

const SelectWrapper = Object.assign(SelectWrapperMain, {
  Trigger: SelectTrigger,
  OptionWrapper: SelectOptionWrapper,
  Option: SelectOption,
});

export default SelectWrapper;
