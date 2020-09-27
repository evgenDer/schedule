import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { Table } from 'antd';
import { IData, TableDataColumns } from '../../constants/types-interfaces';

type VirtualTableProps = {
  columns: any[];
  dataSource: IData[];
  scroll: { y: number | string | undefined; x: number | string | undefined };
};

const VirtualTable: React.FC<VirtualTableProps> = ({ columns, dataSource, scroll }) => {
  const [tableWidth, setTableWidth] = useState(0);

  const widthColumnCount = columns.filter(({ width }) => !width).length;
  const mergedColumns = columns.map((column) => {
    if (column.width) {
      return column;
    }

    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });

  const gridRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: false,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (rowData: any, { scrollbarSize, ref, onScroll }: any) => {
    ref.current = connectObject;

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index) => {
          const { width } = mergedColumns[index];
          if (typeof width === 'number') {
            return index === mergedColumns.length - 1 ? width - scrollbarSize - 1 : width;
          }
          return 0;
        }}
        height={typeof scroll.y === 'number' ? scroll.y : 0}
        rowCount={rowData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({ scrollLeft });
        }}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
            })}
            style={style}
          >
            {rowData[rowIndex][mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        className="virtual-table"
        dataSource={dataSource}
        scroll={scroll}
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
};

export default VirtualTable;
