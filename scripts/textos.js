// Traduções do site.
//
// O INGLÊS fica só no index.html: o main.js lê os textos de lá ao abrir a página.
// Para mudar um texto em inglês, mude no HTML. Para mudar em português, mude aqui.
//
// No HTML, cada elemento traduzível tem data-i18n="chave" (texto puro),
// data-i18n-html="chave" (texto com <strong>/<a>) ou data-i18n-attr="atributo:chave".
// Conferir se nenhuma chave ficou sem português: node scripts/checar-textos.mjs

const TEXTOS = {
  pt: {
    titulo: 'Kerlon Ribeiro',
    descricao: 'Desenvolvedor de IoT e automação. Projetos, habilidades e contato de Kerlon Ribeiro.',
    menuSobre: 'Sobre',
    menuProjetos: 'Projetos',
    menuContato: 'Contato',
    curriculo: 'Currículo',
    voltarTopo: 'Kerlon Ribeiro, voltar ao topo',
    trocarIdioma: 'EN: view in English',
    oiEuSou: 'Oi, eu sou',
    lead: 'Entusiasta de IoT e estagiário de automação, apaixonado por soluções inovadoras e por integrar impressão 3D para levar as ideias mais longe.',

    sobreTitulo: 'Sobre mim',
    sobreSub: 'Entusiasta de IoT e automação, criando soluções tecnológicas inovadoras e sustentáveis. Com experiência em impressão 3D e resolução de problemas, transformo ideias em resultados.',
    conhecaTitulo: 'Prazer, eu sou o Kerlon!',
    conheca1: 'Oi! Eu sou o <strong>Kerlon</strong>, <strong>entusiasta de IoT</strong> e <strong>estagiário de automação</strong> no setor <strong>Aquário da TECNICON</strong>. Trabalhei em projetos como <strong>automação predial</strong>, <strong>CleanFlow</strong> e <strong>secadores de filamento automatizados</strong>, unindo IoT e impressão 3D.',
    conheca2: 'Com experiência em <strong>Startup Weekend</strong> e gosto por resolver desafios, transformo ideias em soluções de impacto. Vamos conversar!',
    contato: 'Contato',
    habilidades: 'Habilidades',
    catProgramacao: 'Programação e sistemas',
    catHardware: 'Hardware e criação',
    dicaHtml: 'Estrutura de páginas semântica e acessível, aplicada em projetos reais.',
    dicaCss: 'Layouts responsivos, animações e interfaces modernas usadas em produção.',
    dicaJs: 'Lógica interativa e comportamento dinâmico em aplicações web reais.',
    dicaFigma: 'Protótipos de interface com foco em usabilidade e comunicação visual clara.',
    dicaCpp: 'Programação de alto desempenho para sistemas embarcados e de automação.',
    dicaArduino: 'Prototipagem rápida e automação com sensores e atuadores em projetos práticos.',
    dicaEsp32: 'Desenvolvimento IoT com comunicação sem fio, incluindo ESP-NOW e Wi-Fi.',
    dicaRasp: 'Computação embarcada para automação de sistemas e integração de serviços.',
    dica3d: 'Projeto e produção de peças funcionais para soluções reais de automação e IoT.',
    dicaFusion: 'Modelagem 3D técnica com foco em componentes mecânicos e funcionais.',
    dicaRobotica: 'Integração de sensores, atuadores e lógica de controle em sistemas de automação.',
    imp3d: 'Impressão 3D',
    robotica: 'Robótica',

    projetosTitulo: 'Projetos',
    projetosSub: 'Meus projetos principais. Todos os outros, de robôs a sites, estão explicados no Acervo.',
    visitarSite: 'Ver site',
    codigo: 'Código',
    baixar: 'Baixar',
    verNoAcervo: 'Ver no Acervo',

    bifrostEtiqueta: 'Landing page de IoT',
    bifrost1: 'Uma central de comunicação inteligente que conecta e gerencia dispositivos que usam tecnologias sem fio diferentes, de forma simples e eficiente.',
    bifrost2: 'Sensores que falam "línguas" diferentes (ESP-NOW, LoRa, MQTT) mandam mensagens para gateways, e um Raspberry Pi decide para onde cada uma vai, traduzindo entre os protocolos.',
    visitarBifrost: 'Ver o site da Bifrost',
    codigoBifrost: 'Código da Bifrost',

    atlasEtiqueta: 'Robótica, na SETREM',
    atlas1: 'O robô do curso de Engenharia de Computação da SETREM: anda, se localiza, fala e mostra seus dados num aplicativo.',
    atlas2: 'Dividido em três partes: o corpo (motores, GPS, Wi-Fi e telemetria num Raspberry Pi), a cara (rosto animado com voz e conversa por IA) e o controle (app em Flutter que dirige o robô por Bluetooth).',
    codigoAtlas: 'Código do Atlas',
    acervoAtlas: 'https://acervo.kerlonr.com.br/projetos/atlas',


    camaraEtiqueta: 'Jogo',
    camara1: 'Jogo 2D de mineração e horror numa mina fictícia perto de Chernobyl, em abril de 1986. Você é um mineiro do Turno C e descobre aos poucos o que existe atrás da Câmara 7.',
    camara2: 'Feito na Godot em pixel art, com instalador para Windows e atualização automática: o jogo baixa só o conteúdo novo (cerca de 4 MB), confere a integridade e nunca mexe nos seus saves.',
    baixarCamara: 'Baixar o Câmara 7',
    codigoCamara: 'Código do Câmara 7',

    acervoTitulo: 'Quer ver tudo?',
    acervoTexto: 'Robôs, gateways IoT, jogos e sistemas web, todos explicados no Acervo.',
    acervoBotao: 'Abrir o Acervo',
    acervoLink: 'https://acervo.kerlonr.com.br/',

    contatoTitulo: 'Contato',
    contatoSub: 'Fique à vontade para chamar! Seja uma dúvida, uma ideia ou só para trocar uma ideia, vou gostar de ouvir você.',
    nome: 'Nome',
    nomePh: 'Seu nome',
    email: 'E-mail',
    emailPh: 'Seu e-mail',
    mensagem: 'Mensagem',
    mensagemPh: 'Sua mensagem',
    enviar: 'Enviar mensagem',
    rodape: 'Sou apaixonado por tecnologia e inovação, sempre atrás de soluções criativas em automação e IoT. Adoro transformar ideias em realidade!',
  },
};

// Palavras do efeito de digitação no título, por idioma.
const PALAVRAS = {
  en: ['Kerlon', 'an Innovator', 'an IoT Developer', 'a 3D Maker'],
  pt: ['Kerlon', 'um Inovador', 'Dev de IoT', 'Maker 3D'],
};
