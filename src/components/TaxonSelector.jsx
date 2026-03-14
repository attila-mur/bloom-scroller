import './TaxonSelector.css'

const TAXA = [
  { id: 47126, label: 'Plants' },
  { id: 3,     label: 'Birds'  },
]

export default function TaxonSelector({ onSelect }) {
  return (
    <div className="selector">
      <h1 className="selector-title">Bloom</h1>
      <div className="selector-options">
        {TAXA.map(t => (
          <button key={t.id} className="selector-option" onClick={() => onSelect(t)}>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}
