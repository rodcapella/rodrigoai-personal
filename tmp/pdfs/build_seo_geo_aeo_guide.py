from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, PageBreak,
    Table, TableStyle, KeepTogether, Image, HRFlowable, ListFlowable,
    ListItem, NextPageTemplate
)
from pypdf import PdfReader

ROOT = Path(r"C:\Users\Rodrigo\Documents\GitHub\rodrigoai-personal")
OUT = ROOT / "output" / "pdf" / "guia-seo-geo-aeo-rpovoadata.pdf"
LOGO = ROOT / "public" / "logos" / "logo_fundo_transparente.webp"

PAGE_W, PAGE_H = A4
NAVY = colors.HexColor("#07111F")
NAVY_2 = colors.HexColor("#0B1C2E")
BLUE = colors.HexColor("#2487F5")
CYAN = colors.HexColor("#18B8B0")
TEAL = colors.HexColor("#124447")
GOLD = colors.HexColor("#FFDD79")
ICE = colors.HexColor("#D7EBF1")
INK = colors.HexColor("#162333")
MUTED = colors.HexColor("#536579")
LINE = colors.HexColor("#CBD8E4")
PAPER = colors.HexColor("#F6F9FC")
WHITE = colors.white

pdfmetrics.registerFont(TTFont("Arial", r"C:\Windows\Fonts\arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", r"C:\Windows\Fonts\arialbd.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Italic", r"C:\Windows\Fonts\ariali.ttf"))

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="CoverKicker", fontName="Arial-Bold", fontSize=10, leading=13,
    textColor=GOLD, tracking=2.2, alignment=TA_LEFT, spaceAfter=10
))
styles.add(ParagraphStyle(
    name="CoverTitle", fontName="Arial-Bold", fontSize=31, leading=35,
    textColor=WHITE, spaceAfter=16
))
styles.add(ParagraphStyle(
    name="CoverSubtitle", fontName="Arial", fontSize=13.5, leading=20,
    textColor=ICE, spaceAfter=18
))
styles.add(ParagraphStyle(
    name="CoverMeta", fontName="Arial", fontSize=9.5, leading=14,
    textColor=colors.HexColor("#99AEC5")
))
styles.add(ParagraphStyle(
    name="H1x", fontName="Arial-Bold", fontSize=22, leading=27,
    textColor=NAVY, spaceBefore=4, spaceAfter=12
))
styles.add(ParagraphStyle(
    name="H2x", fontName="Arial-Bold", fontSize=15, leading=19,
    textColor=BLUE, spaceBefore=14, spaceAfter=7, keepWithNext=True
))
styles.add(ParagraphStyle(
    name="H3x", fontName="Arial-Bold", fontSize=11.5, leading=15,
    textColor=TEAL, spaceBefore=9, spaceAfter=5, keepWithNext=True
))
styles.add(ParagraphStyle(
    name="Bodyx", fontName="Arial", fontSize=9.4, leading=14.1,
    textColor=INK, spaceAfter=7
))
styles.add(ParagraphStyle(
    name="Smallx", fontName="Arial", fontSize=8, leading=11.5,
    textColor=MUTED, spaceAfter=4
))
styles.add(ParagraphStyle(
    name="Calloutx", fontName="Arial", fontSize=9.2, leading=13.8,
    textColor=INK, leftIndent=4, rightIndent=4
))
styles.add(ParagraphStyle(
    name="Codex", fontName="Courier", fontSize=7.8, leading=11,
    textColor=ICE, backColor=NAVY_2, borderPadding=8, spaceAfter=8
))
styles.add(ParagraphStyle(
    name="TableHead", fontName="Arial-Bold", fontSize=8, leading=10,
    textColor=WHITE
))
styles.add(ParagraphStyle(
    name="TableBody", fontName="Arial", fontSize=7.8, leading=10.5,
    textColor=INK
))
styles.add(ParagraphStyle(
    name="TOC", fontName="Arial", fontSize=10.2, leading=15,
    textColor=INK, leftIndent=2
))
styles.add(ParagraphStyle(
    name="Quote", fontName="Arial-Italic", fontSize=11, leading=16,
    textColor=NAVY, leftIndent=12, rightIndent=8, spaceBefore=8, spaceAfter=8
))

