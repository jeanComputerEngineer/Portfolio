const data = [
    {
        question: "Você nasceu, que incrível! Como você era no seu tempo de escola?",
        options: [
            "O mais inteligente da turma",
            "Uns dos mais inteligentes, mas abaixo de alguns",
            "Nem inteligente nem burro",
            "Era um dos mais burros"
        ].sort(() => Math.random() - 0.5),
        answer: "O mais inteligente da turma",
        retorno: "Infelizmente você não é o melhor, não vai dar nem pro cheiro pra concorrência no futuro."
    },
    {
        question: "Tinha muitos amigos?",
        options: [
            "Sim, sempre rodeado de amigos",
            "Tinha alguns amigos mais próximos",
            "Não, apenas falsos amigos ou 'amigos' entre aspas",
            "Não tinha nenhum amigo, nem os falsos"
        ].sort(() => Math.random() - 0.5),
        answer: "Sim, sempre rodeado de amigos",
        retorno: "Infelizmente você não é popular, apenas admire quem é e consegue."
    },
    {
        question: "Era alto e musculoso?",
        options: [
            "Sim, sempre fui alto/musculoso",
            "Era mais ou menos na média",
            "Era alto e magro ou baixo e musculoso",
            "Era gordo e baixo"
        ].sort(() => Math.random() - 0.5),
        answer: "Sim, sempre fui alto/musculoso",
        retorno: "Infelizmente ninguém vai te respeitar ou te querer..."
    },
    {
        question: "Ficava com todo mundo?",
        options: [
            "Sim, era pegador",
            "Ficava com algumas pessoas",
            "Raramente ficava com alguém",
            "Não ficava com ninguém"
        ].sort(() => Math.random() - 0.5),
        answer: "Sim, era pegador",
        retorno: "Você não é o melhor, não é o cara."
    },
    {
        question: "Era bom nos esportes?",
        options: [
            "Sim, o melhor",
            "Era um dos melhores, mas longe de ser o melhor",
            "Meio ruim em tudo",
            "Péssimo nos esportes"
        ].sort(() => Math.random() - 0.5),
        answer: "Sim, o melhor",
        retorno: "Infelizmente ninguém vai te admirar nisso..."
    },
    {
        question: "Saia bastante no tempo de escola?",
        options: [
            "Sim, sempre estava fora de casa",
            "Nem sempre, no máximo 1x por semana",
            "Raramente",
            "Nunca me chamaram pra sair ou nunca fui"
        ].sort(() => Math.random() - 0.5),
        answer: "Sim, sempre estava fora de casa",
        retorno: "Você definitivamente é uma pessoa sem graça e possivelmente sem dinheiro."
    },
    {
        question: "Brigava com a sua família?",
        options: [
            "Quase nunca brigava",
            "Brigava em 25% do tempo",
            "Na metade do tempo",
            "Brigava com frequência"
        ].sort(() => Math.random() - 0.5),
        answer: "Quase nunca brigava",
        retorno: "Você é muito rebelde, péssimo filho."
    },
    {
        question: "Tinha algum problema como depressão ou ansiedade?",
        options: [
            "Nunca tive problemas emocionais",
            "Muito pouco",
            "Sim, tive depressão ou ansiedade",
            "Sim, tive depressão e ansiedade"
        ].sort(() => Math.random() - 0.5),
        answer: "Nunca tive problemas emocionais",
        retorno: "Que problemático, para de drama!"
    },
    {
        question: "Passou no vestibular?",
        options: [
            "Sim, passei de primeira em uma pública",
            "Sim, passei de segunda ou terceira em uma pública",
            "Sim, passei em uma particular",
            "Não passei em nada ou nem tentei"
        ].sort(() => Math.random() - 0.5),
        answer: "Sim, passei de primeira em uma pública",
        retorno: "Infelizmente você não está nem entre os melhores, que fracasso."
    },
    {
        question: "Terminou a faculdade?",
        options: [
            "Ainda estou cursando",
            "Não, abandonei o curso",
            "Não cursei faculdade",
            "Sim, concluí a faculdade"
        ].sort(() => Math.random() - 0.5),
        answer: "Sim, concluí a faculdade",
        retorno: "Nem uma faculdade terminada em, que decepção!"
    },
    {
        question: "Conseguiu seu primeiro emprego com:",
        options: [
            "Facilidade, após se formar ou depois dos 23",
            "Muito tempo depois de se formar ou muito tempo depois dos 18 anos",
            "Muita facilidade, antes de todo mundo, antes dos 23",
            "Ainda não consegui meu primeiro emprego"
        ].sort(() => Math.random() - 0.5),
        answer: "Muita facilidade, antes de todo mundo, antes dos 23",
        retorno: "Mas você é um inútil mesmo em, nem para produzir nada!"
    },
    {
        question: "Ficou totalmente independente financeiramente com:",
        options: [
            "Antes de todo mundo, antes dos 23",
            "Depois de formado ou dos 23",
            "Depois dos 30",
            "Não alcancei independência financeira."
        ].sort(() => Math.random() - 0.5),
        answer: "Antes de todo mundo, antes dos 23",
        retorno: "Seja mais produtivo! Insuficiente!"
    },
    {
        question: "Casou com quantos anos?",
        options: [
            "Casei jovem, antes dos 25",
            "Casei entre 25 e 30 anos",
            "Casei entre 30 e 35 anos",
            "Ainda não casei"
        ].sort(() => Math.random() - 0.5),
        answer: "Casei jovem, antes dos 25",
        retorno: "Que tarde, vai ficar velho e não vai conseguir ninguém, ou será que você é... feio?"
    },
    {
        question: "A pessoa que você casou, era?",
        options: [
            "Linda e rica",
            "Feia e rica",
            "Linda e pobre",
            "Pobre e feia"
        ].sort(() => Math.random() - 0.5),
        answer: "Linda e rica",
        retorno: "Nem pra conseguir uma opção mais decente, vai ver você também não é decente."
    },
    {
        question: "Depois de casar, ficou rico?",
        options: [
            "Sim, conquistei a riqueza",
            "Tenho uma vida financeira confortável",
            "Vivo com dificuldades financeiras",
            "Não consegui nada, dependo dos meus pais ou do meu conjugê"
        ].sort(() => Math.random() - 0.5),
        answer: "Sim, conquistei a riqueza",
        retorno: "Que fracasso, nunca terá uma vida digna."
    },
];

export default data;
