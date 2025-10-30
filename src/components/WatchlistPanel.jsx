import { Link } from "react-router-dom";

export default function WatchlistPanel({ items, onRemove, onClear }) {
  return (
    <aside className="panel">
      <div className="panel-head">
        <span>🎬 Gösterime Girecekler</span>
        <span className="badge">{items.length}</span>
      </div>

      {items.length === 0 ? (
        <div className="empty">Henüz bir dizi eklenmedi.</div>
      ) : (
        <>
          <div className="fav-list">
            {items.map(it => (
              <div key={it.id} className="fav-item">
                <div className="fav-meta">
                  <img src={it.image} alt="" />
                  <Link to={`/show/${it.id}`} className="fav-title">{it.name}</Link>
                </div>
                <button className="btn" onClick={()=>onRemove(it.id)}>Kaldır</button>
              </div>
            ))}
          </div>
          <button className="btn danger" onClick={onClear} style={{marginTop:8}}>Listeyi Temizle</button>
        </>
      )}
    </aside>
  );
}