def P(text, style="Bodyx"):
    return Paragraph(text, styles[style])

def bullet_list(items, level=0):
    return ListFlowable(
        [ListItem(P(item), leftIndent=7) for item in items],
        bulletType="bullet", bulletFontName="Arial", bulletFontSize=6,
        bulletColor=BLUE, leftIndent=14 + level * 8, bulletIndent=2,
        spaceAfter=6
    )

def numbered(items):
    return ListFlowable(
        [ListItem(P(item), leftIndent=7) for item in items],
        bulletType="1", start="1", bulletFontName="Arial-Bold",
        bulletFontSize=8, bulletColor=BLUE, leftIndent=18, bulletIndent=2,
        spaceAfter=6
    )

def callout(title, text, color=BLUE):
    data = [[P(title, "H3x")], [P(text, "Calloutx")]]
    table = Table(data, colWidths=[167*mm], hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), colors.HexColor("#ECF4FC")),
        ("BOX", (0,0), (-1,-1), 0.7, color),
        ("LINEBEFORE", (0,0), (0,-1), 4, color),
        ("LEFTPADDING", (0,0), (-1,-1), 10),
        ("RIGHTPADDING", (0,0), (-1,-1), 10),
        ("TOPPADDING", (0,0), (-1,0), 7),
        ("BOTTOMPADDING", (0,-1), (-1,-1), 8),
    ]))
    return KeepTogether([table, Spacer(1, 4*mm)])

def matrix(headers, rows, widths):
    data = [[P(x, "TableHead") for x in headers]] + [
        [P(str(x), "TableBody") for x in row] for row in rows
    ]
    t = Table(data, colWidths=widths, repeatRows=1, hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), NAVY),
        ("GRID", (0,0), (-1,-1), 0.45, LINE),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("LEFTPADDING", (0,0), (-1,-1), 6),
        ("RIGHTPADDING", (0,0), (-1,-1), 6),
        ("TOPPADDING", (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, PAPER]),
    ]))
    return t

