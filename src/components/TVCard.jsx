import { Link } from "react-router-dom";

function strip(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

export default function TVCard({ show, onAdd, inWatchlist }) {
  const img = show.image?.medium || show.image?.original || "https://via.placeholder.com/210x295?text=No+Image";
  const rating = show.rating?.average ?? "-";

  return (
    <div className="tvcard">
      <img src={img} alt={show.name} className="poster" />
      <div className="tvmeta">
        <h3 className="tvtitle">{show.name}</h3>
        <div className="tvsub">
          {show.language} · {show.genres?.join(", ") || "Tür yok"} · ⭐ {rating}
        </div>
        <p className="tvover">{strip(show.summary)?.slice(0, 140) || "Özet yok"}{strip(show.summary)?.length > 140 ? "…" : ""}</p>
        <div className="row">
          <Link className="btn" to={`/show/${show.id}`}>Detay</Link>
          <button
            className={`btn btn-fav ${inWatchlist ? "is-fav": ""}`}
            onClick={() => onAdd({ id: show.id, name: show.name, image: img })}
          >
            {inWatchlist ? "★ Listed eklendi" : "☆ Kısa Listeye Ekle"}
          </button>
        </div>
      </div>
    </div>
  );
}
