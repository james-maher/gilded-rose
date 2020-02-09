function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

// Constants
const MAX_QUALITY_VALUE = 50;
const MIN_QUALITY_VALUE = 0;

// Item identifier functions
const isBackstagePassItem = item => item.name.includes("Backstage passes");
const isSulfurasItem = item => item.name.includes("Sulfuras");
const isAgedBrieItem = item => item.name.includes("Aged Brie");

// Item modifiers
const incrementQualityProperty = incrementValue => {
  const increment = incrementValue;

  return quality => {
    return quality + increment <= MAX_QUALITY_VALUE
      ? quality + increment
      : MAX_QUALITY_VALUE;
  };
};

const incrementQualityByOne = incrementQualityProperty(1);
const incrementQualityByTwo = incrementQualityProperty(2);
const incrementQualityByThree = incrementQualityProperty(3);

const decrementQualityProperty = decrementValue => {
  const decrement = decrementValue;

  return quality => {
    return quality - decrement >= MIN_QUALITY_VALUE
      ? quality - decrement
      : MIN_QUALITY_VALUE;
  };
};

const decrementQualityByOne = decrementQualityProperty(1);
const decrementQualityByTwo = decrementQualityProperty(2);

// Item specific updaters
const genericItemQualityUpdater = item => {
  let quality = item.quality;
  quality =
    item.sell_in <= 0
      ? decrementQualityByTwo(quality)
      : decrementQualityByOne(quality);
  return { ...item, quality };
};

const genericItemSellInUpdater = item => ({
  ...item,
  sell_in: item.sell_in - 1
});

const agedBrieItemQualityUpdater = item => ({
  ...item,
  quality: incrementQualityByOne(item.quality)
});

const backstagePassItemQualityUpdater = item => {
  let quality = item.quality;
  if (item.sell_in <= 0) {
    return { ...item, quality: 0 };
  }

  if (item.sell_in > 10) {
    increment = 1;
    quality = incrementQualityByOne(quality);
  } else if (item.sell_in > 5 && item.sell_in <= 10) {
    quality = incrementQualityByTwo(quality);
  } else if (item.sell_in > 0 && item.sell_in <= 5) {
    quality = incrementQualityByThree(quality);
  }

  return { ...item, quality };
};

const updateItemWith = item => (qualityUpdater, sellInUpdater) =>
  sellInUpdater(qualityUpdater(item));

function update_quality() {
  items = items.map(item => {
    // Apply default update rules to all items
    let qualityUpdater = genericItemQualityUpdater;
    let sellInUpdater = genericItemSellInUpdater;

    // Override update rules to specific items
    if (isAgedBrieItem(item)) {
      qualityUpdater = agedBrieItemQualityUpdater;
    } else if (isBackstagePassItem(item)) {
      qualityUpdater = backstagePassItemQualityUpdater;
    } else if (isSulfurasItem(item)) {
      qualityUpdater = item => ({ ...item });
      sellInUpdater = item => ({ ...item });
    }

    return updateItemWith(item)(qualityUpdater, sellInUpdater);
  });
}
