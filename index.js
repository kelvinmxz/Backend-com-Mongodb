const express = require ("express");
// importa o MongoClient em MongoClient
const {MongoClient, ObjectId} = require ('mongodb');
// cofigura a url do banco
const url="mongodb://localhost:27017";
// nome o banco de dados
const dbName = "backend-janeiro-29";
// cria um cliente com a url criada
const client = new MongoClient(url);

async function main() {

    console.info("Conetando ao banco de dados...");
    await client.connect();
    console.info("Banco de dads conectado com sucesso!!!");

const db = client.db(dbName);
const collection  =db.collection("herois");

const app = express();

//habilitar o processamento de JSON
app.use(express.json())/

app.get("/", function (req, res){
    res.send("Hello World")
});

app.get("/herois", async function (req, res){
    const itens = await collection.find().toArray();
    res.send(itens)
})

   //Create herois
app.post("/herois", async function (req,res) {
// extrai o nome da requisicao
    const item =req.body;
// insere o item na collection
    await collection.insertOne(item);
//envia o objeto na resposta
    res.send (item)
})
     
    //head by id
app.get("/herois/:id", async function (req,res) {
    //pegmos niciamente o parametro da rota (id)
const id = req.params.id;
    //buscamos a informacao collection
const item = await collection.findOne({
    _id: new ObjectId(id),
})
    res.send(item);
})

    //update
app.put("/herois/:id", async function (req,res) {
        //pegmos niciamente o parametro da rota (id)
const id = req.params.id;
        //extai o objetoda requisicao
const item = req.body;
        //atualizamos na collection 
await collection.updateOne(
    {_id: new ObjectId(id)},
    { $set: item}
    )
        //exibimos o item na resposta
    res.send(item);
})
  
        //delete
    app.delete("/herois/:id", async function (req,res) {

        //pegamos inicialmente o parametro da roa ID que queremos remover
    const id = req.params.id

        //removemos collection
    await collection.deleteOne(
    {_id: new ObjectId(id)}
);
    res.send("item Removido Com Sucesso!!!");
})
app.listen(3000);
}

main();