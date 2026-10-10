# Mapa de inconsistências do site

Data: 9 outubro 2026. As seções originais abaixo registram a inspeção estática anterior às correções. Não devem ser lidas como uma lista de problemas ainda abertos. A verificação visual local posterior e os achados remanescentes estão na seção final. Esta rodada de auditoria não alterou componentes.

## Prioridade alta

| Achado | Evidência | Impacto / encaminhamento |
| --- | --- | --- |
| Capa PNG em uso | `src/data/blogPosts.ts:145`: `/blog/blog-data-quality-ai-cover.png`; arquivo com 2.068.227 bytes | Diverge do padrão WebP e pesa cerca de 2 MB. Converter e atualizar a referência, dimensões e metadados derivados pelo gerador. |
| Classe de título inexistente | `heading-sm` em `PageCard.tsx:82`, `DirectAnswersSection.tsx:30` e `personal/VisionSection.tsx:32`; sem definição em `index.css` ou Tailwind | Os elementos não recebem o tamanho explicitamente pretendido. Os h3 herdam a regra base; o parágrafo de Vision não. Definir o token ou substituir por um existente. |
| Animações declaradas mas ignoradas | `vite.config.ts:84` redireciona `framer-motion` para `motion-lite.tsx`; o adaptador descarta `initial`, `exit`, `transition`, `viewport` e `whileHover` e aplica `whileInView` imediatamente | Entradas, saídas, atrasos e gatilhos de viewport declarados em componentes não funcionam como parecem no código. Exemplo: escala e entrada de 0,7 s do `PageHero`. Inventariar e remover declarações sem efeito ou implementar somente os comportamentos desejados. |

## Tamanhos, formatação e espaçamento

| Achado | Local | Avaliação |
| --- | --- | --- |
| Dois componentes SectionTitle | `components/layout/SectionTitle.tsx` e `components/ui/SectionTitle.tsx` | Layout usa gradiente, sublinhado e tamanho responsivo; UI usa título de 30 px fixo e sem sublinhado. A versão UI não tem imports identificados. Consolidar a API antes de reutilizar. |
| Espaçamento somado entre título e conteúdo | `layout/SectionTitle.tsx` usa `mb-12`; `PageSection.tsx` envolve título e conteúdo com `space-y-7 md:space-y-8` | Duas fontes de espaçamento podem produzir separação excessiva. Confirmar a cascata/colapso de margens no navegador e estabelecer um único responsável pelo intervalo. |
| Home com hero próprio | `HeroSection.tsx:16` e `:45`; páginas internas usam `PageHero` | Home tem altura mínima 520/430 px, retrato 260/300 px e texto com alturas mínimas; internos têm imagem 180/200/240 px. Diferença real, possivelmente intencional. Alturas mínimas de texto devem ser revistas em tablet e com texto longo. |
| Padding conflitante em seções | `BlogPost.tsx:145,158`; `Privacy.tsx:87` | `PageSection` já adiciona `py-12 md:py-16` e recebe `pt-10 pb-0` ou `pt-14`. A ordem no atributo não garante prioridade; no desktop as regras responsivas podem prevalecer. Usar `spacing="none"` ao controlar padding externamente. |
| Sistema de seções antigo | `layout/Section.tsx` | Define `pt-32 mb-24`, `mb-20` e `py-20`, diferentes de PageSection. Sem imports identificados; candidato a remoção após checar referências externas. |
| Comentário dentro de className | `layout/PageCard.tsx` junto de `p-5` | `/* 🔥 menor e mais elegante */` está dentro da string e vira classes HTML literais. Ruído no DOM; mover comentário para fora do atributo. |
| Botões com implementações distintas | `ui/button.tsx`, `ContactSection.tsx`, `Contact.tsx`, `BlogPost.tsx` | Alturas, padding, raio e peso variam: componente h-10/rounded-md; CTA h-11/rounded-lg; envio py-4/rounded-xl; artigos px-4/py-2. Definir variantes por finalidade e centralizar o uso. |
| Regra duplicada de hover | `ui/button.tsx:14` | `hover:-translate-y-[1px]` aparece duas vezes na mesma variante. Sem benefício visual. |
| Paleta paralela nos efeitos | `index.css` classes layer-* e vários shadows rgba nos cards | Azuis/verde literais coexistem com variáveis primary/secondary. Nem todo azul é exatamente o token oficial. Decidir quais são cores semânticas e quais devem acompanhar o tema. |

