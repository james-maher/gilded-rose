const genericItemName = "some-item";
const backstagePassItemName = "Backstage passes to a TAFKAL80ETC concert";
const agedBrieItemName = "Aged Brie";
const legendaryItemName = "Sulfuras, Hand of Ragnaros";

describe("update_quality", function() {
  describe("when updating generic items", () => {
    it("should decrease the sell_in and quality properties value by 1", function() {
      items = [new Item(genericItemName, 10, 10)];
      update_quality();

      expect(items[0].sell_in).toEqual(9);
      expect(items[0].quality).toEqual(9);
    });

    it("should decrease the quality by 2 when the sell_in value is 0 or less", function() {
      items = [new Item(genericItemName, 0, 10)];
      update_quality();

      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(8);
    });

    it("should never decrease the quality value when it is 0", function() {
      items = [new Item(genericItemName, 0, 0)];
      update_quality();

      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });
  });

  describe("when updating Aged Brie items", () => {
    it("should increase value of the quality property by 1", function() {
      items = [new Item(agedBrieItemName, 10, 10)];
      update_quality();

      expect(items[0].sell_in).toEqual(9);
      expect(items[0].quality).toEqual(11);
    });

    it("the quality value of an item should never exceed 50", function() {
      items = [new Item(agedBrieItemName, 10, 50)];
      update_quality();

      expect(items[0].sell_in).toEqual(9);
      expect(items[0].quality).toEqual(50);
    });
  });

  describe("when updating Backstage passes items", () => {
    [
      { sellInValue: 1, expectedQualityIncrement: 3 },
      { sellInValue: 2, expectedQualityIncrement: 3 },
      { sellInValue: 3, expectedQualityIncrement: 3 },
      { sellInValue: 4, expectedQualityIncrement: 3 },
      { sellInValue: 5, expectedQualityIncrement: 3 },
      { sellInValue: 6, expectedQualityIncrement: 2 },
      { sellInValue: 7, expectedQualityIncrement: 2 },
      { sellInValue: 8, expectedQualityIncrement: 2 },
      { sellInValue: 9, expectedQualityIncrement: 2 },
      { sellInValue: 10, expectedQualityIncrement: 2 },
      { sellInValue: 11, expectedQualityIncrement: 1 },
      { sellInValue: 12, expectedQualityIncrement: 1 },
      { sellInValue: 13, expectedQualityIncrement: 1 }
    ].forEach(({ sellInValue, expectedQualityIncrement }) => {
      it(`should increase the quality value by ${expectedQualityIncrement} when the sell_in value is ${sellInValue}`, function() {
        items = [new Item(backstagePassItemName, sellInValue, 10)];
        update_quality();
        expect(items[0].sell_in).toEqual(sellInValue - 1);
        expect(items[0].quality).toEqual(10 + expectedQualityIncrement);
      });
    });

    it("should have a quality of 0 when the sell_in value drops to 0 or less", function() {
      items = [new Item(backstagePassItemName, 0, 0)];
      update_quality();

      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });

    it("the quality value of an item should never exceed 50", function() {
      items = [new Item(backstagePassItemName, 10, 50)];
      update_quality();

      expect(items[0].sell_in).toEqual(9);
      expect(items[0].quality).toEqual(50);
    });
  });

  describe("when updating legendary items", () => {
    it("should never decrease the sell_in and quality properties", function() {
      items = [new Item(legendaryItemName, 0, 80)];
      update_quality();

      expect(items[0].sell_in).toEqual(0);
      expect(items[0].quality).toEqual(80);
    });
  });
});
