<template>
<div class="container-fluid" style="background: white; width:400px; border-radius:10px ">
  <div class="row" style="padding:20px">
    <div class="col-sm-12" >
      <!--<img src="@/assets/images/logo/logo-s.png" style="width:30px; margin-bottom:30px; margin-right:20px; margin-left:20px; margin-top:5px" />-->
      <br><br><p class="text-left" style="font-weight:bold; font-size:20px;">Criar sua conta</p>
       <br><form @submit.prevent="doSignup()">
  <div class="form-group">

    <input required type="text" v-model="name" class="form-control"  placeholder="Nome/Empresa">
      </div>

  <div class="form-group">
    <input required type="email" v-model="email" class="form-control"  placeholder="name@example.com">
  </div>
 <div class="form-group">

    <input required type="password" v-model="password" class="form-control" placeholder="Senha">
  </div>

   <div class="form-group">
    <input required type="text" v-model="adress" class="form-control"  placeholder="Endereço">
      </div>
      <div class="form-group">
    <textarea v-model="description" placeholder="Descrição..." style="border: 1px solid #DCDCDC; border-radius:3px; width:100%; padding:10px"></textarea>
      </div>

<div class="form-group">
  <select v-model="category" style="width:100%; padding:10px; border-color:#DCDCDC">
  <option disabled value="">Categoria:</option>
  <option>Comidas & Bebidas</option>
  <option>Saúde & Bem estar</option>
  <option>Moda & Acessórios</option>

</select><br><br>
<template v-if="category == 'Comidas & Bebidas'">
  <div class="subcategoria" style="text-align:left">
 <input type="checkbox"  value="Brasileira" v-model="subcategory" style="margin:5px">
  <label >Brasileira</label><br>
  <input type="checkbox"  value="Lanches" v-model="subcategory" style="margin:5px">
  <label >Lanches</label><br>
  <input type="checkbox"  value="Churrasco" v-model="subcategory" style="margin:5px">
  <label >Churrasco</label><br>
  <input type="checkbox"  value="Japonesa" v-model="subcategory" style="margin:5px">
  <label >Japonesa</label><br>
  <input type="checkbox"  value="Chinesa" v-model="subcategory" style="margin:5px">
  <label >Chinesa</label><br>
  <input type="checkbox"  value="Chinesa" v-model="subcategory" style="margin:5px">
  <label >Pizzas</label><br>
  <input type="checkbox"  value="Árabe" v-model="subcategory" style="margin:5px">
  <label >Árabe</label><br>
 </div>
</template>

<template v-if="category == 'Saúde & Bem estar'">
  <div class="subcategoria" style="text-align:left">
 <input type="checkbox"  value="Farmácia" v-model="subcategory" style="margin:5px">
  <label >Farmácia</label><br>
  <input type="checkbox"  value="Fitness" v-model="subcategory" style="margin:5px">
  <label >Fitness</label><br>
  <input type="checkbox"  value="Cosméticos" v-model="subcategory" style="margin:5px">
  <label >Cosméticos</label><br>
  <input type="checkbox"  value="Perfumaria" v-model="subcategory" style="margin:5px">
  <label >Perfumaria</label><br>
  <input type="checkbox"  value="Higiene" v-model="subcategory" style="margin:5px">
  <label >Higiene</label><br>
 </div>
</template>

<template v-if="category == 'Moda & Acessórios'">
  <div class="subcategoria" style="text-align:left">
 <input type="checkbox"  value="Masculino" v-model="subcategory" style="margin:5px">
  <label >Masculino</label><br>
  <input type="checkbox"  value="Feminino" v-model="subcategory" style="margin:5px">
  <label >Feminino</label><br>
  <input type="checkbox"  value="Calçados" v-model="subcategory" style="margin:5px">
  <label >Calçados</label><br>
  <input type="checkbox"  value="Streetwear" v-model="subcategory" style="margin:5px">
  <label >Streetwear</label><br>
  <input type="checkbox"  value="Roupas Íntimas" v-model="subcategory" style="margin:5px">
  <label >Roupas Íntimas</label><br>
  <input type="checkbox"  value="Joias & Bijuterias" v-model="subcategory" style="margin:5px">
  <label >Joias & Bijuterias</label><br>
  <input type="checkbox"  value="Bolsas & Mochilas" v-model="subcategory" style="margin:5px">
  <label >Bolsas & Mochilas</label><br>
  <input type="checkbox"  value="Relojoaria" v-model="subcategory" style="margin:5px">
  <label >Relojoaria</label><br>
 </div>
</template>

      </div>

<div class="form-group">

 <select v-model="open" style="width:100%; padding:10px; border-color:#DCDCDC">
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
<br><br>
<select v-model="close" style="width:100%; padding:10px; border-color:#DCDCDC">
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
</select>
<br>

