function stationaryObjects() {
    return new FixedObjects(
        [
            new Statusbar('HEALTH', 5, 0, statusbarImages),
            new Statusbar('ENDBOSS', 0, 0, statusbarImages),
            new Statusbar('COINS', 5, 39, statusbarImages),
            new Statusbar('BOTTLES', 5, 78, statusbarImages)
        ],
        [
            new Button({ x: 280, y: 10, width: 30, height: 30, text: 'Break', imagePath: 'img/icons/pause-solid-hell-gray.svg' }),
            new Button({ x: 345, y: 10, width: 30, height: 30, text: 'Volume', imagePath: 'img/icons/volume-xmark-solid-hell-gray.svg' }),
            new Button({ x: 410, y: 10, width: 30, height: 30, text: 'End', imagePath: 'img/icons/arrow-right-to-bracket-solid-hell-gray.svg' }),
        ]
    );
}