function random(min, max) {
    let rand = Math.random();
    min = Math.ceil(min);
    max = Math.floor(max);
    let range = max - min + 1;
    return Math.floor(rand * range) + min;
}

let w = 13, h = 13, diff = 4;

let game = document.getElementById('game');

function toggle(x, y) {
    let pad = document.getElementById('pad_' + x + '_' + y);
    let pad_class = pad.classList;
    if (pad_class.contains('on')) {
        pad_class.add('off');
        pad_class.remove('on');
    } else {
        pad_class.add('on');
        pad_class.remove('off');
    }
}

function propagate(x, y) {
    toggle(x, y);
    if (x > 0) toggle(x - 1, y);
    if (y > 0) toggle(x, y - 1);
    if (x < w - 1) toggle(x + 1, y);
    if (y < h - 1) toggle(x, y + 1);
}

function click(e) {
    let elem = e.target;
    let tok = elem.id.split('_');
    let x = +tok[1];
    let y = +tok[2];
    propagate(x, y);
    check();
}

function check() {
    let avail = document.getElementsByClassName('on');
    if (avail.length === 0) {
        let again = confirm('You Win! Play again?');
        if (again) reset();
    }
}

function reset() {
    let press = Math.hypot(w, h) * diff;
    for (let i = 0; i < press; i += 1) {
        let x = random(0, w - 1);
        let y = random(0, h - 1);
        propagate(x, y)
    }
}

for (let y = 0; y < h; y += 1) {
    let row = document.createElement('div');
    row.classList.add('row');
    for (let x = 0; x < w; x += 1) {
        let pad = document.createElement('div');
        pad.id = 'pad_' + x + '_' + y;
        pad.classList.add('off');
        pad.addEventListener('click', click);
        row.appendChild(pad);
    }
    game.appendChild(row);
}

reset();
