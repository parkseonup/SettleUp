import { ReactNode } from 'react';
import getChildComponent from '../../../utils/getChildComponent';
import Trigger from './Trigger';
import Option from '../atoms/Option';
import OptionWrapper from '../atoms/OptionWrapper';
import { css } from '@emotion/react';

interface Props {
  children: ReactNode;
}

function Wrapper({ children }: Props) {
  const trigger = getChildComponent(children, Trigger);
  const optionWrapper = getChildComponent(children, OptionWrapper);

  return (
    <div
      css={css({
        position: 'relative',
      })}
    >
      {trigger}
      {optionWrapper}
    </div>
  );
}

const SelectWrapper = Object.assign(Wrapper, {
  Trigger: Trigger,
  OptionWrapper: OptionWrapper,
  Option: Option,
});

export default SelectWrapper;
