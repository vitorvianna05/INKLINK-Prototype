// Dados de demonstração para testar três conversas simultâneas na interface existente.
// A carga é aditiva: preserva mensagens, pedidos e encerramentos feitos pelo usuário.
const mockRequests = [
  {id:'mock-chat-camila',artist:'Camila Azevedo',idea:'Ramo delicado em fineline',place:'Costela',size:'10'},
  {id:'mock-chat-bruno',artist:'Bruno Costa',idea:'Retrato em realismo preto e cinza',place:'Braço',size:'18'}
];
const conversations = [
  {artist:1,texts:[
    'Separei algumas referências de folhas para o projeto botânico.',
    'Gostaria de manter bastante espaço entre os elementos do desenho.',
    'Meu antebraço mede aproximadamente 12 cm na área que pensei.',
    'Para mim, uma sessão no sábado de manhã seria ideal.'
  ]},
  {artist:2,texts:[
    'Oi, Camila! Adorei os trabalhos delicados do seu portfólio.',
    'Estou pensando em um ramo pequeno na costela, com cerca de 10 cm.',
    'Quero linhas bem finas e sem preenchimento, se for possível.',
    'Tenho disponibilidade às terças e quintas no período da tarde.',
    'Podemos conversar sobre o posicionamento antes de fechar o desenho?'
  ]},
  {artist:3,texts:[
    'Oi, Bruno! Gostei muito dos seus trabalhos em preto e cinza.',
    'Gostaria de fazer um retrato no braço, com aproximadamente 18 cm.',
    'Tenho uma fotografia de referência com boa resolução.',
    'Prefiro um contraste mais suave, preservando os detalhes do rosto.',
    'Você recomenda uma sessão única ou dividir o trabalho em duas?',
    'Consigo ir ao Rio de Janeiro em um fim de semana para a sessão.'
  ]}
];
const mockMessages=conversations.flatMap(({artist,texts})=>texts.map((text,index)=>({id:`mock-chat-${artist}-message-${index+1}`,artist,text,time:`2026-10-22T${String(10+artist).padStart(2,'0')}:${String(index*5).padStart(2,'0')}:00-03:00`})));
export function seedMockChats(storage){
  const read=(key,fallback)=>{try{return JSON.parse(storage.getItem(key))??fallback}catch{return fallback}};
  for(const [key,seeds] of [['inklink-requests',mockRequests],['inklink-messages',mockMessages]]){
    const stored=read(key,[]);
    if(!Array.isArray(stored))continue;
    const ids=new Set(stored.map(item=>item.id));
    const missing=seeds.filter(item=>!ids.has(item.id));
    if(missing.length)storage.setItem(key,JSON.stringify([...stored,...missing]));
  }
  const existing=read('inklink-services',{});
  storage.setItem('inklink-services',JSON.stringify({1:'active',2:'active',3:'active',...existing}));
}
