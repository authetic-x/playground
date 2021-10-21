import React, { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
// Break large data sets down into chunks that can be loaded as they are scrolled into view
import InfiniteLoader from 'react-window-infinite-loader';
// HOC that grows to fit all of the available space, automatically adjusting the width and height of a single child
import AutoSizer from 'react-virtualized-auto-sizer';

interface Props {
  data: any[];
  itemSize?: number;
  loadMore: (startIndex: number, stopIndex: number) => Promise<void>;
  ItemElement: ({ index, style, data }) => ReactNode;
  LoadingElement: ({ index, style, data }) => ReactNode;
  CheckAllElement?: ({ index, style, data }) => ReactNode;
}

const _InfiniteList = (props: Props, ref) => {
  const { data, itemSize, loadMore, ItemElement, LoadingElement, CheckAllElement } = props;
  const infiniteLoaderRef = useRef(null);
  const itemCount = CheckAllElement ? data.length + 2 : data.length + 1;

  const isItemLoaded = (index) => {
    if (!!CheckAllElement && index === 0) {
      return true;
    }

    return data[CheckAllElement ? index - 1 : index] !== undefined;
  };

  const item = ({ index, style }) => {
    const currentIndex = CheckAllElement ? index - 1 : index;
    if (!!CheckAllElement && index === 0) {
      return CheckAllElement({ index, style, data });
    }
    if (!isItemLoaded(index)) {
      return LoadingElement({ index, style, data });
    }
    return ItemElement({ index: currentIndex, style, data });
  };

  useImperativeHandle(ref, () => ({
    resetCache: () => {
      return infiniteLoaderRef.current?.resetloadMoreItemsCache(true);
    },
  }));

  return (
    <AutoSizer>
      {({ width, height }) => (
        <InfiniteLoader
          ref={infiniteLoaderRef}
          loadMoreItems={loadMore}
          itemCount={itemCount}
          isItemLoaded={isItemLoaded}
          threshold={0}
        >
          {({ onItemsRendered, ref }) => (
            <List
              width={width}
              height={height}
              ref={ref}
              onItemsRendered={onItemsRendered}
              itemCount={itemCount}
              itemSize={itemSize}
            >
              {item}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};

export default forwardRef(_InfiniteList);
