// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password

    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

//update the user in session in navbar
export const updateSession = (user) =>(dispatch)=>dispatch(setUser(user))

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    default:
      return state;
  }
}


// CART REDUCER
const initialState2 = {
	items: {},
	order: [],
};
export function cartReducer(state = initialState2, action) {
	switch (action.type) {
		case ADD_ITEM:
			return {
				...state,
				items: {
					...state.items,
					[action.itemId]: { id: action.itemId, count: 1 },
				},
				order: [...state.order, action.itemId],
			};
		case UPDATE_COUNT:
			return {
				...state,
				items: {
					...state.items,
					[action.itemId]: {
						...state[action.itemId],
						id: action.itemId,
						count: action.count,
					},
				},
			};
		case REMOVE_ITEM:
			const newState = { ...state, items: { ...state.items } };
			delete newState.items[action.itemId];
			newState.order = newState.order.filter(
				(id) => id !== action.itemId
			);
			return newState;
		case RESET_CART:
			return initialState2;
		default:
			return state;
	}
}

