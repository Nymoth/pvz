import './style.css';

enum TileState {
  Empty = 'empty',
}

enum PlantType {
  Peashooter,
  Sunflower,
  CherryBomb,
  WallNut,
  PotatoMine,
  SnowPea,
}

type Plant = {
  type: PlantType;
  energyCost: number;
  img: string;
};

type Tile = {
  state: TileState;
  dom: HTMLDivElement;
};

const plants: Plant[] = [
  {
    type: PlantType.Peashooter,
    energyCost: 100,
    img: 'https://static.wikia.nocookie.net/plantsvszombies/images/e/e0/PvZ_1_Peashooter.svg/revision/latest?cb=20220416080632',
  },
  {
    type: PlantType.Sunflower,
    energyCost: 50,
    img: 'https://static.wikia.nocookie.net/plantsvszombies/images/2/2a/Sunflower.svg/revision/latest?cb=20220413090250',
  },
  {
    type: PlantType.CherryBomb,
    energyCost: 150,
    img: 'https://static.wikia.nocookie.net/plantsvszombies/images/4/4b/PvZ_Pictures.doc2.png/revision/latest?cb=20111123191552',
  },
  {
    type: PlantType.WallNut,
    energyCost: 50,
    img: 'https://static.wikia.nocookie.net/plantsvszombies/images/6/67/HD_Wall-nut.png/revision/latest?cb=20220414061652',
  },
  {
    type: PlantType.PotatoMine,
    energyCost: 25,
    img: 'https://static.wikia.nocookie.net/plantsvszombies/images/c/c5/Potato_Mine.png/revision/latest?cb=20240313100148',
  },
  {
    type: PlantType.SnowPea,
    energyCost: 175,
    img: 'https://static.wikia.nocookie.net/plantsvszombies/images/e/e3/HD_Snow_Pea1.png/revision/latest/scale-to-width-down/1000?cb=20161001120407',
  },
];
const sunImage =
  'https://static.wikia.nocookie.net/plantsvszombies/images/0/0e/SunPvZH.png/revision/latest?cb=20161102005320';

const WIDTH = 9;
const HEIGHT = 5;
const SIZE = 100;

const grid: Tile[][] = [];

const appRoot = document.getElementById('app')!;

let energy = 25;

function initActions() {
  const actions = document.createElement('div');
  plants.forEach((plant) => {
    const plantCard = document.createElement('div');

    actions.appendChild(plantCard);
  });
  appRoot.appendChild(actions);
}

function initGrid() {
  const gridDom = document.createElement('div');
  gridDom.style.display = 'flex';
  gridDom.classList.add('grid');
  let even = true;
  for (let i = 0; i < WIDTH; i++) {
    grid.push([]);
    const row = document.createElement('div');
    for (let j = 0; j < HEIGHT; j++) {
      const tile = document.createElement('div');
      tile.setAttribute('data-x', i.toString());
      tile.setAttribute('data-y', j.toString());
      tile.style.width = `${SIZE}px`;
      tile.style.height = `${SIZE}px`;
      tile.classList.add('tile');
      if (even) {
        tile.classList.add('even');
      }
      even = !even;
      row.appendChild(tile);
      grid[i].push({
        state: TileState.Empty,
        dom: tile,
      });
    }
    gridDom.appendChild(row);
  }
  appRoot.appendChild(gridDom);
}

initGrid();
