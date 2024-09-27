import React from 'react'
import Grid from './grid'

const creditEntries = [
  {
    text: "Build UI",
    link: "https://buildui.com/recipes/magnified-dock",
  },
  {
    text: "Ritesh Bucha",
    link: "https://twitter.com/bucha_ritesh",
  },
]

const page = () => {
  return (
    <div>
      <Grid rows={4} columns={4}>
        <Grid.Cell row="auto" column={1}>
          What
        </Grid.Cell>
        <Grid.Cell row="auto" column={4}>
          will
        </Grid.Cell>
        <Grid.Cell row={2} column={3}>
          you
        </Grid.Cell>
        <Grid.Cell row={3} column={4}>
          ship
        </Grid.Cell>
        <Grid.Cell row={4} column="auto">
          ?
        </Grid.Cell>
        <Grid.Cross column={1} row={1} />
        <Grid.Cross column={-1} row={-1} />
      </Grid>
    </div>
  )
}

export default page