## Imagens e assets

- A busca pelas referências literais a imagens em `src` não identificou arquivos ausentes, nem referências `.wep`. Isso não cobre URLs construídas dinamicamente ou recursos externos.
- Os heroes internos Blog, Personal, Professional, About/Why Me, Contact e Innovation Hub usam `PageHero` com `variant="page"`; o tamanho externo é padronizado. Professional aplica `object-top`; os demais usam centro. Isso altera o recorte, não o tamanho.
- `PageHero` não declara width/height, srcSet, sizes ou loading; Home declara dimensões, variantes responsivas e prioridade. Padronizar o contrato de imagem preservando a prioridade do conteúdo acima da dobra.
- Cards de Blog (`Blog.tsx:120`) e logo de SideProjects (`SideProjects.tsx:237`) também não têm dimensões HTML explícitas. Confirmar estabilidade com seus contêineres antes de classificar como CLS observado.
- Existem PNG/JPG/JPEG em `public/Originals`, `public/logos/originals` e `public/blog/originals`. São originais e sua extensão não é um erro de renderização. Como ficam em public, são publicados; avaliar armazená-los fora da pasta pública.
- `public/logos` contém PNG/PNG maiúsculo e MP4 adicionais; presença não significa uso. `cookie-privacy-button.webp` e `cookie-privacy-button_blue.webp` coexistem. Conferir referências de scripts/manifestos antes de eliminar candidatos.

## Efeitos e CSS

- `FadeInOnScroll.tsx` usa um IntersectionObserver real através do adaptador, mas sua animação depende da transição CSS inline; a prop `transition` não é executada pelo adaptador. Existem duas declarações de intenção para um efeito.
- `tag-ai`, `caption`, `mb-section`, `mb-content`, `mt-content`, `stack-list`, `glow-secondary` e `fade-in-up` não têm referências identificadas fora de `index.css`. São candidatos a limpeza, não prova de bytes entregues: Tailwind e extração de CSS podem eliminar regras.
- `heading-xl` e `heading-md` são usados via `@apply` nas regras base de h1/h3: NÃO são classes mortas, apesar de não aparecerem no JSX.
- `animate-bounce`, hover scale/translate e transições CSS não têm uma política global de movimento reduzido. `useReducedMotion` existe, mas atende somente componentes que o consultam. Avaliar `motion-reduce` nas interações e animações contínuas.
- `transition-all` aparece repetidamente em cards, botões e header. Restringir a propriedades efetivamente animadas evita transições inesperadas; não foi constatado erro de composição em runtime nesta inspeção.

## Ordem recomendada de correção

1. Converter a capa PNG ativa e definir a tipografia `heading-sm`.
2. Alinhar efeitos declarados com o comportamento de motion-lite e movimento reduzido.
3. Unificar a responsabilidade por espaçamento entre título, conteúdo e seção.
4. Padronizar botões e metadados/dimensões de imagens.
5. Remover componentes, CSS e assets comprovadamente sem uso.
6. Validar visualmente Home e páginas internas em 360, 768 e 1440 px, nos dois temas, incluindo menus, modal de privacidade, formulário e artigos.

## Verificação visual local posterior

Inspeção no navegador em localhost, após as correções de componentes: Home, Professional e Personal no tema escuro; Home, About, Blog, Contact, Innovation Hub e Privacy no tema claro. Foram comparadas vistas desktop e mobile, mas não todas as combinações de páginas, temas e breakpoints. O override mobile solicitado foi 360 × 800; o navegador reportou `innerWidth=480`, portanto esta rodada NÃO comprova o comportamento em 360 CSS px. O viewport foi restaurado ao final. Não houve verificação em produção.

### Diferenças remanescentes confirmadas

