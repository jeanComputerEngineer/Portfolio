import React, { useState } from 'react';
import styles from './Pessoal.module.css';
import { useTheme } from '../../ThemeContext';
import { MdDarkMode } from 'react-icons/md';
import { FaSun } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Função auxiliar para importar e ordenar todas as imagens de uma pasta alfabeticamente
const importAll = (r) =>
    r.keys()
        .sort() // Ordena os nomes dos arquivos (ex.: "./a.jpg", "./b.jpg", ...)
        .map((key) => ({ src: r(key), key }));

// Importa todas as imagens de cada álbum automaticamente e ordena alfabeticamente
const photosEu = importAll(
    require.context('../../repositorioImagens/Fotos Pessoais/Eu', false, /\.(png|jpe?g|svg)$/)
);
const photosFamilia = importAll(
    require.context('../../repositorioImagens/Fotos Pessoais/Familia', false, /\.(png|jpe?g|svg)$/)
);
const photosPrivado = importAll(
    require.context('../../repositorioImagens/Fotos Pessoais/Privado', false, /\.(png|jpe?g|svg)$/)
);
const photosLugares = importAll(
    require.context('../../repositorioImagens/Fotos Pessoais/Lugares', false, /\.(png|jpe?g|svg)$/)
);
const photosCrianca = importAll(
    require.context('../../repositorioImagens/Fotos Pessoais/Criança', false, /\.(png|jpe?g|svg)$/)
);

// Função que recebe um array de imagens e retorna o array com os atributos alt modificados:
// Metade das fotos receberá "Jean Henrique N" e a outra metade "Jean Samuel Candido Henrique N".
const renamePhotos = (photosArray) => {
    const total = photosArray.length;
    return photosArray.map((img, index) => {
        const altText =
            index < total / 2
                ? `Jean Henrique ${index + 1}`
                : `Jean Samuel Candido Henrique ${index + 1}`;
        return {
            src: img.src,
            alt: altText,
            description: '',
        };
    });
};

// Geração automática dos álbuns com base nas imagens importadas
const albumsData = [
    {
        id: 1,
        title: 'Eu',
        description: 'Minhas principais fotos.',
        cover: renamePhotos(photosEu)[0].src, // A primeira imagem (em ordem alfabética) será a capa
        photos: renamePhotos(photosEu),
    },
    {
        id: 2,
        title: 'Família',
        description: 'Fotos de família.',
        cover: renamePhotos(photosFamilia)[0].src,
        photos: renamePhotos(photosFamilia),
    },
    {
        id: 3,
        title: 'Lugares',
        description: 'Fotos de lugares visitados.',
        cover: renamePhotos(photosLugares)[0].src,
        photos: renamePhotos(photosLugares),
    },
    {
        id: 4,
        title: 'Criança',
        description: 'Fotos da minha Infância.',
        cover: renamePhotos(photosCrianca)[0].src,
        photos: renamePhotos(photosCrianca),
    },
    {
        id: 5,
        title: 'Privado',
        description: 'Fotos privadas.',
        cover: renamePhotos(photosPrivado)[0].src,
        isPrivate: true,
        photos: renamePhotos(photosPrivado),
    },
];

