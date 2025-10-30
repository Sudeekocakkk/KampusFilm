export default function SearchBox({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={(e)=>{ e.preventDefault(); onSubmit?.(); }}
      className="toolbar"
      role="search"
      aria-label="Dizi arama formu"
    >
      <input
        className="input"
        placeholder="Dizi ara… (ör. friends)"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
      />
      <button className="btn" type="submit">Ara</button>
    </form>
  );
}
