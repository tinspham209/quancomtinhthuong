import { getRandomId } from '@/utils';
import { useParams } from 'next/navigation';
import React from 'react';
import './styles.css';

interface Props {}

const AnimationOrderHeader: React.FC<Props> = () => {
  const { storeSlug } = useParams();
  const title = storeSlug;

  const getRandomTextColor = (index: number) => {
    const textColorClasses = [
      'text-red-500',
      'text-orange-500',
      'text-amber-500',
      'text-yellow-500',
      'text-lime-500',
    ];

    return textColorClasses[index];
  };

  return (
    <div className="hidden sm:block absolute top-0 left-[50%]">
      <div className="content">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className={`texts ${getRandomTextColor(index)}`} key={`${index}-${getRandomId()}`}>
            {Array.from({ length: 2 }).map((content) => (
              <p key={`${getRandomId()}`} className="">
                {title}
              </p>
            ))}
            <p>{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimationOrderHeader;
