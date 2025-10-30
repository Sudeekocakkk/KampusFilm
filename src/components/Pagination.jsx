export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const goto = (p) => onChange(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="pagination">
      <button className="btn" disabled={page===1} onClick={()=>goto(1)}>İlk</button>
      <button className="btn" disabled={page===1} onClick={()=>goto(page-1)}>Geri</button>
      <span className="pageinfo">Sayfa {page} / {totalPages}</span>
      <button className="btn" disabled={page===totalPages} onClick={()=>goto(page+1)}>İleri</button>
      <button className="btn" disabled={page===totalPages} onClick={()=>goto(totalPages)}>Son</button>
    </div>
  );
}
