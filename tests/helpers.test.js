import test from 'ava';
import * as Helpers from '../src/helpers';

test('Test parseCssText', t => {

    // Given
    const cssText = 'margin-left: -12px; margin-top: -41px; width: 25px; height: 41px;';

    // When
    const cssObject = Helpers.parseCssText(cssText);

    // Then
    t.deepEqual(cssObject, {
        height: '41px',
        width: '25px',
        'margin-left': '-12px',
        'margin-top': '-41px'
    });
});

test('Test renderCssText', t => {

    // Given
    const styleDefinitions = {
        height: '41px',
        width: '25px',
        'margin-left': '-12px',
        'margin-top': '-41px'
    };

    // When
    const cssText = Helpers.renderCssText(styleDefinitions);

    // Then
    t.true(cssText.includes('margin-left: -12px;'));
    t.true(cssText.includes('margin-top: -41px;'));
    t.true(cssText.includes('width: 25px;'));
    t.true(cssText.includes('height: 41px;'));
});

test('Test calculateLine', t => {

    // Given
    const x = 100,
        y = 100,
        angle = - Math.PI / 4,
        length = 15;

    // When
    const line = Helpers.calculateLine(x, y, angle, length);

    // Then
    t.deepEqual(line, [
        [ 100, 100 ],
        [ 101, 99 ],
        [ 102, 98 ],
        [ 103, 97 ],
        [ 104, 96 ],
        [ 105, 95 ],
        [ 106, 94 ],
        [ 107, 93 ],
        [ 108, 92 ],
        [ 109, 91 ],
        [ 110, 90 ],
        [ 111, 89 ],
        [ 112, 88 ],
        [ 113, 87 ],
        [ 114, 86 ]
    ]);
});

test('Test calculateIconMovePoints', t => {

    // Given
    const x = 100,
        y = 100,
        length = 15;

    // When
    const points = Helpers.calculateIconMovePoints(x, y, length);

    // Then
    t.deepEqual(points, [
        [ 100, 100 ],
        [ 100, 99 ],
        [ 100, 98 ],
        [ 100, 97 ],
        [ 100, 96 ],
        [ 100, 95 ],
        [ 100, 94 ],
        [ 100, 93 ],
        [ 100, 92 ],
        [ 100, 91 ],
        [ 100, 90 ],
        [ 100, 89 ],
        [ 100, 88 ],
        [ 100, 87 ],
        [ 100, 86 ],
        [ 100, 85 ]
    ]);
});

test('Test calculateShadowMovePoints with angle', t => {

    // Given
    const x = 100,
        y = 100,
        bounceHeight = 15,
        angle = - Math.PI / 4;

    // When
    const points = Helpers.calculateShadowMovePoints(x, y, bounceHeight, angle);

    // Then
    t.deepEqual(points, [
        [ 100, 100 ],
        [ 101, 99 ],
        [ 102, 98 ],
        [ 103, 97 ],
        [ 104, 96 ],
        [ 105, 95 ],
        [ 106, 94 ],
        [ 107, 93 ],
        [ 108, 92 ],
        [ 109, 91 ],
        [ 110, 90 ],
        [ 111, 89 ],
        [ 112, 88 ],
        [ 113, 87 ],
        [ 114, 86 ],
        [ 115, 85 ]
    ]);
});

test('Test calculateShadowMovePoints without angle', t => {

    // Given
    const x = 100,
        y = 100,
        bounceHeight = 5;

    // When
    const points = Helpers.calculateShadowMovePoints(x, y, bounceHeight);

    // Then
    t.deepEqual(points, [
        [ 100, 100 ],
        [ 100, 100 ],
        [ 100, 100 ],
        [ 100, 100 ],
        [ 100, 100 ],
        [ 100, 100 ]
    ]);
});