function Pessoal() {
    // Estado para controlar qual álbum está selecionado (null = nenhum álbum aberto)
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    // Pega informações do tema (dark/light) e a função para alternar
    const { isDarkMode, toggleTheme } = useTheme();
    const themeClass = isDarkMode ? styles.dark : styles.light;

    const handleOpenAlbum = (albumId) => {
        const album = albumsData.find((alb) => alb.id === albumId);
        // Se o álbum for privado, solicita a senha
        if (album.isPrivate) {
            const enteredPassword = prompt(
                'Este álbum é privado. Digite a senha para acessar:'
            );
            if (enteredPassword !== process.env.REACT_APP_ALBUM_PASSWORD) {
                alert('Senha incorreta!');
                return;
            }
        }
        setSelectedAlbum(album);
    };

    const handleBackToAlbums = () => {
        setSelectedAlbum(null);
    };

    return (
        <div className={`${styles.pessoalContainer} ${themeClass}`}>
            {/* Botão para alternar o tema – posicionado no canto superior direito */}


            <h1 className={styles.title}>Minha Vida Pessoal</h1>

            <section className={styles.biografia}>
                <h2>Biografia</h2>
                <p>
                    Olá! Meu nome é <strong>Jean</strong> e nasci em Paranaguá, Paraná.
                    Desde pequeno, sempre fui curioso sobre o mundo ao meu redor, o que só
                    aumentou no ensino médio, quando sonhava em me tornar um cientista – fosse
                    na física ou na computação. Sempre senti que trilhei um caminho um pouco
                    diferente da maioria, indo contra o senso comum, mas sem nunca deixar de
                    valorizar os laços verdadeiros que construí ao longo do caminho.
                </p>
                <p>
                    Sou apaixonado por aprender e explorar novas experiências. Me considero
                    uma pessoa comunicativa e determinada, sempre buscando crescer, seja por
                    conta própria ou colaborando com outras pessoas. Embora tenha um perfil
                    independente e goste de estar à frente das situações, reconheço a importância
                    do trabalho em equipe e estou sempre disposto a aprender com aqueles que
                    têm mais experiência do que eu.
                </p>
                <p>
                    Hoje, estou prestes a me formar em Engenharia de Computação e estou em
                    busca das minhas primeiras oportunidades na área de TI. Meu objetivo é
                    construir uma carreira sólida, expandir meus conhecimentos e, com isso,
                    alcançar a estabilidade financeira e realizar meus sonhos. Sei que cada
                    passo dessa jornada me leva para mais perto do que almejo, e estou animado
                    para o que vem pela frente!
                </p>
            </section>

            <section className={styles.hobbies}>
                <h2>O que eu gosto de fazer</h2>
                <ul>
                    <li>Viajar e conhecer lugares, experimentar comidas e coisas novas</li>
                    <li>Praticar academia ou calistenia</li>
                    <li>Assistir vídeos instrutivos, animes e filmes</li>
                    <li>Jogar jogos de computador, principalmente com os amigos</li>
                    <li>
                        Programar no tempo livre e ficar orgulhoso dos raciocínios realizados
                    </li>
                </ul>
            </section>

            <section className={styles.personalidade}>
                <h2>Personalidade</h2>
                <p>
                    Sou uma pessoa comunicativa, curiosa e sempre em busca de aprendizado.
                    Gosto de entender como as coisas funcionam e questionar o mundo ao meu
                    redor, o que me levou a desenvolver um pensamento analítico e uma
                    mentalidade orientada à resolução de problemas.
                </p>
                <p>
                    Tenho um perfil independente e gosto de estar no controle das situações,
                    mas também reconheço a importância de colaborar e aprender com os outros.
                    No trabalho e na vida, valorizo a eficiência e a lógica, sempre buscando
                    soluções práticas e bem fundamentadas. Ao mesmo tempo, sou criativo e
                    gosto de explorar novas possibilidades, seja programando, encontrando
                    maneiras diferentes de treinar ou experimentando novos desafios.
                </p>
                <p>
                    Determinação e persistência são características que me definem. Quando
                    coloco um objetivo na minha mente, sigo firme até alcançá-lo. Seja
                    melhorando minhas habilidades na programação, evoluindo nos treinos da
                    academia ou aprendendo algo novo, gosto de ver meu próprio progresso e
                    sentir orgulho das conquistas que vou acumulando.
                </p>
                <p>
                    No meu tempo livre, me divirto viajando, jogando com os amigos e assistindo
                    conteúdos instrutivos. Gosto de desafios mentais e me sinto satisfeito quando
                    resolvo problemas complexos, seja no código ou na vida. No fundo, acredito
                    que o aprendizado contínuo e a busca por novas experiências são o que me
                    mantém motivado e sempre em evolução.
                </p>
            </section>

            <section className={styles.maisSobreMim}>
                <h2>Mais sobre mim</h2>
                <p>
                    - Sou casado com minha linda esposa Mayara Lovatto, engenheira de computação
                    que me acompanha em tudo <br />
                    - Estou aprendendo o alemão e quero aprender japonês ou mandarim também <br />
                    - Ainda sonho em fazer uma faculdade de Filosofia ou Física <br />
                    - Tenho muita vontade de empreender <br />
                    - Meu maior sonho é me especializar e trabalhar com IA, fazendo alguma
                    descoberta para mudar o mundo<br />
                    - Já li muitos livros, tenho vontade de voltar a ler, mas por enquanto preciso
                    focar na carreira profissional <br />
                    - Sou um mero pecador, mas salvo pela graça.
                </p>
            </section>

            {/* Seção de fotos estilo Instagram */}
            <section className={styles.fotos}>
                <h2>Álbuns de Fotos</h2>
                {selectedAlbum ? (
                    // Exibe as fotos do álbum selecionado
                    <div className={styles.albumPhotos}>
                        <button onClick={handleBackToAlbums} className={styles.backButton}>
                            &larr; Voltar aos Álbuns
                        </button>
                        <h3>{selectedAlbum.title}</h3>
                        <p>{selectedAlbum.description}</p>
                        <div className={styles.photosGrid}>
                            {selectedAlbum.photos.map((photo, index) => (
                                <div key={index} className={styles.photoCard}>
                                    <LazyLoadImage
                                        src={photo.src}
                                        alt={photo.alt}
                                        title={photo.alt}
                                        effect="blur"
                                        onClick={() => window.open(photo.src, '_blank')}
                                    />
                                    <div className={styles.photoDescription}>
                                        {photo.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Exibe a lista de álbuns
                    <div className={styles.albumsGrid}>
                        {albumsData.map((album) => (
                            <div
                                key={album.id}
                                className={styles.albumCard}
                                onClick={() => handleOpenAlbum(album.id)}
                            >
                                <LazyLoadImage
                                    src={album.cover}
                                    alt={`${album.title} - capa`}
                                    title={`${album.title} - capa`}
                                    className={styles.albumCover}
                                    effect="blur"
                                /* Sem onClick para que a capa não seja aberta em nova guia */
                                />
                                <div className={styles.albumInfo}>
                                    <h3>{album.title}</h3>
                                    <p>{album.description}</p>
                                    {album.isPrivate && (
                                        <span className={styles.privateTag}>Privado</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Pessoal;
