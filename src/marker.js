import L, {Marker} from 'leaflet';
import {calculateTimeline, calculateTransforms3D, calculateTransformsNo3D} from './animations';

/** Default bouncing animation properties. */
const defaultBouncingOptions = {
    bounceHeight: 15,   // how high marker can bounce (px)
    contractHeight: 12, // how much marker can contract (px)
    bounceSpeed: 52,    // bouncing speed coefficient
    contractSpeed: 52,  // contracting speed coefficient
    shadowAngle: - Math.PI / 4, // shadow inclination angle(radians); null to cancel shadow movement
    elastic: true,      // activate contract animation
    exclusive: false    // many markers can bounce in the same time
};

/** Array of bouncing markers. */
Marker._bouncingMarkers = [];

/** Bouncing options shared by all markers. */
Marker.prototype._bouncingOptions = defaultBouncingOptions;

/**
 * Registers default options of bouncing animation.
 * @param options {object}  object with options
 */
Marker.setBouncingOptions = function(options) {
    L.extend(Marker.prototype._bouncingOptions, options);
};

/**
 * Returns array of currently bouncing markers.
 * @return {Marker[]} array of bouncing markers
 */
Marker.getBouncingMarkers = function() {
    return Marker._bouncingMarkers;
};

/**
 * Stops the bouncing of all currently bouncing markers. Purge the array of bouncing markers.
 */
Marker.stopAllBouncingMarkers = function() {
    var marker;

    while (marker = Marker._bouncingMarkers.shift()) {
        marker._bouncingMotion.isBouncing = false;    // stop bouncing
    }
};

/**
 * Registers options of bouncing animation for this marker. After registration of options for
 * this marker, it will ignore changes of default options. Function automatically recalculates
 * animation steps and delays.
 *
 * @param options {object}  options object
 * @return {Marker} this marker
 */
Marker.prototype.setBouncingOptions = function(options) {
    if (!this.hasOwnProperty('_bouncingOptions')) {
        this._bouncingOptions = L.extend({}, defaultBouncingOptions);
    }

    L.extend(this._bouncingOptions, options);

    // Recalculate steps & delays of movement & resize animations
    calculateTimeline(this);

    // Recalculate transformations
    if (L.Browser.any3d) {
        calculateTransforms3D(this);
    } else {
        calculateTransformsNo3D(this);
    }

    return this;
};

/**
 * Returns true if this marker is bouncing. If this marker is not bouncing returns false.
 * @return {boolean} true if marker is bouncing, false if not
 */
Marker.prototype.isBouncing = function() {
    return this._bouncingMotion.isBouncing;
};

/**
 * Adds the marker to the list of bouncing markers. If flag 'exclusive' is set to true, stops all
 * bouncing markers before.
 *
 * @param marker {Marker}  marker object
 * @param exclusive {boolean}  flag of exclusive bouncing. If set to true, stops the bouncing of all
 *      other markers.
 */
function addBouncingMarker(marker, exclusive) {
    if (exclusive || marker._bouncingOptions.exclusive) {
        Marker.stopAllBouncingMarkers();
    } else {
        Marker._stopEclusiveMarkerBouncing();
    }

    Marker._bouncingMarkers.push(marker);
}

/**
 * Removes the marker from the list of bouncing markers.
 * @param marker {Marker}  marker object
 */
function removeBouncingMarker(marker) {
    let i;

    if (i = Marker._bouncingMarkers.length) {
        while (i--) {
            if (Marker._bouncingMarkers[i] == marker) {
                Marker._bouncingMarkers.splice(i, 1);
                break;
            }
        }
    }
}

/**
 * Stops the bouncing of exclusive marker.
 */
function stopEclusiveMarkerBouncing() {
    let i;

    if (i = Marker._bouncingMarkers.length) {
        while (i--) {
            if (Marker._bouncingMarkers[i]._bouncingOptions.exclusive) {
                Marker._bouncingMarkers[i]._bouncingMotion.isBouncing = false;  // stop bouncing
                Marker._bouncingMarkers.splice(i, 1);
                break;
            }
        }
    }
}
