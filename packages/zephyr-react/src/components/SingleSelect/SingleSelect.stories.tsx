import { useState } from 'react';
import SingleSelect from './SingleSelect';

export function Default() {
  const [selectValue, setSelectValue] = useState('');
  return (
    <>
      Current Value is {JSON.stringify(selectValue)}
      <SingleSelect
        items={[
          {
            display: 'Item 1',
            value: 'item1',
          },
          {
            display: 'Item 2',
            value: 'item2',
          },
        ]}
        label="Some Item"
        name="no-default"
        onChange={setSelectValue}
        value={selectValue}
      />
    </>
  );
}
