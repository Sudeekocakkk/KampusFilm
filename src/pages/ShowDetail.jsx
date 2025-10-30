import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function strip(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

export default function ShowDetail(){
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(()=>{
    (async ()=>{
      try{
        setLoading(true);
        const [s, e] = await Promise.all([
          axios.get(`https://api.tvmaze.com/shows/${id}`),
          axios.get(`https://api.tvmaze.com/shows/${id}/episodes`)
        ]);
        setShow(s.data);
        setEpisodes(e.data);
      }catch(ex){
        setErr(ex.message || "Yüklenemedi");
      }finally{
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="wrap"><div className="empty">Detaylar yükleniyor…</div></div>;
  if (err) return <div className="wrap"><div className="empty">Hata: {err}</div></div>;
  if (!show) return null;

  const img = show.image?.original || show.image?.medium || "https://via.placeholder.com/420x600?text=No+Image";

  return (
    <div className="wrap">
      <Link className="link" to="/">← Geri</Link>
      <div className="detail">
        <img src={img} alt={show.name} className="poster-lg"/>
        <div className="detail-meta">
          <h2>{show.name}</h2>
          <div className="tvsub">
            {show.language} · {show.genres?.join(", ") || "Tür yok"} · ⭐ {show.rating?.average ?? "-"}
          </div>
          <p className="tvover">{strip(show.summary)}</p>
          {show.officialSite && <a className="link" href={show.officialSite} target="_blank" rel="noreferrer">Resmi Site</a>}
          <h3>Bölümler</h3>
          <div className="episodes">
            {episodes.map(ep => (
              <div key={ep.id} className="ep">
                <span>S{String(ep.season).padStart(2,"0")}·E{String(ep.number).padStart(2,"0")}</span>
                <span>{ep.name}</span>
                <span>{ep.airdate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
