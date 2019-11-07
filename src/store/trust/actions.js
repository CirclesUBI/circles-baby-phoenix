import ActionTypes from '~/store/trust/types';
import core from '~/services/core';
import resolveUsernames from '~/services/username';

const TRUST_CONNECTION_LIMIT = 3;

export function checkTrustState() {
  return async (dispatch, getState) => {
    const { safe } = getState();

    // Safe address does not exist or is not deployed yet
    if (!safe.address || safe.nonce) {
      return;
    }

    const network = await core.trust.getNetwork(safe.address);

    // Check if we reached a trusted status (to be ready for
    // final Safe deployment)
    const isTrusted =
      network.reduce((acc, connection) => {
        return connection.isTrustingMe ? acc + 1 : acc;
      }, 0) >= TRUST_CONNECTION_LIMIT;

    // Resolve usernames
    const usernames = await resolveUsernames(
      network.map(connection => {
        return connection.safeAddress;
      }),
    );

    const resolvedNetwork = network.map(connection => {
      return {
        ...connection,
        username: usernames[connection.safeAddress],
      };
    });

    dispatch({
      type: ActionTypes.TRUST_UPDATE,
      meta: {
        isTrusted,
        network: resolvedNetwork,
      },
    });
  };
}

export function trustUser(safeAddress) {
  return async (dispatch, getState) => {
    const { safe } = getState();

    if (!safe.address) {
      return;
    }

    await core.trust.addConnection(safe.address, safeAddress);
  };
}

export function untrustUser(safeAddress) {
  return async (dispatch, getState) => {
    const { safe } = getState();

    if (!safe.address) {
      return;
    }

    await core.trust.removeConnection(safe.address, safeAddress);
  };
}
