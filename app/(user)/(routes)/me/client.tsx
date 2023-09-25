'use client';

import { Button, Heading } from '@/components/ui';
import { ThemeContext } from '@/providers/theme-provider';
import { ThemeConfig } from '@/services/theme';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import getRandomImage from './actions';
import { ColorPicker } from '@/components/ui/color-picker';
import { useProfileStore } from '@/hooks';
import { useUpdateAppConfig } from '@/queries/config';

const themesList: Array<ThemeConfig> = [
  {
    name: 'Light',
    common: {
      bgColor: '#fff',
      color: '#000',
      primaryBtnBgColor: '#000',
      primaryBtnColor: '#fff',
    },
    card: {
      bgColor: '#fff',
      color: '#000',
    },
  },
  {
    name: 'Dark',
    common: {
      bgColor: '#1A1A1A',
      color: '#fff',
      primaryBtnBgColor: '#fff',
      primaryBtnColor: '#1A1A1A',
    },
    card: {
      bgColor: '#1A1A1A',
      color: '#fff',
    },
  },
];

const PageContainer = styled.div`
  .common-theme {
    background: ${({ theme }) => theme.common.bgColor};
    color: ${({ theme }) => theme.common.color};
  }

  .card-theme {
    background: ${({ theme }) => theme.card.bgColor};
    color: ${({ theme }) => theme.card.color};
  }

  .primary-button {
    background: ${({ theme }) => theme.common.primaryBtnBgColor};
    color: ${({ theme }) => theme.common.primaryBtnColor};
  }
`;

const ProfileContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  border: 3px solid #ff6600;
`;

const ThemeContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

interface Props {}

const Client: React.FC<Props> = ({}: Props) => {
  const { profile } = useProfileStore();
  const { updateAppConfig } = useUpdateAppConfig();

  const { theme, setLocalTheme } = useContext(ThemeContext);
  const [imageUrl, setImageUrl] = useState<string>('');

  const fetchRandomImage = async () => {
    const randomImage = await getRandomImage({ numberOfImages: 1 });
    if (!!randomImage) {
      setImageUrl(randomImage[0]?.urls?.regular);
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  if (!profile) return null;

  const {
    name,
    userName,
    imgUrl,
    role: { description },
  } = profile;

  const handleUpdateTheme = (theme: ThemeConfig) => {
    setLocalTheme(theme);
  };

  const handleSaveTheme = () => {
    updateAppConfig({ configs: theme });
  };

  return (
    <div
      className="p-4 min-h-[92vh]"
      style={{
        backgroundImage: `url('${imageUrl || profile?.imgUrl}')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <PageContainer className="my-6 grid grid-cols-2 gap-3">
        <ProfileContainer className="card-theme w-[80%] max-w-[800px] min-w-[150px] my-0 mx-auto p-4 flex flex-col items-center opacity-90">
          <ProfileImage
            src={imgUrl}
            alt={`${name}'s Profile Image`}
            className="w-[200px] h-[200px] rounded-full mb-5 object-cover "
          />
          <h2 className="text-3xl font-bold mb-2">{name}</h2>
          <p className="text-lg mb-4">@{userName}</p>
          <p className="text-x text-center">{description}</p>
        </ProfileContainer>

        <ThemeContainer className="card-theme w-[40%] min-w-[400px] my-0 mx-auto p-4 opacity-90">
          <div className="mb-4 flex flex-col sm:flex-row md:justify-between">
            <Heading title="Select theme (Experiment)" />
            <div className="mt-2 sm:mt-0"></div>
          </div>

          <div className="flex gap-2 mt-2 mb-4">
            {themesList.map((theme, index) => {
              return (
                <div key={`${theme.name}-${index}`}>
                  <Button onClick={() => handleUpdateTheme(theme)} className="primary-button">
                    {theme.name}
                  </Button>
                </div>
              );
            })}
          </div>

          <div>
            <p>Page BG Color</p>
            <ColorPicker
              value={theme.common.bgColor || ''}
              onChange={(value) =>
                setLocalTheme({
                  ...theme,
                  common: {
                    ...theme.common,
                    bgColor: value,
                  },
                })
              }
            />

            <p>Page Color</p>
            <ColorPicker
              value={theme.common.color || ''}
              onChange={(value) =>
                setLocalTheme({
                  ...theme,
                  common: {
                    ...theme.common,
                    color: value,
                  },
                })
              }
            />

            <p>Card BG Color</p>
            <ColorPicker
              value={theme.card.bgColor || ''}
              onChange={(value) =>
                setLocalTheme({
                  ...theme,
                  card: {
                    ...theme.card,
                    bgColor: value,
                  },
                })
              }
            />

            <p>Card Color</p>
            <ColorPicker
              value={theme.card.color || ''}
              onChange={(value) =>
                setLocalTheme({
                  ...theme,
                  card: {
                    ...theme.card,
                    color: value,
                  },
                })
              }
            />
          </div>

          {profile.role.name === 'ADMIN' && (
            <div>
              <Button onClick={handleSaveTheme} className="primary-button mt-4">
                Save Theme
              </Button>
            </div>
          )}
        </ThemeContainer>
      </PageContainer>
    </div>
  );
};
export default Client;
