const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const app = express()
app.use(express.json())

const porta = 3333;


const mulheres = [
 {
   id: '1',
  nome: 'Simara Conceição',
   imagem: 'https://bit.ly/3LJIyOF',
   minibio: 'Desenvolvedora e instrutora',
 },

 {
  id: '2',
  nome: 'Iana Chan',
   imagem: 'https://bit.ly/3JCXBqP',
   minibio: 'CEO & Founder da PrograMaria',
 },

 {
  id:'3',
  nome: 'Luana Pimentel',
   imagem: 'https://bit.ly/3FKpFaz',
   minibio: 'Senior Staff Software Engineer',
 }
]

//GET
function mostraMulheres(request, response) {
response.json(mulheres)
}
//POST
function criaMulher(request, response) {

 
  const novaMulher = {
     id: uuidv4(),
     nome: request.body.nome,
     imagem: request.body.imagem,
     minibio: request.body.minibio
   }
   mulheres.push(novaMulher)
response.json(mulheres)
  }


//PATCH
function corrigeMulher(request, response) {
	function encontraMulher(mulher){
		if(mulher.id === request.params.id){
			return mulher
		}
	}	
	  const mulherEncontrada = mulheres.find(encontraMulher)	
    	if(request.body.nome){
		  mulherEncontrada.nome = request.body.nome
	  }
	    if (request.body.minibio){
	    mulherEncontrada.minibio = request.body.minibio
	  }
	    if (request.body.imagem){
	    mulherEncontrada.imagem = request.body.imagem
	  }
    
  response.json(mulheres)
}

//DELETE
function deletaMulher(request, response){
  function todasMenosEla(mulher){
    if (mulher.id !== request.params.id){
      return mulher
      }
    }
    const mulheresQueFicaram = mulheres.filter(todasMenosEla)
    response.json(mulheresQueFicaram)
  }

app.use(router.get('/mulheres', mostraMulheres))
app.use(router.post('/mulheres', criaMulher))
app.use(router.patch('/mulheres/:id', corrigeMulher))
app.use(router.delete('/mulheres/:id', deletaMulher))

//PORTA
function mostraPorta() {
  console.log("Servidor criado e rodando na porta ", porta)
}

app.listen(porta, mostraPorta)