</div>
<div class="form-group">
<input v-model.number="delivery" class="form-control" type="number" placeholder="Tempo de Entrega" style=""/>
</div>
<br>
<template class="paymentMethod">
  <h5>Formas de Pagamento</h5><br>
  <div class="paymentMethods" style="text-align:left">
 <input type="checkbox"  value="Cartão de crédito - Visa" v-model="paymentMethod" style="margin:5px">
  <label >Cartão de crédito - Visa</label><br>
  <input type="checkbox"  value="Cartão de crédito - Mastercard" v-model="paymentMethod" style="margin:5px">
  <label >Cartão de crédito - Mastercard</label><br>
  <input type="checkbox"  value="Cartão de crédito - Elo" v-model="paymentMethod" style="margin:5px">
  <label >Cartão de crédito - Elo</label><br>
  <input type="checkbox"  value="Cartão de débito - Visa" v-model="paymentMethod" style="margin:5px">
  <label >Cartão de débito - Visa</label><br>
  <input type="checkbox"  value="Cartão de débito - Mastercard" v-model="paymentMethod" style="margin:5px">
  <label >Cartão de débito - Mastercard</label><br>
  <input type="checkbox"  value="Cartão de débito - Elo" v-model="paymentMethod" style="margin:5px">
  <label >Cartão de débito - Elo</label><br>
  <input type="checkbox"  value="Dinheiro" v-model="paymentMethod" style="margin:5px">
  <label >Dinheiro</label><br>


 </div>
</template>
<br>
<input type="file" @change="uploadImage" :disabled="loading"><br><br>
                                    <template v-if="loading">
                                  <i class="fa fa-spinner fa-spin"></i>
                                  <br>
                                </template>
                                <template v-else></template>
   <template v-if="photo">
<img class="card-img-top" :src="photo" alt="Card image cap" style="width:15%; float:left"><br>
</template>
  <br>
  <button type="submit" class="btn btn-primary" :disabled="loading" style="background:#01bc77; border:none; width:100%; padding:10px">
  <template v-if="loading">
      Cadastrando...
      <i class="fa fa-spinner fa-spin"></i>
  </template>
  <template v-else>Cadastrar</template>
  </button>
</form><br><br>
  <!--<vue-google-autocomplete
            ref="address"
            id="map"
            classname="form-control"
            placeholder="Please type your address"
            v-on:placechanged="getAddressData"
            country="sg"
        >
        </vue-google-autocomplete>
{{ address }}-->
    </div>
  </div>
</div>


</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import firebase from 'firebase';



    export default {
      components: { VueGoogleAutocomplete },
    name: 'signup',
    data:() => {
            return{

                loading: false,
                email: '',
                password: '',
                ref: firebase.firestore().collection('stores'),
                store: {},
                name: '',
                adress: '',
                category: '',
                close: '',
                delivery: '',
                description: '',
                isOpen: Boolean,
                open: '',
                photo: '',
                 geopoint: new firebase.firestore.GeoPoint(51.435454, 31.445456),
                score: 0.0,
                subcategory: [],
                paymentMethod: [],
              address: ''


            }
        },
         mounted() {
            // To demonstrate functionality of exposed component functions
            // Here we make focus on the user input
            this.$refs.address.focus();
        },
        methods:{
          getAddressData: function (addressData, placeResultData, id) {
                this.address = addressData;
            },
                    uploadImage(e){

                  this.loading = true
                    let file = e.target.files[0];
                    var storageRef = firebase.storage().ref('photos/'+ file.name);
                    let uploadTask = storageRef.put(file);

                    uploadTask.on('state_changed', (snapshot) =>{

                    }, (error) => {
                      console.log(error)
                    }, () =>{
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
                            this.photo = downloadUrl;
                            console.log('Successo', downloadUrl);

                        });
                        this.loading = false
                    });
                },

            async doSignup (){
                this.loading = true
                const {email, password} = this
                 try {

                   const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
                    this.ref.doc(this.name).set({
                    name: this.name,
                    adress: this.adress,
                    category: this.category,
                    close:  this.close,
                    delivery: (this.delivery).toString(),
                    description: this.description,
                    open: this.open,
                    photo: this.photo,
                    geopoint: this.geopoint,
                    score: this.score,
                    email: this.email,
                    subcategory: this.subcategory,
                    paymentMethod: this.paymentMethod

                  }).then( function(){
                    console.log("SUCESSO");

                  }).catch(function(error){
                    console.log(error);
                  })
                    window.uid = res.user.uid
                    window.name = this.name
                    window.email = this.email
                    console.log(this.name)
                    this.$router.push({ path: '/pedidos'});


                } catch (error) {
                    console.log(error)
                }
               this.loading = false
            }
        },

}

</script>

<style scoped>
</style>
