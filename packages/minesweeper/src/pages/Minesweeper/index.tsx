import { useState, useEffect } from 'react'
import { useImmer } from 'use-immer'
import classes from 'classnames'
import { Icon } from '@iconify/react'

const WIDTH = 10
const HEIGHT = 10
const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1]
]
const numberColors = [
  'text-gray-500',
  'text-blue-500',
  'text-green-500',
  'text-pink-500',
  'text-yellow-500',
  'text-orange-500',
  'text-purple-500',
  'text-green-500',
  'text-pink-500'
]

interface BlockState {
  revealed?: boolean
  mine?: boolean
  flagged?: boolean
  adjacentMines: number
  x?: number
  y?: number
  index: number
}

export default function Minesweeper () {
  const [items, setItems] = useImmer<(BlockState[])[]>([])

  useEffect(() => {
    initState()
  }, [])

  function initState () {
    let items: BlockState[][] = Array.from({ length: HEIGHT }).map(
      (_, y) => Array.from({ length: WIDTH }).map((_, x) =>
        ({ index: y * 10 + x + 1, x, y, revealed: false, mine: false, flagged: false, adjacentMines: 0 })
      )
    )
    items = generateMines(items)
    items = updateNumbers(items)
    setItems(items)
  }

  function generateMines (items: BlockState[][]) {
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items[0].length; j++) {
        items[j][i].mine = Math.random() < 0.2
      }
    }
    return items
  }

  function updateNumbers (items: BlockState[][]) {
    items.forEach((row, y) => {
      row.forEach((block, x) => {
        if (block.mine) return
        directions.forEach(([dx, dy]) => {
          const x2 = dx + x
          const y2 = dy + y
          if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT) return
          if (items[y2][x2].mine) {
            console.log('exec')
            items[y][x].adjacentMines++
          }
        })
      })
    })
    return items
  }

  function onClick (x: number, y: number) {
    alert(`${x}-${y}`)
  }

  return <div>
    { items.map((row, i) => (<div key={i} className='flex justify-center'>
      { row.map((block, j) => (
        <button
          className={
            classes(
              'border', 'w-10', 'h-10', 'hover:bg-gray-100',
              'flex', 'items-center', 'justify-center',
              'border', 'boder-gray-300', 'm-0.5',
              { 'text-red-500': block.mine, [numberColors[block.adjacentMines]]: !block.mine }
            )}
          key={j}
          onClick={() => onClick(j, i)}
        >{block.mine ? <Icon icon="mdi:mine" /> : <div>{block.adjacentMines}</div>}</button>)) }
    </div>)) }
  </div>
}
