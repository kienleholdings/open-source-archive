import Breadcrumbs from './Breadcrumbs';

const ITEMS = [
  { display: 'First Item', value: 'firstItem' },
  { display: 'Second Item', value: 'secondItem' },
  { display: 'Third Item', value: 'thirdItem' },
  { display: 'Fourth Item', value: 'fourthItem' },
];

export function NoItems() {
  return <Breadcrumbs items={[]} onClick={alert} />;
}

export function OneItem() {
  return <Breadcrumbs items={[ITEMS[0]]} onClick={alert} />;
}

export function TwoItems() {
  return <Breadcrumbs items={[ITEMS[0], ITEMS[1]]} onClick={alert} />;
}

export function ThreeItems() {
  return <Breadcrumbs items={[ITEMS[0], ITEMS[1], ITEMS[2]]} onClick={alert} />;
}

export function FourItems() {
  return <Breadcrumbs items={ITEMS} onClick={alert} />;
}
