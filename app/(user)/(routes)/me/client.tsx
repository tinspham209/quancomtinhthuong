'use client';

import {
  Button,
  Heading,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { ColorPicker } from '@/components/ui/color-picker';
import { useProfileStore } from '@/hooks';
import { useThemeStore } from '@/hooks/use-local-theme';
import { useUpdateAppConfig } from '@/queries/config';
import { ThemeConfig, ThemeConfigProps, setThemeLocalStorage } from '@/services/theme';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import getRandomImage from './actions';
import { CSS } from 'styled-components/dist/types';

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
        borderRadius: 8,
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
        borderRadius: 8,
        titleColor: '#000',
        descriptionColor: '#000',
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: '#000',
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
        borderRadius: 8,
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
        borderRadius: 8,
        titleColor: '#fff',
        descriptionColor: '#fff',
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: '#fff',
      },
    },
  },
  {
    name: 'Yahoo 360',
    global: {
      common: {
        bgColor: '#f7ea33',
        color: '#000801',
        primaryBtnBgColor: '#fff',
        primaryBtnColor: '#f72528',
      },
      card: {
        bgColor: '#f72528',
        color: '#fff',
        borderRadius: 8,
      },
    },
    profile: {
      common: {
        bgColor: '#f72528',
        color: '#fff',
        primaryBtnBgColor: '#fff',
        primaryBtnColor: '#f72528',
      },
      card: {
        bgColor: '#f72528',
        color: '#fffc25',
        borderRadius: 12,
        titleColor: '#06ff00',
        descriptionColor: '#ffee78',
        borderWidth: 5,
        borderStyle: 'dashed',
        borderColor: '#1ffc98',
      },
    },
  },
];

const PageContainer = styled.div`
  .card-theme {
    background: ${({ theme }) => theme.profile?.card?.bgColor};
    color: ${({ theme }) => theme.profile?.card?.color};
    border-color: ${({ theme }) => theme.profile?.card?.borderColor};
    border-width: ${({ theme }) => `${theme.profile?.card?.borderWidth}px`};
    border-style: ${({ theme }) => theme.profile?.card?.borderStyle};
    background-image: ${({ theme }) => `url('${theme.profile?.card?.imageUrl}')`};
    border-radius: ${({ theme }) => `${theme.profile?.card?.borderRadius}px`};
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);

    &:hover {
      background: ${({ theme }) => theme.profile?.card?.hoverColor};
    }
  }

  .reverse-card {
    background: ${({ theme }) => theme.profile?.card?.color};
    color: ${({ theme }) => theme.profile?.card?.bgColor};
    border-color: ${({ theme }) => theme.profile?.card?.borderColor};
    border-width: ${({ theme }) => `${theme.profile?.card?.borderWidth}px`};
    border-style: ${({ theme }) => theme.profile?.card?.borderStyle};
    background-image: ${({ theme }) => `url('${theme.profile?.card?.imageUrl}')`};
    border-radius: ${({ theme }) => `${theme.profile?.card?.borderRadius}px`};
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);

    &:hover {
      background: ${({ theme }) => theme.profile?.card?.hoverColor};
    }
  }

  .card-title {
    color: ${({ theme }) => theme.profile?.card?.titleColor};
  }

  .card-desc {
    color: ${({ theme }) => theme.profile?.card?.descriptionColor};
  }

  .primary-button {
    background: ${({ theme }) => theme.profile?.common?.primaryBtnBgColor};
    color: ${({ theme }) => theme.profile?.common?.primaryBtnColor};
  }
`;

const ProfileImage = styled.img`
  border: 3px solid #ff6600;
`;

interface Props {}

