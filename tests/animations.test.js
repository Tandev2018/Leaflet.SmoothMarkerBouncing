import test from 'ava';
import L from 'leaflet';
import '../src/marker';
import * as Animations from '../src/animations';

test('Test calculateTimeline', t => {

    // Given
    const marker = L
        .marker([48.847547, 2.351074])
        .setBouncingOptions({
            bounceHeight: 10,
            bounceSpeed: 52,
            contractHeight: 5,
            contractSpeed: 52,
            elastic: true
        });

    // When
    Animations.calculateTimeline(marker);

    // Then
    t.deepEqual(marker._bouncingMotion.moveSteps, [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0
    ]);

    t.deepEqual(marker._bouncingMotion.moveDelays, [
        0, 6, 13, 20, 29, 39, 52, 69, 95, 147, 199, 251, 277, 294, 307, 317, 326, 333, 340, 346, 346
    ]);

    t.deepEqual(marker._bouncingMotion.resizeSteps, [
        1, 2, 3, 4, 5, 4, 3, 2, 1, 0
    ]);

    t.deepEqual(marker._bouncingMotion.resizeDelays, [
        0, 13, 30, 56, 108, 160, 212, 238, 255, 268, 268
    ]);
});

test('Test calculateTransforms3D', t => {

    // Given
    const map = L.map('map').setView([48.847547, 2.351074], 14);
    const marker = L.marker([48.847547, 2.351074]).addTo(map);

    // When
    Animations.calculateTransforms3D(marker);

    // Then
    console.log(marker);
    t.pass();
});

test('Test calculateTransformsNo3D', t => {

    // Given

    // When

    // Then
    t.pass();
});
