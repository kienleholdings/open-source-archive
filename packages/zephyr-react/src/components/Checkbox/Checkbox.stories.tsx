import { useState } from 'react';
import InputGroup from 'components/InputGroup';

import Checkbox from './Checkbox';

export function Uncontrolled() {
  return (
    <InputGroup checkboxRadio label="Uncontrolled Checkboxes">
      <Checkbox label="Checkbox 1" name="chk-1" />
      <Checkbox label="Checkbox 2" name="chk-2" />
    </InputGroup>
  );
}

export function Controlled() {
  const [box1Checked, setBox1Checked] = useState(true);
  const [box2Checked, setBox2Checked] = useState(false);

  return (
    <InputGroup checkboxRadio label="Controlled Checkboxes">
      <Checkbox label="Checkbox 1" name="cont-chk-1" onClick={setBox1Checked} value={box1Checked} />
      <Checkbox label="Checkbox 2" name="cont-chk-2" onClick={setBox2Checked} value={box2Checked} />
    </InputGroup>
  );
}
