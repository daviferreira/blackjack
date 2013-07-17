/*global console, _*/

function Blackjack() {
    'use strict';
    return this.init();
}

function Suit() {
    'use strict';
    return this.init();
}

function Player() {
    'use strict';
    return this.init();
}

(function (window, document) {
    'use strict';

    Blackjack.prototype = {
        init: function () {
            this.initSuits()
                .initPlayers()
                .shuffle()
                .handleInitialCards()
                .createTableElement();
            return this;
        },

        createTableElement: function () {
            var table = document.createElement('div');
            table.innerHTML = '<div id="table">' +
                              '    <div id="dealer">Dealer: ?, ' + this.dealer.showHand() + '</div>' +
                              '    <div id="player">Player: ' + this.player.showHand() + '</div>' +
                              '</div>';
            document.body.appendChild(table);
            return this;
        },

        initSuits: function () {
            var i;
            this.suits = [];
            for (i = 0; i < 4; i += 1) {
                this.suits.push(new Suit());
            }
            return this;
        },

        initPlayers: function () {
            this.player = new Player();
            this.dealer = new Player();
            return this;
        },

        handleInitialCards: function () {
            this.handleCards('player', 2)
                .handleCards('dealer', 1);
            return this;
        },

        // TODO: default for numCards = 1
        //       verify is suit has cards
        handleCards: function (subject, numCards) {
            var suit,
                i;
            for (i = 0; i < numCards; i += 1) {
                suit = Math.floor(Math.random() * 3);
                this[subject].cards.push(this.suits[suit].cards.pop());
            }
            return this;
        },

        shuffle: function () {
            var i;
            for (i = 0; i < this.suits.length; i += 1) {
                this.suits[i].shuffle();
            }
            return this;
        },

        getPoints: function (card) {
            if (card < 10) {
                return card;
            }
            return 10;
        }
    };

    Suit.prototype = {
        init: function () {
            this.initCards();
            return this;
        },

        initCards: function () {
            var i;
            this.cards = [];
            for (i = 1; i <= 13; i += 1) {
                this.cards.push(i);
            }
        },

        shuffle: function () {
            this.cards = _.shuffle(this.cards);
        }
    };

    Player.prototype = {
        init: function () {
            this.cards = [];
            return this;
        },

        showHand: function () {
            var i,
                html = '';
            for (i = 0; i < this.cards.length; i += 1) {
                html += this.cards[i] + ', ';
            }
            return html.replace(/, $/, '');
        }
    };
}(window, document));
