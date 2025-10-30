import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import SearchBox from "../components/SearchBox";
import Filtres from "../components/Filtres";
import TVList from "../components/TVList";
import Pagination from "../components/Pagination";
import WatchlistPanel from "../components/WatchlistPanel";
import Footer from "../components/Footer";

export default function Home({ state, dispatch }) {
  const { data, query, filters, watchlist, pageSize, loading, error } = state;

  // Sayfa numarasını reducer dışında (ödev aksiyon listesine sadık kalarak) tutuyoruz
  const [page, setPage] = useState(1);

  // Arama tetikleme
  const fetchData = async () => {
    try {
      dispatch({ type: "FETCH_INIT" });
      const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(state.query || "friends")}`);
      dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      setPage(1); // yeni aramada sayfayı başa al
    } catch (err) {
      dispatch({ type: "FETCH_FAILURE", payload: err.message || "İstek hatası" });
    }
  };

  // İlk açılışta varsayılan sorgu
  useEffect(() => { fetchData(); /* eslint-disable-next-line */ }, []);

  // filtre seçeneklerini mevcut sonuçlardan çıkar
  const options = useMemo(() => {
    const genres = new Set();
    const languages = new Set();
    (data || []).forEach(item => {
      item.show.genres?.forEach(g => genres.add(g));
      if (item.show.language) languages.add(item.show.language);
    });
    return { genres: [...genres].sort(), languages: [...languages].sort() };
  }, [data]);

  // filtre uygulanmış sonuçlar
  const filtered = useMemo(() => {
    return (data || []).filter(({ show }) => {
      const okGenre = !filters.genre || show.genres?.includes(filters.genre);
      const okLang  = !filters.language || show.language === filters.language;
      const rating = show.rating?.average ?? 0;
      const okRate = !filters.rating || rating >= filters.rating;
      return okGenre && okLang && okRate;
    });
  }, [data, filters]);

  // sayfalama
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page-1)*pageSize, page*pageSize);

  // watchlist işlemleri
  const addWatch = (item) => dispatch({ type: "ADD_WATCHLIST", payload: item });
  const removeWatch = (id) => dispatch({ type: "REMOVE_WATCHLIST", payload: id });
  const clearWatch = () => dispatch({ type: "CLEAR_WATCHLIST" });

  return (
    <div className="wrap">
      <h1>KampüsFilm</h1>

      <SearchBox
        value={query}
        onChange={(v)=>dispatch({ type: "SET_QUERY", payload: v })}
        onSubmit={fetchData}
      />

      <div className="grid">
        {/* Sol panel: filtre + liste + sayfalama */}
        <section className="card">
          <Filtres
            options={options}
            value={filters}
            onChange={(v)=>{ dispatch({ type: "SET_FILTERS", payload: v }); setPage(1); }}
          />

          {/* Koşullu render */}
          {loading && <div className="empty">Yükleniyor…</div>}
          {error && (
            <div className="empty">
              Hata: {error}{" "}
              <button className="btn" onClick={fetchData}>Tekrar dene</button>
            </div>
          )}
          {!loading && !error && (
            <>
              {filtered.length === 0 ? (
                <div className="empty">Sonuç bulunamadı.</div>
              ) : (
                <>
                  <TVList shows={paged} watchlist={watchlist} onAdd={addWatch} />
                  <Pagination page={page} totalPages={totalPages} onChange={setPage} />
                </>
              )}
            </>
          )}
        </section>

        {/* Sağ panel: watchlist */}
        <WatchlistPanel items={watchlist} onRemove={removeWatch} onClear={clearWatch} />
      </div>

      <Footer />
    </div>
  );
}