| Prioridade | Achado visual | Evidência / proposta |
| --- | --- | --- |
| Alta | Ícones comprimidos em Privacy | Os seis ícones dos cards, declarados com 20 × 20 px, renderizam com largura entre 6,3 e 9,2 px no desktop, mantendo 20 px de altura. O contêiner flex do ícone precisa evitar encolhimento; não alterar a proporção do SVG. |
| Alta | Ícone do título longo de Innovation Hub comprimido no mobile | O primeiro título de seção renderiza o ícone com cerca de 12,9 × 24 px; os demais com 24 × 24 px. Fixar `shrink-0` no wrapper do ícone em SectionTitle e permitir a quebra apenas no texto. |
| Média | Texto justificado da bio na Home cria espaços grandes entre palavras no mobile | AboutSection usa `text-justify` em quatro parágrafos; na largura reduzida há lacunas muito maiores que em Personal e Contact. Preferir alinhamento à esquerda no mobile. |
| Média | Botão flutuante de privacidade ainda é laranja | A renderização usa o cookie tradicional, não o asset azul anteriormente solicitado. Além disso, a posição fixa cobre texto dos cards e links inferiores enquanto se rola no mobile. Rever asset e área livre ao redor do controle. |
| Média | Capas do Blog são recortadas de forma desigual | O contêiner é 16:9; PBIP e qualidade dos dados são quase 16:9, mas `next_challenge_for_DE.webp` é 1536 × 1024 (3:2), logo perde conteúdo vertical com cover. Ajustar enquadramento individual ou produzir uma variante própria, sem distorcer a imagem. |
| Média | Espaço entre seções continua amplo | Seções padrão consecutivas somam 48 + 48 px no mobile e 64 + 64 px no desktop. O intervalo título/conteúdo foi consolidado, mas o padding externo ainda domina a separação. Considerar `spacing="sm"` onde não há mudança de contexto. |
| Baixa / decisão de design | Privacy usa linguagem visual diferente do restante | Título sem caixa alta/gradiente, largura de leitura menor e cards com ícones laterais, enquanto páginas institucionais usam PageHero. Pode ser apropriado para uma página legal; não é automaticamente um defeito. |
| Baixa / decisão de design | Home mantém retrato maior e texto alinhado à esquerda no mobile | Os heroes internos usam moldura quadrada de 180/240 px e texto centralizado no mobile; Home usa 260/300 px e texto à esquerda. Diferença intencional possível, não falha do PageHero. |

Não foram observadas imagens quebradas nas vistas inspecionadas. As molduras dos heroes internos permanecem quadradas; Professional usa imagem vertical com recorte superior, enquanto Blog/About usam imagens horizontais recortadas ao centro. As medições durante a animação de entrada variam temporariamente por escala e não representam diferença permanente de tamanho.

Contraste numérico, teclado, modal aberto, artigos completos, movimento reduzido e todos os breakpoints ainda requerem uma rodada dedicada; esta inspeção não os certifica.

### Correções aplicadas após a verificação

- Wrappers de ícones em SectionTitle e Privacy não encolhem; medição local confirmou 24 × 24 px nos títulos e 20 × 20 px nos cards de Privacy.
- Bio da Home alinhada à esquerda abaixo de `md`, mantendo justificação no desktop; alinhamento computado confirmado nos quatro parágrafos.
- Cookie aponta para o asset azul, com recorte circular. No mobile o ícone de 24 px ocupa a margem esquerda, mantendo botão de 44 × 44 px para toque; desktop conserva o tamanho anterior. Isso evita a sobreposição visual aos textos nas vistas verificadas, embora a área clicável transparente se estenda além da margem.
- Capas com proporção inferior a 1,7 usam contain no quadro 16:9, sem zoom que volte a cortar; as quase 16:9 mantêm cover. A capa 3:2 fica inteira, com espaço lateral de fundo.
- Padding padrão das seções reduzido de 48/64 px para 32/40 px por lado (mobile/desktop), reduzindo o intervalo consecutivo de 96/128 para 64/80 px. Heroes e espaçamentos explicitamente definidos foram preservados.
- Diferenças intencionais de Home e Privacy foram mantidas. Validações locais: lint, TypeScript, build, pré-renderização e recursos de descoberta aprovados. Sem commit/deploy.
