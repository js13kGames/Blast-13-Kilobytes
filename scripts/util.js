/** @const */ var FIRE = 0
/** @const */ var WATER = 1
/** @const */ var EARTH = 2
/** @const */ var LIGHT = 3

/** @const */ var COLOR_BRIGHT = '#f441#3bf1#9c01#fb3'.split(1)
/** @const */ var COLOR_DARK = '#c001#09c1#6901#f80'.split(1)

/** @const */ var LIFE_FULL = 10

function $id(id) { return document.getElementById(id) }
function rand0(a) { return a * (Math.random() - 0.5) }
function abs(x) { return x < 0 ? -x : x }
function clamp01(x) { return (x < 0)? 0: (x > 1)? 1: x }

var L1 = $id('L1'), L2 = $id('L2')
var R1 = L1.getContext('2d'), R2 = L2.getContext('2d')

if (!R1.setLineDash) R1.setLineDash = R2.setLineDash = function () {}

/** @const */ var x0 = 0.5 * 900 + 0.5
/** @const */ var y0 = 0.5 * 600 + 0.5

R1.translate(x0, y0)
R2.translate(x0, y0)

R2.font = '96px Segoe UI,Helvetica Neue,sans-serif'

var life = LIFE_FULL
var $life = $id('life').firstChild

var score = 0
var $score = $id('score').firstChild

var game_started = false

/*
function load(images, done) {
    var toLoad = images.length
    var res = Array(toLoad)
    var loaded = 0

    images.forEach(function (url, i) {
        var image = new Image
        image.onload = function () {
            res[i] = this
            if (++loaded == toLoad)
                done(res)
        }
        image.src = url
    })
}
*/

function createCanvas(w, h, fn) {
    var canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    return fn(canvas.getContext('2d'))
}

var opt = {'mus': 1, 'snd': 1, 'rot': 1}

function bind_opt(name) {
    $id(name).addEventListener('change',
        function (event) { opt[name] = event.target.checked },
        false)
}
// bind_opt('mus')
bind_opt('snd')
bind_opt('rot')
