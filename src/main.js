import Vue from 'vue/dist/vue.js';

Vue.config.productionTip = true;

Vue.component('letters-array', {
    props: ['letters'],
    template: '<div v-bind:id="\'tile_\' + letters.id" v-bind:onclick="\'memoryFlipTile(this,\' + letters.letter + \')\'"></div>'
})

var app = new Vue({
    el: '#app',
    data: {
        memory_values: [],
        memory_tile_ids: [],
        tiles_flipped: 0,
        memory_array: [
            { id: 0, letter: "'A'" },
            { id: 1, letter: "'A'" },
            { id: 2, letter: "'B'" },
            { id: 3, letter: "'B'" },
            //{ id: 4, letter: "'C'" },
            //{ id: 5, letter: "'C'" },
            //{ id: 6, letter: "'D'" },
            //{ id: 7, letter: "'D'" },
            //{ id: 8, letter: "'E'" },
            //{ id: 9, letter: "'E'" },
            //{ id: 10, letter: "'F'" },
            //{ id: 11, letter: "'F'" },
            //{ id: 12, letter: "'G'" },
            //{ id: 13, letter: "'G'" },
            //{ id: 14, letter: "'H'" },
            //{ id: 15, letter: "'H'" },
            //{ id: 16, letter: "'I'" },
            //{ id: 17, letter: "'I'" },
            //{ id: 18, letter: "'J'" },
            //{ id: 19, letter: "'J'" },
            //{ id: 20, letter: "'K'" },
            //{ id: 21, letter: "'K'" },
            //{ id: 22, letter: "'L'" },
            //{ id: 23, letter: "'L'" },
        ]
    },
    methods: {
        newBoard: function () {
            app1.reset();
            this.tiles_flipped = 0;
            this.memory_tile_shuffle();
            var output = '';
            for (var i = 0; i < this.memory_array.length; i++) {
                output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,' + this.memory_array[i].letter + ')"></div> ';
            }
            document.getElementById('app').innerHTML = output;
        },
        memoryFlipTile: function (tile, val) {
            if (tile.innerHTML == "" && this.memory_values.length < 2) {
                tile.style.background = '#FFF';
                tile.innerHTML = val;
                if (this.memory_values.length == 0) {
                    this.memory_values.push(val);
                    this.memory_tile_ids.push(tile.id);
                } else if (this.memory_values.length == 1) {
                    this.memory_values.push(val);
                    this.memory_tile_ids.push(tile.id);
                    if (this.memory_values[0] == this.memory_values[1]) {
                        this.tiles_flipped += 2;// Clear both arrays
                        this.memory_values = [];
                        this.memory_tile_ids = [];// Check to see if the whole board is cleared
                        if (this.tiles_flipped == this.memory_array.length) {
                            var r = confirm("Your time is: " + app1.prettyTime + "\n Start new Memory Game?");
                            if (r == true) {
                                document.getElementById('app').innerHTML = "";
                                this.newBoard();
                            } else {
                                window.location.href = "http://GoranSubic.github.io";
                            }
                        }
                    } else {
                        this.flip2Back();
                        setTimeout(this.flip2Back, 700);
                    }
                }
            }
        },
        flip2Back: function () {// Flip the 2 tiles back over
            var tile_1 = document.getElementById(this.memory_tile_ids[0]);
            var tile_2 = document.getElementById(this.memory_tile_ids[1]);
            tile_1.style.background = 'url(tile_bg.jpg) no-repeat';
            tile_1.innerHTML = "";
            tile_2.style.background = 'url(tile_bg.jpg) no-repeat';
            tile_2.innerHTML = "";
            this.memory_values = [];// Clear both arrays
            this.memory_tile_ids = [];// Clear both arrays
        },
        memory_tile_shuffle: function () {
            var i = this.memory_array.length, j, temp;
            while (--i > 0) {
                j = Math.floor(Math.random() * (i + 1));
                temp = this.memory_array[j];
                this.memory_array[j] = this.memory_array[i];
                this.memory_array[i] = temp;
            }
        }
    },
    created() {
        window.memoryFlipTile = this.memoryFlipTile;
    },
});

let Timer = {
    template: `
		 <div class="timer">{{ time | prettify }}</div>
	`,
    props: ['time'],
    filters: {
        prettify: function (value) {
            let data = value.split(':')
            let minutes = data[0]
            let secondes = data[1]
            if (minutes < 10) {
                minutes = "0" + minutes
            }
            if (secondes < 10) {
                secondes = "0" + secondes
            }
            return minutes + ":" + secondes
        }
    }
}

let app1 = new Vue({
    el: "#app1",
    components: {
        'timer': Timer
    },
    data: {
        isRunning: false,
        minutes: 0,
        secondes: 0,
        time: 0,
        timer: null,
        //sound: new Audio("http://s1download-universal-soundbank.com/wav/nudge.wav")
    },
    computed: {
        prettyTime() {
            let time = this.time / 60
            let minutes = parseInt(time)
            let secondes = Math.round((time - minutes) * 60)
            return minutes + ":" + secondes
        }
    },
    methods: {
        start: function () {
            this.isRunning = true
            if (!this.timer) {
                this.timer = setInterval(() => {
                    this.time++                   
                }, 1000)
            }
        },
        stop: function () {
            this.isRunning = false
            clearInterval(this.timer)
            this.timer = null
        },
        reset: function () {
            this.stop()
            this.time = 0
            this.secondes = 0
            this.minutes = 0
        }
    },
    created() {
        window.start = this.start;
        window.reset = this.reset;
    }
})