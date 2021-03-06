function space(canvas) {
    function arc(r) { canvas.arc(450, 300, r, 0, 2 * Math.PI, false) }

    canvas.fillStyle = '#101010'
    canvas.fillRect(0, 0, 900, 600)

    var i, j, k
    for (i = 2; i < 900; i += 5) {
        for (j = 2; j < 600; j += 5) {
            k = 0|Math.random() * 7
            if ((k *= k * k) > 20) {
                canvas.fillStyle = 'rgb(' + [k, k, k] + ')'
                canvas.fillRect(i, j, 1, 1)
            }
        }
    }

    canvas.fillStyle = '#101010'
    arc(120)
    canvas.fill()

    canvas.globalAlpha = 0.25

    for (i = 1; i < 10; ++i) {
        arc(120 + i * 10)
        canvas.fill()
    }

    /*
    canvas.fillStyle = '#8be'
    canvas.globalAlpha = 0.069
    canvas.globalCompositeOperation = 'lighter'

    for (i = 0; i < 25; ++i) {
        canvas.beginPath()
        arc(70 + 0.9 * i)
        canvas.fill()
    }
    */

    return canvas.canvas.toDataURL()
}

L1.style.background = 'url("' + createCanvas(900, 600, space) + '") no-repeat'
