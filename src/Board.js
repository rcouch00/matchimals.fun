import React, { Component } from 'react';
import withStyles from 'react-jss';

import Card from './components/Card';
import Cell from './components/Cell';
import { isLegalMove } from './Game';
import { height, width } from './constants/board';
import { centerCell } from './components/Cell';

class Board extends Component {
  componentDidMount() {
    if (centerCell && centerCell.scrollIntoView) {
      centerCell.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }

  onClick = id => {
    const { G, ctx, events, moves } = this.props;
    const intId = parseInt(id, 10);
    if (isLegalMove(G, ctx, intId)) {
      moves.clickCell(intId);
      events.endTurn();
    }
  };

  render() {
    const { classes, G } = this.props;
    let cells = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const id = width * i + j;
        const value = G.cells[id];
        cells.push(
          <Cell
            key={id}
            id={id}
            className={classes.cell}
            onClick={this.onClick}
          >
            {value && <Card card={value} flipped />}
          </Cell>
        );
      }
    }

    return <div className={classes.root}>{cells}</div>;
  }
}

export default withStyles({
  root: {
    minWidth: '1536px', // 100 * 13 (gameboard) + 220 (sidebar) + 16 (padding)
    minHeight: '1820px',
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, 100px)`,
    gridTemplateRows: `repeat(${height}, 140px)`,
    gridGap: '0',
  },
  cell: {
    width: '100px',
    height: '140px',
    outline: '2px dashed rgba(255, 255, 255, 0.1)',
    outlineOffset: '-4px',
    borderRadius: '8px',
  },
})(Board);
