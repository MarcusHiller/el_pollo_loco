function stationaryObjects() {
    return new FixedObjects(
        [
            new Statusbar('HEALTH', 5, 0, statusbarImages),
            new Statusbar('ENDBOSS', 0, 0, statusbarImages),
            new Statusbar('COINS', 5, 39, statusbarImages),
            new Statusbar('BOTTLES', 5, 78, statusbarImages)
        ],
        [
            new Button({ x: 282, y: 10, width: 30, height: 30, text: 'Break', action:'Break', imagePath: 'img/icons/pause-solid-hell-gray.svg'}),
            new Button({ x: 324, y: 10, width: 30, height: 30, text: 'Volume', action:'Volume', imagePath: 'img/icons/volume-high-solid-hell-gray.svg'}),
            new Button({ x: 408, y: 10, width: 30, height: 30, text: 'End', action:'End', imagePath: 'img/icons/arrow-right-to-bracket-solid-hell-gray.svg'}),
            new Button({ x: 366, y: 10, width: 30, height: 30, text: 'Full', action: 'Screen', imagePath: 'img/icons/expand-solid-hell-gray.svg'}),
            new Button({ x: 20, y: 430, width: 40, height: 40, text: 'left', action: 'Left', imagePath: 'img/icons/angle-left-solid-hell-gray.svg'}),
            new Button({ x: 90, y: 430, width: 40, height: 40, text: 'right', action: 'Right', imagePath: 'img/icons/angle-right-solid-hell-gray.svg'}),
            new Button({ x: 610, y: 430, width: 40, height: 40, text: 'up', action: 'Jump', imagePath: 'img/icons/angle-up-solid-hell-gray.svg'}),
            new Button({ x: 670, y: 430, width: 40, height: 40, text: 'bottle', action: 'throw', imagePath: 'img/icons/wine-bottle-solid-hell-gray.svg'}),
        ]
    );
}