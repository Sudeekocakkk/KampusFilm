export const initialState = {
  loading: false,
  error: null,
  data: [],                 // TVMaze search sonuçları (array of {show})
  query: "friends",         // varsayılan sorgu
  filters: { genre: "", language: "", rating: 0 },
  watchlist: [],            // {id, name, image?}
  pageSize: 6
};

export function tvReducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload };
    case "SET_WATCHLIST":
      return { ...state, watchlist: action.payload };
    case "ADD_WATCHLIST": {
      const exists = state.watchlist.some(x => x.id === action.payload.id);
      return exists ? state : { ...state, watchlist: [...state.watchlist, action.payload] };
    }
    case "REMOVE_WATCHLIST":
      return { ...state, watchlist: state.watchlist.filter(x => x.id !== action.payload) };
    case "CLEAR_WATCHLIST":
      return { ...state, watchlist: [] };
    default:
      return state;
  }
}
