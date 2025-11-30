function CatalogProductCard({ product, onClick }) {
  return (
    <div
      className="card producto-card w-100"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <div
        className="card-image"
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '200px',
        }}
      >
        <img
          src={product.imagen}
          alt={product.nombre}
          className="img-fluid h-100 w-100"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="card-content p-3">
        <p className="mb-1">{product.nombre}</p>
        <p className="mb-1 text-muted">{product.plataforma}</p>
        <p
          className="precio mb-0"
          style={{ fontWeight: 'bold', color: '#2e7d32', fontSize: '18px' }}
        >
          ${product.precio}
        </p>
      </div>
    </div>
  )
}

export default CatalogProductCard
