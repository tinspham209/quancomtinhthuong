'use client';

import {
  Button,
  Heading,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { ColorPicker } from '@/components/ui/color-picker';
import { useProfileStore, useUserUpdateModal } from '@/hooks';
import { useEffectsStore } from '@/hooks/use-local-config';
import { useThemeStore } from '@/hooks/use-local-theme';
import { useUpdateAppConfig } from '@/queries/config';
import { useGetRandomImage } from '@/queries/misc';
import { EffectConfig } from '@/services/effect';
import { effectsList } from '@/services/effect/effects-list.mock';
import { setThemeLocalStorage, ThemeConfigProps } from '@/services/theme';
import { themesList } from '@/services/theme/theme-list.mock';
import { UserCog } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { CSS } from 'styled-components/dist/types';

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
  const userEditModal = useUserUpdateModal();
  const { profile } = useProfileStore();
  const { updateAppConfig } = useUpdateAppConfig();

  const { theme, onSetTheme, onSetCommonGlobalTheme, onSetCardProfileTheme } = useThemeStore();
  const { onSetEffects } = useEffectsStore();
  const { global: globalTheme, profile: profileTheme } = theme;

  const { randomImage } = useGetRandomImage();

  const [openCreateStore, setOpenCreateStore] = useState(false);
  const handleOpenCreateStore = (open: boolean) => {
    setOpenCreateStore(open);
  };

  const [openPopover, setOpenPopover] = useState(false);

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

  const handleUpdateEffect = (effects: EffectConfig) => {
    onSetEffects(effects);
  };

  return (
    <div
      className="p-4 min-h-[92vh]"
      style={{
        backgroundImage: `url('${randomImage?.[0]?.urls?.regular || profile?.imgUrl}')`,
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
              <p className="text-lg mb-2 card-desc">@{userName}</p>
              <p className="text-md text-center">Role: {description}</p>
            </div>
            <div className="w-[25%] flex flex-col space-y-2">
              <div className="reverse-card p-4 opacity-90 flex justify-center">
                <UserCog
                  width={122}
                  height={105}
                  cursor="pointer"
                  onClick={() => {
                    userEditModal.onOpen();
                  }}
                  onAbort={() => {
                    userEditModal.onClose();
                  }}
                />
              </div>
              <div className="reverse-card p-4 opacity-90">
                <Image
                  src="/kiss.png"
                  alt="kiss"
                  width={122}
                  height={105}
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="card-theme w-[60%] max-w-[800px] min-w-[150px] my-4 mx-auto p-4 flex flex-col items-center opacity-90">
            <p className="card-title text-3xl font-bold">3 words about me</p>
            <p className="text-3xl text-purple-800 font-bold my-1">Purple</p>
            <p className="text-2xl text-violet-500 font-bold">Obsequious</p>
            <p className="text-2xl text-cyan-500 font-bold my-1">Clairvoyant</p>
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

          <div className="card-theme w-[80%] min-w-[600px] my-0 mx-auto p-4 opacity-90 z-10 relative">
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

          <div className="card-theme w-[80%] min-w-[600px] mx-auto p-4 opacity-90 my-4 z-0 relative">
            <div className="mb-4 flex flex-col sm:flex-row md:justify-between">
              <Heading title="Effects" />
              <div className="mt-2 sm:mt-0"></div>
            </div>

            <div className="flex gap-2 mt-2 mb-4">
              {effectsList.map((theme, index) => {
                return (
                  <div key={`${theme.name}-${index}`}>
                    <Button onClick={() => handleUpdateEffect(theme)} className="primary-button">
                      {theme.name}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};
export default Client;
