'use client';

import Link from 'next/link';
import Image from 'next/image';
// import { Skeleton } from '@kit/ui/Skeleton';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@kit/ui/command';
// import { SearchPoolItem } from './searchPoolItem';
// import { SearchTokenItem } from './searchTokenItem';
// import { formatDollarAmount } from '~/lib/numbers';
import { useState, useEffect } from 'react';

export async function SearchInitItem() {
  const [errorImageToken0, setErrorImageToken0] = useState(false);
  const [errorImageToken1, setErrorImageToken1] = useState(false);
  const errorImageUrl = '/assets/images/floe_placeholder.png';
  const [loading, setLoading] = useState(true);
  const [topPools, setTopPools] = useState([]);
  const [topTokens, setTopTokens] = useState([]);

  useEffect(() => {
    fetch('/api/search/top')
      .then((res) => res.json())
      .then((data) => {
        setTopPools(data['results']['pools']);
        setTopTokens(data['results']['tokens']);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        {/* <CommandGroup heading={'Top tokens'}>
          <div className="p-4">
            <div className="space-y-2 pb-1">
              <Skeleton className="h-5 w-2/5" />
            </div>
            <div className="space-y-2 pb-1">
              <Skeleton className="h-5 w-2/5" />
            </div>
            <div className="space-y-2 pb-1">
              <Skeleton className="h-5 w-2/5" />
            </div>
            <div className="space-y-2 pb-1">
              <Skeleton className="h-5 w-2/5" />
            </div>
            <div className="space-y-2 pb-1">
              <Skeleton className="h-5 w-2/5" />
            </div>
          </div>
        </CommandGroup>
        <CommandGroup heading={'Top pools'}>
          <div className="p-4">
            <div className="space-y-2 pb-1">
              <Skeleton className="h-5 w-2/5" />
            </div>
            <div className="space-y-2 pb-1">
              <Skeleton className="h-5 w-2/5" />
            </div>
            <div className="space-y-2 pb-1">
              <Skeleton className="h-5 w-2/5" />
            </div>
            <div className="space-y-2 pb-1">
              <Skeleton className="h-5 w-2/5" />
            </div>
            <div className="space-y-2 pb-1">
              <Skeleton className="h-5 w-2/5" />
            </div>
          </div>
        </CommandGroup> */}
      </>
    );
  } else {
    return (
      <div>
        {/* <CommandGroup heading={'Top tokens'}>
          {topTokens.map((item) => (
            <SearchTokenItem hit={item} key={item['address']} />
          ))}
        </CommandGroup>
        <CommandGroup heading={'Top pools'}>
          {topPools.map((item) => (
            <SearchPoolItem hit={item} key={item['id']} />
          ))}
        </CommandGroup> */}
      </div>
    );
  }
}

SearchInitItem.Skeleton = function SearchItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        {/* <Skeleton className="h-5 w-2/5" /> */}
      </div>
    </div>
  );
};
