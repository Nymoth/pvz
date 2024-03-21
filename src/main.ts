import './style.css';

enum TileState {
  Empty,
  Planted
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
  x: number;
  y: number;
  plant?: Plant;
};

const plants: Plant[] = [
  {
    type: PlantType.Peashooter,
    energyCost: 100,
    img: '/peashooter.svg'
  },
  {
    type: PlantType.Sunflower,
    energyCost: 50,
    img: '/sunflower.svg'
  },
  {
    type: PlantType.CherryBomb,
    energyCost: 150,
    img: '/cherryBomb.webp'
  },
  {
    type: PlantType.WallNut,
    energyCost: 50,
    img: '/wallNut.webp'
  },
  {
    type: PlantType.PotatoMine,
    energyCost: 25,
    img: '/potatoMine.webp'
  },
  {
    type: PlantType.SnowPea,
    energyCost: 175,
    img: '/snowPea.webp'
  },
];

const WIDTH = 9;
const HEIGHT = 5;
const SIZE = 100;

const grid: Tile[][] = [];

const appRoot = document.getElementById('app')!;

let movingPlant: Plant | null = null;
let energy = 25;
let energyText: HTMLDivElement;

function getPlantImage(plant: Plant, size: number): HTMLImageElement {
  const img = new Image(size, size);
  img.src = plant.img;
  return img;
}

function plantCardDragStart(plant: Plant, evt: DragEvent) {
  evt.dataTransfer!.effectAllowed = "move";
  movingPlant = plant;
}

function tileDragOver(tile: Tile, evt: DragEvent) {
  evt.preventDefault();
  evt.dataTransfer!.dropEffect = "move";
}

function tileDragEnter(tile: Tile, evt: DragEvent) {
  evt.preventDefault();
  if (!movingPlant) return;
  (evt.target! as HTMLDivElement).classList.add(movingPlant.energyCost > energy ? 'dropping-error': 'dropping');
}

function tileDragLeave(tile: Tile, evt: DragEvent) {
  evt.preventDefault();
  (evt.target! as HTMLDivElement).classList.remove('dropping', 'dropping-error');
}

function setEnergy(value: number) {
  energy = value;
  energyText.textContent = energy.toString();
}

function tileDrop(tile: Tile, evt: DragEvent) {
  evt.preventDefault();
  (evt.target! as HTMLDivElement).classList.remove('dropping', 'dropping-error');
  if (tile.state !== TileState.Empty || !movingPlant || movingPlant.energyCost > energy) return;
  const img = getPlantImage(movingPlant, 80);
  img.classList.add('grounded-plant');
  tile.dom.appendChild(img);
  tile.state = TileState.Planted;
  tile.plant = movingPlant;
  setEnergy(energy - movingPlant.energyCost);
  movingPlant = null;
}

function initActions() {
  const actions = document.createElement('div');
  actions.classList.add('actions');
  const energyDom = document.createElement('div');
  energyDom.classList.add('energy');
  const sunImg = new Image(80, 80);
  sunImg.src = '/sun.png';
  energyText = document.createElement('div');
  setEnergy(energy);
  energyDom.appendChild(sunImg);
  energyDom.appendChild(energyText);
  actions.appendChild(energyDom);
  plants.forEach((plant) => {
    const plantCard = document.createElement('div');
    plantCard.classList.add('plant-card');
    plantCard.addEventListener('dragstart', (evt) => plantCardDragStart(plant, evt))
    const img = getPlantImage(plant, 100);
    plantCard.setAttribute('draggable', 'true');
    plantCard.appendChild(img);
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
      const dom = document.createElement('div');
      const tile = { state: TileState.Empty, dom, x: i, y: j };
      dom.setAttribute('data-x', i.toString());
      dom.setAttribute('data-y', j.toString());
      dom.addEventListener('dragover', (evt) => tileDragOver(tile, evt));
      dom.addEventListener('dragenter', (evt) => tileDragEnter(tile, evt));
      dom.addEventListener('dragleave', (evt) => tileDragLeave(tile, evt));
      dom.addEventListener('drop', (evt) => tileDrop(tile, evt))
      dom.style.width = `${SIZE}px`;
      dom.style.height = `${SIZE}px`;
      dom.classList.add('tile');
      if (even) dom.classList.add('even');
      even = !even;
      row.appendChild(dom);
      grid[i].push(tile);
    }
    gridDom.appendChild(row);
  }
  appRoot.appendChild(gridDom);
}

initActions();
initGrid();