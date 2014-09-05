var texSize = 320
var x = 0.5 * (900 - Moon.size)
var y = 0.5 * (600 - Moon.size)

var moon = new Moon
var rocketSys = new RocketSystem
var sputnik = new Sputnik
var bulletSys = new BulletSystem(sputnik)
var moonBuf = R1.createImageData(Moon.size, Moon.size)

moon.render(moonBuf.data, 0)
R1.putImageData(moonBuf, x, y)

var opt = {mus: 1, snd: 1, rot: 1}
var offset = texSize, then = Date.now(), diff

function main() {
    then += (diff = Date.now() - then)
    requestAnimationFrame(main)

    if (opt.rot) {
        offset -= diff / 24
        while (offset < 0)
            offset += texSize

        moon.render(moonBuf.data, offset)
        R1.putImageData(moonBuf, x, y)
    }

    if (!game_started) return

    R2.clearRect(-x0, -y0, 900, 600)

    bulletSys.damage(rocketSys)
    rocketSys.render(diff)
    sputnik.render(diff)
    bulletSys.render(diff)

    $life.nodeValue = life
    $score.nodeValue = score

    if (!life) game_over()
}

function bind_opt(name) {
    $id(name).addEventListener('change',
        function (event) { opt[name] = event.target.checked },
        false)
}
bind_opt('mus')
bind_opt('snd')
bind_opt('rot')

var atk = rocketSys.add.bind(rocketSys), ai = 0

function atkWave() {
    if (!game_started) return
    var rand = rand0(2)
    switch (true) {
        case rand > 0.96: setTimeout(atk, 800)
        /* fall through */
        case rand > 0.69: setTimeout(atk, 600)
        /* fall through */
        case rand > 0: setTimeout(atk, 400)
        /* fall through */
        case rand > -0.69: setTimeout(atk, 200)
    }
    atk()
    ai = setTimeout(atkWave, 4000 + rand0(1000))
}

var $xstart = $id('xstart')

function reset() {
    life = LIFE_FULL
    score = sputnik.a = 0
    rocketSys.rockets = []
    bulletSys.bullets = []
    game_started = true
    $xstart.className = 'hide'
    setTimeout(atkWave, 200)
}
$id('start').addEventListener('click', reset, false)

function game_over() {
    var msg = 'Game Over'
    game_started = false
    if (ai) clearTimeout(ai)
    R2.fillStyle = '#f44'
    R2.fillText(msg, -0.5 * R2.measureText(msg).width, -160)
    $id('start').firstChild.nodeValue = 'Play again'
    $xstart.className = ''
}

main()
