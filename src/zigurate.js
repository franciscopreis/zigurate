//MAPEAMENTO das permutas para criptografia
const mapeamento = {
  //minusculas
  a: 'o',
  á: 'ó',
  à: 'ò',
  â: 'ô',
  ã: 'õ',

  b: 'p',
  c: 'g',
  d: 't',
  e: 'i',
  é: 'í',
  è: 'ì',
  ê: 'î',
  ẽ: 'ĩ',

  f: 'v',
  g: 'c',
  h: 'h',
  i: 'e',
  í: 'é',
  ì: 'è',
  ĩ: 'ẽ',
  î: 'ê',
  j: 'j',
  k: 'q',
  l: 'r',
  m: 'n',
  n: 'm',
  o: 'a',
  ó: 'á',
  ò: 'à',
  õ: 'ã',
  ô: 'â',

  p: 'b',
  q: 'k',
  r: 'l',
  s: 'z',
  t: 'd',
  u: 'u',
  v: 'f',
  w: 'w',
  x: 'x',
  y: 'y',
  z: 's',

  //maiusculas
  A: 'O',
  Á: 'Ó',
  À: 'Ò',
  Â: 'Ô',
  Ã: 'Õ',

  B: 'P',
  C: 'G',
  D: 'T',
  E: 'I',
  É: 'Í',
  È: 'Ì',
  Ê: 'Î',
  Ẽ: 'Ĩ',

  F: 'V',
  G: 'C',
  H: 'H',
  I: 'E',
  Í: 'É',
  Í: 'Í',
  Ĩ: 'Ẽ',

  J: 'J',
  K: 'Q',
  L: 'R',
  M: 'N',
  N: 'M',
  O: 'A',
  Ó: 'Á',
  Ò: 'À',
  Õ: 'Ã',
  Ô: 'Â',

  P: 'B',
  Q: 'K',
  R: 'L',
  S: 'Z',
  T: 'D',
  U: 'U',
  V: 'F',
  W: 'W',
  X: 'X',
  Y: 'Y',
  Z: 'S',
}

//ARRAY com colors dos esquemas de cor
let colors = ['white', 'red', 'gold', 'blue', 'green', 'purple', 'black']

//COR: função que aplica a cor de acordo
function colorSwitch(textColor, bckgColor) {
  let all = document.getElementsByTagName('*')
  let max = all.length

  //Aplicamos um loop
  for (let i = 0; i < max; i++) {
    all[i].style.color = textColor
    all[i].style.backgroundColor = bckgColor
  }
}

//IMAGEM: imagem do zigurate default como black
const zigurate = document.querySelector('img')
zigurate.src = './images/ziggurat-black.png'

//COLORSCHEME: Aplica os vários estilos de acordo com uma bckgColor definida

let count = 0
function colorScheme(bckgColor) {
  //Excluir o elemento bckgColor do arranjo colors pois não queremos que ambos coincidam
  if (colors.length == 7) {
    let index = colors.indexOf(bckgColor)
    colors.splice(index, 1)
    console.log(colors)
  }
  //A variável newCount é criada para conseguir obter o colors[0]
  count++
  let newCount = count - 1
  let max = colors.length - 1

  //no último elemento voltar ao zero para manter um "loop"
  //alteração de zigurate.src muda a imagem
  if (colors[newCount] === colors[max]) {
    zigurate.src = `./images/ziggurat-${colors[newCount]}.png`
    colorSwitch(colors[newCount], bckgColor)
    count = 0
    colors.push(bckgColor) //adicionar de novo o elemento bckgColor para passarmos ao passo anterior caso outro botão seja carregado
  } else {
    colorSwitch(colors[newCount], bckgColor)
    zigurate.src = `./images/ziggurat-${colors[newCount]}.png`

    //esta parte é para facilitar a parte do localstorage para evitar repetições
    let modo = bckgColor + '-' + colors[newCount]
    localStorage.setItem('modoCor', `${modo}`)
    colors.push(bckgColor) //adicionar de novo o elemento bckgColor para passarmos ao passo anterior caso outro botão seja carregado
  }
}
//Assim basta criar novas funções para aplicar aos botões
function white() {
  colorScheme('white')
}
function red() {
  colorScheme('red')
}
function gold() {
  colorScheme('gold')
}
function blue() {
  colorScheme('blue')
}
function green() {
  colorScheme('green')
}
function purple() {
  colorScheme('purple')
}
function black() {
  colorScheme('black')
}

