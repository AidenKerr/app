import firebase from 'firebase-admin';
import functions from 'firebase-functions';

import pinTop from './lib/pin-top-track';
import * as spotifyAuth from './lib/spotify-auth';
import voteProcessor from './lib/vote-processor';

firebase.initializeApp(functions.config().firebase);

export const clientToken = functions.https.onRequest(spotifyAuth.clientToken);
export const exchangeCode = functions.https.onRequest(spotifyAuth.exchangeCode);
export const exchangeCodeProtocol = functions.https.onRequest(spotifyAuth.exchangeCodeProtocol);
export const refreshToken = functions.https.onRequest(spotifyAuth.refreshToken);

export const pinTopTrack = functions.database.ref('/tracks/{partyId}/{trackId}/order')
    .onWrite(pinTop);

export const processVotes = functions.database.ref('/votes/{partyId}/{trackId}/{userId}')
    .onWrite(voteProcessor);
