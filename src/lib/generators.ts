// CPF generation logic
function randomDigit() {
  return Math.floor(Math.random() * 10);
}

function calculateVerifierDigit(digits: number[]): number {
  let sum = 0;
  let multiplier = digits.length + 1;
  for (const digit of digits) {
    sum += digit * multiplier;
    multiplier--;
  }
  const remainder = sum % 11;
  const digit = remainder < 2 ? 0 : 11 - remainder;
  return digit;
}

export function generateCpf(withPunctuation = true): string {
  const baseDigits = Array.from({ length: 9 }, randomDigit);
  const firstVerifier = calculateVerifierDigit(baseDigits);
  const secondVerifier = calculateVerifierDigit([...baseDigits, firstVerifier]);
  const cpfArray = [...baseDigits, firstVerifier, secondVerifier];
  const cpfString = cpfArray.join('');

  if (withPunctuation) {
    return cpfString.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  return cpfString;
}

// CNPJ generation logic
export function generateCnpj(withPunctuation = true): string {
    const baseDigits = Array.from({ length: 8 }, randomDigit);
    const branchDigits = [0, 0, 0, 1];
    const firstPart = [...baseDigits, ...branchDigits];

    const calculateCnpjVerifier = (digits: number[]): number => {
        let sum = 0;
        let multiplier = 2;
        for (let i = digits.length - 1; i >= 0; i--) {
            sum += digits[i] * multiplier;
            multiplier++;
            if (multiplier > 9) {
                multiplier = 2;
            }
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstVerifier = calculateCnpjVerifier(firstPart);
    const secondVerifier = calculateCnpjVerifier([...firstPart, firstVerifier]);

    const cnpjArray = [...firstPart, firstVerifier, secondVerifier];
    const cnpjString = cnpjArray.join('');

    if (withPunctuation) {
        return cnpjString.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return cnpjString;
}


// Password generation logic
const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export function generatePassword(options: PasswordOptions): string {
  const { length, uppercase, lowercase, numbers, symbols } = options;
  let charset = '';
  let password = '';
  
  const selectedSets = [];

  if (uppercase) {
    charset += CHAR_SETS.uppercase;
    selectedSets.push(CHAR_SETS.uppercase);
  }
  if (lowercase) {
    charset += CHAR_SETS.lowercase;
    selectedSets.push(CHAR_SETS.lowercase);
  }
  if (numbers) {
    charset += CHAR_SETS.numbers;
    selectedSets.push(CHAR_SETS.numbers);
  }
  if (symbols) {
    charset += CHAR_SETS.symbols;
    selectedSets.push(CHAR_SETS.symbols);
  }

  if (charset === '') {
    return ''; // Retorna string vazia se nenhum tipo de caractere for selecionado
  }
  
  for (const set of selectedSets) {
      password += set[Math.floor(Math.random() * set.length)];
  }

  const remainingLength = length - password.length;
  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password.split('').sort(() => 0.5 - Math.random()).join('');
}

// Credit Card generation logic
function luhnCheck(cardNumber: string): boolean {
  let sum = 0;
  let double = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);
    if (double) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    double = !double;
  }
  return (sum % 10) === 0;
}

function generatePartialNumber(prefix: string, totalLength: number): string {
  let partial = prefix;
  while (partial.length < totalLength - 1) { // -1 for the Luhn check digit
    partial += Math.floor(Math.random() * 10);
  }
  return partial;
}

function generateValidCardNumber(prefix: string, totalLength: number): string {
  let partial = generatePartialNumber(prefix, totalLength);
  let checkDigit = 0;
  for (let i = 0; i < 10; i++) { // Iterate through possible check digits (0-9)
    const tempCard = partial + i;
    if (luhnCheck(tempCard)) {
      checkDigit = i;
      break;
    }
  }
  return partial + checkDigit;
}

interface CreditCardBrand {
  name: string;
  prefixes: string[];
  lengths: number[];
}

const CREDIT_CARD_BRANDS: CreditCardBrand[] = [
  { name: "Visa", prefixes: ["4"], lengths: [16] },
  { name: "Mastercard", prefixes: ["51", "52", "53", "54", "55"], lengths: [16] },
  { name: "American Express", prefixes: ["34", "37"], lengths: [15] },
  { name: "Discover", prefixes: ["6011", "644", "645", "646", "647", "648", "649", "65"], lengths: [16] },
  { name: "Diners Club", prefixes: ["300", "301", "302", "303", "304", "305", "36", "38", "39"], lengths: [14, 16] },
  { name: "JCB", prefixes: ["3528", "3529", "353", "354", "355", "356", "357", "358"], lengths: [16] },
];

export function generateCreditCard(brandName: string): string {
  const brand = CREDIT_CARD_BRANDS.find(b => b.name.toLowerCase() === brandName.toLowerCase());
  if (!brand) {
    console.warn(`Brand "${brandName}" not found. Cannot generate card.`);
    return "";
  }

  const prefix = brand.prefixes[Math.floor(Math.random() * brand.prefixes.length)];
  const length = brand.lengths[Math.floor(Math.random() * brand.lengths.length)];

  return generateValidCardNumber(prefix, length);
}

export function getAllCreditCardBrands(): CreditCardBrand[] {
  return CREDIT_CARD_BRANDS;
}

// Lorem Ipsum generation logic
const LOREM_IPSUM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero',
  'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut', 'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia',
  'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis', 'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros',
  'dictum', 'proin', 'accumsan', 'sapien', 'nec', 'massa', 'volutpat', 'venenatis', 'sed', 'eu', 'molestie', 'lacus',
  'quisque', 'porttitor', 'ligula', 'dui', 'mollis', 'tempus', 'at', 'magna', 'vestibulum', 'turpis', 'ac', 'diam',
  'tincidunt', 'id', 'condimentum', 'enim', 'sodales', 'in', 'hac', 'habitasse', 'platea', 'dictumst', 'aenean',
  'neque', 'fusce', 'augue', 'leo', 'eget', 'semper', 'mattis', 'tortor', 'scelerisque', 'nulla', 'interdum',
  'tellus', 'malesuada', 'rhoncus', 'porta', 'sem', 'aliquet', 'et', 'nam', 'suspendisse', 'potenti', 'vivamus',
  'luctus', 'fringilla', 'erat', 'donec', 'justo', 'vehicula', 'ultricies', 'varius', 'ante', 'primis', 'in',
  'faucibus', 'orci', 'luctus', 'et', 'ultrices', 'posuere', 'cubilia', 'curae', 'etiam', 'cursus', 'aliquam',
  'quam', 'dapibus', 'nisl', 'feugiat', 'egestas', 'class', 'aptent', 'taciti', 'sociosqu', 'ad', 'litora',
  'torquent', 'per', 'conubia', 'nostra', 'inceptos', 'himenaeos', 'phasellus', 'nibh', 'pulvinar', 'vitae',
  'urna', 'iaculis', 'lobortis', 'nisi', 'viverra', 'arcu', 'morbi', 'pellentesque', 'metus', 'commodo', 'ut',
  'facilisis', 'felis', 'tristique', 'ullamcorper', 'placerat', 'aenean', 'convallis', 'sollicitudin', 'integer',
  'rutrum', 'duis', 'est', 'etiam', 'bibendum', 'donec', 'pharetra', 'vulputate', 'maecenas', 'mi', 'fermentum',
  'consequat', 'suscipit', 'aliquam', 'habitant', 'senectus', 'netus', 'fames', 'quisque', 'euismod', 'curabitur',
  'lectus', 'elementum', 'tempor', 'risus', 'cras'
];

function generateSentence(wordCount: number): string {
  let sentence = '';
  for (let i = 0; i < wordCount; i++) {
    sentence += LOREM_IPSUM_WORDS[Math.floor(Math.random() * LOREM_IPSUM_WORDS.length)] + ' ';
  }
  sentence = sentence.trim();
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}

function generateParagraph(sentenceCount: number): string {
  let paragraph = '';
  for (let i = 0; i < sentenceCount; i++) {
    const wordCount = Math.floor(Math.random() * 10) + 5; // Sentences with 5 to 14 words
    paragraph += generateSentence(wordCount) + ' ';
  }
  return paragraph.trim();
}

export function generateLoremIpsum(paragraphCount: number, format: 'html' | 'text'): string {
  const paragraphs = [];
  for (let i = 0; i < paragraphCount; i++) {
    const sentenceCount = Math.floor(Math.random() * 4) + 4; // Paragraphs with 4 to 7 sentences
    paragraphs.push(generateParagraph(sentenceCount));
  }

  if (format === 'html') {
    return paragraphs.map(p => `<p>${p}</p>`).join('\n');
  } else {
    return paragraphs.join('\n\n');
  }
}

// Privacy Policy generation logic
interface PolicyOptions {
    siteName: string;
    siteUrl: string;
    format: 'html' | 'text';
}

export function generatePrivacyPolicy(options: PolicyOptions): string {
    const { siteName, siteUrl, format } = options;
    
    const AAAAAA = siteName || 'Nome do Site';
    const BBBBBB = siteUrl || 'URL do Site';

    const policyText = `
A sua privacidade é importante para nós. 
É política do ${AAAAAA} (${BBBBBB}) respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site ${AAAAAA}, e outros sites que possuímos e operamos.

Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.

Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.

Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.

O nosso site pode ter links para sites externos que não são operados por nós. Esteve ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.

Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.

O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.

- O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.
- Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.
- Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados ​​por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.
- Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.

Compromisso do Usuário

O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o ${AAAAAA} oferece no site e com caráter enunciativo, mas não limitativo:

A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;
B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do ${AAAAAA}, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.

Mais informações

Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
    `.trim();

    if (format === 'html') {
        // Converte o texto em HTML básico, usando <p> para parágrafos e <ul>/<li> para listas
        const htmlContent = policyText
            .split('\n\n') // Divide em blocos (parágrafos/seções)
            .map(block => {
                block = block.trim();
                if (!block) return '';

                // Trata títulos de seção (começam com letra maiúscula e não são listas)
                if (block.startsWith('Compromisso do Usuário') || block.startsWith('Mais informações')) {
                    const [title, ...rest] = block.split('\n');
                    let content = `<h2>${title.trim()}</h2>`;
                    
                    // Trata listas (A), B), C) ou -)
                    const listItems = rest.filter(line => line.trim().match(/^(\-|\w\))/));
                    
                    if (listItems.length > 0) {
                        content += '<ul>' + listItems.map(item => {
                            // Remove prefixos como 'A) ' ou '- '
                            const cleanItem = item.trim().replace(/^(\w\)\s*|\-\s*)/, '').trim();
                            return `<li>${cleanItem}</li>`;
                        }).join('') + '</ul>';
                        
                        // Adiciona o restante do texto que não é lista como parágrafo
                        const remainingText = rest.filter(line => !line.trim().match(/^(\-|\w\))/)).join(' ').trim();
                        if (remainingText) {
                            content += `<p>${remainingText}</p>`;
                        }
                    } else {
                        // Se não houver lista, trata o bloco como parágrafo(s)
                        content += rest.map(p => `<p>${p.trim()}</p>`).join('');
                    }
                    return content;
                }
                
                // Trata parágrafos simples
                return `<p>${block}</p>`;
            })
            .join('\n');
            
        // Substitui todas as ocorrências de BBBBBB por um link, se houver.
        let finalHtml = htmlContent.replace(new RegExp(BBBBBB, 'g'), `<a href="${BBBBBB}" target="_blank">${BBBBBB}</a>`);
        
        // Substitui AAAAAA
        finalHtml = finalHtml.replace(new RegExp(AAAAAA, 'g'), AAAAAA);
        
        // Adiciona quebras de linha para melhor legibilidade do código HTML gerado
        return finalHtml.replace(/<\/p><p>/g, '</p>\n<p>').replace(/<\/ul><h2>/g, '</ul>\n\n<h2>');

    } else {
        // Texto simples: apenas substitui AAAAAA
        return policyText.replace(new RegExp(AAAAAA, 'g'), AAAAAA);
    }
}

