'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { SearchInitItem } from './SearchInitScreen'
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '@kit/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@kit/ui/command';

export function Search({ ...props }: any) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [init, setInit] = React.useState(true);

  const [pools, setPools] = React.useState([]);
  const [tokens, setTokens] = React.useState([]);

  const [poolsTitle, setPoolsTitle] = React.useState('');
  const [tokensTitle, setTokensTitle] = React.useState('');

  const search = async (event: any) => {
    setLoading(true);
    const q = event.target.value;

    if (q.length > 2) {
      const params = new URLSearchParams({ q });
      const res = await fetch('/api/search?' + params);

      const result = await res.json();
      setPools(result['results']['pools']);
      //setPools([]);
      setTokens(result['results']['tokens']);

      setLoading(false);
      setInit(false);
    }
    if (q.length <= 2) {
      setLoading(false);
      setPools([]);
      setTokens([]);
    }
    if (loading) {
      setPoolsTitle('Pools');
      setTokensTitle('Tokens');
    }
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    setPools([]);
    setTokens([]);
    command();
  }, []);

  return (
    <>
      <Button
        variant={props.variant}
        className={`
          relative bg-background hover:bg-accent/50 border w-full justify-start text-sm lg:p-4 text-muted-foreground h-${props.height} sm:pr-12 lg:w-full`}
        onClick={() => {
          setOpen(true), setPools([]), setTokens([]), setInit(true);
        }}
        {...props}
      >
        {/* <span className={'absolute left-2 text-xl bg-clip-text bg-primary'}> */}
        {/* <MagnifyingGlassIcon
          className={'absolute left-2 h-6 px-2 stroke-primary-500 stroke-2'}
        /> */}
        <span
          className={
            'absolute left-12 text-2xl bg-gradient-to-br bg-clip-text text-transparent' +
            ' from-primary-400 to-primary-700 leading-[1.2]'
          }
        >
          Search ...
        </span>
        {/* <span className="inline-flex lg:hidden text-xl font-semibold p-4">
          Search...
        </span> */}
        <kbd className="pointer-events-none absolute right-1.5 mx-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className={'flex my-2'}>
          {/* <MagnifyingGlassIcon
            className={' left-2 h-6 px-2 stroke-primary-500 stroke-2'}
          /> */}
          <span
            className={
              ' left-12 text-2xl bg-gradient-to-br bg-clip-text text-transparent' +
              ' from-primary-400 to-primary-700 leading-[1.2]'
            }
          >
            Search ...
          </span>
        </div>
        <div
          className="flex items-center px-3  bg-slate-50 dark:bg-primary/30"
          cmdk-input-wrapper=""
        >
          <input
            onChange={search}
            type="text"
            className={
              'flex h-10 w-full rounded-md py-3 text-xl outline-none bg-slate-50 dark:bg-transparent'
            }
            placeholder="Search for anything in Floe"
          />
        </div>
        <CommandList>
          {loading ? (
            <CommandEmpty>Searching ...</CommandEmpty>
          ) : init ? (
            <SearchInitItem />
          ) : (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          <CommandGroup heading={tokens.length == 0 ? '' : 'Tokens'}>
            {tokens.map((item) => (
              <CommandItem
                key={item['address']}
                value={item['address']}
                onSelect={() => {
                  runCommand(() =>
                    router.push((`/token/` + item['address']) as string),
                  );
                }}
              >
                {/* <SearchTokenItem hit={item} key={item['address']} /> */}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading={pools.length == 0 ? '' : 'Pools'}>
            {pools.map((item) => (
              <CommandItem
                key={item['id']}
                value={item['id']}
                onSelect={() => {
                  runCommand(() =>
                    router.push((`/pool/` + item['id']) as string),
                  );
                }}
              >
                {/* <SearchPoolItem hit={item} key={item['id']} /> */}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
