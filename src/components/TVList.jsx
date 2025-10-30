import TVCard from "./TVCard";

export default function TVList({ shows, watchlist, onAdd }) {
  if (!shows || shows.length === 0)
    return <div className="empty">Liste boş.</div>;

  const ids = new Set(watchlist.map(w => w.id));

  return (
    <div className="grid-cards">
      {shows.map(s => (
        <TVCard
          key={s.show.id}
          show={s.show}
          onAdd={onAdd}
          inWatchlist={ids.has(s.show.id)}
        />
      ))}
    </div>
  );
}