const Client: React.FC<Props> = ({}: Props) => {
  const { profile } = useProfileStore();
  const { updateAppConfig } = useUpdateAppConfig();

  const { theme, onSetTheme, onSetCommonGlobalTheme, onSetCardProfileTheme } = useThemeStore();
  const { global: globalTheme, profile: profileTheme } = theme;
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
        <div>
          <div className="flex items-end gap-4">
            <div className="card-theme w-[50%] max-w-[800px] min-w-[150px] my-0 ml-24 p-4 flex flex-col items-center opacity-90">
              <ProfileImage
                src={imgUrl}
                alt={`${name}'s Profile Image`}
                className="w-[200px] h-[200px] rounded-full mb-5 object-cover"
              />
              <h2 className={`text-3xl font-bold mb-2 test card-title`}>{name}</h2>
              <p className="text-lg mb-4 card-desc">@{userName}</p>
              <p className="text-x text-center">{description}</p>
            </div>
            <div className="reverse-card w-[25%] p-4 opacity-90">
              <img src="/kiss.png" />
            </div>
          </div>
          <div className="card-theme w-[60%] max-w-[800px] min-w-[150px] my-4 mx-auto p-4 flex flex-col items-center opacity-90">
            <p className="card-title text-3xl font-bold">3 words about me</p>
            <p className="text-3xl text-purple-800 font-bold my-1">Purple</p>
            <p className="text-2xl text-violet-500 font-bold">Obsequious</p>
            <p className="text-2xl font-bold my-1">Clairvoyant</p>
          </div>
        </div>

        <div>
          <div className="card-theme w-[80%] min-w-[600px] mx-auto p-4 opacity-90 mb-4">
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
          </div>

          <div className="card-theme w-[80%] min-w-[600px] my-0 mx-auto p-4 opacity-90">
            <div className="mb-4 flex flex-col sm:flex-row md:justify-between">
              <Heading title="Custom theme" />
              <div className="mt-2 sm:mt-0"></div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              <div className="col-span-5 font-bold">
                <p className="text-lg">Page</p>
              </div>
              <ColorPicker
                label="BG Color"
                value={globalTheme?.common?.bgColor || ''}
                onChange={(value) =>
                  onSetCommonGlobalTheme({
                    bgColor: value,
                  })
                }
              />

              <ColorPicker
                label="Color"
                value={globalTheme?.common?.color || ''}
                onChange={(value) =>
                  onSetCommonGlobalTheme({
                    color: value,
                  })
                }
              />

              <div className="col-span-3"></div>

              <div className="col-span-5 font-bold">
                <p className="text-lg">Card</p>
              </div>

              <ColorPicker
                label="BG Color"
                value={profileTheme?.card?.bgColor || ''}
                onChange={(value) =>
                  onSetCardProfileTheme({
                    bgColor: value,
                  })
                }
              />

              <ColorPicker
                label="Color"
                value={profileTheme?.card?.color || ''}
                onChange={(value) =>
                  onSetCardProfileTheme({
                    color: value,
                  })
                }
              />

              <ColorPicker
                label="Title Color"
                value={profileTheme?.card?.titleColor || ''}
                onChange={(value) =>
                  onSetCardProfileTheme({
                    titleColor: value,
                  })
                }
              />

              <ColorPicker
                label="Desc Color"
                value={profileTheme?.card?.descriptionColor || ''}
                onChange={(value) =>
                  onSetCardProfileTheme({
                    descriptionColor: value,
                  })
                }
              />

              <ColorPicker
                label="Hover Color"
                value={profileTheme?.card?.hoverColor || ''}
                onChange={(value) =>
                  onSetCardProfileTheme({
                    hoverColor: value,
                  })
                }
              />

              <ColorPicker
                label="Border Color"
                value={profileTheme?.card?.borderColor || ''}
                onChange={(value) =>
                  onSetCardProfileTheme({
                    borderColor: value,
                  })
                }
              />

              <Input
                label="Border Width"
                value={profileTheme?.card?.borderWidth || ''}
                onChange={(e) => {
                  onSetCardProfileTheme({
                    borderWidth: Number(e.target.value),
                  });
                }}
                type="number"
              />

              <div>
                <p>Border Style</p>
                <Select
                  onValueChange={(value: CSS.Property.BorderStyle) =>
                    onSetCardProfileTheme({
                      borderStyle: value,
                    })
                  }
                  value={profileTheme?.card?.borderStyle}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solid">solid</SelectItem>
                    <SelectItem value="dashed">dashed</SelectItem>
                    <SelectItem value="dotted">dotted</SelectItem>
                    <SelectItem value="double">double</SelectItem>
                    <SelectItem value="groove">groove</SelectItem>
                    <SelectItem value="hidden">hidden</SelectItem>
                    <SelectItem value="inset">inset</SelectItem>
                    <SelectItem value="none">none</SelectItem>
                    <SelectItem value="outset">outset</SelectItem>
                    <SelectItem value="ridge">ridge</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Input
                label="Border Radius"
                value={profileTheme?.card?.borderRadius || ''}
                onChange={(e) => {
                  onSetCardProfileTheme({
                    borderRadius: Number(e.target.value),
                  });
                }}
                type="number"
              />

              <Input
                label="Image Url"
                value={profileTheme?.card?.imageUrl || ''}
                onChange={(e) => {
                  onSetCardProfileTheme({
                    imageUrl: e.target.value,
                  });
                }}
              />
            </div>

            <div>
              <Button onClick={handleSaveTheme} className="primary-button mt-4">
                Save Theme
              </Button>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};
export default Client;
