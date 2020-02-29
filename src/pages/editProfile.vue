<template>
  <div class="editProfile">
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
                    <h4 class="title-2 mb-0 swappin-color">Editar Profile</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="card"  style="background:white; border:none; width:50%; margin:0 auto ">
                <div class="card-header" ><br>
                  <form>
                    <div v-for="store in stores" :key="store.id" class="form-group d-flex flex-column" style="text-align:left;">
                      <div class=" mb-4 photo-upload-section d-flex flex-column align-items-center">
                        <div>
                          <input type="file" @change="uploadImage" :disabled="loading" class="custom-file-input mb-4" id="exampleInputFile" aria-describedby="fileHelp">
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
                            <p class="mb-0">Insira o seu logo em boa resolução</p>
                            <h4 class="title-2 swappin-color mb-0 mt-1">Impressione o mundo, capriche na imagem.</h4>
                        </div>

                      </div>
                      <label style=" margin-left:25px;">Nome</label>
                      <input v-model="store.name" class="form-control mb-2" type="text" placeholder="Nome" /> <br>
                      <label style=" margin-left:25px;">E-mail</label>
                      <input  v-model="store.email" class="form-control"  type="text" placeholder="Email"/>  <br>
                      <label style=" margin-left:25px;">Descrição</label>
                      <textarea  v-model="store.description" placeholder="Descrição" style="padding:10px; width:100%; border:1px solid #DCDCDC; border-radius:3px"></textarea><br>
                      <label style=" margin-left:25px;">Horário de Abertura</label>
                      <select v-model="store.open" style="width:100%; padding:10px; border-color:#DCDCDC">
                        <option disabled value="">Horário de Abertura:</option>
                        <option>01:00</option>
                        <option>02:00</option>
                        <option>03:00</option>
                        <option>04:00</option>
                        <option>05:00</option>
                        <option>06:00</option>
                        <option>07:00</option>
                        <option>08:00</option>
                        <option>09:00</option>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                        <option>17:00</option>
                        <option>18:00</option>
                        <option>19:00</option>
                        <option>20:00</option>
                        <option>21:00</option>
                        <option>22:00</option>
                        <option>23:00</option>
                        <option>00:00</option>
                      </select>
                      <label style=" margin-left:25px;">Horário de Fechamento</label>
                      <select v-model="store.close" style="width:100%; padding:10px; border-color:#DCDCDC">
                        <option disabled value="">Horário de Fechamento:</option>
                        <option>01:00</option>
                        <option>02:00</option>
                        <option>03:00</option>
                        <option>04:00</option>
                        <option>05:00</option>
                        <option>06:00</option>
                        <option>07:00</option>
                        <option>08:00</option>
                        <option>09:00</option>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                        <option>17:00</option>
                        <option>18:00</option>
                        <option>19:00</option>
                        <option>20:00</option>
                        <option>21:00</option>
                        <option>22:00</option>
                        <option>23:00</option>
                        <option>00:00</option>
                      </select><br><br>
                      <label style=" margin-left:25px;">Tempo de entrega</label>
                      <input  v-model="store.delivery" class="form-control"  type="text" placeholder="Delivery"/>  <br>

                      <input type="file" @change="uploadImage" :disabled="loading"><br><br>

                      <template v-if="loading">

                        <i class="fa fa-spinner fa-spin"></i>
                      </template>
                      <template v-else></template><br>
                      <template v-if="photo">
                        <img class="card-img-top" :src="photo" alt="Card image cap" style="width:15%; "><br><br>
                      </template>

                      <button type="button"  class="btn btn-info" style="width:100%" @click.stop="editProfile(store)" >Editar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div> <br><br>


            <div class="row">
              <div class="col-md-12">
                <div class="copyright">
                  <p>Copyright © 2019 Swappin. Todos os direitos reservados.</p>
                </div>

              </div>
            </div>
          </div>
        </div>
        <!-- END MAIN CONTENT-->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'editProfile',
  data () {
    return {
      name: '',
      delivery: '',
      description: '',
      email: '',
      photo: '',
      close: '',
      open: '',
      stores: [],
      loading: false,

    }
  },
  created () {
    firebase.firestore().collection('stores').where('email', '==', email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
        this.name = doc.data().name

        firebase.firestore().collection('stores').where('name', '==' , this.name).onSnapshot((querySnapshot) => {
          this.stores = [];
          querySnapshot.forEach((doc) => {
            this.stores.push({
              name: doc.data().name,
              delivery: doc.data().delivery,
              description: doc.data().description,
              email: doc.data().email,
              photo: doc.data().photo,
              close: doc.data().close,
              open: doc.data().open,


            });

          });

        });
      })
    })
  },

  methods: {

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

    editProfile(store) {
      firebase.firestore().collection('stores').doc(this.name)
      .update({'name' : store.name,
      'description' : store.description,
      'delivery': store.delivery,
      photo : this.photo
    }).then(() => {

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
  }
}
}
</script>
<style>
.custom-file-label {
margin: 0 auto !important;
}

</style>
