import "./Songs.css";

//Zastosowanie property children aby uniknac prop drillingu i przekazywania propsów przez kolejne komponenty. Logika komponentu została umieszczona wewnatrz komponentu nadrzednego w którym umieszczone są wszystkie dane - nie ma potrzeby ich przekazywania.
export function Songs({ children }) {
  return <section className="Songs">{children}</section>;
}
