export default function Filtres({ options, value, onChange }) {
  const { genres, languages } = options;
  const { genre, language, rating } = value;

  return (
    <div className="filters">
      <select
        className="select"
        value={genre}
        onChange={(e)=>onChange({ ...value, genre: e.target.value })}
        aria-label="Tür filtresi"
      >
        <option value="">Tür (hepsi)</option>
        {genres.map(g => <option key={g} value={g}>{g}</option>)}
      </select>

      <select
        className="select"
        value={language}
        onChange={(e)=>onChange({ ...value, language: e.target.value })}
        aria-label="Dil filtresi"
      >
        <option value="">Dil (hepsi)</option>
        {languages.map(l => <option key={l} value={l}>{l}</option>)}
      </select>

      <select
        className="select"
        value={String(rating)}
        onChange={(e)=>onChange({ ...value, rating: Number(e.target.value) })}
        aria-label="Minimum puan"
      >
        <option value="0">Min puan (hepsi)</option>
        {[1,2,3,4,5,6,7,8,9].map(n=>(
          <option key={n} value={n}>{n}+</option>
        ))}
      </select>
    </div>
  );
}
