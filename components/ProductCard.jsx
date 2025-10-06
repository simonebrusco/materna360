'use client';
import useFavorites from '../hooks/useFavorites';

export default function ProductCard({ product }) {
  const { check, toggle, quota, premium } = useFavorites('products');
  const fav = check(product.id);

  async function onToggle(){
    const res = await toggle({
      id: product.id,
      title: product.title,
      thumb: product.image,
      price: product.price
    });
    if (res.limit) {
      window.dispatchEvent(new CustomEvent('m360:upgrade:prompt', { detail: { reason:'favorites' } }));
    }
  }

  return (
    <div className="rounded-2xl p-3 bg-white shadow-sm">
      {product.image ? (
        <div style={{marginBottom:8}}>
          <img src={product.image} alt={product.title || 'Produto'} style={{width:'100%',height:160,objectFit:'cover',borderRadius:12}} />
        </div>
      ) : null}
      <div className="font-medium mb-1">{product.title}</div>
      {product.price != null ? (
        <div className="text-sm opacity-80 mb-2">R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      ) : null}
      <button
        className={`px-3 py-1 rounded-full text-sm ${fav ? 'bg-black text-white' : 'bg-black/10'}`}
        onClick={onToggle}
        aria-pressed={fav}
      >
        {fav ? 'Favorito' : 'Favoritar'}
      </button>
      {!premium && (
        <div className="text-xs opacity-70 mt-1">
          {quota.used}/{quota.max} hoje (Free)
        </div>
      )}
    </div>
  );
}
