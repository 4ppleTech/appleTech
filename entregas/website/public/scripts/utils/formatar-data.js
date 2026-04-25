function formatarDataAtual() {
  const data = new Date();
  
  const opcoes = { 
    weekday: 'short', 
    day: '2-digit', 
    month: 'short' 
  };

  return data.toLocaleDateString('pt-BR', opcoes).replace('.', '');
}