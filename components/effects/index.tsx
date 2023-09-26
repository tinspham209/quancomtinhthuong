import { EffectProps } from '@/services/effect';
import { memo } from 'react';
import './styles.scss';

function Effects({
  hide = false,
  config: effectProps,
}: {
  hide?: boolean;
  config: Array<EffectProps>;
}) {
  if (!!hide || !effectProps || effectProps.length === 0) return null;

  return (
    <div className="fall-effect">
      {effectProps.map((effectProp, index) => {
        return (
          <>
            {Array.from({ length: effectProp.amount || 1 }).map(() => (
              <div className="flake" key={`effect-item-${index}`}>
                {effectProp.isImgUrl ? (
                  <img src={effectProp.content as string} />
                ) : (
                  <span>{effectProp.content}</span>
                )}
              </div>
            ))}
          </>
        );
      })}
    </div>
  );
}

export default memo(Effects);
