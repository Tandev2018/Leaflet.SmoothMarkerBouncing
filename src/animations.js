import {
    calculateDelays, calculateIconMovePoints, calculateIconMoveTransforms,
    calculateIconResizeTransforms, calculateShadowMovePoints,
    calculateShadowMoveTransforms,
    calculateSteps
} from './helpers';

/**
 * Initializes object _bouncingMotion of supplied marker.
 * @param marker {Marker}  marker object
 */
function initBouncingMotion(marker) {
    if (!marker.hasOwnProperty("_bouncingMotion")) {
        marker._bouncingMotion = {
            isBouncing: false
        };
    }
}

/**
 * Calculates moveSteps, moveDelays, resizeSteps & resizeDelays for animation of supplied marker.
 *
 * Animation is defined by shifts of the marker from it's original position. Each step of the
 * animation is a shift of 1px.
 *
 * We define function f(x) - time of waiting between shift of x px and shift of x+1 px.
 *
 * We use for this the inverse function f(x) = a / x; where a is the animation speed and x is the
 * shift from original position in px.
 *
 * @param marker {Marker}  marker object
 * @return {Marker} the same updated marker
 */
export function calculateTimeline(marker) {
    const bouncingOptions = marker._bouncingOptions,
        {bounceHeight, bounceSpeed, elastic} = bouncingOptions;

    initBouncingMotion(marker);

    // Recalculate steps & delays of movement & resize animations
    marker._bouncingMotion.moveSteps = calculateSteps(bounceHeight, 'moveSteps_');
    marker._bouncingMotion.moveDelays = calculateDelays(bounceHeight, bounceSpeed, 'moveDelays_');

    // Calculate resize steps & delays only if elastic animation is enabled
    if (elastic) {
        const {contractHeight, contractSpeed} = bouncingOptions;

        marker._bouncingMotion.resizeSteps = calculateSteps(contractHeight, 'resizeSteps_');
        marker._bouncingMotion.resizeDelays = calculateDelays(contractHeight, contractSpeed,
            'resizeDelays_');
    }

    return marker;
}

/**
 * Calculates the transformations of supplied marker in 3D able browser.
 * @param marker {Marker}  marker object
 * @return {Marker} the same updated marker
 */
export function calculateTransforms3D(marker) {
    const iconHeight = marker.options.icon.options.iconSize
        ? marker.options.icon.options.iconSize[1]
        : marker._iconObj.options.iconSize[1],

        {x, y} = marker._bouncingMotion,
        {bounceHeight, contractHeight, shadowAngle} = marker._bouncingOptions;

    // Calculate move transforms of icon
    marker._bouncingMotion.iconMoveTransforms = calculateIconMoveTransforms(x, y, bounceHeight);

    // Calculate resize transforms of icon
    marker._bouncingMotion.iconResizeTransforms = calculateIconResizeTransforms(
        x, y, iconHeight, contractHeight);

    if (marker._shadow) {

        // Calculate move transformations of shadow
        marker._bouncingMotion.shadowMoveTransforms = calculateShadowMoveTransforms(
            x, y, bounceHeight, shadowAngle);

        // Calculate resize transforms of shadow
        // TODO: use function calculateShadowResizeTransforms
        const height = marker.options.icon.options.shadowSize[1];
        marker._bouncingMotion.shadowResizeTransforms = calculateIconResizeTransforms(
            x, y, height, contractHeight);
    }
}

/**
 * Calculates the transformations of supplied marker in old (without 3D support) browsers.
 * @param marker {Marker}  marker object
 * @return {Marker} the same updated marker
 */
export function calculateTransformsNo3D(marker) {
    const {x, y} = marker._bouncingMotion,
        {bounceHeight, shadowAngle} = marker._bouncingOptions;

    // Calculate move points for the icon
    marker._bouncingMotion.iconMovePoints = calculateIconMovePoints(x, y, bounceHeight);

    // Calculate move points for the shadow
    marker._bouncingMotion.shadowMovePoints = calculateShadowMovePoints(
        x, y, bounceHeight, shadowAngle);
}