//Função auxiliar que muda o texto de acordo com o
function substituirLetrasTexto(texto, mapeamento) {
  let novoTexto = ''
  for (let i = 0; i < texto.length; i++) {
    const letra = texto[i]
    const letraSubstituta = mapeamento[letra] || letra
    novoTexto += letraSubstituta
  }
  return novoTexto
}

//Simplificação cripto para z_texto.html

//CRIPTO: aplica apenas ao texto do editor de texto
function criptoTxt() {
  const textoOriginal = document.getElementById('texto-original').value
  const novoTexto = substituirLetrasTexto(textoOriginal, mapeamento)
  document.getElementById('texto-modificado').textContent = novoTexto

  //Esta função dá default aos estilos caso tenham sido carregados outros botões
  document
    .getElementById('texto-modificado')
    .classList.remove('ideograma-bilateral')
  document
    .getElementById('texto-modificado')
    .classList.remove('ideograma-radial')
}

//Este conversor está associado ao botão que converte todo o texto existente (marcado em html com a class "display") de acordo com o mapeamento criptográfico;
function criptoAll() {
  let texto = document.getElementsByClassName('display')

  //A utilização do loop for permite a iteração desta função em cada elemento presente no arranjo de elementos da classe "display"
  for (let i = 0; i < texto.length; i++) {
    texto[i].innerText = substituirLetrasTexto(texto[i].innerText, mapeamento)
  }

  let inputTexto = document.getElementById('texto-original')
  inputTexto.classList.remove('ideograma-bilateral')
}

//TESTE

//TEXTO IDEOGRAMÁTICO
//Esta parte é referente à mudança de estilos de letras (ou "fonts") em dois tipos: ideograma bilateral e ideograma radial.

//BILATERAL: Função que muda para font bilateral em TODO o texto

function bilateralAll() {
  let texto = document.getElementsByClassName('display')
  let title = document.getElementById('title-text')

  //As condições são definidas tendo em conta a presença ou não da class "ideograma-bilateral", de modo a que o botão possa activar e desactivar o modo;
  if (title.classList.contains('ideograma-bilateral') == false) {
    for (let i = 0; i < texto.length; i++) {
      texto[i].innerHTML.toUpperCase()
      texto[i].classList.remove('ideograma-radial')
      texto[i].classList.add('ideograma-bilateral')
      localStorage.setItem('modoFont', 'ideograma-bilateral')
    }
  } else if (title.classList.contains('ideograma-bilateral') == true) {
    for (let i = 0; i < texto.length; i++) {
      texto[i].innerHTML.toLowerCase()
      texto[i].classList.remove('ideograma-bilateral')
      localStorage.setItem('modoFont', 'none')
    }
  }
}

//RADIAL: Função que muda para font radial em TODO o texto
function radialAll() {
  let texto = document.getElementsByClassName('display')
  let title = document.getElementById('title-text')

  //As condições são definidas tendo em conta a presença ou não da class "ideograma-bilateral", de modo a que o botão possa activar e desactivar o modo;
  if (title.classList.contains('ideograma-radial') == false) {
    for (let i = 0; i < texto.length; i++) {
      texto[i].innerHTML.toUpperCase()
      texto[i].classList.remove('ideograma-bilateral')
      texto[i].classList.add('ideograma-radial')
      localStorage.setItem('modoFont', 'ideograma-radial')
    }
  } else if (title.classList.contains('ideograma-radial') == true) {
    for (let i = 0; i < texto.length; i++) {
      texto[i].innerHTML.toLowerCase()
      texto[i].classList.remove('ideograma-radial')
      localStorage.setItem('modoFont', 'none')
    }
  }
}

