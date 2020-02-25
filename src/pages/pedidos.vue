<template>
  <div id="pedidos">
    <div class="page-wrapper">
      <div class="page-container" >
        <div class="main-content">
          <div class="section__content section__content--p30">
            <div class="container-fluid">
              <transition name="expand">
                <div class="row">
                  <div class="col-lg-6 col-md-12">
                    <div class="card" v-bind:style="{ 'border-top-color': borderColorNew }" style="border-top: 4px solid">
                      <div class="card-header d-flex flex-row align-items-center">
                        <h4 class="title-2 mb-0" v-bind:style="{ color: textColorNew }">Novos Pedidos</h4>
                        <span  class="badge badge-primary badge-pill ml-2" v-bind:style="{ background: textColorNew }">{{ size }}</span>
                        <div class="d-flex flex-grow-1 justify-content-end">
                          <button @click="expandNewOrder()">
                            <img src="../assets/icons/expand.png" class="icon">
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-12">
                    <div class="card" v-bind:style="{ 'border-top-color': borderColorProg }" style="border-top: 4px solid">
                      <div class="card-header d-flex flex-row align-items-center">
                        <h4 class="title-2 mb-0" v-bind:style="{ color: textColorProg }">Pedidos em andamento</h4>
                         <span  class="badge badge-primary badge-pill ml-2" v-bind:style="{ background: textColorProg }">{{ sizeProg }}</span>
                         <div class="d-flex flex-grow-1 justify-content-end">
                           <button @click="expandProgressOrder()">
                             <img src="../assets/icons/expand.png" class="icon">
                           </button>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
              <div class="row">
                <div v-bind:style="{ display: displayA, width: widthA + '%'}" class="order-tab order-tab-left">
                  <div class="list-group d-flex flex-row flex-wrap" style="text-align:left; display: block">
                    <div
                    v-for="pedido in pedidos"
                    v-if="pedido.status == '1'"
                    :key="pedido.initialDate"
                    href="#" class="list-group-item list-group-item-action flex-column align-items-start"
                    v-bind:style="{ width: widthChild + '%'}">
                    <a class="order-card">

                      <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row">
                          <div class="avatar">
                            <img src="../assets/images/richard.jpg" style="vertical-align: middle; width: 52px;  height: 52px; border-radius: 50%;">
                          </div>
                          <div class="d-flex flex-column justify-content-center ml-2">
                            <h6 class="mb-1 title-2" style="color: #05A9C7"><b>Cliente: </b>{{pedido.userName}}</h6>
                            <h6 class="mb-1 title-2" style="color: #BBB">{{pedido.code}}</h6>
                          </div>
                        </div>
                        <small style="font-size:16px; font-weight:bold; margin-top: 10px">
                          <vac :end-time="pedido.initialDate.seconds * 1000 + 300000">
                            <span class="time-span"
                            slot="process"
                            slot-scope="{ timeObj }">{{ ` ${timeObj.m}:${timeObj.s}` }}</span>
                            <template
                            v-slot:finish>
                            {{PedidoCancelado(pedido)}}
                          </template>
                        </vac>
                      </small>
                    </div>
                    <br>
                    <h6 class="mb-1 title-2">Resumo</h6>
                    <div class="row" v-for="(product, index) in pedido._products">
                      <div class="col-lg-2" ><p>{{ pedido._amounts[index] }} x</p></div>
                      <div class="col-lg-7" ><p>{{ pedido._products[index] }}</p></div>
                      <div class="col-lg-3 d-flex justify-content-end"><p><b>R${{ pedido._prices[index] }}</b></p></div>
                    </div>
                    <div class="d-flex flex-row justify-content-between">
                    <h6 class="mb-3 mt-3 title-2">Total</h6>
                    <h6 class="mb-3 mt-3 title-2"><b>R${{pedido.total}}</b></h6>
                    </div>

                    <div class="d-flex flex-row justify-content-between">
                    <h6 class="mb-3 title-2">Forma de Pagamento: <b style="font-weight: 500; color: #999">{{pedido.method}}</b></h6>
                    <p class="mb-3 title-2">{{pedido.note}}</p><br>
                    </div>
                    <button
                    type="button"
                    class="btn btn-primary"
                    style="background: #05A9C7"
                    @click.stop="aceitarPedido(pedido)">Aceitar Pedido</button>
                  </a>
                </div>
              </div>
            </div>

            <div  v-bind:style="{ display: displayB, width: widthB + '%', opacity: opacityB }" class="order-tab order-tab-right">
              <div class="list-group d-flex flex-row flex-wrap" style="text-align:left; display: block">
                <div
                v-for="pedido in pedidos"
                v-if="pedido.status == '2'"
                :key="pedido.initialDate"
                href="#" class="list-group-item list-group-item-action flex-column align-items-start"
                v-bind:style="{ width: widthChild + '%'}">
                <a class="order-card">
                  <div class="d-flex justify-content-start">
                    <div class="avatar">
                      <img src="../assets/images/richard.jpg" style="vertical-align: middle; width: 52px;  height: 52px; border-radius: 50%;">
                    </div>
                      <h6 class="mb-1 title-2" style="color: #00C19F"><b>Cliente: </b>{{pedido.userName}}</h6>
                      <h6 class="mb-1 title-2" style="color: #BBB">{{pedido.code}}</h6>
                </div>
                <br>
                <h6 class="mb-1 title-2">Resumo</h6>
                <div class="row" v-for="(product, index) in pedido._products">
                  <div class="col-lg-2" ><p>{{ pedido._amounts[index] }} x</p></div>
                  <div class="col-lg-7" ><p>{{ pedido._products[index] }}</p></div>
                  <div class="col-lg-3 d-flex justify-content-end"><p><b>R${{ pedido._prices[index] }}</b></p></div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                <h6 class="mb-3 mt-3 title-2">Total</h6>
                <h6 class="mb-3 mt-3 title-2"><b>R${{pedido.total}}</b></h6>
                </div>
                <h6 class="mb-3 title-2">Forma de Pagamento: <b style="font-weight: 500; color: #999">{{pedido.method}}</b></h6>
                <p class="mb-3 title-2">{{pedido.note}}</p>
                <button
                type="button"
                class="btn btn-primary"
                style="background: #00C19F"
                @click.stop="finalizarPedido(pedido)">Finalizar Pedido</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<!-- <notifications group="foo" :classess="notificationClasses" position="bottom right"/>  -->
