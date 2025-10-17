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
interface PrivacyPolicyOptions {
    siteName: string;
    siteUrl: string;
    format: 'html' | 'text';
}

export function generatePrivacyPolicy(options: PrivacyPolicyOptions): string {
    const { siteName, siteUrl, format } = options;
    
    const AAAAAA = siteName || 'Nome do Site';
    const BBBBBB = siteUrl || 'URL do Site';

    const policyText = `
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
        // Converte o texto em HTML básico, usando <p> para parágrafos e <ul>/<li> para listas
        const htmlContent = policyText
            .split('\n\n') // Divide em blocos (parágrafos/seções)
            .map(block => {
                block = block.trim();
                if (!block) return '';

                // Trata títulos de seção (começam com número e ponto)
                if (block.match(/^\d+\./)) {
                    const [title, ...rest] = block.split('\n');
                    let content = `<h2>${title.trim()}</h2>`;
                    
                    // Trata listas dentro da seção
                    const listItems = rest.filter(line => line.trim().startsWith('-'));
                    if (listItems.length > 0) {
                        content += '<ul>' + listItems.map(item => `<li>${item.replace(/^-/, '').trim()}</li>`).join('') + '</ul>';
                        
                        // Adiciona o restante do texto que não é lista como parágrafo
                        const remainingText = rest.filter(line => !line.trim().startsWith('-')).join(' ').trim();
                        if (remainingText) {
                            content += `<p>${remainingText}</p>`;
                        }
                    } else {
                        // Se não houver lista, trata o bloco como parágrafo(s)
                        content += rest.map(p => `<p>${p.trim()}</p>`).join('');
                    }
                    return content;
                }
                
                // Trata o bloco de "Modificações" e "Lei aplicável" que não tem número
                if (block.startsWith('Modificações') || block.startsWith('Lei aplicável')) {
                    const [title, ...rest] = block.split('\n');
                    return `<h2>${title.trim()}</h2><p>${rest.join(' ').trim()}</p>`;
                }

                // Trata parágrafos simples
                return `<p>${block}</p>`;
            })
            .join('\n');
            
        // Substitui a URL no texto final (garantindo que a URL seja um link)
        // Nota: A substituição da URL é feita aqui para garantir que apenas a URL fora do parágrafo 1 seja linkada,
        // mas como o modelo HTML é gerado a partir do texto, vamos garantir que a URL no parágrafo 1 seja tratada corretamente.
        
        // Primeiro, substitui todas as ocorrências de BBBBBB por um link, exceto a primeira ocorrência no parágrafo 1
        let finalHtml = htmlContent.replace(new RegExp(BBBBBB, 'g'), `<a href="${BBBBBB}" target="_blank">${BBBBBB}</a>`);

        // O parágrafo 1 agora é: Ao acessar ao site AAAAAA (BBBBBB), concorda...
        // O regex de substituição de URL no final do HTML pode ser um pouco agressivo.
        // Vamos garantir que a URL no parágrafo 1 seja tratada corretamente no modelo de texto, e o HTML gerado já deve estar correto.
        
        // Revertendo a lógica de substituição de URL para ser mais precisa no HTML gerado:
        // O modelo de texto já inclui ${AAAAAA} (${BBBBBB}) no primeiro parágrafo.
        // Vamos garantir que a URL seja linkada apenas onde ela aparece sozinha ou como parte do texto, mas não dentro dos parênteses se já estiver lá.
        
        // Para simplificar e garantir que o link seja aplicado corretamente, vamos usar o modelo de texto atualizado e deixar a lógica de conversão HTML fazer o trabalho.
        
        // A lógica de substituição de link no final do HTML é removida, pois o modelo de texto já está formatado.
        // A única substituição que precisamos é garantir que o BBBBBB seja linkado no HTML.
        
        // Vamos re-executar a substituição de link apenas para BBBBBB, garantindo que o link seja aplicado em todas as ocorrências de BBBBBB.
        return finalHtml.replace(new RegExp(BBBBBB, 'g'), `<a href="${BBBBBB}" target="_blank">${BBBBBB}</a>`);


    } else {
        // Texto simples: apenas substitui e garante que a formatação de lista seja mantida
        return policyText.replace(new RegExp(BBBBBB, 'g'), BBBBBB);
    }
}