//BILATERAL para o editor de texto

function bilateralTxt() {
  document
    .getElementById('texto-modificado')
    .classList.remove('ideograma-radial')

  let inputTexto = document.getElementById('texto-original').value

  let outputTexto = document.getElementById('texto-modificado')

  outputTexto.classList.add('ideograma-bilateral')

  outputTexto.textContent = inputTexto
}

//BOTÃO RADIAL para o editor de texto

function radialTxt() {
  document
    .getElementById('texto-modificado')
    .classList.remove('ideograma-bilateral')

  let inputTexto = document.getElementById('texto-original').value

  let outputTexto = document.getElementById('texto-modificado')

  outputTexto.classList.add('ideograma-radial')

  outputTexto.textContent = inputTexto
}

//Botão que determina o tamanho
function sizeAll() {
  let all = document.getElementsByTagName('*')
  let max = all.length

  //Aplicamos um loop para aplicarmos a todos os elementos visíveis
  for (let i = 0; i < max; i++) {
    all[i].style.transform = 'rotate(7deg)' //testar 90deg
    console.log(count)
  }
}

let intervalID

function startColorChanging() {
  if (!intervalID) {
    intervalID = setInterval(function () {
      let color1 = colors[Math.floor(Math.random() * colors.length)]
      let color2 = colors[Math.floor(Math.random() * colors.length)]

      if (color1 == color2) {
        return colorSwitch(black, white)
      } else {
        colorSwitch(color1, color2)
      }
    }, 200) // Intervalo de 5 segundos (5000 milissegundos)
  } else {
    clearInterval(intervalID)
    intervalID = null
    // Restaurar cores originais se desejar
    // colorSwitch(corOriginal1, corOriginal2);
  }
}
//LOCALSTORAGE: gravar modos

//MODOS DE COR
if (localStorage.getItem('modoCor') == undefined) {
  colorSwitch('black', 'white')
  zigurate.src = './ziggurat-black.png'
  //caso não exista nada no localStorage aplicar o default
} else {
  //ir buscar o modo guardado
  let colorSchemeSave = localStorage.getItem('modoCor')

  //dividir em array de modo a separar as cores pelo hifen
  let array = colorSchemeSave.split('-')
  let bckgColor = array[0]
  let color = array[1]

  //aplicar colorSwitch()
  colorSwitch(color, bckgColor)
  zigurate.src = `./images/ziggurat-${color}.png`
}

//MODOS DE FONT

if (localStorage.getItem('modoFont') == 'ideograma-bilateral') {
  bilateralAll()
  console.log(localStorage.getItem('modoFont'))
} else if (localStorage.getItem('modoFont') == 'ideograma-radial') {
  radialAll()
  console.log(localStorage.getItem('modoFont'))
}

// if (localStorage.getItem("modoFont" == "ideograma-bilateral")) {
//   function bilateralAll();
// }else if(localStorage.getItem("modoFont" == "ideograma-radial")){
//   function radialAll();
// }else{
//   let nome = 0;
// }

//SAVE TXT

function download(filename, text) {
  var element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  )
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

// Start file download.

function downloadFile() {
  // Corrige a obtenção dos textos para usar .value em vez de .textContent
  let textoOriginal = document.getElementById('texto-original').value
  let textoModificado = document.getElementById('texto-modificado').value

  // Preparar o conteúdo para download
  let content = `Input:\n${textoOriginal}\n\nOutput:\n${textoModificado}`

  let filename = 'zigurate.txt'

  let blob = new Blob([content], {
    type: 'text/plain;charset=utf-8',
  })

  // Cria um link de download
  let link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename

  // Simula um clique no link para iniciar o download
  document.body.appendChild(link) // Adiciona o link ao corpo do documento para garantir a compatibilidade
  link.click()
  document.body.removeChild(link) // Remove o link após o clique

  // Libera o objeto URL
  URL.revokeObjectURL(link.href)
}