// Terms and Conditions generation logic
export function generateTermsAndConditions(options: PolicyOptions): string {
    const { siteName, siteUrl, format } = options;
    
    const AAAAAA = siteName || 'Nome do Site';
    const BBBBBB = siteUrl || 'URL do Site';

    const termsText = `
1. Termos

Ao acessar ao site ${AAAAAA} (${BBBBBB}), concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.

2. Uso de Licença

É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site ${AAAAAA} , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode: 

- modificar ou copiar os materiais; 
- usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial); 
- tentar descompilar ou fazer engenharia reversa de qualquer software contido no site ${AAAAAA}; 
- remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou 
- transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.

Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por ${AAAAAA} a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.

3. Isenção de responsabilidade

- Os materiais no site da ${AAAAAA} são fornecidos 'como estão'. ${AAAAAA} não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
- Além disso, o ${AAAAAA} não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.

4. Limitações

Em nenhum caso o ${AAAAAA} ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em ${AAAAAA}, mesmo que ${AAAAAA} ou um representante autorizado da ${AAAAAA} tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.

5. Precisão dos materiais

Os materiais exibidos no site da ${AAAAAA} podem incluir erros técnicos, tipográficos ou fotográficos. ${AAAAAA} não garante que qualquer material em seu site seja preciso, completo ou atual. ${AAAAAA} pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, ${AAAAAA} não se compromete a atualizar os materiais.

6. Links

O ${AAAAAA} não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por ${AAAAAA} do site. O uso de qualquer site vinculado é por conta e risco do usuário.

Modificações

O ${AAAAAA} pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
Lei aplicável

Estes termos e condições são regidos e interpretados de acordo com as leis do ${AAAAAA} e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
    `.trim();

    if (format === 'html') {
        // Converte o texto em HTML básico, usando <h2> para títulos e <ul>/<li> para listas
        const htmlContent = termsText
            .split('\n\n') // Divide em blocos
            .map(block => {
                block = block.trim();
                if (!block) return '';

                // Trata títulos numerados (1. Termos, 2. Uso de Licença, etc.)
                if (block.match(/^\d+\.\s/)) {
                    const [titleLine, ...rest] = block.split('\n');
                    const titleMatch = titleLine.match(/^(\d+\.\s)(.*)/);
                    
                    if (titleMatch) {
                        const title = titleMatch[2].trim();
                        let content = `<h2>${title}</h2>`;
                        
                        // Trata listas (começam com -)
                        const listItems = rest.filter(line => line.trim().startsWith('-'));
                        
                        if (listItems.length > 0) {
                            // Adiciona o parágrafo introdutório antes da lista
                            const introParagraph = rest.slice(0, rest.indexOf(listItems[0])).join(' ').trim();
                            if (introParagraph) {
                                content += `<p>${introParagraph}</p>`;
                            }

                            content += '<ul>' + listItems.map(item => {
                                const cleanItem = item.trim().replace(/^\-\s*/, '').trim();
                                return `<li>${cleanItem}</li>`;
                            }).join('') + '</ul>';
                            
                            // Adiciona o restante do texto que não é lista como parágrafo
                            const remainingText = rest.slice(rest.indexOf(listItems[listItems.length - 1]) + 1).join(' ').trim();
                            if (remainingText) {
                                content += `<p>${remainingText}</p>`;
                            }
                        } else {
                            // Se não houver lista, trata o bloco como parágrafo(s)
                            content += rest.map(p => `<p>${p.trim()}</p>`).join('');
                        }
                        return content;
                    }
                }
                
                // Trata seções sem número (Modificações, Lei aplicável)
                if (block.match(/^(Modificações|Lei aplicável)$/)) {
                    return `<h2>${block}</h2>`;
                }
                
                // Trata parágrafos simples dentro de seções
                if (block.startsWith('- ')) {
                    // Trata itens de lista dentro de seções numeradas (como Isenção de responsabilidade)
                    return `<p>${block.replace(/^\-\s*/, '').trim()}</p>`;
                }
                
                // Trata parágrafos simples
                return `<p>${block}</p>`;
            })
            .join('\n');
            
        // Substitui todas as ocorrências de BBBBBB por um link.
        let finalHtml = htmlContent.replace(new RegExp(BBBBBB, 'g'), `<a href="${BBBBBB}" target="_blank">${BBBBBB}</a>`);
        
        // Substitui AAAAAA
        finalHtml = finalHtml.replace(new RegExp(AAAAAA, 'g'), AAAAAA);
        
        // Adiciona quebras de linha para melhor legibilidade do código HTML gerado
        return finalHtml.replace(/<\/p><p>/g, '</p>\n<p>').replace(/<\/ul><h2>/g, '</ul>\n\n<h2>').replace(/<\/p><h2>/g, '</p>\n\n<h2>');

    } else {
        // Texto simples: substitui AAAAAA e BBBBBB
        return termsText.replace(new RegExp(AAAAAA, 'g'), AAAAAA).replace(new RegExp(BBBBBB, 'g'), BBBBBB);
    }
}

// HTML Entities Converter logic
export function htmlEncode(text: string): string {
    if (typeof document === 'undefined') return '';
    const element = document.createElement('div');
    element.innerText = text;
    return element.innerHTML;
}

export function htmlDecode(text: string): string {
    if (typeof document === 'undefined') return '';
    const element = document.createElement('div');
    element.innerHTML = text;
    return element.textContent || "";
}