</div>
</div>
</template>

<script>
new Vue({
  el: '#pedidos',
});
</script>
<script>
import { empresaCollection } from 'firebase';
import firebase from 'firebase';
export default {
  name: 'pedidos',
  data: () => (
    {isLogged: false,
      size: '',
      sizeProg: '',
      notificationClasses: null,
      userName: '',
      widthA: 50,
      widthB: 50,
      displayA: 'block',
      displayB: 'block',
      opacityA: 1,
      opacityB: 1,
      widthChild: 100,
      borderColorNew: '#05A9C7',
      textColorNew: '#05A9C7',
      borderColorProg: '#00C19F',
      textColorProg: '#00C19F',
      pedidos: [],
      initialDate: 0,
    }
  ),

  methods:{
    expandNewOrder(){
      if(this.size >= 3){

        if(this.widthA == 100 && this.widthB == 0){
          this.widthA = 50;
          this.widthB = 50;
          this.displayA = 'block';
          this.displayB = 'block';
          this.opacityB = 1;
          this.widthChild = 100;
          this.borderColorProg = '#00C19F',
          this.textColorProg = '#00C19F'
        }else{
          this.widthA = 100;
          this.widthB = 0;
          this.displayB = 'none';
          this.opacityB = 0;
          this.widthChild = 33.333333; //Tamanho do box após a expansão
          this.borderColorProg = '#999999',
          this.textColorProg = '#999999'
        }
      }
    },

    expandProgressOrder(){

      if(this.sizeProg >= 3){

        if(this.widthB == 100 && this.widthA == 0){
          this.widthA = 50;
          this.widthB = 50;
          this.displayA = 'block';
          this.displayB = 'block';
          this.opacityA = 1;
          this.widthChild = 100;
          this.borderColorNew = '#05A9C7',
          this.textColorNew = '#05A9C7'
        }else{
          this.widthA = 0;
          this.widthB = 100;
          this.displayA = 'none';
          this.opacityA = 0;
          this.widthChild = 33.333333; //Tamanho do box após a expansão
          this.borderColorNew = '#999999',
          this.textColorNew = '#999999'
        }
      }
    },
    aceitarPedido(pedido) {
      firebase.firestore().collection('stores').doc(this.user).collection('orders').doc(pedido.key)
      .update({status: '2',
      finalDate: new Date()}).then(() => {
        console.log('Pedido Aceito')

      }).catch((error) => {
        alert("Error removing document: ", error);

      });
    },



    finalizarPedido(pedido) {
      firebase.firestore().collection('stores').doc(this.user).collection('orders').doc(pedido.key)
      .update({status: '3',
      finalDate: new Date()}).then(() => {
        console.log('Produto Finalizado')

      }).catch((error) => {
        alert("Error removing document: ", error);

      });
    } ,


    PedidoCancelado(pedido) {
      firebase.firestore().collection('stores').doc(this.user).collection('orders').doc(pedido.key)
      .update({status: '4',
      finalDate: new Date()}).then(() => {
        console.log('Produto Finalizado')

      }).catch((error) => {
        alert("Error removing document: ", error);

      });
    },


      convert: function(dateToFormat) {
    var date = new Date(dateToFormat),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
      return date.getMinutes();
  },

  },


  created () {

    firebase.firestore().collection('stores').where('email', '==', email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
        this.user = doc.data().name
        firebase.firestore().collection('stores').doc(this.user).collection('orders').orderBy('initialDate').onSnapshot((querySnapshot) => {
          this.pedidos = [];
          this.initialDate = 2;
          querySnapshot.forEach((doc) => {

            this.initialDate = doc.data().initialDate;
            this.pedidos.push({
              key: doc.id,
              category: doc.data().category,
              code: doc.data().code,
              preco: doc.data().preco,
              photo: doc.data().photo,
              description:  doc.data().description,
              status: doc.data().status,
              total: doc.data().total,
              _amounts: doc.data()._amounts,
              note: doc.data().note,
              userName: doc.data().userName,
              initialDate: doc.data().initialDate,
              method: doc.data().method,
              _prices: doc.data()._prices,
              _products: doc.data()._products,
            });




          });
          console.log("AWAY223111111111SAHUHSAUAHSUASHUASHUASHASU", this.initialDate.seconds * 1000);

                                    console.log("2444444446666SAHUHSAUAHSUASHUASHUASHASU", new Date().getTime() + 300000);
          this.pedidos.reverse();
          firebase.firestore().collection("stores").doc(this.user).collection('orders').where('status', '==', '1').get().then(snap => {
            this.size = snap.size
            console.log(snap.size)
          });
          firebase.firestore().collection("stores").doc(this.user).collection('orders').where('status', '==', '2').get().then(snap => {
            this.sizeProg = snap.size
            console.log(snap.size)
          });
          firebase.firestore().collection("stores").doc(this.user).collection('orders').where('status', '==', '3').get().then(snap => {
            this.size3 = snap.size
            console.log(snap.size)
          });
        });
      });
    });

  }

}


