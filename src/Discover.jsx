import React, {useState} from 'react';
import {Search, SlidersHorizontal, ArrowRight, Sparkles, X} from 'lucide-react';
import './discover.css';

const initial={term:'',style:'',city:'',budget:''};
const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
export default function Discover({artists,renderCards}){
 const [filters,setFilters]=useState(initial);
 const [submitted,setSubmitted]=useState(null);
 const update=(key,value)=>setFilters(previous=>({...previous,[key]:value}));
 const results=submitted?artists.filter(a=>(!submitted.term||normalize(`${a.name} ${a.studio} ${a.style} ${a.city}`).includes(normalize(submitted.term)))&&(!submitted.style||a.style===submitted.style)&&(!submitted.city||a.city===submitted.city)&&(!submitted.budget||a.price<=Number(submitted.budget))):[];
 const dirty=submitted&&Object.keys(initial).some(key=>filters[key]!==submitted[key]);
 const clear=()=>{setFilters(initial);setSubmitted(null)};
 return <section className="discover-page">
  <div className="discovery-intro"><span className="eyebrow">SUA IDEIA É O PONTO DE PARTIDA</span><h1>O próximo traço<br/>começa com a <em>sua busca.</em></h1><p>Encontre quem combina com sua ideia. Escolha o estilo, a cidade e o orçamento para descobrir sua próxima conexão.</p></div>
  <form className="discovery-form" onSubmit={e=>{e.preventDefault();setSubmitted({...filters,term:filters.term.trim()})}}>
   <label className="discovery-search"><span>O que você está procurando?</span><div><Search size={23}/><input aria-label="Buscar artista, estúdio, estilo ou cidade" placeholder="Artista, estúdio, estilo ou cidade…" value={filters.term} onChange={e=>update('term',e.target.value)}/></div></label>
   <div className="discovery-filter-heading"><SlidersHorizontal size={15}/><span>Deixe a busca com a sua cara</span><small>Todos os filtros são opcionais</small></div>
   <div className="discovery-filters"><label><span>Estilo de tatuagem</span><select value={filters.style} onChange={e=>update('style',e.target.value)}><option value="">Todos os estilos</option>{[...new Set(artists.map(a=>a.style))].map(style=><option key={style}>{style}</option>)}</select></label><label><span>Onde você quer tatuar?</span><select value={filters.city} onChange={e=>update('city',e.target.value)}><option value="">Todas as cidades</option>{[...new Set(artists.map(a=>a.city))].map(city=><option key={city}>{city}</option>)}</select></label><label><span>Orçamento por sessão</span><select value={filters.budget} onChange={e=>update('budget',e.target.value)}><option value="">Qualquer valor</option><option value="400">Até R$ 400</option><option value="500">Até R$ 500</option><option value="700">Até R$ 700</option></select></label></div>
   <div className="discovery-actions"><button type="button" className="text-button muted" onClick={clear}><X size={14}/>Limpar busca</button><button className="button red" type="submit"><Search size={17}/>Buscar artistas <ArrowRight size={17}/></button></div>
  </form>
  {!submitted?<div className="discovery-start"><div className="discovery-symbol"><Sparkles size={25}/></div><h2>Cada história tem um traço.</h2><p>Comece pela pesquisa ou escolha os filtros acima.<br/>Os artistas aparecem depois que você buscar.</p></div>:<section className="discovery-results" aria-label="Resultados da busca"><div className="section-heading"><div><span className="eyebrow">SUA BUSCA, SUAS POSSIBILIDADES</span><h2>Artistas para você <span className="count">{results.length}</span></h2><p role="status">{dirty?'Você alterou os filtros. Clique em Buscar artistas para atualizar os resultados.':`${results.length} ${results.length===1?'artista encontrado':'artistas encontrados'} para sua pesquisa.`}</p></div></div>{results.length?renderCards(results):<div className="empty"><Search size={30}/><h3>Ainda não encontramos essa conexão.</h3><p>Experimente outro termo, estilo, cidade ou faixa de orçamento.</p><button className="text-button red-text" onClick={clear}>Limpar busca e tentar novamente <ArrowRight size={15}/></button></div>}</section>}
 </section>
}
