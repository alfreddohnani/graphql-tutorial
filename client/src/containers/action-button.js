import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from '@reach/router';

import { GET_LAUNCH_DETAILS } from './launch';
import { StyledActionButton } from '../components/button';

const TOGGLE_CART_MUTATION = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;

const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

const ActionButton = ({ isBooked, id, isInCart }) => (
  <Mutation
    mutation={isBooked ? CANCEL_TRIP : TOGGLE_CART_MUTATION}
    variables={{ launchId: id }}
    refetchQueries={[
      {
        query: GET_LAUNCH_DETAILS,
        variables: { launchId: id },
      },
    ]}
  >
    {(mutate, { data, loading, error }) => {
      return (
        <div>
          <StyledActionButton onClick={mutate} isBooked={isBooked}>
            {isBooked
              ? 'Cancel This Trip'
              : isInCart
                ? 'Remove from Cart'
                : 'Add to Cart'}
          </StyledActionButton>
          {isInCart && (
            <Link to="/cart" style={{ marginLeft: '16px' }}>
              Go to Cart
            </Link>
          )}
        </div>
      );
    }}
  </Mutation>
);

export default ActionButton;