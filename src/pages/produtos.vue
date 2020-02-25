<template>

  <div class="produtos">
    <div class="page-container">
      <!-- HEADER DESKTOP-->

      <!-- MAIN CONTENT-->
      <div class="main-content">
        <div class="section__content section__content--p30">
          <div class="container-fluid" >
            <div class="row">
              <div class="col-lg-12" style=" margin:0 auto ">
                <div class="card" style="border-top: 4px solid #00BFB2">
                  <div class="card-header d-flex flex-row align-items-center">
                    <h4 class="title-2 mb-0 swappin-color">Meus Produtos</h4>
                    <div class="d-flex flex-grow-1 justify-content-end">
                      <b-button v-b-modal.modal-1 class="d-flex flex-row">
                        <h4 class="title-2 mr-2" style="color: #A5A5A5">Adicionar Produtos</h4>
                        <img src="../assets/icons/bag_plus.png" class="icon">
                      </b-button>
                    </div>
                  </div>
                </div>



              </div>
            </div>
            <div class="row">

                <div class="col-lg-12">


                </div>
              <div class="col-lg-12">
                <table class="products-table table">
                  <thead>
                    <th colspan="2">
                        <h4 class="title-2 mr-2" style="color: #A5A5A5; margin: 35px 0px !important;">Lista de Produtos</h4>
                    </th>
                        <th colspan="7">
                      <form class="form-group d-flex flex-row justify-content-end" action="" method="POST" style="float: right; max-width: 450px; margin: 20px; margin-left: 0">
                        <input class="au-input au-input--xl" v-model="search" type="text"  name="search" placeholder="Pesquisar produtos..." style="padding-left: 20px !important;"/>
                        <button type="submit" style="position: absolute; display: contents">
                          <img src="../assets/icons/search.png" class="icon justify-content-end" style="margin-right: 20px !important"/>
                        </button>
                      </form>
                    </th>
                  </thead>
                  <thead>
                    <tr>
                      <th scope="col"><h4 class="title-2">Código</h4></th>
                      <th scope="col"><h4 class="title-2">Nome Produto</h4></th>
                      <th scope="col"><h4 class="title-2">Preço</h4></th>
                      <th scope="col"><h4 class="title-2">Preço Promocional</h4></th>
                      <th scope="col"><h4 class="title-2">Descrição</h4></th>
                      <th scope="col"><h4 class="title-2">Foto</h4></th>
                      <th scope="col"><h4 class="title-2">Editar</h4></th>
                      <th scope="col"><h4 class="title-2">Excluir</h4></th>
                      <th scope="col"><h4 class="title-2">Disponivel</h4></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr  v-for="(produto, index) in filtroProduct" :key="produto.id" style="border-top: 1px solid #EEE !important;">
                      <th scope="row"><h4 class="title-2" style="color: #999">{{produto.code}}</h4></th>
                      <td><p>{{produto.name}}</p></td>
                      <td><p>R${{produto.price}}</p></td>
                      <td><p>R${{produto.promotionPrice}}</p></td>
                      <td style="width: 250px;"><p>{{produto.description}}</p></td>
                      <td><img class="card-img-top" :src="produto.photo" alt="Imagem do Produto" style="width:30px">
                      </td>
                      <td>
                      <b-button id="show-btn" @click="$bvModal.show(produto, index)">
                        <img src="../assets/icons/edit.png" class="icon">
                      </b-button>
                      <b-modal :id="produto" hide-footer >
                          <template v-slot:modal-title>
                            <h3> Editar Produto </h3><br>
                            <form @submit="editProduto">
                              <div class="form-group" style="text-align:left">
                                <label> Nome:
                                  <input v-model="produto.name" class="form-control"  type="text" placeholder="Nome" />
                                </label>

                                <label style=" margin-left:5px;">  Code:
                                  <input v-model="produto.code" class="form-control" type="text" placeholder="Code" style="width:170px"/>
                                </label>

                                <label style=" margin-left:5px;"> Preço:
                                  <input v-model.number="produto.price" class="form-control" type="number" placeholder="Preço" style="width:170px"/>
                                </label>

                                <label style=" margin-left:5px;"> Promoção:
                                  <input v-model.number="produto.promotionPrice" class="form-control" type="number" placeholder="Promoção" style="width:170px"/>
                                </label>
                              </div>


                              <input type="file" @change="uploadImage"><br><br>
                              <button type="button"  class="btn btn-info" style="width:100%" @click.stop="editProduto(produto)" >Editar</button>

                            </form>
                          </template>
                        </b-modal></td>
                        <td>
                          <button type="button" class="btn" style="width:100%" @click.stop="deleteProduto(produto)">

                          <img src="../assets/icons/delete.png" class="icon">
                        </button>
                      </td>
                        <td scope="col"><toggle-button v-model="produto.enable" @change="enable_(produto)"/>


                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>

              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="copyright">
                    <p>Copyright © 2019 Swappin. Todos os direitos reservados.</p>
                  </div>



                </div>
              </div>
            </div>
          </div>
          <b-modal id="modal-1" title="Adicionar Produtos" ref="my-modal">
            <form @submit="addProduto">
              <div class="form-group d-flex flex-column" style="text-align:left">
                <div class=" mb-4 photo-upload-section d-flex flex-row">
                  <div><input type="file" @change="uploadImage" :disabled="loading" class="custom-file-input mb-4" id="exampleInputFile" aria-describedby="fileHelp">
                  <label class="custom-file-label" for="exampleInputFile">
                    <img src="../assets/icons/camera_1.png" class="icon" style="margin-left: 0px !important">
                    <template v-if="loading">
                      <i class="fa fa-spinner fa-spin"></i>
                    </template>
                    <template v-else></template>
                    <template v-if="photo">
                      <img class="product-photo" :src="photo" alt="Meu Produto" style="margin-left: 0px !important"><br><br>
                    </template>
                  </label>
                </div>
                  <div class="d-flex flex-column justify-content-center ml-2">
                      <p class="mb-0">Insira uma foto em boa resolução</p>
                      <h4 class="title-2 swappin-color mb-0 mt-1">Capriche na imagem do seu produto</h4>
                  </div>

                </div>

                <label style=" margin-left:25px;"> Nome do Produto</label>
                  <input v-model="name" class="form-control mb-2"  type="text" placeholder="Digite o nome do produto" style="padding-left: 20px !important;"/>

                <label style=" margin-left:25px;">Código do Produto</label>
                  <input v-model="code" class="form-control mb-2" type="text" placeholder="Digite o código do produto" style="padding-left: 20px !important;"/>

                <label style=" margin-left:25px;"> Preço do Produto
                </label>
                  <input v-model.number="price" step="0.01" class="form-control mb-2" type="number" placeholder="0" style="padding-left: 20px !important;"/>

                <label style=" margin-left:25px;"> Preço Promocional <i>(opcional)</i>
                </label>
                <input v-model.number="promotionPrice" step="0.01" class="form-control mb-2" type="number" style="padding-left: 20px !important;"/>

                <template v-if="promotionPrice">
                  {{isPromotion = true}}
                </template>
              </div>
              <div class="form-group">
                <textarea v-model="description" placeholder="Descrição..." style="border: 1px solid #DCDCDC; border-radius:3px; width:100%; padding:10px"></textarea>
              </div>
              <input-tag v-model="keywords" placeholder="Tags" style="padding:10px"></input-tag><br>


              <div class="d-flex flex-row">
              <b-button class="btn-cancel" variant="outline-danger" block @click="hideModal" style="width:50%;">Cancelar</b-button>
                <button type="submit" class="btn btn-primary"  style="width:50%;">Adicionar</button>
              </div>
            </form>
          </b-modal>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { produtosCollection } from 'firebase';
  import firebase from 'firebase';


  export default {

    name: 'produtos',
    data () {

      return {
        enables: true,
        keywords: '',
        id:'',
        loading: false,
        email: '',
        photo: '',
        name: '',
        code: '',
        price: '',
        category: '',
        description: '',
        promotionPrice: 0,
        isPromotion: false,
        search: '',
        userName: '',
        produtos: [],
        storeScore:'',
        storeAdress:'',
        storePhoto:'',
        storeName: '',
        geopoint: '',

      }
    },

    created () {

      firebase.firestore().collection('stores').where('email', '==', email).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data())
          this.userName = doc.data().name,
          this.storeScore = doc.data().score,
          this.storePhoto = doc.data().photo,
          this.storeAdress = doc.data().adress,
          this.geopoint= doc.data().geopoint

          console.log(doc.data().position)

          firebase.firestore().collection('stores').doc(this.userName).collection('products').onSnapshot((querySnapshot) => {
            this.produtos = [];
            querySnapshot.forEach((doc) => {
              this.produtos.push({
                name: doc.data().name,
                code: doc.data().code,
                price: doc.data().price,
                photo: doc.data().photo,
                promotionPrice: doc.data().promotionPrice,
                description: doc.data().description,
                enable: doc.data().enable
              });
              console.log(doc.data())


            });

          });

        })
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

    },

    computed:{
      filtroProduct: function(){
        return this.produtos.filter((produto)=>{
          return produto.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0;
        })
      }
    },
    methods: {


      enable_(produto){
        if(this.enables != true){

          firebase.firestore().collection('stores').doc(this.userName).collection('products').doc(produto.name)
          .update({'enable' : false,
        }).then(() => {
          console.log('Editado com sucesso')

        }).catch((error) => {
          alert("Error removing document: ", error);
        });

      }else {

        firebase.firestore().collection('stores').doc(this.userName).collection('products').doc(produto.name)
        .update({'enable' : true,
      }).then(() => {
        console.log('Editado com sucesso')

      }).catch((error) => {
        alert("Error removing document: ", error);
      });
    }

  },

  uploadImage(e){
    this.loading = true
    let file = e.target.files[0];
    var storageRef = firebase.storage().ref('products/'+ file.name);
    let uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', (snapshot) =>{

    }, (error) => {

    }, () =>{
      uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
        this.photo = downloadUrl;
        console.log('Successo', downloadUrl);

      });
      this.loading = false
    });
  },

  addProduto (evt) {
    evt.preventDefault()

    firebase.firestore().collection('stores').doc(this.userName).collection('products').doc(this.name).set({
      name: this.name,
      code: this.code,
      price:  this.price,
      photo: this.photo,
      category: this.category,
      description: this.description,
      promotionPrice: this.promotionPrice,
      isPromotion: this.isPromotion,
      storeScore: this.storeScore,
      storeAdress: this.storeAdress,
      storePhoto: this.storePhoto,
      storeName: this.userName,
      keywords: this.keywords,
      geopoint: this.geopoint,
      enable: true,
    })
    .then(function() {
      console.log('Sucesso')
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
    this.promotionPrice = '';
    this.name = '';
    this.code = '';
    this.price = '';
    this.description = '';
    this.photo = null;
    this.isPromotion = false;


    this.$fire({
      title: "Produto cadastrado com sucesso!",
      type: "success",
      timer: 3000
    }).then(r => {
      console.log(r.value);
    });
  },
  deleteProduto(produto) {
    this.$confirm("Deseja excluir este produto?", "Excluir", "error")
    .then((r = boolean) => {
      console.log(r);
      this.$alert("Produto excluido.");


      firebase.firestore().collection('stores').doc(this.userName).collection('products').doc(produto.name).delete().then(() => {
        console.log('Excluido com sucesso')
      }).catch((error) => {
        alert("Error removing document: ", error);
      });

    })
    .catch(() => {
      console.log("OK not selected.");
    });

  },

  editProduto(produto) {
    firebase.firestore().collection('stores').doc(this.userName).collection('products').doc(produto.name)
    .update({'name' : produto.name,
    'code' : produto.code,
    'price' : produto.price,
    'promotionPrice': produto.promotionPrice,
    photo : this.photo}).then(() => {
      console.log('Editado com sucesso')


      this.$fire({
        title: "Produto editado com sucesso!",
        type: "success",
        timer: 3000
      }).then(r => {
        console.log(r.value);
      });

    }).catch((error) => {
      alert("Error removing document: ", error);

    });
  },

      hideModal() {
        this.$refs['my-modal'].hide()
      },
}
}

</script>
<style>
#modal-1 label {
  width: 100%;
  font-family: 'Poppins';
  font-weight: 700;
  font-size: 14px;
  color: #00BFB2;
}

#modal-1 label i{
  font-style: normal;
  font-size: 12px;
  color: #BBB;
}
.photo-upload-section{
  height: 100px;
}
.v-switch-core{
  background: linear-gradient(90deg, #00BFB2, #05A9C7) !important;
}
</style>