def page_header_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(21*mm, PAGE_H-15*mm, PAGE_W-21*mm, PAGE_H-15*mm)
    canvas.setFont("Arial-Bold", 7.5)
    canvas.setFillColor(BLUE)
    canvas.drawString(21*mm, PAGE_H-11.5*mm, "SEO · GEO · AEO")
    canvas.setFont("Arial", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(PAGE_W-21*mm, PAGE_H-11.5*mm, "Guia prático baseado em rpovoadata.tech")
    canvas.setStrokeColor(LINE)
    canvas.line(21*mm, 14*mm, PAGE_W-21*mm, 14*mm)
    canvas.setFont("Arial", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(21*mm, 9.5*mm, "© 2026 Rodrigo Póvoa")
    canvas.drawRightString(PAGE_W-21*mm, 9.5*mm, f"Página {doc.page}")
    canvas.restoreState()

def cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(BLUE)
    canvas.circle(PAGE_W-17*mm, PAGE_H-22*mm, 40*mm, fill=1, stroke=0)
    canvas.setFillColor(TEAL)
    canvas.circle(PAGE_W+10*mm, PAGE_H-68*mm, 44*mm, fill=1, stroke=0)
    canvas.setFillColor(NAVY)
    canvas.circle(PAGE_W-9*mm, PAGE_H-38*mm, 35*mm, fill=1, stroke=0)
    canvas.setStrokeColor(CYAN)
    canvas.setLineWidth(2)
    canvas.line(22*mm, 62*mm, 78*mm, 62*mm)
    canvas.setStrokeColor(GOLD)
    canvas.line(82*mm, 62*mm, 106*mm, 62*mm)
    canvas.restoreState()

doc = BaseDocTemplate(
    str(OUT), pagesize=A4, rightMargin=21*mm, leftMargin=21*mm,
    topMargin=21*mm, bottomMargin=19*mm,
    title="Guia de melhores práticas em SEO, GEO e AEO",
    author="Rodrigo Póvoa",
    subject="Guia prático baseado na arquitetura do site rpovoadata.tech",
)
doc.addPageTemplates([
    PageTemplate(id="Cover", frames=[Frame(22*mm, 28*mm, PAGE_W-44*mm, PAGE_H-56*mm, id="cover")], onPage=cover),
    PageTemplate(id="Body", frames=[Frame(21*mm, 19*mm, PAGE_W-42*mm, PAGE_H-40*mm, id="body")], onPage=page_header_footer),
])

story = []
story += [Spacer(1, 20*mm)]
if LOGO.exists():
    img = Image(str(LOGO), width=31*mm, height=20.7*mm)
    img.hAlign = "LEFT"
    story += [img, Spacer(1, 18*mm)]
story += [
    P("GUIA DE IMPLEMENTAÇÃO", "CoverKicker"),
    P("SEO, GEO e AEO<br/>para sites modernos", "CoverTitle"),
    P("Boas práticas adotadas em <b>rpovoadata.tech</b> para tornar conteúdo profissional rastreável, compreensível por mecanismos de pesquisa e reutilizável por sistemas de resposta e agentes de IA.", "CoverSubtitle"),
    Spacer(1, 16*mm),
    P("Rodrigo Póvoa", "CoverKicker"),
    P("Data Analytics Engineer & Team Leader<br/>Versão 1.0 · Agosto de 2026", "CoverMeta"),
    NextPageTemplate("Body"), PageBreak(),
]

story += [P("Como usar este guia", "H1x")]
story += [P("Este documento transforma decisões reais de implementação num modelo reutilizável para portfólios, blogs técnicos e sites institucionais. A prioridade é criar uma única fonte de conteúdo que sirva bem a pessoas, motores de pesquisa, answer engines e agentes, sem duplicação manual nem marcação artificial.")]
story += [callout("Princípio central", "A otimização funciona melhor quando o conteúdo é útil, factual, semanticamente claro e entregue no HTML inicial. Metadados, schemas e arquivos para agentes devem descrever esse conteúdo - nunca tentar substituí-lo.")]
story += [P("Os três objetivos", "H2x")]
story += [matrix(
    ["Disciplina", "Pergunta que responde", "Resultado esperado"],
    [
        ["SEO", "A página pode ser encontrada, rastreada, compreendida e indexada?", "Visibilidade orgânica e apresentação correta nos resultados."],
        ["GEO", "Uma IA generativa consegue identificar entidades, fatos, autoria e fontes confiáveis?", "Maior probabilidade de uso como fonte em respostas fundamentadas."],
        ["AEO", "O conteúdo responde diretamente às perguntas do público?", "Respostas fáceis de extrair por assistentes, snippets e sistemas de busca."],
    ], [25*mm, 69*mm, 73*mm]
), Spacer(1, 4*mm)]
story += [P("Mapa do guia", "H2x"), bullet_list([
    "Fundação técnica: renderização, rotas, canonicals e status HTTP.",
    "Metadados e dados estruturados por tipo de página.",
    "Conteúdo orientado a entidades, fatos, respostas e evidências.",
    "Sitemaps, lastmod, robots, Content Signals e descoberta para agentes.",
    "Markdown negociado, llms.txt, manifesto e validação automática.",
    "Rotina de Google Search Console e checklist para novos projetos.",
])]

story += [PageBreak(), P("1. Arquitetura de referência", "H1x")]
story += [P("O site utiliza React/Vite, mas não entrega uma shell vazia aos crawlers. Durante o build, cada rota pública é pré-renderizada em HTML. O mesmo processo gera sitemaps, datas de modificação, versões Markdown e arquivos de descoberta. Essa abordagem mantém browser, mecanismos de pesquisa e agentes sincronizados.")]
story += [P("Fluxo recomendado", "H2x"), numbered([
    "Manter o conteúdo e os metadados na aplicação como fonte principal.",
    "Pré-renderizar todas as rotas públicas relevantes durante o build.",
    "Extrair do HTML pré-renderizado uma versão Markdown limpa e equivalente.",
    "Gerar sitemap, llms.txt, llms-full.txt e manifesto no mesmo processo.",
    "Executar validações automáticas antes de permitir o deploy.",
])]
story += [P("Por que o pré-render é importante", "H2x"), bullet_list([
    "O título, a description, o canonical e o conteúdo principal chegam no primeiro HTML.",
    "Crawlers com execução limitada de JavaScript ainda recebem conteúdo completo.",
    "Open Graph e Twitter Cards ficam disponíveis para crawlers sociais.",
    "Schemas JSON-LD podem ser inspecionados sem esperar a hidratação do React.",
])]
story += [callout("Regra de ouro para rotas", "Uma URL pública deve responder com 200 apenas quando existe conteúdo correspondente. Redirecionamentos devem ser intencionais e permanentes quando aplicável. URLs inexistentes devem retornar 404 real - nunca a Home com status 200.", TEAL)]
story += [P("Padrão de URL adotado", "H2x"), matrix(
    ["Tema", "Decisão"],
    [
        ["Domínio canônico", "https://www.rpovoadata.tech"],
        ["Domínio raiz", "Redirecionamento permanente 308 para www."],
        ["Trailing slash", "Canonicals normalizados sem slash final, exceto a Home."],
        ["Páginas estáticas", "Rotas explícitas para Home, Why Me, Professional, Personal, Blog, Contact e outras."],
        ["Artigos", "Slug descritivo e estável sob /blog/."],
        ["Rotas desconhecidas", "404 real, sem rewrite catch-all para index.html."],
    ], [44*mm, 123*mm]
)]

story += [PageBreak(), P("2. SEO on-page e técnico", "H1x")]
story += [P("Cada rota deve ter uma identidade editorial própria. No site de referência, todas as páginas públicas possuem título e description exclusivos, canonical absoluto, um único H1 e textos alternativos nas imagens.")]
story += [P("Metadados mínimos por página", "H2x"), bullet_list([
    "<b>Title:</b> específico, legível e coerente com o H1 e a intenção da página.",
    "<b>Meta description:</b> resumo factual que ajuda o utilizador a decidir se deve visitar.",
    "<b>Canonical:</b> URL absoluta e normalizada da própria página.",
    "<b>Robots:</b> index, follow e permissões amplas para snippets e preview de imagens.",
    "<b>Open Graph:</b> type, title, description, URL, imagem, alt e locale.",
    "<b>Twitter Card:</b> summary_large_image com título, descrição, imagem e alt.",
    "<b>Idioma:</b> lang coerente com o conteúdo, incluindo pt-PT no artigo em português.",
])]
story += [P("Exemplo conceitual", "H2x"), P("&lt;title&gt;Professional Experience | Rodrigo Póvoa - End-to-End Data Leader&lt;/title&gt;<br/>&lt;meta name=\"description\" content=\"...\"&gt;<br/>&lt;link rel=\"canonical\" href=\"https://www.rpovoadata.tech/professional\"&gt;", "Codex")]
story += [P("Hierarquia e conteúdo", "H2x"), bullet_list([
    "Usar exatamente um H1 para o tema principal da rota.",
    "Organizar subtópicos com H2 e H3 em ordem lógica.",
    "Evitar headings usados apenas para estilo visual.",
    "Usar nomes de links compreensíveis fora do contexto, sem 'clique aqui'.",
    "Definir width e height ou proporção estável para imagens, reduzindo CLS.",
    "Escrever alt text descritivo quando a imagem contém informação; usar alt vazio apenas para decoração.",
])]
story += [P("Sitemap e lastmod", "H2x"), P("O sitemap deve listar apenas URLs canônicas e indexáveis. No modelo adotado, o lastmod é calculado pelos arquivos que realmente compõem cada rota: alterações locais usam a data do build; alterações commitadas usam a data do último commit relevante. Artigos preservam as suas datas editoriais e também consideram mudanças no template comum.")]
story += [callout("Evitar", "Não atualizar lastmod de todas as páginas em todo deploy. Isso reduz a credibilidade do sinal. Atualize apenas quando o conteúdo principal, dados estruturados ou experiência relevante da rota tiverem mudado.", GOLD)]

story += [PageBreak(), P("3. Dados estruturados e entidades", "H1x")]
story += [P("Dados estruturados ajudam mecanismos de pesquisa e sistemas generativos a ligar páginas, pessoas, artigos e relações. O formato adotado é JSON-LD, inserido no HTML pré-renderizado.")]
story += [matrix(
    ["Schema", "Onde usar", "Informação essencial"],
    [
        ["WebSite", "Todas as páginas", "Nome, URL, idioma, descrição e autor por @id."],
        ["Person", "Todas as páginas", "Nome, cargo, descrição, imagem, sameAs e knowsAbout."],
        ["ProfilePage", "Professional e Why Me", "Página de perfil, entidade principal e dateModified."],
        ["Blog", "Índice do blog", "Nome, autor e lista de BlogPosting."],
        ["BlogPosting", "Cada artigo", "Headline, descrição, datas, idioma, imagem, autor, keywords, wordCount, fonte e citações."],
        ["ItemList", "Índice do blog", "Ordem e URLs das publicações."],
        ["BreadcrumbList", "Rotas hierárquicas", "Posição, nome e URL de cada nível."],
    ], [28*mm, 45*mm, 94*mm]
), Spacer(1, 4*mm)]
story += [P("Modelagem da entidade principal", "H2x"), P("A entidade Person possui um @id estável, reutilizado por WebSite, ProfilePage e BlogPosting. Isso evita criar várias versões desconectadas da mesma pessoa. Os links sameAs apontam para perfis públicos verificáveis, e knowsAbout descreve competências realmente demonstradas no conteúdo.")]
story += [P("Boas práticas", "H2x"), bullet_list([
    "Usar o mesmo @id para a mesma entidade em todo o site.",
    "Manter nome, cargo, URL e imagem consistentes entre schemas e conteúdo visível.",
    "Não marcar como FAQ conteúdo que não é uma seção de perguntas frequentes genuína.",
    "Não incluir afirmações promocionais ou fatos que o visitante não consegue encontrar na página.",
    "Validar todos os blocos JSON-LD como JSON antes do deploy.",
])]

story += [PageBreak(), P("4. GEO: conteúdo citável e compreensível", "H1x")]
story += [P("GEO - Generative Engine Optimization - não é uma garantia de citação. É o trabalho de reduzir ambiguidade e aumentar a utilidade do conteúdo para sistemas que recuperam, resumem e relacionam informações.")]
story += [P("Sinais adotados", "H2x"), bullet_list([
    "Identidade profissional consistente entre conteúdo, schema, LinkedIn e GitHub.",
    "Experiências descritas com empresa, período, responsabilidade, resultado e stack.",
    "Especializações expressas em linguagem clara, não apenas listas de palavras-chave.",
    "Artigos com autoria, data, idioma, fontes oficiais e publicação original quando aplicável.",
    "Conteúdo técnico dividido em seções autocontidas que preservam contexto ao serem extraídas.",
    "Referências externas de qualidade em vez de afirmações não sustentadas.",
])]
story += [P("Estrutura de um bloco citável", "H2x"), matrix(
    ["Elemento", "Exemplo de formulação"],
    [
        ["Afirmação", "PBIP converte projetos Power BI de um binário fechado para arquivos estruturados."],
        ["Explicação", "Isso permite diff, histórico de alterações, branches e code review por Git."],
        ["Limite", "Conflitos ainda precisam ser resolvidos quando duas pessoas alteram a mesma definição."],
        ["Fonte", "Documentação oficial do Microsoft Learn para PBIP e Git integration."],
    ], [38*mm, 129*mm]
)]
story += [P("E-E-A-T aplicado ao contexto", "H2x"), bullet_list([
    "<b>Experience:</b> mostrar projetos e situações em que o conhecimento foi aplicado.",
    "<b>Expertise:</b> demonstrar profundidade técnica com explicações, decisões e limites.",
    "<b>Authoritativeness:</b> conectar autoria a perfis e publicações reconhecíveis.",
    "<b>Trust:</b> manter datas, fontes, responsabilidades e políticas transparentes.",
])]
story += [callout("Importante", "GEO é uma prática emergente. O que permanece sólido é produzir conteúdo original, preciso, bem estruturado, atribuível e apoiado por fontes. Arquivos especiais ajudam na descoberta, mas não substituem essas qualidades.")]

story += [PageBreak(), P("5. AEO: respostas diretas sem artificialidade", "H1x")]
story += [P("AEO - Answer Engine Optimization - organiza a página para responder às perguntas reais do visitante. No site de referência, Professional e Why Me apresentam perguntas explícitas e respostas curtas, visíveis e semanticamente marcadas.")]
story += [P("Padrão usado", "H2x"), bullet_list([
    "Pergunta específica em H3.",
    "Resposta direta no primeiro período.",
    "Detalhes adicionais apenas quando melhoram a decisão do utilizador.",
    "Conteúdo visível no HTML, sem depender de interação ou JavaScript.",
    "Vocabulário alinhado à forma como recrutadores, líderes e equipas formulam perguntas.",
])]
story += [P("Exemplos", "H2x"), matrix(
    ["Pergunta", "Resposta direta"],
    [
        ["Que funções profissionais procura?", "Oportunidades seniores e de liderança em Data Engineering, Data Architecture e Analytics."],
        ["Qual é a especialização técnica principal?", "Plataformas de dados end-to-end, com foco em arquiteturas Azure Databricks Lakehouse."],
        ["Como transforma estratégia em entrega?", "Converte prioridades de negócio em arquitetura, padrões de execução e resultados incrementais mensuráveis."],
    ], [60*mm, 107*mm]
)]
story += [P("Quando usar FAQPage", "H2x"), P("Somente quando a página contém uma seção de perguntas frequentes genuína e o tipo é elegível segundo as orientações atuais do mecanismo de pesquisa. Perguntas editoriais úteis podem permanecer como HTML sem schema FAQ. Esse foi o caminho escolhido no site.")]

story += [PageBreak(), P("6. Descoberta e consumo por agentes", "H1x")]
story += [P("A camada agent-ready foi implementada como complemento ao HTML e ao sitemap. Todos os artefatos são derivados automaticamente do mesmo build para reduzir divergências.")]
story += [matrix(
    ["Recurso", "Função", "Estado no modelo"],
    [
        ["robots.txt", "Declara acesso, bloqueios e sitemap.", "Ativo"],
        ["Content-Signal", "Expressa preferências de treino, search e AI input.", "Ativo no robots e headers"],
        ["llms.txt", "Índice conciso de páginas, artigos e recursos.", "Gerado no build"],
        ["llms-full.txt", "Corpus completo em Markdown.", "Gerado no build"],
        ["/.well-known/agent.json", "Manifesto descritivo do site e endpoints.", "Convenção emergente"],
        ["Link header", "Anuncia llms.txt, manifesto e sitemap.", "Ativo na Home"],
        ["Accept: text/markdown", "Entrega Markdown na mesma URL canônica.", "Configurado por rewrites"],
        ["Vary: Accept", "Separa corretamente cache HTML e Markdown.", "Configurado"],
    ], [38*mm, 79*mm, 50*mm]
), Spacer(1, 4*mm)]
story += [P("Política de uso do conteúdo", "H2x"), P("A política adotada é <b>ai-train=no, search=yes, ai-input=yes</b>. Ela permite indexação e uso como entrada fundamentada para sistemas de IA, mas não concede permissão para treino. Content Signals expressam preferência; não garantem que todos os operadores a respeitem.")]
story += [P("Negociação Markdown", "H2x"), P("O browser continua a receber HTML. Um agente envia Accept: text/markdown e recebe uma representação Markdown com YAML frontmatter, conteúdo principal, links, imagens, idioma, last_modified, estimativa de tokens e um apêndice com JSON-LD.")]
story += [P("Exemplo de teste", "H2x"), P("curl https://www.rpovoadata.tech/professional -H \"Accept: text/markdown\"", "Codex")]
story += [callout("Cuidado com padrões emergentes", "llms.txt, manifestos em .well-known e Link relations para agentes ainda têm adoção desigual. Devem ser tratados como mecanismos adicionais de descoberta, nunca como substitutos de HTML acessível, sitemap, robots e dados estruturados.", GOLD)]

story += [PageBreak(), P("7. Automação e controle de qualidade", "H1x")]
story += [P("O maior risco de uma estratégia multiformato é a divergência. Para evitá-la, o build funciona como pipeline editorial e técnico.")]
story += [P("O build deve validar", "H2x"), bullet_list([
    "Todas as rotas públicas foram pré-renderizadas em HTML.",
    "Todas as rotas possuem versão Markdown não vazia.",
    "Cada HTML anuncia o alternate text/markdown.",
    "llms.txt e llms-full.txt existem e referenciam endpoints válidos.",
    "O manifesto é JSON válido e declara content negotiation.",
    "Não existe rewrite catch-all que transforme 404 em Home com 200.",
    "Sitemap e lastmod foram regenerados.",
    "JSON-LD pode ser analisado sem erros.",
])]
story += [P("Pirâmide de verificação", "H2x"), matrix(
    ["Camada", "Verificação"],
    [
        ["Código", "TypeScript, lint, testes e revisão de mudanças."],
        ["Build", "Pré-render, geração de artefatos e validação automática."],
        ["Artefatos", "HTML, Markdown, JSON, XML e UTF-8."],
        ["HTTP", "Status, Content-Type, canonical, Vary, Link e Content-Signal."],
        ["Produção", "Inspeção de URLs, sitemap, rich results e logs."],
        ["Pesquisa", "Google Search Console, indexação, CWV e desempenho orgânico."],
    ], [37*mm, 130*mm]
)]
story += [P("Teste de regressão recomendado", "H2x"), P("Faça o deploy falhar se qualquer artefato obrigatório estiver ausente. Essa decisão é mais segura do que descobrir semanas depois que crawlers receberam uma shell vazia, Markdown incorreto ou status 200 em páginas inexistentes.")]

story += [PageBreak(), P("8. Google Search Console: rotina operacional", "H1x")]
story += [P("O código prepara o site para indexação, mas somente o Search Console confirma como o Google está processando o domínio. Essa etapa exige propriedade verificada.")]
story += [numbered([
    "Criar uma propriedade de domínio para rpovoadata.tech.",
    "Adicionar o registro TXT de verificação no DNS e confirmar a propriedade.",
    "Submeter https://www.rpovoadata.tech/sitemaps/sitemap-index.xml.",
    "Inspecionar Home, Professional, Why Me, Blog e cada artigo.",
    "Verificar URL canônica escolhida pelo Google e disponibilidade do HTML renderizado.",
    "Solicitar indexação após mudanças editoriais relevantes, sem uso excessivo.",
    "Acompanhar Páginas, Sitemaps, Core Web Vitals, HTTPS e melhorias estruturadas.",
    "Investigar soft 404, duplicados, crawled - currently not indexed e canonical divergente.",
])]
story += [P("Indicadores úteis", "H2x"), bullet_list([
    "Número de páginas válidas e indexadas versus URLs submetidas.",
    "Consultas que exibem páginas profissionais e artigos.",
    "CTR por página e adequação entre title, description e intenção.",
    "Cobertura de rich results elegíveis, quando aplicável.",
    "Evolução de LCP, INP e CLS em dados de campo.",
])]

story += [PageBreak(), P("9. Checklist reutilizável", "H1x")]
check_rows = [
    ("Fundação", "HTTPS, domínio canônico, redirect permanente e status HTTP corretos."),
    ("Renderização", "Conteúdo, title, canonical e schemas presentes no HTML inicial."),
    ("On-page", "Title/description únicos, um H1, headings lógicos, alt e links claros."),
    ("Schemas", "Tipos adequados, @id consistente, conteúdo visível e JSON válido."),
    ("Sitemap", "Somente URLs canônicas, imagens relevantes e lastmod verificável."),
    ("Robots", "Sitemap declarado, áreas privadas bloqueadas e bots avaliados."),
    ("GEO", "Entidades, autoria, experiência, fatos, fontes e contexto explícitos."),
    ("AEO", "Perguntas reais, respostas diretas, seções autocontidas e HTML semântico."),
    ("Agentes", "llms.txt, Markdown, Vary: Accept, headers Link e política de conteúdo."),
    ("Qualidade", "Lint, testes, build, validação de artefatos e inspeção HTTP."),
    ("Google", "Search Console verificado, sitemap submetido e URLs monitorizadas."),
]
story += [matrix(["Área", "Critério de aceite"], check_rows, [35*mm, 132*mm])]
story += [Spacer(1, 5*mm), callout("Critério de conclusão", "Uma implementação só deve ser considerada ativa quando o recurso estiver no código, for incluído no build, chegar ao domínio público com o status e Content-Type corretos e passar por uma verificação externa.", TEAL)]
story += [P("Ordem de prioridade para outros sites", "H2x"), numbered([
    "Conteúdo útil, arquitetura de informação e HTML acessível.",
    "Status HTTP, canonicals, titles, descriptions e sitemap.",
    "Dados estruturados coerentes e autoria verificável.",
    "Conteúdo direto para perguntas e seções citáveis.",
    "Automação de lastmod e validações de build.",
    "Camada agent-ready: Markdown, llms.txt, manifestos e Link headers.",
])]

story += [PageBreak(), P("10. Limites e anti-padrões", "H1x")]
story += [matrix(
    ["Anti-padrão", "Por que prejudica", "Alternativa"],
    [
        ["Repetir palavras-chave", "Reduz legibilidade e não demonstra expertise.", "Explicar conceitos, decisões, resultados e limites."],
        ["FAQ schema artificial", "Marca conteúdo que não corresponde à experiência visível.", "Usar perguntas semânticas em HTML quando forem úteis."],
        ["Atualizar todo lastmod", "Torna o sinal pouco confiável.", "Mapear dependências e atualizar somente rotas afetadas."],
        ["SPA fallback universal", "Produz soft 404 e canonicals errados.", "Rotas explícitas e 404 real."],
        ["Markdown manual", "Rapidamente diverge do HTML.", "Gerar a partir do build e validar automaticamente."],
        ["Schemas invisíveis", "Criam inconsistência e risco de políticas.", "Marcar apenas conteúdo factual exibido na página."],
        ["Depender de arquivos para IA", "Agentes podem ignorá-los ou ter suporte desigual.", "Manter HTML, sitemap e conteúdo como base."],
    ], [42*mm, 61*mm, 64*mm]
)]
story += [P("O que não pode ser garantido", "H2x"), bullet_list([
    "Indexação, posição ou rich result por parte de qualquer mecanismo de pesquisa.",
    "Citação por sistemas generativos.",
    "Respeito universal a robots.txt ou Content Signals.",
    "Adoção uniforme de llms.txt, manifestos ou negociação Markdown.",
])]

story += [PageBreak(), P("Referências e leitura complementar", "H1x")]
refs = [
    ("Google Search Central - SEO Starter Guide", "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"),
    ("Google Search Central - Structured data guidelines", "https://developers.google.com/search/docs/appearance/structured-data/sd-policies"),
    ("Google Search Central - ProfilePage structured data", "https://developers.google.com/search/docs/appearance/structured-data/profile-page"),
    ("Google Search Central - Build and submit a sitemap", "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap"),
    ("Google Search Central - JavaScript SEO basics", "https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics"),
    ("Vercel - Agent-friendly pages with content negotiation", "https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation"),
    ("Vercel - Rewrites", "https://vercel.com/docs/routing/rewrites"),
    ("Cloudflare - Markdown for Agents", "https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/"),
    ("Content Signals", "https://contentsignals.org/"),
    ("llms.txt proposal", "https://llmstxt.org/"),
]
for title, url in refs:
    story += [P(f'<b>{title}</b><br/><link href="{url}" color="#2487F5">{url}</link>', "Smallx"), Spacer(1, 1.5*mm)]
story += [Spacer(1, 5*mm), HRFlowable(width="100%", thickness=0.7, color=LINE), Spacer(1, 4*mm)]
story += [P("Nota metodológica", "H2x"), P("Este guia documenta práticas implementadas e validadas no projeto rpovoadata.tech em agosto de 2026. Recomendações de plataformas e convenções emergentes devem ser revistas periodicamente, porque requisitos, elegibilidade e suporte podem mudar.")]
story += [P("Sobre o autor", "H2x"), P("Rodrigo Póvoa é Data Analytics Engineer e líder técnico com experiência end-to-end em Data Architecture, Engineering, Analytics, Governance e plataformas modernas de dados.")]

doc.build(story)

reader = PdfReader(str(OUT))
assert len(reader.pages) >= 8, "PDF unexpectedly short"
assert reader.metadata.title == "Guia de melhores práticas em SEO, GEO e AEO"
print(f"Created {OUT} with {len(reader.pages)} pages")
