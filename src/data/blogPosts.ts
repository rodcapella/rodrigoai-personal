export type BlogSection = {
  heading?: string;
  paragraphs: string[];
  quote?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  source: { name: string; url: string; linkedInUrl: string };
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "sem-dados-de-qualidade-nao-ha-ia-que-salve-o-negocio",
    title: "Sem dados de qualidade, não há IA que salve o negócio",
    excerpt:
      "Porque a qualidade dos dados deixou de ser um tema técnico e passou a ser uma prioridade estratégica para gestores, decisores e empresas que querem usar IA com confiança.",
    category: "Data & AI",
    publishedAt: "2026-07-15T10:42:51+00:00",
    updatedAt: "2026-07-15T11:28:45+00:00",
    readingTime: "7 min de leitura",
    image: "/blog-data-quality-ai-cover.png",
    imageAlt:
      "Fluxos de dados fragmentados atravessam camadas de validação antes de alimentar um sistema de inteligência artificial",
    source: {
      name: "IA Hoje",
      url: "https://inteligenciaartificialhoje.pt/sem-dados-de-qualidade-nao-ha-ia-que-salve-o-negocio/",
      linkedInUrl:
        "https://www.linkedin.com/posts/inteligencia-artificial-hoje_sem-dados-de-qualidade-n%C3%A3o-h%C3%A1-ia-que-salve-activity-7483434000754266113-0uDL",
    },
    sections: [
      {
        paragraphs: [
          "Ao longo dos últimos anos, tenho acompanhado de perto projetos de transformação digital em empresas de diferentes países, incluindo muitas organizações portuguesas. Independentemente da dimensão ou do setor, há um padrão que se repete com frequência e que já deixou de me surpreender: os projetos raramente falham por falta de tecnologia.",
          "Na maioria das vezes, o problema está num fator mais básico e menos visível para a gestão: a qualidade da informação que alimenta todo o processo.",
          "Vivemos numa realidade empresarial cada vez mais orientada por dados, onde coexistem múltiplas fontes: CRMs, sensores IoT, dados de navegação web, interações em redes sociais, aplicações móveis e, cada vez mais, os próprios registos gerados por ferramentas de IA generativa.",
          "Garantir a fiabilidade dessa informação deixou de ser uma preocupação exclusiva das equipas de TI para se tornar uma prioridade estratégica para qualquer negócio.",
          "É neste cenário que a Inteligência Artificial assume um papel cada vez mais relevante: ao automatizar tarefas, identificar inconsistências e analisar grandes volumes de forma contínua, ajuda a garantir essa fiabilidade ao longo de todo o seu ciclo de vida.",
        ],
      },
      {
        heading: "O que é Data Quality?",
        paragraphs: [
          "O conceito de data quality refere-se ao grau de confiança que uma organização pode ter nos seus dados, desde a origem até à sua transformação em informação preparada para análise.",
          "Um conjunto de dados é dito de qualidade quando é preciso, completo, consistente, atualizado e adequado ao objetivo de utilização.",
          "Partilho um exemplo que encontro com frequência em projetos de Business Intelligence. Muitas empresas analisam vendas por região com base no código postal dos seus clientes.",
          "Mas quando esse campo é preenchido manualmente, sem validação na origem, surgem inconsistências, duplicações e dados incompletos, comprometendo dashboards e decisões, mesmo em organizações que se consideram orientadas por dados.",
        ],
      },
      {
        heading: "Porque é que a qualidade dos dados é tão importante?",
        paragraphs: [
          "Cada vez mais, praticamente todas as decisões empresariais dependem de dados. Desde previsões de vendas até modelos preditivos, a qualidade da informação influencia diretamente a capacidade de gerar valor.",
          "Dados incorretos levam a decisões erradas, retrabalho e, em setores regulados, riscos de incumprimento.",
          "Nem o modelo de IA mais avançado transforma, por si só, dados corrompidos em informação fiável.",
          "A IA pode refinar processos e identificar inconsistências, mas não substitui a necessidade de garantir a qualidade logo na origem do pipeline.",
        ],
        quote:
          "O axioma “garbage in, garbage out” mantém-se cada vez mais atual: dados incorretos geram resultados incorretos, seja qual for a sofisticação dos sistemas.",
      },
      {
        heading: "Como é que a IA está a transformar o Data Quality?",
        paragraphs: [
          "A IA automatiza processos ao longo do ciclo de vida dos dados e pode atuar em quatro frentes principais.",
          "Na deteção de anomalias, identifica padrões inesperados em grandes volumes de dados, sinalizando quebras anormais de vendas em tempo real, sem depender de regras manuais.",
          "Na eliminação de duplicados, identifica registos duplicados mesmo com pequenas variações na escrita, consolidando dados dispersos em versões únicas.",
          "Na normalização e enriquecimento, padroniza informação de sistemas heterogéneos, uniformizando valores textuais como “Lisboa” e “LX”, ou validando códigos postais de forma semântica.",
          "E, através da monitorização contínua, acompanha a integridade dos fluxos de dados em tempo real, reduzindo o tempo necessário para detetar e corrigir problemas.",
          "No final, tudo isto se traduz em algo ainda mais importante: decisões mais rápidas, mais informadas e mais fiáveis.",
        ],
      },
      {
        heading: "Ferramentas e evolução nas organizações",
        paragraphs: [
          "Há cada vez mais ferramentas no mercado que combinam automação e IA para observabilidade, monitorização e validação de dados.",
          "Algumas estão orientadas para ambientes complexos e distribuídos, enquanto outras oferecem abordagens mais simples e rápidas de implementar.",
          "Na prática, muitas organizações começam por controlar a qualidade dos dados na origem de forma mais artesanal e evoluem gradualmente para plataformas mais avançadas à medida que a complexidade das suas arquiteturas aumenta.",
          "Mas a escolha da ferramenta é só parte da equação. O verdadeiro desafio, sobretudo em Portugal, está noutro lugar.",
        ],
      },
      {
        heading: "Data Quality, conformidade e a realidade das PME portuguesas",
        paragraphs: [
          "A qualidade dos dados deixou também de ser apenas uma preocupação operacional para passar a ser uma exigência legal e regulamentar.",
          "Em Portugal e na Europa, o RGPD e o recente AI Act impõem elevados níveis de controlo, rastreabilidade e governação ao longo de todo o ciclo de vida dos dados, penalizando a negligência com auditorias e coimas significativas.",
          "É precisamente aqui que vejo atualmente o maior desafio, mas também uma das maiores oportunidades.",
          "A maioria das PME portuguesas não tem, e dificilmente terá no curto prazo, equipas dedicadas exclusivamente a data quality. Muitas vezes, os dados encontram-se dispersos por folhas de Excel, CRMs mal configurados e processos altamente manuais.",
          "Nestes contextos, a IA deixa de ser um luxo reservado às grandes organizações e passa a ser um fator de democratização tecnológica.",
          "É ela que permite a equipas pequenas escalar processos analíticos, cumprir requisitos regulamentares e competir com empresas muito maiores, sem a necessidade de criar departamentos inteiros apenas para “arrumar a casa” dos dados.",
          "Ao longo dos últimos anos, já vi PME conquistarem, em poucos meses, uma visibilidade sobre o seu negócio que não tinham conseguido obter após anos de relatórios manuais.",
          "Não porque passaram a ter mais dados, mas porque finalmente passaram a confiar neles e, consequentemente, a tomar decisões estratégicas com base nessa confiança.",
        ],
      },
      {
        heading: "Desafios e conclusão",
        paragraphs: [
          "Apesar dos avanços, a IA não elimina todos os desafios. As organizações continuam a necessitar de governação de dados robusta, responsabilidades claras e regras de negócio bem desenhadas.",
          "Sem estes elementos, mesmo os melhores modelos terão limitações severas.",
          "Se houvesse apenas uma ideia a reter deste artigo, seria esta: a IA é uma ferramenta poderosa, mas continua a precisar de contexto, supervisão e conhecimento humano para gerar valor real.",
          "As organizações que conseguirem combinar uma cultura sólida de governação de dados com o potencial de automação da Inteligência Artificial estarão melhor preparadas para transformar informação em vantagem competitiva sustentável.",
          "E é nisto que acredito: quem juntar as duas coisas sai à frente.",
        ],
      },
    ],
  },
];

export const getBlogPost = (slug?: string) =>
  blogPosts.find((post) => post.slug === slug);