</script>

<style>
.expand-enter-active, .expand-leave-active {
  transition: all .5s;
}
.expand-enter, .expand-leave-to {
  opacity: 1;
  width: 100% !important;
}
.order-tab{
  transition: width 0.25s, opacity 14s;
}
.order-card{
  border-radius: 25px;
  padding: 20px;
  background: #FFF;
  width: 100%;
  box-shadow: rgb(242, 244, 244) 0px 0px 16px 4px;
}
.order-card h6{
  font-size: 12px;
  color: #666666;
}
.order-card p{
  color: #666666;
  margin-bottom: 3px !important;
}
.order-card p b{
  font-weight: 700 !important;
  font-family: 'Poppins';
}

.order-tab .list-group-item {
    background: transparent !important;
}
.order-tab .list-group-item:hover {
    background: transparent !important;
}
.order-tab .list-group-item a{
  transition: all 0.5s;
}
.order-tab .list-group-item:hover a{
  box-shadow: rgb(230, 234, 234) 0px 0px 20px 6px;
}
.time-span{
  color: #FFF;
  background: rgb(5, 169, 199);
  border-radius: 15px;
  padding: 5px;
  font-size: 12px;
  font-weight: 700;
  font-family: "Poppins";
  display: inline-block;
  width: 50px;
  text-align: center;
}
</style>
