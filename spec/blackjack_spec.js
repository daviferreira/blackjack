/*global describe, it, expect, Blackjack, Suit,
         beforeEach, spyOn, Player, afterEach,
         console*/

describe('Blackjack TestCase', function () {
    'use strict';

    beforeEach(function () {
        this.blackjack = new Blackjack();
    });

    afterEach(function () {
        this.blackjack = null;
    });

    it('should have four suits', function () {
        expect(this.blackjack.suits.length).toBe(4);
    });

    it('should return the right points', function () {
        expect(this.blackjack.getPoints(1)).toBe(1);
        expect(this.blackjack.getPoints(3)).toBe(3);
        expect(this.blackjack.getPoints(6)).toBe(6);
        expect(this.blackjack.getPoints(7)).toBe(7);
        expect(this.blackjack.getPoints(10)).toBe(10);
        expect(this.blackjack.getPoints(11)).toBe(10);
        expect(this.blackjack.getPoints(12)).toBe(10);
        expect(this.blackjack.getPoints(13)).toBe(10);
    });

    describe('Game setup', function () {

        it('should shuffle the decks', function () {
            spyOn(Blackjack.prototype, 'shuffle').andCallThrough();
            this.blackjack = new Blackjack();
            expect(this.blackjack.shuffle).toHaveBeenCalled();
        });

        it('should create a player', function () {
            expect(this.blackjack.player instanceof Player).toBeTruthy();
        });

        it('should create a dealer', function () {
            expect(this.blackjack.dealer instanceof Player).toBeTruthy();
        });

        it('should handle cards', function () {
            spyOn(Blackjack.prototype, 'handleCards').andCallThrough();
            this.blackjack = new Blackjack();
            expect(this.blackjack.handleCards).toHaveBeenCalled();
        });

        it('should handle two cards to the player', function () {
            expect(this.blackjack.player.cards.length).toBe(2);
        });

        it('should handle one card to the dealer', function () {
            expect(this.blackjack.dealer.cards.length).toBe(1);
        });

        it('should remove handled cards from the deck', function () {
            var length = 0,
                i;
            for (i = 0; i < this.blackjack.suits.length; i += 1) {
                length += this.blackjack.suits[i].cards.length;
            }
            expect(length).toBe(49);
        });
    });

});

describe('Suit TestCase', function () {
    'use strict';

    beforeEach(function () {
        this.suit = new Suit();
    });

    it('should have all the cards', function () {
        expect(this.suit.cards.length).toBe(13);
    });

    it('should have the right cards', function () {
        var cards = [],
            i;
        for (i = 1; i <= 13; i += 1) {
            cards.push(i);
        }
        expect(this.suit.cards).toEqual(cards);
    });
});

describe('Player TestCase', function () {
    'use strict';

    beforeEach(function () {
        this.player = new Player();
    });

    it('should start with an empty hand', function () {
        expect(this.player.cards.length).toBe(0);
    });
});
