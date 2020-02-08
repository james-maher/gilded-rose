describe("Gilded Rose", function() {
    it("should decrease an items sell_in and quality properties value by 1", function() {
      items = [ new Item("foo", 10, 10) ];
      update_quality();
      expect(items[0].sell_in).toEqual(9);
      expect(items[0].quality).toEqual(9);
    });

    it("should decrease the quality by 2 when the sell_in value is 0 or less", function() {
      items = [ new Item("foo", 0, 10) ];
      update_quality();
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(8);
    });

    it("the quality property should never be a negative number", function() {
      items = [ new Item("foo", 0, 0) ];
      update_quality();
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });

    it("the 'Aged Brie' item's quality should increase in value by 1", function() {
      items = [ new Item("Aged Brie", 10, 10) ];
      update_quality();
      expect(items[0].sell_in).toEqual(9);
      expect(items[0].quality).toEqual(11);
    });
    
    describe ('Backstage passes item', () => {
      it("should increase in value by 1 when the sell_in value is 11 or greater", function() {
        items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10) ];
        update_quality();
        expect(items[0].sell_in).toEqual(10);
        expect(items[0].quality).toEqual(11);
      });

      it("should increase in value by 2 when the sell_in value is between 6 an 10", function() {
        items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10) ];
        update_quality();
        expect(items[0].sell_in).toEqual(5);
        expect(items[0].quality).toEqual(12);
      });

      it("should increase in value by 2 when the sell_in value is between 6 an 10", function() {
        items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10) ];
        update_quality();
        expect(items[0].sell_in).toEqual(5);
        expect(items[0].quality).toEqual(12);
      });

      it("should increase in value by 1 when the sell_in value is 11 or greater", function() {
        items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10) ];
        update_quality();
        expect(items[0].sell_in).toEqual(10);
        expect(items[0].quality).toEqual(11);
      });

      it("should have a quality of 0 ", function() {
        items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0) ];
        update_quality();
        expect(items[0].sell_in).toEqual(-1);
        expect(items[0].quality).toEqual(0);
      });
    });
    
    it("the quality value of an item should never exceed 50", function() {
      items = [ new Item("Aged Brie", 10, 50) ];
      update_quality();
      expect(items[0].sell_in).toEqual(9);
      expect(items[0].quality).toEqual(50);
    });

    it("the item 'Sulfuras, Hand of Ragnaros' never has to be sold or decreases in Quality", function() {
      items = [ new Item("Sulfuras, Hand of Ragnaros", 10, 10) ];
      update_quality();
      expect(items[0].sell_in).toEqual(10);
      expect(items[0].quality).toEqual(10);
    });
});
