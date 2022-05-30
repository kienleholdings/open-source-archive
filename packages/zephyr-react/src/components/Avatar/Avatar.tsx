import { useMemo } from 'react';
import type { ReactNode } from 'react';

import Icon from 'components/Icon';
import type { ClassName } from 'types';
import { computeClassName } from 'utils/commonClassNames';

export interface AvatarProps {
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    icon?: ClassName;
    image?: ClassName;
    wrapper?: ClassName;
  };
  /**
   * The image to display for the avatar. Will default to a user icon if undefined
   */
  image?: string;
  /**
   * This will replace the contents of the avatar with a custom element, however size will still be determined by props
   */
  imageComponentOverride?: ReactNode;
  /**
   * Sets the type of alert to display. This will change the background and text colors
   */
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Shows a profile picture or an ambiguous user icon if none is provided. Available in 5 sizes
 */
export function Avatar({ classNames, image, imageComponentOverride, size }: AvatarProps) {
  const computedClassNames = useMemo(
    () => ({
      icon: computeClassName(['block'], classNames?.icon),
      image: computeClassName(['h-full', 'w-full'], classNames?.image),
      wrapper: computeClassName(
        [
          {
            'h-16': size === 'xs',
            'h-24': size === 'sm',
            'h-32': size === 'md',
            'h-48': size === 'lg',
            'h-64': size === 'xl',
            'items-center': !image,
            flex: !image,
            'justify-center': !image,
            'w-16': size === 'xs',
            'w-24': size === 'sm',
            'w-32': size === 'md',
            'w-48': size === 'lg',
            'w-64': size === 'xl',
          },
          'bg-primary',
          'overflow-hidden',
          'rounded-round',
          'text-primary-type',
        ],
        classNames?.wrapper
      ),
    }),
    [classNames, image, size]
  );

  // Because icons are **technically** text instead of images, we need to do some custom numbers here
  // in order to get the icon sizes from the spec without breaking our tailwind standards
  const fontSize = useMemo(() => {
    switch (size) {
      case 'xs':
        return 8;
      case 'sm':
        return 12;
      case 'md':
        return 16;
      case 'lg':
        return 24;
      case 'xl':
        return 32;
      default:
        // eslint-disable-next-line no-console
        console.error(
          `zephyr-react: You've passed in an unsupported avatar size ${size}. This may result in weird behavior (you can use TypeScript to ensure this never happens)`
        );
        return 0;
    }
  }, [size]);

  return (
    <div className={computedClassNames.wrapper} style={{ fontSize: `${fontSize}px` }}>
      {!imageComponentOverride && image && (
        <img alt="" className={computedClassNames.image} src={image} />
      )}
      {!imageComponentOverride && !image && (
        <Icon className={computedClassNames.icon} icon="user" />
      )}
      {imageComponentOverride}
    </div>
  );
}

export default Avatar;
