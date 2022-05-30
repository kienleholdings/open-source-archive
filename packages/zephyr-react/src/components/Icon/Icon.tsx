import { library } from '@fortawesome/fontawesome-svg-core';

// FA has non-existent tree-shaking, so we have to import each icon from its absolute path
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons/faCaretLeft';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons/faCaretUp';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faAngleDown);
library.add(faAngleUp);
library.add(faBars);
library.add(faCaretDown);
library.add(faCaretLeft);
library.add(faCaretRight);
library.add(faCaretUp);
library.add(faCheck);
library.add(faSpinner);
library.add(faTimes);
library.add(faTrash);
library.add(faUser);

export interface IconProps {
  className?: string;
  icon:
    | 'angle-down'
    | 'angle-up'
    | 'bars'
    | 'caret-down'
    | 'caret-left'
    | 'caret-right'
    | 'caret-up'
    | 'check'
    | 'spinner'
    | 'times'
    | 'trash'
    | 'user';
}

export function Icon({ className, icon }: IconProps) {
  return <FontAwesomeIcon aria-hidden="true" className={className} icon={icon} />;
}

export default Icon;
