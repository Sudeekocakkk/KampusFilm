export default function Footer(){
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} Kampüs Film Kulübü · Hazırlayan: <strong>Adını Yaz</strong></span>
      <a className="link" href="https://www.tvmaze.com/api" target="_blank" rel="noreferrer">TVMaze API</a>
    </footer>
  );
}