test('Test calculateIconMoveTransforms', t => {

    // Given
    const x = 100,
        y = 100,
        bounceHeight = 15;

    // When
    const transforms = Helpers.calculateIconMoveTransforms(x, y, bounceHeight);

    // Then
    t.deepEqual(transforms, [
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,99,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,98,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,97,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,96,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,95,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,94,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,93,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,92,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,91,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,90,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,89,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,88,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,87,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,86,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,85,0,1) '
    ]);
});

test('Test calculateShadowMoveTransforms with angle', t => {

    // Given
    const x = 100,
        y = 100,
        bounceHeight = 15,
        angle = - Math.PI / 4;

    // When
    const transforms = Helpers.calculateShadowMoveTransforms(x, y, bounceHeight, angle);

    // Then
    t.deepEqual(transforms, [
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,101,99,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,102,98,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,103,97,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,104,96,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,105,95,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,106,94,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,107,93,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,108,92,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,109,91,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,110,90,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,111,89,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,112,88,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,113,87,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,114,86,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,115,85,0,1) '
    ]);
});

test('Test calculateShadowMoveTransforms without angle', t => {

    // Given
    const x = 100,
        y = 100,
        bounceHeight = 15;

    // When
    const transforms = Helpers.calculateShadowMoveTransforms(x, y, bounceHeight);

    // Then
    t.deepEqual(transforms, [
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) '
    ]);
});

test('Test calculateIconResizeTransforms', t => {

    // Given
    const x = 100,
        y = 100,
        height = 41,
        contractHeight = 12;

    // When
    const transforms = Helpers.calculateIconResizeTransforms(x, y, height, contractHeight);

    // Then
    t.deepEqual(transforms, [
        ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,100,100,0,1) ',
        ' matrix3d(1,0,0,0,0,0.975609756097561,0,0,0,0,1,0,100,101,0,1) ',
        ' matrix3d(1,0,0,0,0,0.9512195121951219,0,0,0,0,1,0,100,102,0,1) ',
        ' matrix3d(1,0,0,0,0,0.926829268292683,0,0,0,0,1,0,100,103,0,1) ',
        ' matrix3d(1,0,0,0,0,0.9024390243902439,0,0,0,0,1,0,100,104,0,1) ',
        ' matrix3d(1,0,0,0,0,0.8780487804878049,0,0,0,0,1,0,100,105,0,1) ',
        ' matrix3d(1,0,0,0,0,0.8536585365853658,0,0,0,0,1,0,100,106,0,1) ',
        ' matrix3d(1,0,0,0,0,0.8292682926829268,0,0,0,0,1,0,100,107,0,1) ',
        ' matrix3d(1,0,0,0,0,0.8048780487804879,0,0,0,0,1,0,100,108,0,1) ',
        ' matrix3d(1,0,0,0,0,0.7804878048780488,0,0,0,0,1,0,100,109,0,1) ',
        ' matrix3d(1,0,0,0,0,0.7560975609756098,0,0,0,0,1,0,100,110,0,1) ',
        ' matrix3d(1,0,0,0,0,0.7317073170731707,0,0,0,0,1,0,100,111,0,1) ',
        ' matrix3d(1,0,0,0,0,0.7073170731707317,0,0,0,0,1,0,100,112,0,1) '
    ]);
});

test('Test calculateSteps', t => {

    // Given
    const height = 5,
        prefix = 'moveSteps_';

    // When
    const steps = Helpers.calculateSteps(height, prefix);

    // Then
    t.deepEqual(steps, [1, 2, 3, 4, 5, 4, 3, 2, 1, 0]);
});

test('Test calculateDelays', t => {

    // Given
    const height = 10,
        speed = 52,
        prefix = 'moveSteps_';

    // When
    const delays = Helpers.calculateDelays(height, speed, prefix);

    // Then
    t.deepEqual(delays, [
        0,
        6,
        13,
        20,
        29,
        39,
        52,
        69,
        95,
        147,
        199,
        251,
        277,
        294,
        307,
        317,
        326,
        333,
        340,
        346,
        346
    ]);
});
