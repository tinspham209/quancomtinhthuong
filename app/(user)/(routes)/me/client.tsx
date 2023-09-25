'use client';

import { Button, Heading } from '@/components/ui';
import { ColorPicker } from '@/components/ui/color-picker';
import { useProfileStore } from '@/hooks';
import { useThemeStore } from '@/hooks/use-local-theme';
import { useUpdateAppConfig } from '@/queries/config';
import { ThemeConfig, ThemeConfigProps, setThemeLocalStorage } from '@/services/theme';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import getRandomImage from './actions';

const themesList: Array<ThemeConfig> = [
  {
    name: 'Light',
    global: {
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
    profile: {
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
  },
  {
    name: 'Dark',
    global: {
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
    profile: {
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
  },
];

const PageContainer = styled.div`
  .card-theme {
    background: ${({ theme }) => theme.profile?.card?.bgColor};
    color: ${({ theme }) => theme.profile?.card?.color};
  }

  .primary-button {
    background: ${({ theme }) => theme.profile?.common?.primaryBtnBgColor};
    color: ${({ theme }) => theme.profile?.common?.primaryBtnColor};
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

  const { theme, onSetTheme, onSetCommonGlobalTheme, onSetCardProfileTheme } = useThemeStore();
  const { global: globalTheme, profile: profileTheme } = theme;
  const [imageUrl, setImageUrl] = useState<string>(
    'https://images.unsplash.com/photo-1693323932877-04b1a3068ade?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyNTM0OTB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzAwMTR8&ixlib=rb-4.0.3&q=80&w=1080',
  );

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

  const handleUpdateTheme = (theme: Partial<ThemeConfigProps>) => {
    onSetTheme(theme);
  };

  const handleSaveTheme = () => {
    setThemeLocalStorage(theme);
    toast.success('Update theme successfully!');
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
        <ProfileContainer className="card-theme w-[50%] max-w-[800px] min-w-[150px] my-0 mx-auto p-4 flex flex-col items-center opacity-90">
          <ProfileImage
            src={imgUrl}
            alt={`${name}'s Profile Image`}
            className="w-[200px] h-[200px] rounded-full mb-5 object-cover "
          />
          <h2 className={`text-3xl font-bold mb-2 test`}>{name}</h2>
          <p className="text-lg mb-4">@{userName}</p>
          <p className="text-x text-center">{description}</p>
        </ProfileContainer>

        <ThemeContainer className="card-theme w-[60%] min-w-[400px] my-0 mx-auto p-4 opacity-90">
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

          <div className="grid grid-cols-3">
            <div>
              <p>Page BG Color</p>
              <ColorPicker
                value={globalTheme?.common?.bgColor || ''}
                onChange={(value) =>
                  onSetCommonGlobalTheme({
                    bgColor: value,
                  })
                }
              />
            </div>

            <div>
              <p>Page Color</p>
              <ColorPicker
                value={globalTheme?.common?.color || ''}
                onChange={(value) =>
                  onSetCommonGlobalTheme({
                    color: value,
                  })
                }
              />
            </div>

            <div></div>

            <div>
              <p>Card BG Color</p>
              <ColorPicker
                value={profileTheme?.common?.bgColor || ''}
                onChange={(value) =>
                  onSetCardProfileTheme({
                    bgColor: value,
                  })
                }
              />
            </div>

            <div>
              <p>Card Color</p>
              <ColorPicker
                value={profileTheme?.common?.color || ''}
                onChange={(value) =>
                  onSetCardProfileTheme({
                    color: value,
                  })
                }
              />
            </div>

            <div>
              <p>Border Color</p>
              <ColorPicker
                value={profileTheme?.common?.borderColor || ''}
                onChange={(value) =>
                  onSetCardProfileTheme({
                    borderColor: value,
                  })
                }
              />
            </div>
          </div>

          <div>
            <Button onClick={handleSaveTheme} className="primary-button mt-4">
              Save Theme
            </Button>
          </div>
        </ThemeContainer>
      </PageContainer>
    </div>
  );
};
export default Client;
