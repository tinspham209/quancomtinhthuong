'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React, { Fragment } from 'react';

interface Props {}

const GameDropdown: React.FC<Props> = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={'outline'}>
          Play Game
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[420px] overflow-y-auto">
        {gameOptions.map((game) => (
          <Fragment key={game.label}>
            <DropdownMenuItem asChild>
              <Link href={game.url} target="_blank" className="cursor-pointer">
                {game.label}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GameDropdown;

export const gameOptions = [
  {
    label: 'Gravity Ball',
    url: 'https://r3f-gravity-ball.vercel.app/',
  },
  {
    label: 'Break out',
    url: 'https://ismailcankaratas.com.tr/break-out-game/',
  },
  {
    label: 'Snake Game',
    url: 'https://react-typescript-snake.vercel.app/',
  },
  {
    label: '2048',
    url: 'https://ye-yo.github.io/2048/',
  },
  {
    label: 'Connect Four',
    url: 'https://aleksfedotov.github.io/',
  },
  {
    label: 'TenZi Dice',
    url: 'https://tenzi-react.netlify.app/',
  },
  {
    label: 'ScratchCard',
    url: 'https://scratch-bonanza.vercel.app/play',
  },
  {
    label: 'Cherry Charm',
    url: 'https://cherry-charm.vercel.app/',
  },
  {
    label: 'Find the ring',
    url: 'https://qwanysh.github.io/find-the-ring/game',
  },
  {
    label: 'Spider Solitaire',
    url: 'https://react-solitaire-57967.web.app/',
  },
  {
    label: 'Geography Class',
    url: 'https://geography-class-minigame.vercel.app/',
  },
  {
    label: 'Rougelike',
    url: 'https://roguelike-demo.netlify.app/',
  },
  {
    label: 'Tic Tac Toe',
    url: 'https://react-games-b6177.firebaseapp.com/tic-tac-toe/',
  },
  {
    label: 'Light Out',
    url: 'https://haobrien.github.io/lights-out/',
  },
];
